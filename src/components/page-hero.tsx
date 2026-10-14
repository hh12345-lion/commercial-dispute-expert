import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/breadcrumb";
import { ChevronPhoto } from "@/components/brand";
import type { Photo } from "@/lib/images";

/**
 * Inner-page hero: the title leads, the trail sits beneath the introduction,
 * and the photograph points forward like the mark's chevron.
 */
export function PageHero({
  title,
  intro,
  crumbs,
  currentPath,
  photo,
  children,
}: {
  title: string;
  intro?: ReactNode;
  crumbs: BreadcrumbItem[];
  currentPath: string;
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-cream">
      <div
        className={`mx-auto grid min-w-0 max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:items-center lg:px-8 lg:py-20 ${
          photo ? "lg:grid-cols-[1.15fr_0.85fr]" : ""
        }`}
      >
        <div className="min-w-0">
          <h1 className="text-3xl font-extrabold leading-[1.1] text-navy break-words sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {intro ? (
            <div className="mt-5 max-w-2xl text-base leading-relaxed text-ink/85 sm:text-lg">{intro}</div>
          ) : null}
          {children}
          <div className="mt-8">
            <Breadcrumb items={crumbs} currentPath={currentPath} />
          </div>
        </div>
        {photo ? (
          <ChevronPhoto
            photo={photo}
            priority
            className="ml-3 w-full max-w-md justify-self-center lg:max-w-none"
            sizes="(max-width: 1024px) 90vw, 440px"
          />
        ) : null}
      </div>
    </section>
  );
}
