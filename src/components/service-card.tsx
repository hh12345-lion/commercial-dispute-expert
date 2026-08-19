import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
};

export function ServiceCard({ title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[44px] flex-col rounded-lg border border-border bg-surface p-6 transition hover:border-brand-accent/40 hover:shadow-sm"
    >
      <h3 className="font-semibold break-words text-charcoal group-hover:text-brand-accent">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{description}</p>
      <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-accent">
        Learn more →
      </span>
    </Link>
  );
}
