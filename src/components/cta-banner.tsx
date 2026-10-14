import Link from "next/link";
import { Mark } from "@/components/brand";

export function CTABanner({
  title = "Need a commercial dispute expert witness?",
  description = "Submit a confidential enquiry with the dispute type, forum and timetable.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-burgundy text-white">
      <Mark
        className="pointer-events-none absolute -bottom-10 right-6 hidden h-56 w-auto opacity-25 sm:block"
        bracket="#03263B"
        chevron="#F4EFE8"
      />
      <div className="relative mx-auto flex min-w-0 max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="min-w-0 max-w-2xl">
          <h2 className="text-2xl font-extrabold break-words sm:text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">{description}</p>
        </div>
        <Link
          href="/contact"
          className="chevron-r inline-flex min-h-[52px] shrink-0 items-center justify-center bg-white pl-7 pr-12 text-sm font-bold text-navy transition hover:bg-cream lg:mr-48"
          style={{ ["--tip" as string]: "18px" }}
        >
          Submit enquiry
        </Link>
      </div>
    </section>
  );
}
