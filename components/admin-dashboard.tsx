"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCcw } from "lucide-react";

import { consultationStatuses, type ConsultationRequestRecord } from "@/lib/consultations";

type DashboardResponse = {
  success: true;
  items: ConsultationRequestRecord[];
  stats: {
    total: number;
    newestAt: string | null;
    byStatus: Record<string, number>;
    byService: Record<string, number>;
  };
};

export function AdminDashboard() {
  const [adminKey, setAdminKey] = useState("");
  const [items, setItems] = useState<ConsultationRequestRecord[]>([]);
  const [stats, setStats] = useState<DashboardResponse["stats"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = window.sessionStorage.getItem("apex-admin-key");

    if (storedKey) {
      setAdminKey(storedKey);
    }
  }, []);

  async function fetchDashboard(nextKey = adminKey) {
    if (!nextKey) {
      setMessage("Enter the admin API key to unlock lead data.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/consultations", {
        headers: {
          Authorization: `Bearer ${nextKey}`,
        },
        cache: "no-store",
      });

      const result = (await response.json()) as DashboardResponse | { success: false; error: string };

      if (!response.ok || !result.success) {
        setItems([]);
        setStats(null);
        setMessage(result.success ? null : result.error || "Could not load dashboard data.");
        return;
      }

      window.sessionStorage.setItem("apex-admin-key", nextKey);
      setItems(result.items);
      setStats(result.stats);
    } catch {
      setMessage("Dashboard request failed. Check the API key and server state.");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    if (!adminKey) {
      return;
    }

    try {
      const response = await fetch("/api/consultations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        return;
      }

      await fetchDashboard(adminKey);
    } catch {
      setMessage("Status update failed.");
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted">
            Internal Dashboard
          </span>
          <h1 className="text-4xl font-semibold tracking-tight">Apex Automations backend console</h1>
          <p className="max-w-3xl text-base leading-8 text-muted">
            Review consultation requests, inspect pipeline volume, and update lead status from the
            backend you just added to the site.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.7fr_0.3fr]">
          <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-panel backdrop-blur-xl">
            <label className="mb-2 block text-sm font-medium text-white" htmlFor="adminKey">
              Admin API key
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(event) => setAdminKey(event.target.value)}
                placeholder="Set ADMIN_API_KEY in .env.local first"
                className="h-12 w-full rounded-full border border-white/10 bg-background/70 px-4 text-sm text-white outline-none transition placeholder:text-muted focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => fetchDashboard(adminKey)}
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 text-sm font-medium text-white shadow-glow disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                Load leads
              </button>
            </div>
            {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-panel backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Backend status</p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>Storage: local JSON store</p>
              <p>Validation: server-side</p>
              <p>Rate limiting: active</p>
              <p>Webhook forwarding: optional</p>
            </div>
          </div>
        </div>

        {stats ? (
          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Total requests", String(stats.total)],
              ["New leads", String(stats.byStatus.new || 0)],
              ["Qualified", String(stats.byStatus.qualified || 0)],
              ["Newest", stats.newestAt ? new Date(stats.newestAt).toLocaleString() : "None"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{label}</p>
                <p className="mt-3 text-xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-[0.72fr_0.28fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-panel backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {item.company} · {item.email} · {item.phone || "No phone shared"}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {new Date(item.createdAt).toLocaleString()} · {item.source}
                    </p>
                  </div>
                  <select
                    value={item.status}
                    onChange={(event) => updateStatus(item.id, event.target.value)}
                    className="h-11 rounded-full border border-white/10 bg-background/70 px-4 text-sm text-white outline-none focus:border-secondary"
                  >
                    {consultationStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[22px] border border-white/10 bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Service</p>
                    <p className="mt-2 text-sm text-white">{item.serviceInterest}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Timeline</p>
                    <p className="mt-2 text-sm text-white">{item.timeline}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Lead volume</p>
                    <p className="mt-2 text-sm text-white">{item.monthlyLeads}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-[22px] border border-white/10 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Automation brief</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.message}</p>
                </div>
              </div>
            ))}

            {!isLoading && items.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/10 bg-surface/60 p-8 text-sm text-muted">
                No consultation requests yet. Submit the website form to seed the backend.
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-panel backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Service demand</p>
              <div className="mt-5 space-y-3">
                {Object.entries(stats?.byService || {}).length > 0 ? (
                  Object.entries(stats?.byService || {}).map(([service, count]) => (
                    <div
                      key={service}
                      className="flex items-center justify-between rounded-[20px] border border-white/10 bg-background/60 px-4 py-3"
                    >
                      <span className="text-sm text-white">{service}</span>
                      <span className="text-sm text-muted">{count}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted">No service trends yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

