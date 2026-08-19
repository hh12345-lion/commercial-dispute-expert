/** Trust and process content — no pricing or fee benchmarks. */

export const TRUST_POINTS = [
  "Credentialed experts: CPA, CFF, ASA, CFA and forensic accounting specialists",
  "Daubert-ready reports and testimony",
  "Experience in state and federal courts and arbitration",
  "Party-appointed and jointly retained expert appointments",
  "Litigation support and disclosed expert roles clearly separated",
  "SME to mid-market and complex corporate disputes",
  "Sector coverage across professional services, manufacturing, retail and technology",
] as const;

export const PROCESS_STEPS = [
  {
    title: "Confidential enquiry",
    description:
      "Share dispute type, forum and timetable. We assess conflicts and availability before introduction.",
  },
  {
    title: "Expert matching",
    description:
      "We introduce a qualified forensic accountant or financial expert suited to your matter.",
  },
  {
    title: "Engagement",
    description:
      "Scope, deliverables and reporting format agreed in writing before work begins.",
  },
] as const;
