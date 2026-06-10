import { NextResponse } from "next/server";

import { isAdminConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "apex-automations",
    backend: {
      consultationApi: true,
      adminConfigured: isAdminConfigured(),
    },
    checkedAt: new Date().toISOString(),
  });
}

