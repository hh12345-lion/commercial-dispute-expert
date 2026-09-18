import { NextResponse } from "next/server";
import {
  getLeadWebhookUrl,
  notifyLeadWebhook,
} from "@/lib/leadNotification";

type LeadBody = {
  fullName?: unknown;
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  formType?: unknown;
  form_type?: unknown;
  message?: unknown;
  Message?: unknown;
  description?: unknown;
  enquiry?: unknown;
  details?: unknown;
  summary?: unknown;
  notes?: unknown;
  matter?: unknown;
};

function trimField(v: unknown, max = 320): string {
  const s = v != null ? String(v).trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

function resolveLeadMessage(body: LeadBody): string {
  const keys = [
    "message",
    "Message",
    "description",
    "enquiry",
    "details",
    "summary",
    "notes",
    "matter",
  ] as const;
  for (const key of keys) {
    const v = body[key];
    if (v != null && String(v).trim()) {
      return trimField(v, 8000);
    }
  }
  return "";
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

/**
 * POST /api/submit-lead — forwards lead to n8n webhook (shared keys including message).
 * On Netlify, netlify.toml redirects this path to netlify/functions/submit-lead.js.
 */
export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fullName = trimField(body.fullName ?? body.full_name, 300);
  const email = trimField(body.email, 320);
  const phone = trimField(body.phone, 80);
  const message = resolveLeadMessage(body);

  if (!fullName || !email) {
    return NextResponse.json(
      { error: "fullName and email are required" },
      { status: 400 },
    );
  }

  if (!getLeadWebhookUrl()) {
    return NextResponse.json(
      {
        error: "WEBHOOK_MISSING",
        message: "Lead_notification_url / LEAD_NOTIFICATION_URL is not set.",
      },
      { status: 503 },
    );
  }

  const result = await notifyLeadWebhook({ fullName, email, phone, message });

  if (!result.ok) {
    const status = result.error === "WEBHOOK_REJECTED" ? 502 : 502;
    return NextResponse.json({ error: result.error, status: result.status }, { status });
  }

  return NextResponse.json({ ok: true });
}
