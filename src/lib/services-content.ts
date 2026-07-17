export type ServiceFaq = { question: string; answer: string };

export type ServiceContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  path: string;
  keywords: string[];
  intro: string;
  whenToInstruct: string[];
  deliverables: string[];
  processSteps: { title: string; description: string }[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
};

export const servicesContent: Record<string, ServiceContent> = {
  "commercial-dispute-expert-witness": {
    slug: "commercial-dispute-expert-witness",
    title: "Commercial Dispute Expert Witness",
    metaTitle: "Commercial Dispute Expert Witness",
    metaDescription:
      "Independent commercial dispute expert witness services for legal professionals. Forensic accounting, quantum analysis and court-compliant expert reports.",
    path: "/services/commercial-dispute-expert-witness",
    keywords: [
      "commercial dispute expert witness",
      "forensic accountant commercial litigation",
    ],
    intro:
      "When a commercial dispute turns on financial evidence, courts and tribunals need an independent expert who can translate complex records into clear, defensible conclusions. Our commercial dispute expert witness service provides impartial forensic accounting analysis, quantum assessments and testimony designed for high-stakes litigation and arbitration.",
    whenToInstruct: [
      "Breach of contract claims where loss of profits or consequential loss is disputed",
      "Shareholder, partnership or post-acquisition disputes requiring valuation or damages quantification",
      "Business interruption or insurance claims with contested financial impact",
      "Professional negligence matters where financial quantum is central",
      "Cases requiring a Single Joint Expert or party-appointed expert under CPR Part 35",
    ],
    deliverables: [
      "Independent expert reports compliant with CPR Part 35 and Practice Direction 35",
      "Quantum schedules and damages models with transparent methodology",
      "Responses to questions, supplemental reports and rebuttal analysis",
      "Expert meetings, joint statements and oral testimony where required",
    ],
    processSteps: [
      { title: "Initial consultation", description: "Confidential discussion of case issues, scope, timetable and document requirements." },
      { title: "Analysis", description: "Rigorous review of financial records, contracts and industry context to form opinions." },
      { title: "Expert report", description: "Clear, structured report with statement of truth and declaration of duty to the court." },
      { title: "Testimony & support", description: "Deposition, arbitration hearing or trial attendance and ongoing counsel support as needed." },
    ],
    faqs: [
      {
        question: "Do you act for claimants and defendants?",
        answer:
          "Yes. We are instructed by both claimants and respondents, as party-appointed experts or Single Joint Experts, and maintain independence throughout.",
      },
      {
        question: "What jurisdictions do you cover?",
        answer:
          "We support litigation and arbitration across multiple jurisdictions. Forum, governing law and logistics are confirmed at instruction.",
      },
      {
        question: "How quickly can you produce an initial report?",
        answer:
          "Timelines depend on complexity and document volume. We confirm realistic deadlines at instruction and prioritise clear communication if scope evolves.",
      },
      {
        question: "What is the expert's duty?",
        answer:
          "Under CPR Part 35, the expert's duty is to the court (or tribunal), not to the instructing party. Our work reflects that obligation in every report and statement.",
      },
    ],
    relatedSlugs: ["loss-of-profits-quantum", "expert-reports-testimony", "litigation-support"],
  },
  "litigation-support": {
    slug: "litigation-support",
    title: "Litigation Support",
    metaTitle: "Litigation Support Forensic Accountant",
    metaDescription:
      "Privileged litigation support for legal teams: financial analysis, quantum assessment and cross-examination preparation without expert disclosure.",
    path: "/services/litigation-support",
    keywords: ["litigation support forensic accountant", "forensic accounting litigation support"],
    intro:
      "Not every financial engagement requires a disclosed expert. Litigation support allows your legal team to understand the numbers, test the opposing case and prepare strategy behind the scenes - work that remains privileged when properly structured.",
    whenToInstruct: [
      "Early case assessment before deciding whether to appoint an expert",
      "Preparation of cross-examination questions for the opposing financial witness",
      "Settlement negotiation support and without-prejudice quantum analysis",
      "Document review and identification of financial issues for pleadings",
      "Support where a separate expert witness will be appointed later",
    ],
    deliverables: [
      "Financial analysis and memoranda for the legal team",
      "Assessment of strengths and weaknesses in quantum claims",
      "Assistance drafting instructions to experts or responding to opponent reports",
      "Settlement modelling and scenario analysis",
    ],
    processSteps: [
      { title: "Scope agreement", description: "Define privileged advisory scope distinct from any expert witness role." },
      { title: "Document review", description: "Targeted analysis of accounts, contracts and disclosure." },
      { title: "Advisory output", description: "Clear written advice for counsel on financial issues and options." },
      { title: "Ongoing support", description: "Iteration through disclosure, expert exchange and settlement phases." },
    ],
    faqs: [
      {
        question: "What is the difference between litigation support and expert witness work?",
        answer:
          "Litigation support is typically privileged advisory work for the legal team. Expert witness work produces independent opinions disclosed to all parties under CPR Part 35. The same professional may perform both roles on a case, but they must be carefully separated.",
      },
      {
        question: "Can litigation support become expert witness work later?",
        answer:
          "Yes, with clear scope boundaries. Early advisory work should not compromise independence if a formal expert appointment follows.",
      },
      {
        question: "Who can instruct litigation support?",
        answer:
          "Solicitors, barristers and in-house counsel routinely instruct us. We do not provide legal advice - we provide financial analysis for your legal strategy.",
      },
      {
        question: "Is work product confidential?",
        answer:
          "Advisory work is structured to support legal professional privilege. Formal expert appointments follow separate terms and disclosure rules.",
      },
    ],
    relatedSlugs: ["commercial-dispute-expert-witness", "loss-of-profits-quantum"],
  },
  "loss-of-profits-quantum": {
    slug: "loss-of-profits-quantum",
    title: "Loss of Profits & Quantum",
    metaTitle: "Loss of Profits Expert Witness",
    metaDescription:
      "Loss of profits and quantum expert witness services for commercial litigation. Rigorous damages modelling for legal teams.",
    path: "/services/loss-of-profits-quantum",
    keywords: ["loss of profits expert witness", "quantum expert witness commercial dispute"],
    intro:
      "Loss of profits and broader quantum issues often decide the value of commercial claims. We build transparent damages models that withstand scrutiny from opponents, tribunals and courts - explaining not only the headline figure but the assumptions behind it.",
    whenToInstruct: [
      "Breach of contract claims alleging lost revenue or margin",
      "Tortious interference or unlawful competition affecting trading results",
      "Wasted expenditure and reliance loss alongside profit claims",
      "Contested but-for scenarios and mitigation arguments",
    ],
    deliverables: [
      "Lost profits / loss of earnings quantification with documented methodology",
      "Sensitivity analysis on key assumptions",
      "Critique of opposing quantum schedules",
      "Expert report and testimony on quantum issues",
    ],
    processSteps: [
      { title: "Issue framing", description: "Align quantum questions with legal cause of action and pleaded case." },
      { title: "Data gathering", description: "Management accounts, forecasts, industry data and comparator analysis." },
      { title: "Modelling", description: "But-for reconstruction, mitigation adjustments and present value where applicable." },
      { title: "Reporting", description: "Expert conclusions with clear linkage between evidence and figures." },
    ],
    faqs: [
      {
        question: "What records are typically required?",
        answer:
          "Management accounts, audited financials, budgets/forecasts, contracts, correspondence on mitigation, and industry benchmarks where relevant. We advise on proportionate requests at instruction.",
      },
      {
        question: "Do you quantify consequential loss?",
        answer:
          "Yes, where the case requires assessment of broader financial consequences beyond direct profit loss, subject to legal scope.",
      },
      {
        question: "Can you review the opposing expert's quantum?",
        answer:
          "Yes - critique and rebuttal of opposing schedules is a core part of many instructions.",
      },
      {
        question: "How do you handle uncertain future losses?",
        answer:
          "We document assumptions explicitly and, where appropriate, apply recognised approaches to contingencies and lost chance.",
      },
    ],
    relatedSlugs: ["breach-of-contract-damages", "business-interruption"],
  },
  "breach-of-contract-damages": {
    slug: "breach-of-contract-damages",
    title: "Breach of Contract Damages",
    metaTitle: "Breach of Contract Expert Witness Damages",
    metaDescription:
      "Expert witness damages analysis for breach of contract disputes. Financial quantification and forensic accounting for commercial litigation.",
    path: "/services/breach-of-contract-damages",
    keywords: ["breach of contract expert witness damages", "contract dispute forensic accountant"],
    intro:
      "Contract disputes frequently hinge on what the breach cost in financial terms - and whether claimed losses are recoverable, mitigated and properly evidenced. We help legal teams establish or challenge damages with methodical forensic analysis.",
    whenToInstruct: [
      "Supplier or customer contract breaches affecting performance or margin",
      "Service agreement failures with financial consequences",
      "Delayed delivery, defective performance or repudiation claims",
      "Disputes over contractual interpretation with quantum follow-on",
    ],
    deliverables: [
      "Damages quantification linked to pleaded breach theories",
      "Analysis of mitigation and causation from a financial perspective",
      "Contractual vs accounts-based reconciliation",
      "Expert evidence on financial impact",
    ],
    processSteps: [
      { title: "Contract review", description: "Financial obligations, pricing mechanisms and performance metrics." },
      { title: "Impact analysis", description: "Compare actual vs but-for performance using reliable data." },
      { title: "Recoverability assessment", description: "Align figures with legal heads of loss instructed by counsel." },
      { title: "Expert delivery", description: "Report and testimony as required." },
    ],
    faqs: [
      {
        question: "Do you advise on legal interpretation of contracts?",
        answer:
          "No. We analyse financial impact based on instructions and assumptions provided by your legal team.",
      },
      {
        question: "Can you assist before proceedings are issued?",
        answer:
          "Yes - early quantum advice often informs without-prejudice negotiation and strategy.",
      },
      {
        question: "What about international contracts?",
        answer:
          "We can support matters in court proceedings or arbitration; governing law and forum should be confirmed at instruction.",
      },
      {
        question: "Do you work with construction contracts?",
        answer:
          "Commercial contract quantum is within scope; highly technical delay analysis may require coordination with sector specialists.",
      },
    ],
    relatedSlugs: ["loss-of-profits-quantum", "commercial-dispute-expert-witness"],
  },
  "shareholder-partnership-disputes": {
    slug: "shareholder-partnership-disputes",
    title: "Shareholder & Partnership Disputes",
    metaTitle: "Shareholder Dispute Expert Witness",
    metaDescription:
      "Expert witness and valuation support for shareholder and partnership disputes. Forensic accounting for unfair prejudice and dissolution claims.",
    path: "/services/shareholder-partnership-disputes",
    keywords: ["shareholder dispute expert witness", "partnership dispute forensic accountant"],
    intro:
      "Shareholder and partnership disputes combine contentious relationships with complex valuations and historical financial reconstruction. We provide independent analysis of value, distributions, director conduct impacts and loss arising from oppressive or unfair behaviour.",
    whenToInstruct: [
      "Unfair prejudice petitions (s.994 Companies Act 2006)",
      "Partnership dissolution and account-taking",
      "Deadlock breakup and buy-out negotiations",
      "Disputed dividends, drawings and related-party transactions",
    ],
    deliverables: [
      "Business and share/partnership interest valuations for dispute context",
      "Financial analysis of alleged prejudicial conduct",
      "Expert reports on quantum of buy-out or loss",
      "Court or arbitration testimony",
    ],
    processSteps: [
      { title: "Structure mapping", description: "Cap table, partnership agreement and historical funding." },
      { title: "Financial reconstruction", description: "Accounts, distributions and related-party flows." },
      { title: "Valuation / loss", description: "Appropriate methodology for forum and case theory." },
      { title: "Reporting", description: "Independent expert output for disclosure." },
    ],
    faqs: [
      {
        question: "What valuation approaches do you use?",
        answer:
          "Approach depends on company characteristics, market evidence and instruction - DCF, earnings multiples, net assets or hybrid methods as appropriate.",
      },
      {
        question: "Minority discount issues?",
        answer:
          "We address minority/marketability considerations transparently where legally and factually relevant.",
      },
      {
        question: "Can you act as SJE?",
        answer:
          "Yes, subject to availability and conflict checks.",
      },
      {
        question: "Matrimonial overlap?",
        answer:
          "Our focus is commercial/shareholder disputes; matrimonial instructions are referred unless explicitly within scope.",
      },
    ],
    relatedSlugs: ["business-valuation", "commercial-dispute-expert-witness"],
  },
  "business-valuation": {
    slug: "business-valuation",
    title: "Business Valuation",
    metaTitle: "Business Valuation Expert Witness Litigation",
    metaDescription:
      "Business valuation expert witness for commercial litigation, arbitration and dispute resolution. Independent opinions for legal teams.",
    path: "/services/business-valuation",
    keywords: ["business valuation expert witness litigation", "company valuation dispute expert"],
    intro:
      "Valuation disputes demand defensible assumptions, market awareness and clear communication. We provide litigation-focused business and share valuations that tribunals and judges can follow - not opaque models.",
    whenToInstruct: [
      "Purchase price adjustment and earn-out disputes",
      "Shareholder buy-out and partnership exit valuations",
      "Breach of warranty claims with valuation elements",
      "IP or commercial tort claims affecting enterprise value",
    ],
    deliverables: [
      "Independent valuation reports for dispute forums",
      "Critique of opposing valuation experts",
      "Sensitivity and scenario analysis",
      "Oral evidence on valuation methodology",
    ],
    processSteps: [
      { title: "Valuation brief", description: "Standard of value, date and purpose aligned with legal instruction." },
      { title: "Information review", description: "Historical financials, forecasts, comparables and market data." },
      { title: "Method selection", description: "Documented rationale for chosen approaches." },
      { title: "Conclusion & report", description: "Clear opinion with limitations and assumptions stated." },
    ],
    faqs: [
      {
        question: "Do you provide tax valuations?",
        answer:
          "Our litigation valuations are dispute-focused; tax-specific opinions are scoped separately if required.",
      },
      {
        question: "Can you value intangible assets?",
        answer:
          "Yes, where data supports reliable analysis or instructions are limited to specific intangibles.",
      },
      {
        question: "How do you treat forecasts?",
        answer:
          "Forecasts are tested against historical performance, market conditions and management credibility.",
      },
      {
        question: "International businesses?",
        answer:
          "Cross-border groups can be analysed; currency and jurisdictional issues are addressed explicitly.",
      },
    ],
    relatedSlugs: ["shareholder-partnership-disputes", "commercial-dispute-expert-witness"],
  },
  "business-interruption": {
    slug: "business-interruption",
    title: "Business Interruption",
    metaTitle: "Business Interruption Expert Witness",
    metaDescription:
      "Business interruption expert witness and quantum analysis for insurance and commercial disputes. Forensic support for legal professionals.",
    path: "/services/business-interruption",
    keywords: ["business interruption expert witness", "BI claim forensic accountant"],
    intro:
      "Business interruption claims require careful separation of insured perils, policy wording constraints and actual financial impact. We quantify BI losses and consequential financial effects with transparent links between policy, facts and figures.",
    whenToInstruct: [
      "Insurance BI claims disputed by insurers",
      "Commercial disputes with interruption or supply chain loss components",
      "Property damage events with ongoing trading impact",
      "Contested mitigation and increased costs of working",
    ],
    deliverables: [
      "BI loss quantification and trend analysis",
      "Policy-period alignment and coverage framing (as instructed)",
      "Contrast with pre-loss and post-loss trading",
      "Expert reports for coverage or liability disputes",
    ],
    processSteps: [
      { title: "Policy & peril framing", description: "Work within legal team's coverage analysis." },
      { title: "Financial baseline", description: "Establish pre-loss performance benchmarks." },
      { title: "Loss period analysis", description: "Quantify reduced turnover, margin and extra expense." },
      { title: "Reporting", description: "Independent expert conclusions." },
    ],
    faqs: [
      {
        question: "Are you loss adjusters?",
        answer:
          "No - we provide independent expert and forensic accounting opinions for legal proceedings, not insurer adjustment.",
      },
      {
        question: "COVID-related BI?",
        answer:
          "Historical BI matters may be instructed where legally live; scope confirmed at enquiry.",
      },
      {
        question: "Consequential loss overlap?",
        answer:
          "We coordinate analysis with broader consequential loss claims where both arise.",
      },
      {
        question: "Industry benchmarks?",
        answer:
          "Used where appropriate to test claimed losses against external indicators.",
      },
    ],
    relatedSlugs: ["loss-of-profits-quantum", "breach-of-contract-damages"],
  },
  "professional-negligence": {
    slug: "professional-negligence",
    title: "Professional Negligence",
    metaTitle: "Professional Negligence Forensic Accountant",
    metaDescription:
      "Financial quantum in professional negligence claims. Forensic accounting expert witness for legal teams handling accountant, adviser and corporate negligence disputes.",
    path: "/services/professional-negligence",
    keywords: ["professional negligence forensic accountant", "accountant negligence expert witness"],
    intro:
      "Professional negligence claims against accountants, advisers and corporate professionals often require an independent view of what the financial position would have been but for the alleged breach. We quantify loss of chance, wasted costs and downstream financial harm.",
    whenToInstruct: [
      "Accountant or auditor negligence affecting financial outcomes",
      "Corporate finance or transaction advice claims",
      "Tax or structuring advice with quantifiable loss",
      "Respondent defence of quantum in professional negligence litigation",
    ],
    deliverables: [
      "Counterfactual financial modelling",
      "Loss of chance quantification where appropriate",
      "Expert reports on standard of care financial consequences (quantum only)",
      "Joint expert and court processes",
    ],
    processSteps: [
      { title: "Allegation mapping", description: "Link financial issues to pleaded negligence." },
      { title: "But-for analysis", description: "Model alternative outcomes supported by evidence." },
      { title: "Quantum", description: "Monetise loss with explicit assumptions." },
      { title: "Disclosure", description: "Expert report and testimony." },
    ],
    faqs: [
      {
        question: "Do you opine on professional standard of care?",
        answer:
          "We address financial quantum; professional duty is a matter for legal and professional experts unless dual qualification is instructed.",
      },
      {
        question: "Accountant negligence experience?",
        answer:
          "Forensic review of workpapers, audits and management accounts is core to many instructions.",
      },
      {
        question: "Limitation periods?",
        answer:
          "Legal teams advise on limitation; we focus on analysable financial periods.",
      },
      {
        question: "Insurance layer involvement?",
        answer:
          "We can coordinate with MGA/insurer panels when instructed by coverage counsel.",
      },
    ],
    relatedSlugs: ["loss-of-profits-quantum", "litigation-support"],
  },
  "expert-reports-testimony": {
    slug: "expert-reports-testimony",
    title: "Expert Reports & Testimony",
    metaTitle: "CPR Part 35 Expert Report Forensic Accountant",
    metaDescription:
      "CPR Part 35 compliant expert reports, joint statements and court testimony from a commercial dispute forensic accounting expert witness.",
    path: "/services/expert-reports-testimony",
    keywords: ["CPR Part 35 expert report forensic accountant", "expert witness report commercial"],
    intro:
      "The expert report is the foundation of financial expert evidence. We prepare structured, readable reports that comply with CPR Part 35 and Practice Direction 35 - and we attend court, arbitration and expert meetings when testimony is required.",
    whenToInstruct: [
      "Need for first expert report on quantum or forensic accounting issues",
      "Reply or rebuttal to opponent expert",
      "Pre-trial expert meetings and joint statements",
      "Trial or arbitration hearing testimony",
    ],
    deliverables: [
      "Primary and supplemental expert reports",
      "Answers to questions under Part 35",
      "Joint statements following expert meetings",
      "Oral evidence and hot-tub support where ordered",
    ],
    processSteps: [
      { title: "Instructions", description: "Letter of instruction, documents and questions for the expert." },
      { title: "Draft & review", description: "Internal quality review before disclosure." },
      { title: "Exchange", description: "Compliance with court timetable and PD requirements." },
      { title: "Hearing", description: "Preparation for cross-examination and oral evidence." },
    ],
    faqs: [
      {
        question: "What must a CPR Part 35 report include?",
        answer:
          "Reports must include the expert's qualifications, scope, documents relied upon, opinions, statement of truth and declaration of duty to the court, among other requirements in PD 35.",
      },
      {
        question: "Can you attend expert meetings?",
        answer:
          "Yes - we regularly participate in experts' meetings and prepare joint statements.",
      },
      {
        question: "Arbitration reports differ?",
        answer:
          "Tribunal rules vary; we adapt format to institutional rules while maintaining independence.",
      },
      {
        question: "Expedited reports?",
        answer:
          "Urgent timetables can be accommodated subject to resource availability - discuss at instruction.",
      },
    ],
    relatedSlugs: ["commercial-dispute-expert-witness", "arbitration-mediation"],
  },
  "arbitration-mediation": {
    slug: "arbitration-mediation",
    title: "Arbitration & Mediation",
    metaTitle: "Arbitration Expert Witness Forensic Accounting",
    metaDescription:
      "Expert witness and quantum support for commercial arbitration and mediation. LCIA, ICC and ad hoc proceedings - forensic accounting for legal teams.",
    path: "/services/arbitration-mediation",
    keywords: ["arbitration expert witness forensic accounting", "mediation quantum expert"],
    intro:
      "International and domestic arbitration, together with commercial mediation, often turn on the same financial questions as court litigation - with different procedural rules and timetables. We adapt expert evidence to arbitral institutions and mediation settings while maintaining independence.",
    whenToInstruct: [
      "LCIA, ICC, SIAC or ad hoc arbitration with financial quantum issues",
      "Mediation requiring independent quantum opinion or sensitivity analysis",
      "Emergency arbitrator applications with financial components",
      "Enforcement or challenge proceedings with damages elements",
    ],
    deliverables: [
      "Arbitral-format expert reports and witness statements",
      "Tribunal hearing testimony and cross-examination",
      "Mediation briefing papers and scenario quantum (as scoped)",
      "Support for counsel on financial aspects of settlement",
    ],
    processSteps: [
      { title: "Procedural alignment", description: "Confirm rules, seat, language and timetable." },
      { title: "Financial analysis", description: "Same rigour as court proceedings with forum-appropriate format." },
      { title: "Exchange", description: "Compliance with procedural orders." },
      { title: "Hearing", description: "Oral evidence before tribunal or mediator-supported negotiation." },
    ],
    faqs: [
      {
        question: "Which arbitral seats do you support?",
        answer:
          "London-seated arbitrations are common in our practice; other seats can be discussed at instruction.",
      },
      {
        question: "Do you act as arbitrator?",
        answer:
          "We provide expert evidence, not arbitration appointment, unless separately agreed for neutral quantum roles.",
      },
      {
        question: "Mediation without full expert appointment?",
        answer:
          "Limited quantum briefings for mediation can be scoped as advisory or expert opinion work.",
      },
      {
        question: "Multi-party arbitrations?",
        answer:
          "Experience includes multi-party disputes; conflict checks apply to all appointments.",
      },
    ],
    relatedSlugs: ["expert-reports-testimony", "commercial-dispute-expert-witness"],
  },
};

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return servicesContent[slug];
}

export const allServiceSlugs = Object.keys(servicesContent);
