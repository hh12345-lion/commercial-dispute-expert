import { getSiteDomain } from "@/lib/seo";

/** Must match `BRAND_NAME` in netlify/functions/submit-lead.js */
export const BRAND_NAME = "Commercial Dispute Expert";
export const LEAD_BRAND_NAME = BRAND_NAME;

export function getLeadWebhookUrl(): string {
  return (
    process.env.Lead_notification_url ||
    process.env.LEAD_NOTIFICATION_URL ||
    ""
  );
}

export type LeadWebhookInput = {
  fullName: string;
  email: string;
  phone: string;
};

/** Outbound n8n / webhook body — exactly five keys, identical across all brand sites. */
export function buildLeadWebhookBody(lead: LeadWebhookInput) {
  return {
    "Full Name": lead.fullName,
    Email: lead.email,
    "Phone Number": lead.phone,
    "Brand name": BRAND_NAME,
    domain: getSiteDomain(),
  };
}

export type NotifyLeadResult =
  | { ok: true }
  | { ok: false; error: "WEBHOOK_MISSING" | "WEBHOOK_UNREACHABLE" | "WEBHOOK_REJECTED"; status?: number };

export async function notifyLeadWebhook(lead: LeadWebhookInput): Promise<NotifyLeadResult> {
  const webhookUrl = getLeadWebhookUrl();
  if (!webhookUrl) {
    return { ok: false, error: "WEBHOOK_MISSING" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildLeadWebhookBody(lead)),
      signal: AbortSignal.timeout(12_000),
    });

    if (!res.ok) {
      return { ok: false, error: "WEBHOOK_REJECTED", status: res.status };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "WEBHOOK_UNREACHABLE" };
  }
}
