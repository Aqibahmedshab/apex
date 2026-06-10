import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import type { ConsultationRequestInput, ConsultationRequestRecord, ConsultationStatus } from "@/lib/consultations";

const dataDirectory = path.join(process.cwd(), "data");
const filePath = path.join(dataDirectory, "consultation-requests.json");

let writeQueue = Promise.resolve();

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, "[]", "utf8");
  }
}

async function readConsultations() {
  await ensureStore();
  const raw = await readFile(filePath, "utf8");

  try {
    const parsed = JSON.parse(raw) as ConsultationRequestRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeConsultations(items: ConsultationRequestRecord[]) {
  await ensureStore();
  await writeFile(filePath, JSON.stringify(items, null, 2), "utf8");
}

async function withWriteLock<T>(action: () => Promise<T>) {
  const next = writeQueue.then(action, action);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );

  return next;
}

export async function createConsultationRecord({
  input,
  ipAddress,
  userAgent,
}: {
  input: ConsultationRequestInput;
  ipAddress: string;
  userAgent: string;
}) {
  const record: ConsultationRequestRecord = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    source: input.source || "website",
    ipAddress,
    userAgent,
  };

  await withWriteLock(async () => {
    const items = await readConsultations();
    items.unshift(record);
    await writeConsultations(items);
  });

  return record;
}

export async function listConsultationRecords() {
  const items = await readConsultations();
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function updateConsultationStatus({
  id,
  status,
}: {
  id: string;
  status: ConsultationStatus;
}) {
  return withWriteLock(async () => {
    const items = await readConsultations();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    items[index] = {
      ...items[index],
      status,
    };

    await writeConsultations(items);
    return items[index];
  });
}

export async function getConsultationStats() {
  const items = await listConsultationRecords();

  const byStatus = items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.status] = (accumulator[item.status] || 0) + 1;
    return accumulator;
  }, {});

  const byService = items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.serviceInterest] = (accumulator[item.serviceInterest] || 0) + 1;
    return accumulator;
  }, {});

  return {
    total: items.length,
    newestAt: items[0]?.createdAt ?? null,
    byStatus,
    byService,
  };
}

