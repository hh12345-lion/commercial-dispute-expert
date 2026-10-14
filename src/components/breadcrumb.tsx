import Link from "next/link";
import { BreadcrumbListJsonLd } from "@/components/json-ld";
import { Chevron } from "@/components/brand";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({
  items,
  currentPath,
}: {
  items: BreadcrumbItem[];
  /** Canonical path for the current page (for BreadcrumbList JSON-LD) */
  currentPath: string;
}) {
  return (
    <>
      <BreadcrumbListJsonLd items={items} currentPath={currentPath} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink/70">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <Chevron className="h-2 w-auto shrink-0 text-burgundy" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-navy hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-[min(100%,16rem)] truncate font-semibold text-navy sm:max-w-sm md:max-w-md"
                  aria-current="page"
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
