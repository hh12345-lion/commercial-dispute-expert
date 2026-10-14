import { Chevron } from "@/components/brand";
import type { ServiceFaq } from "@/lib/services-content";

/** Native disclosures: every answer is in the server-rendered HTML. */
export function FAQAccordion({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((faq, index) => (
        <details key={faq.question} open={index === 0} className="group">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-start gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <Chevron className="mt-1.5 h-3 w-auto shrink-0 text-burgundy transition-transform group-open:rotate-90" />
            <span className="min-w-0 flex-1 break-words font-heading text-base font-bold text-navy sm:text-lg">
              {faq.question}
            </span>
          </summary>
          <p className="pb-6 pl-7 leading-relaxed text-ink/85">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
