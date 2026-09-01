/**
 * Verifies form pipeline payloads and optionally live endpoints.
 * Run: npx tsx scripts/verify-form-pipeline.ts
 * Live test: npx tsx scripts/verify-form-pipeline.ts --live
 */
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const WEBHOOK_KEYS = [
  "Full Name",
  "Email",
  "Phone Number",
  "Brand name",
  "domain",
] as const;

const SHEET_HEADERS = [
  "Timestamp",
  "Brand",
  "Form Type",
  "Full Name",
  "Email",
  "Phone Number",
  "Law Firm",
  "Case Type",
  "Message",
];

async function verifyPayloadShapes() {
  const { buildLeadWebhookBody, BRAND_NAME } = await import("../src/lib/leadNotification");
  const { buildLeadSheetRow, LEAD_SHEET_HEADERS, resolveFormTypeLabel } =
    await import("../src/lib/lead-sheet");
  const { getSiteDomain } = await import("../src/lib/seo");

  const webhook = buildLeadWebhookBody({
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555 0100",
  });

  const webhookKeys = Object.keys(webhook).sort();
  const expectedKeys = [...WEBHOOK_KEYS].sort();

  if (JSON.stringify(webhookKeys) !== JSON.stringify(expectedKeys)) {
    throw new Error(
      `Webhook keys mismatch.\nExpected: ${expectedKeys.join(", ")}\nGot: ${webhookKeys.join(", ")}`,
    );
  }

  if (webhook["Brand name"] !== BRAND_NAME) {
    throw new Error(`Brand name should be "${BRAND_NAME}"`);
  }

  const domain = getSiteDomain();
  if (!domain || domain.includes("://") || domain.startsWith("www.")) {
    throw new Error(`Invalid domain: ${domain}`);
  }
  if (webhook.domain !== domain) {
    throw new Error(`domain field mismatch: ${webhook.domain} vs ${domain}`);
  }

  if (LEAD_SHEET_HEADERS.join("|") !== SHEET_HEADERS.join("|")) {
    throw new Error("Sheet header order does not match docs");
  }

  const contactRow = buildLeadSheetRow({
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555 0100",
    lawFirm: "",
    formType: "contact",
    caseType: "",
    message: "Hello",
  });

  const instructRow = buildLeadSheetRow({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "",
    lawFirm: "",
    formType: "instruct",
    caseType: "",
    message: "Instruct test",
  });

  if (contactRow.length !== SHEET_HEADERS.length) {
    throw new Error(`Contact row length ${contactRow.length}, expected ${SHEET_HEADERS.length}`);
  }

  if (resolveFormTypeLabel("contact") !== "Contact") {
    throw new Error("Form Type label for contact should be Contact");
  }
  if (resolveFormTypeLabel("instruct") !== "Instruct") {
    throw new Error("Form Type label for instruct should be Instruct");
  }
  if (contactRow[2] !== "Contact" || instructRow[2] !== "Instruct") {
    throw new Error("Form Type column values incorrect");
  }

  console.log("✅ Payload shapes OK");
  console.log("   Webhook sample:", JSON.stringify(webhook, null, 2));
  console.log("   Sheet contact row cols:", contactRow.length);
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolvePromise, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolvePromise(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function withMockWebhook<T>(
  fn: (url: string, received: () => unknown | undefined) => Promise<T>,
): Promise<T> {
  let lastBody: unknown;

  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST") {
      const raw = await readBody(req);
      lastBody = JSON.parse(raw);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    res.writeHead(405);
    res.end();
  });

  await new Promise<void>((resolvePromise) => server.listen(0, "127.0.0.1", resolvePromise));
  const addr = server.address();
  if (!addr || typeof addr === "string") throw new Error("Could not bind mock server");
  const url = `http://127.0.0.1:${addr.port}/webhook`;

  try {
    process.env.Lead_notification_url = url;
    process.env.NEXT_PUBLIC_SITE_URL = "https://commercialdisputeexpert.com";
    return await fn(url, () => lastBody);
  } finally {
    await new Promise<void>((resolvePromise, reject) =>
      server.close((err) => (err ? reject(err) : resolvePromise())),
    );
  }
}

async function verifyNotifyLeadWebhook() {
  await withMockWebhook(async (_url, received) => {
    const { notifyLeadWebhook } = await import("../src/lib/leadNotification");
    const result = await notifyLeadWebhook({
      fullName: "Pipeline Test",
      email: "pipeline-test@example.com",
      phone: "",
    });

    if (!result.ok) throw new Error(`notifyLeadWebhook failed: ${result.error}`);

    const body = received() as Record<string, string> | undefined;
    if (!body) throw new Error("Mock webhook received no body");

    for (const key of WEBHOOK_KEYS) {
      if (!(key in body)) throw new Error(`Mock webhook missing key: ${key}`);
    }

    if (body.domain !== "commercialdisputeexpert.com") {
      throw new Error(`Mock webhook domain wrong: ${body.domain}`);
    }

    console.log("✅ notifyLeadWebhook delivered 5-key JSON to mock n8n");
    console.log("   Received:", JSON.stringify(body));
  });
}

async function verifyLiveRoutes(baseUrl: string) {
  const submitRes = await fetch(`${baseUrl}/api/submit-lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Live Test",
      email: "live-test@example.com",
      phone: "",
      formType: "contact",
    }),
  });

  const submitJson = await submitRes.json().catch(() => ({}));
  console.log(`   POST /api/submit-lead → ${submitRes.status}`, submitJson);

  const instructRes = await fetch(`${baseUrl}/api/instruct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Live Test",
      email: "live-test@example.com",
      phone: "",
      message: "Sheets live test",
      formType: "contact",
    }),
  });

  const instructJson = await instructRes.json().catch(() => ({}));
  console.log(`   POST /api/instruct → ${instructRes.status}`, instructJson);

  return { submitRes, instructRes, submitJson, instructJson };
}

async function checkEnvConfigured() {
  const { isGoogleSheetsConfigured } = await import("../src/lib/google-sheets");
  const { getLeadWebhookUrl } = await import("../src/lib/leadNotification");

  const webhook = Boolean(getLeadWebhookUrl());
  const sheets = isGoogleSheetsConfigured();
  const resend = Boolean(process.env.RESEND_API_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "(not set — using siteConfig fallback)";

  console.log("\n📋 Environment (values hidden):");
  console.log(`   Lead_notification_url: ${webhook ? "✅ set" : "❌ missing"}`);
  console.log(`   Google Sheets:         ${sheets ? "✅ configured" : "⚠️  not configured (soft-fail)"}`);
  console.log(`   RESEND_API_KEY:        ${resend ? "✅ set" : "⚠️  missing (soft-fail, logs only)"}`);
  console.log(`   NEXT_PUBLIC_SITE_URL:  ${siteUrl}`);

  return { webhook, sheets, resend };
}

async function main() {
  const live = process.argv.includes("--live");
  console.log("=== Form pipeline verification ===\n");

  await verifyPayloadShapes();
  await verifyNotifyLeadWebhook();
  const env = await checkEnvConfigured();

  if (env.sheets) {
    try {
      const { appendLeadToGoogleSheet } = await import("../src/lib/lead-sheet");
      await appendLeadToGoogleSheet({
        fullName: "Pipeline Verify Test",
        email: "verify-test@example.com",
        phone: "",
        lawFirm: "",
        formType: "contact",
        caseType: "",
        message: "Safe to delete — scripts/verify-form-pipeline.ts",
      });
      console.log("✅ Google Sheets write succeeded");
    } catch (error) {
      console.error("❌ Google Sheets write failed:", error);
      process.exitCode = 1;
    }
  } else {
    console.log("⚠️  Skipping live Google Sheets write (env not configured locally)");
  }

  if (live) {
    const baseUrl = process.env.VERIFY_BASE_URL || "http://localhost:3000";
    console.log(`\n🌐 Live route test against ${baseUrl}`);
    try {
      const result = await verifyLiveRoutes(baseUrl);
      if (!result.submitRes.ok && result.submitJson?.error === "WEBHOOK_MISSING") {
        console.log("⚠️  /api/submit-lead returns 503 without Lead_notification_url (expected locally)");
      } else if (result.submitRes.ok) {
        console.log("✅ /api/submit-lead OK");
      }
      if (result.instructRes.ok) {
        console.log(
          result.instructJson.writtenToSheet
            ? "✅ /api/instruct wrote to Google Sheets"
            : "⚠️  /api/instruct OK but Sheets not written (env missing or soft-fail)",
        );
      }
    } catch (error) {
      console.error("❌ Live route test failed — is the dev server running?", error);
      process.exitCode = 1;
    }
  }

  console.log("\n=== Summary ===");
  if (!env.webhook) {
    console.log("❌ Forms will FAIL on submit until Lead_notification_url is set in Netlify.");
  } else {
    console.log("✅ Webhook URL configured — n8n path should work when deployed.");
  }
  if (!env.sheets) {
    console.log("⚠️  Google Sheets not configured locally — rows skip until Netlify env is set.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
