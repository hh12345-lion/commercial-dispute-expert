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
};

function trimField(v: unknown, max = 320): string {
  const s = v != null ? String(v).trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

/**
 * POST /api/submit-lead — forwards lead to n8n webhook (five-key JSON including domain).
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

  const result = await notifyLeadWebhook({ fullName, email, phone });

  if (!result.ok) {
    const status = result.error === "WEBHOOK_REJECTED" ? 502 : 502;
    return NextResponse.json({ error: result.error, status: result.status }, { status });
  }

  return NextResponse.json({ ok: true });
}
