import { google, sheets_v4 } from "googleapis";

type CellValue = string | number | boolean | null;

interface SheetTarget {
  spreadsheetId?: string;
  sheetName?: string;
}

function normalizePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  key = key.replace(/\\n/g, "\n");
  if (!key.includes("BEGIN PRIVATE KEY") && /^[A-Za-z0-9+/=\s]+$/.test(key)) {
    try {
      const decoded = Buffer.from(key.replace(/\s/g, ""), "base64").toString("utf8");
      if (decoded.includes("BEGIN PRIVATE KEY")) {
        key = decoded;
      }
    } catch {
      /* not base64 */
    }
  }
  return key;
}

/** Which env vars are missing — safe to log (names only). */
export function getGoogleSheetsConfigStatus(): {
  configured: boolean;
  missing: string[];
} {
  const missing: string[] = [];
  if (!process.env.GOOGLE_SHEET_ID?.trim()) missing.push("GOOGLE_SHEET_ID");
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()) {
    missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  }
  if (!process.env.GOOGLE_PRIVATE_KEY?.trim()) missing.push("GOOGLE_PRIVATE_KEY");
  return { configured: missing.length === 0, missing };
}

function quoteSheetName(name: string): string {
  if (/[^A-Za-z0-9_]/.test(name)) {
    return `'${name.replace(/'/g, "''")}'`;
  }
  return name;
}

function getSheetsConfigured(): boolean {
  return getGoogleSheetsConfigStatus().configured;
}

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetsClient(): sheets_v4.Sheets {
  return google.sheets({ version: "v4", auth: getAuthClient() });
}

export function isGoogleSheetsConfigured(): boolean {
  return getSheetsConfigured();
}

/** Append one row to the configured tab (column order must match row 1 headers). */
export async function appendRow(
  values: CellValue[],
  target?: SheetTarget,
): Promise<{ success: boolean; updatedRange: string | null | undefined }> {
  if (!getSheetsConfigured()) {
    throw new Error("Google Sheets env vars are not configured");
  }

  const sheets = getSheetsClient();
  const spreadsheetId = target?.spreadsheetId || process.env.GOOGLE_SHEET_ID;
  const sheetName =
    target?.sheetName || process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1";

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId!,
    range: `${quoteSheetName(sheetName)}!A:A`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });

  return {
    success: true,
    updatedRange: response.data.updates?.updatedRange,
  };
}
