import { FORENSIC_INDUSTRY_STATS } from "@/lib/industry-stats";

export function StatsTable() {
  return (
    <div className="min-w-0">
      {/* Desktop / tablet: scrollable table if needed */}
      <div className="-mx-4 hidden overflow-x-auto px-4 sm:mx-0 sm:px-0 md:block">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <caption className="mb-3 text-left text-sm font-medium text-charcoal">
            Commercial dispute expert witness: indicative UK market fees and court frameworks
          </caption>
          <thead>
            <tr className="border-b border-border bg-white">
              <th className="px-3 py-3 font-semibold text-charcoal sm:px-4">Metric</th>
              <th className="px-3 py-3 font-semibold text-charcoal sm:px-4">Figure</th>
              <th className="px-3 py-3 font-semibold text-charcoal sm:px-4">Source</th>
            </tr>
          </thead>
          <tbody>
            {FORENSIC_INDUSTRY_STATS.map(([metric, figure, source]) => (
              <tr key={metric} className="border-b border-border">
                <td className="px-3 py-3 text-foreground sm:px-4">{metric}</td>
                <td className="px-3 py-3 font-medium text-charcoal sm:px-4">{figure}</td>
                <td className="px-3 py-3 text-foreground/80 sm:px-4">{source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards (no horizontal scroll) */}
      <div className="space-y-3 md:hidden">
        <p className="text-sm font-medium text-charcoal">
          Commercial dispute expert witness: indicative UK market fees and court frameworks
        </p>
        {FORENSIC_INDUSTRY_STATS.map(([metric, figure, source]) => (
          <div
            key={metric}
            className="rounded-lg border border-border bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-semibold text-charcoal">{metric}</p>
            <p className="mt-2 text-base font-medium text-charcoal">{figure}</p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/80">{source}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
        Sources: Expert Evidence International; Civil Procedure Rules Part 35 (English law, where applicable).
        Rates are indicative UK market benchmarks only — not a quote from Commercial Dispute Expert.
        Actual fees vary by case complexity and expert seniority.
      </p>
    </div>
  );
}
