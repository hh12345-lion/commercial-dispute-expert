import { siteConfig } from "@/config/site";
import { Scale, Shield, FileCheck } from "lucide-react";

const icons = [Scale, Shield, FileCheck];

export function TrustBar() {
  const items = [
    { label: "Years of practice", value: siteConfig.trustMetrics.yearsPractice },
    { label: "Expert instructions", value: siteConfig.trustMetrics.expertInstructions },
    { label: "Regulation", value: siteConfig.trustMetrics.regulated },
  ];

  return (
    <section className="border-y border-border bg-muted py-10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item, i) => {
          const Icon = icons[i] ?? Scale;
          return (
            <div key={item.label} className="flex items-start gap-4 text-center sm:text-left">
              <Icon className="mt-1 h-8 w-8 shrink-0 text-brand-accent" aria-hidden />
              <div>
                <p className="text-2xl font-bold text-charcoal">{item.value}</p>
                <p className="text-sm text-foreground">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
