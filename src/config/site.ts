/**
 * Central site configuration.
 * Add company number, phone, address, LinkedIn and testimonials when verified details are available.
 */

export const siteConfig = {
  businessName: "Commercial Dispute Expert",
  legalEntityName: "Commercial Dispute Expert",
  companyNumber: "",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://commercialdisputeexpert.com",
  brandShort: "CommercialDisputeExpert",
  tagline: "Commercial disputes. Financial clarity. Court-ready evidence.",
  connectorPitch:
    "CommercialDisputeExpert.com connects legal professionals, counsel and law firms worldwide with qualified commercial dispute expert witnesses — forensic accounting, quantum analysis and court-ready expert reports under English law and international forums.",
  description:
    "We connect legal professionals with independent commercial dispute expert witnesses and forensic accountants for litigation and arbitration. Not a law firm - we do not provide legal advice.",

  expert: {
    slug: "network",
    name: "Commercial Dispute Expert network",
    title: "Commercial Dispute Expert Witness",
    credentials: [] as string[],
    jurisdictions: ["Courts and tribunals", "International arbitration"],
    yearsExperience: "",
    expertAppointments: "",
    bioSummary: "",
    photoPath: "/images/expert-placeholder.jpg",
  },

  contact: {
    phone: "",
    phoneTel: "",
    email: "contact@commercialdisputeexpert.com",
    address: {
      line1: "",
      line2: "",
      country: "",
    },
  },

  regulatoryBodies: ["Independent forensic accountants and commercial dispute expert witnesses"],

  trustMetrics: {
    yearsPractice: "Established network",
    expertInstructions: "Multi-sector experience",
    regulated: "Qualified forensic accountants",
  },

  socialLinks: {
    linkedin: "",
  },

  testimonials: [] as {
    quote: string;
    author: string;
    role: string;
    firm: string;
  }[],

  navigation: {
    resources: [
      { href: "/insights", label: "Insights" },
      { href: "/how-to-instruct", label: "How to Instruct" },
      { href: "/about", label: "About" },
    ],
    services: [
      {
        title: "Commercial Dispute Expert Witness",
        href: "/services/commercial-dispute-expert-witness",
        description: "Core expert witness appointments for commercial litigation.",
      },
      {
        title: "Litigation Support",
        href: "/services/litigation-support",
        description: "Privileged advisory work behind the scenes for legal teams.",
      },
      {
        title: "Loss of Profits & Quantum",
        href: "/services/loss-of-profits-quantum",
        description: "Quantification of financial loss and damages.",
      },
      {
        title: "Breach of Contract Damages",
        href: "/services/breach-of-contract-damages",
        description: "Contractual breach and consequential loss analysis.",
      },
      {
        title: "Shareholder & Partnership Disputes",
        href: "/services/shareholder-partnership-disputes",
        description: "Corporate and ownership dispute valuations.",
      },
      {
        title: "Business Valuation",
        href: "/services/business-valuation",
        description: "Valuations for litigation and dispute resolution.",
      },
      {
        title: "Business Interruption",
        href: "/services/business-interruption",
        description: "BI claims and interruption loss quantification.",
      },
      {
        title: "Professional Negligence",
        href: "/services/professional-negligence",
        description: "Financial quantum in professional negligence matters.",
      },
      {
        title: "Expert Reports & Testimony",
        href: "/services/expert-reports-testimony",
        description: "CPR Part 35 reports, joint statements and court attendance.",
      },
      {
        title: "Arbitration & Mediation",
        href: "/services/arbitration-mediation",
        description: "Expert evidence in ADR forums.",
      },
    ],
  },
} as const;

export type ServiceNavItem = (typeof siteConfig.navigation.services)[number];
