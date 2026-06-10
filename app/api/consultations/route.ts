import { NextRequest, NextResponse } from "next/server";

import { hasAdminAccess, isAdminConfigured } from "@/lib/admin-auth";
import { consultationStatuses, validateConsultationInput } from "@/lib/consultations";
import {
  createConsultationRecord,
  getConsultationStats,
  listConsultationRecords,
  updateConsultationStatus,
} from "@/lib/consultations-store";
import { notifyLeadWebhook } from "@/lib/lead-notifier";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      error: "Admin access required.",
    },
    { status: 401 },
  );
}

export async function GET(request: NextRequest) {
  if (!isAdminConfigured() || !hasAdminAccess(request)) {
    return unauthorizedResponse();
  }

  const [items, stats] = await Promise.all([listConsultationRecords(), getConsultationStats()]);

  return NextResponse.json({
    success: true,
    items,
    stats,
  });
}

export async function POST(request: NextRequest) {
  const ipAddress = getClientIp(request);
  const limiter = rateLimit({
    key: `consultation:${ipAddress}`,
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!limiter.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions. Please wait a few minutes before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((limiter.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  const validation = validateConsultationInput(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const record = await createConsultationRecord({
    input: validation.data,
    ipAddress,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  await notifyLeadWebhook(record);

  return NextResponse.json(
    {
      success: true,
      id: record.id,
      createdAt: record.createdAt,
      message: "Consultation request submitted successfully.",
    },
    { status: 201 },
  );
}

export async function PATCH(request: NextRequest) {
  if (!isAdminConfigured() || !hasAdminAccess(request)) {
    return unauthorizedResponse();
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const id = typeof body.id === "string" ? body.id.trim() : "";
  const status = typeof body.status === "string" ? body.status.trim() : "";

  if (!id || !consultationStatuses.includes(status as (typeof consultationStatuses)[number])) {
    return NextResponse.json(
      {
        success: false,
        error: "Provide a valid request id and status.",
      },
      { status: 400 },
    );
  }

  const updated = await updateConsultationStatus({
    id,
    status: status as (typeof consultationStatuses)[number],
  });

  if (!updated) {
    return NextResponse.json(
      {
        success: false,
        error: "Consultation request not found.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    item: updated,
  });
}

