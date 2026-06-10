import type { NextRequest } from "next/server";

function getExpectedAdminKey() {
  return process.env.ADMIN_API_KEY?.trim();
}

export function hasAdminAccess(request: NextRequest) {
  const expectedKey = getExpectedAdminKey();

  if (!expectedKey) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  const headerKey = request.headers.get("x-admin-key");

  if (headerKey === expectedKey) {
    return true;
  }

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length).trim() === expectedKey;
  }

  return false;
}

export function isAdminConfigured() {
  return Boolean(getExpectedAdminKey());
}

