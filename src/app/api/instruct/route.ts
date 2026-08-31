import { NextResponse } from "next/server";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";
import {
  writeLeadToSheetSafely,
  type LeadFields,
} from "@/lib/lead-sheet";

type InstructBody = {
  fullName?: unknown;
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  formType?: unknown;
  lawFirm?: unknown;
  caseType?: unknown;
};

function trimField(v: unknown, max = 8000): string {
  const s = v != null ? String(v).trim() : "";
  return s.length > max ? s.slice(0, max) : s;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

/**
 * POST /api/instruct — Google Sheets row (one shared tab + Form Type).
 * Soft-fails Sheets so the client webhook path remains primary.
 */
export async function POST(request: Request) {
  let body: InstructBody;
  try {
    body = (await request.json()) as InstructBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const formTypeRaw = trimField(body.formType, 40).toLowerCase();
  const formType = formTypeRaw === "instruct" ? "instruct" : "contact";

  const lead: LeadFields = {
    fullName: trimField(body.fullName ?? body.full_name, 300),
    email: trimField(body.email, 320),
    phone: trimField(body.phone, 80),
    lawFirm: trimField(body.lawFirm, 300),
    formType,
    caseType: trimField(body.caseType, 300),
    message: trimField(body.message, 8000),
  };

  if (!lead.fullName || !lead.email) {
    return NextResponse.json(
      { error: "fullName and email are required" },
      { status: 400 },
    );
  }

  if (!isGoogleSheetsConfigured()) {
    console.warn(
      "[instruct] Google Sheets env vars missing — skipping sheet write",
    );
    return NextResponse.json({
      ok: true,
      writtenToSheet: false,
      warning: "Google Sheets is not configured",
    });
  }

  const writtenToSheet = await writeLeadToSheetSafely(
    lead,
    `instruct-${formType}`,
  );

  return NextResponse.json({ ok: true, writtenToSheet });
}
