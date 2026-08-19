import { cn } from "@/lib/utils";

export function ContentSection({
  children,
  alt = false,
  className,
}: {
  children: React.ReactNode;
  alt?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("py-12 sm:py-14 md:py-16", alt ? "bg-muted" : "bg-background", className)}>
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
