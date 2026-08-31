import { appendRow, isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { LEAD_BRAND_NAME } from "@/lib/leadNotification";

/** Contact/instruct fields persisted to Google Sheets (column order = row 1 headers). */
export type LeadFields = {
  fullName: string;
  email: string;
  phone: string;
  lawFirm: string;
  formType: string;
  caseType: string;
  message: string;
};

/** Row 1 on GOOGLE_SHEET_TAB_NAME — one shared tab; Form Type distinguishes rows. */
export const LEAD_SHEET_HEADERS = [
  "Timestamp",
  "Brand",
  "Form Type",
  "Full Name",
  "Email",
  "Phone Number",
  "Law Firm",
  "Case Type",
  "Message",
] as const;

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

/** Avoid Sheets treating +phone or =text as formulas with USER_ENTERED. */
function asSheetText(value: string): string {
  const v = sanitize(value);
  if (!v) return v;
  if (v.startsWith("+") || v.startsWith("=") || v.startsWith("-")) {
    return `'${v}`;
  }
  return v;
}

export function resolveFormTypeLabel(formType?: string): "Contact" | "Instruct" {
  const normalized = (formType || "").toLowerCase().trim();
  return normalized === "instruct" ? "Instruct" : "Contact";
}

/**
 * Row values in column order — must match row 1 in the spreadsheet tab.
 * See docs/google-sheets.md for header names.
 */
export function buildLeadSheetRow(lead: LeadFields): (string | null)[] {
  return [
    new Date().toISOString(),
    LEAD_BRAND_NAME,
    resolveFormTypeLabel(lead.formType),
    sanitize(lead.fullName),
    lead.email.toLowerCase().trim(),
    asSheetText(lead.phone),
    sanitize(lead.lawFirm),
    sanitize(lead.caseType),
    sanitize(lead.message),
  ];
}

/**
 * Appends a lead row when Google Sheets env vars are set.
 * Throws on API errors — callers should catch so webhook success is not blocked.
 */
export async function appendLeadToGoogleSheet(lead: LeadFields): Promise<void> {
  if (!isGoogleSheetsConfigured()) {
    return;
  }

  await appendRow(buildLeadSheetRow(lead));
}

/** Soft-fail wrapper — logs and never throws. Returns whether a row was written. */
export async function writeLeadToSheetSafely(
  lead: LeadFields,
  context: string
): Promise<boolean> {
  if (!isGoogleSheetsConfigured()) return false;

  try {
    await appendLeadToGoogleSheet(lead);
    return true;
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number };
    console.error("Google Sheets error (soft-fail):", {
      context,
      message: err?.message,
      code: err?.code,
      spreadsheetId: `${process.env.GOOGLE_SHEET_ID?.slice(0, 8)}...`,
      tab: process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1",
      timestamp: new Date().toISOString(),
    });
    return false;
  }
}
