"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  formType: z.enum(["contact", "instruct"]).optional(),
  website: z.string().max(0).optional(),
});

export type ContactSubmitResult =
  | { ok: true; thankYouPath: string; skipped?: boolean }
  | { ok: false; message: string };

/**
 * Soft-fail email via Resend (or logs in dev).
 * Lead webhook is primary and is fired client-side via /api/submit-lead.
 */
export async function submitContactForm(formData: FormData): Promise<ContactSubmitResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    message: formData.get("message") ?? "",
    formType: formData.get("formType") ?? "contact",
    website: formData.get("website") ?? "",
  };

  const thankYouPath =
    raw.formType === "instruct" ? "/thank-you?type=instruct" : "/thank-you";

  if (raw.website) {
    return { ok: true, thankYouPath, skipped: true };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return { ok: false, message: first };
  }

  const data = parsed.data;
  const recipient = process.env.CONTACT_EMAIL ?? "contact@commercialdisputeexpert.com";
  const subject = `[${data.formType === "instruct" ? "Instruction" : "Contact"}] ${data.name}`;

  const body = `
New enquiry from commercialdisputeexpert.com

Type: ${data.formType}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}

Message:
${data.message?.trim() || "(none provided)"}
`.trim();

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [recipient],
          reply_to: data.email,
          subject,
          text: body,
        }),
      });
      if (!res.ok) {
        console.error("Resend error (soft-fail):", await res.text());
      }
    } catch (e) {
      console.error("Resend fetch failed (soft-fail):", e);
    }
  } else {
    console.info("[Contact form submission]", { subject, body });
  }

  // Soft-fail email: validation passed → treat as success so webhook path is not blocked.
  return { ok: true, thankYouPath };
}
