"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { siteConfig } from "@/config/site";

type ContactFormProps = {
  formType?: "contact" | "instruct";
  title?: string;
};

/**
 * On submit: webhook primary (/api/submit-lead), soft-fail email, soft-fail Sheets
 * (/api/instruct) on one shared tab with Form Type.
 */
export function ContactForm({ formType = "contact", title }: ContactFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <form
      className="relative min-w-0 space-y-5"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setPending(true);

        const form = e.currentTarget;
        const fd = new FormData(form);

        const fullName = String(fd.get("name") ?? "").trim();
        const email = String(fd.get("email") ?? "").trim();
        const phone = String(fd.get("phone") ?? "").trim();
        const message = String(fd.get("message") ?? "").trim();
        const resolvedFormType = String(fd.get("formType") ?? "contact").trim() as
          | "contact"
          | "instruct";

        if (!fullName || !email) {
          setError("Please enter your name and email.");
          setPending(false);
          return;
        }

        try {
          // Webhook primary — hard-fail only if notification endpoint rejects.
          const webhookRes = await fetch("/api/submit-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName,
              email,
              phone: phone || "",
              formType: resolvedFormType,
            }),
          });

          if (!webhookRes.ok) {
            setError("Unable to send your enquiry. Please try again or email us.");
            setPending(false);
            return;
          }

          // Soft-fail email (server action never blocks on Resend failure).
          const emailResult = await submitContactForm(fd);
          if (!emailResult.ok) {
            setError(emailResult.message);
            setPending(false);
            return;
          }

          // Soft-fail Sheets — one shared tab + Form Type for contact and instruct.
          void fetch("/api/instruct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName,
              email,
              phone: phone || "",
              message,
              formType: resolvedFormType,
            }),
          }).catch(() => {});

          router.push(emailResult.thankYouPath);
        } catch {
          setError("Network error. Check your connection and try again.");
          setPending(false);
        }
      }}
    >
      <input type="hidden" name="formType" value={formType} />
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {title ? (
        <h2 className="text-xl font-bold break-words text-charcoal sm:text-2xl">{title}</h2>
      ) : null}

      {error ? (
        <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-900">
          {error}{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-brand-accent underline"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal">
          Your name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-3 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-3 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal">
          Phone <span className="font-normal text-foreground/60">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-3 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal">
          Message <span className="font-normal text-foreground/60">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={
            formType === "instruct"
              ? "Brief overview of the dispute and timetable…"
              : "How can we help?"
          }
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-3 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-charcoal px-6 py-4 font-medium text-white hover:bg-charcoal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 disabled:opacity-50 sm:w-auto"
      >
        {pending ? "Sending…" : formType === "instruct" ? "Submit enquiry" : "Send message"}
      </button>
    </form>
  );
}
