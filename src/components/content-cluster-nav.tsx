import Link from "next/link";
import { Chevron } from "@/components/brand";

const clusters = [
  { href: "/services", label: "Expert witness services" },
  { href: "/case-types", label: "Case types requiring an expert" },
  { href: "/insights", label: "Insights for legal professionals" },
  { href: "/how-to-instruct", label: "How to instruct" },
  { href: "/contact", label: "Instruct an expert witness" },
] as const;

export function ContentClusterNav() {
  return (
    <nav
      aria-label="Explore our expert witness resources"
      className="border-l-4 border-navy bg-cream p-6 sm:p-8"
    >
      <h2 className="text-xl font-extrabold text-navy">Explore our expert witness resources</h2>
      <ul className="mt-5 space-y-3">
        {clusters.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="group inline-flex items-center gap-3 font-semibold text-navy hover:text-burgundy">
              <Chevron className="h-2.5 w-auto text-burgundy transition group-hover:translate-x-1" />
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
