import { appendRow, getGoogleSheetsConfigStatus, isGoogleSheetsConfigured } from "@/lib/google-sheets";
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
export async function appendLeadToGoogleSheet(
  lead: LeadFields,
): Promise<{ updatedRange: string | null | undefined }> {
  if (!isGoogleSheetsConfigured()) {
    throw new Error("Google Sheets env vars are not configured");
  }

  return appendRow(buildLeadSheetRow(lead));
}

function formatSheetsError(error: unknown): string {
  const err = error as {
    message?: string;
    code?: number;
    response?: { data?: { error?: { message?: string; status?: string } } };
    errors?: { message?: string }[];
  };
  const apiMessage =
    err.response?.data?.error?.message ||
    err.errors?.[0]?.message ||
    err.message ||
    "Unknown Google Sheets error";
  return apiMessage;
}

/** Soft-fail wrapper — logs and never throws. Returns whether a row was written. */
export async function writeLeadToSheetSafely(
  lead: LeadFields,
  context: string,
): Promise<boolean> {
  const { configured, missing } = getGoogleSheetsConfigStatus();

  if (!configured) {
    console.warn("[Google Sheets] Skipped — missing env vars:", missing.join(", "), {
      context,
    });
    return false;
  }

  try {
    const result = await appendLeadToGoogleSheet(lead);
    console.info("[Google Sheets] Row appended:", {
      context,
      range: result.updatedRange,
      tab: process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1",
      formType: lead.formType,
    });
    return true;
  } catch (error: unknown) {
    console.error("[Google Sheets] Write failed:", {
      context,
      message: formatSheetsError(error),
      spreadsheetId: `${process.env.GOOGLE_SHEET_ID?.slice(0, 8)}...`,
      tab: process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1",
      serviceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      timestamp: new Date().toISOString(),
    });
    return false;
  }
}
