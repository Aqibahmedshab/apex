import type { ConsultationRequestRecord } from "@/lib/consultations";

function getWebhookHeaders() {
  const token = process.env.LEADS_WEBHOOK_BEARER_TOKEN?.trim();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function notifyLeadWebhook(record: ConsultationRequestRecord) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: getWebhookHeaders(),
      body: JSON.stringify({
        type: "consultation_request.created",
        createdAt: record.createdAt,
        lead: record,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Lead webhook delivery failed", error);
  }
}
