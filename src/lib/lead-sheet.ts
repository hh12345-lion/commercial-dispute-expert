import { appendRow, isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { LEAD_BRAND_NAME } from "@/lib/leadNotification";

/** Contact form fields persisted to Google Sheets (column order = row 1 headers). */
export type LeadFields = {
  fullName: string;
  email: string;
  phone: string;
  lawFirm: string;
  formType: string;
  caseType: string;
  message: string;
};

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

/**
 * Row values in column order — must match row 1 in the spreadsheet tab.
 * See docs/google-sheets.md for header names.
 */
export function buildLeadSheetRow(lead: LeadFields): (string | null)[] {
  return [
    new Date().toISOString(),
    sanitize(lead.fullName),
    lead.email.toLowerCase().trim(),
    asSheetText(lead.phone),
    sanitize(lead.lawFirm),
    sanitize(lead.formType),
    sanitize(lead.caseType),
    sanitize(lead.message),
    LEAD_BRAND_NAME,
  ];
}

export async function appendLeadToGoogleSheet(lead: LeadFields): Promise<void> {
  if (!isGoogleSheetsConfigured()) {
    return;
  }

  await appendRow(buildLeadSheetRow(lead));
}
