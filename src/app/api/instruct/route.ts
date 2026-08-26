import { NextResponse } from "next/server";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { appendLeadToGoogleSheet, type LeadFields } from "@/lib/lead-sheet";

type InstructBody = {
  fullName?: unknown;
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  formType?: unknown;
};

function trimField(v: unknown, max = 8000): string {
  const s = v != null ? String(v).trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

/**
 * POST /api/instruct — Google Sheets row for instruction enquiries only.
 */
export async function POST(request: Request) {
  let body: InstructBody;
  try {
    body = (await request.json()) as InstructBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lead: LeadFields = {
    fullName: trimField(body.fullName ?? body.full_name, 300),
    email: trimField(body.email, 320),
    phone: trimField(body.phone, 80),
    lawFirm: "",
    formType: "instruct",
    caseType: "",
    message: trimField(body.message, 8000),
  };

  if (!lead.fullName || !lead.email) {
    return NextResponse.json(
      { error: "fullName and email are required" },
      { status: 400 },
    );
  }

  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json(
      {
        error: "SHEETS_NOT_CONFIGURED",
        message:
          "Configure GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.",
      },
      { status: 503 },
    );
  }

  try {
    await appendLeadToGoogleSheet(lead);
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number };
    console.error("Google Sheets error:", {
      message: err?.message,
      code: err?.code,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: "SHEETS_WRITE_FAILED", message: "Could not save your submission." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
