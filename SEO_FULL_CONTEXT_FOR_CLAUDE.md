# Complete SEO context for CommercialDisputeExpert.com

This document is a self-contained SEO handoff for another AI or developer. It describes the repository's current SEO implementation, content inventory, metadata, keywords, headings, structured data, internal linking, crawl controls, analytics, generation scripts, verification checks, known gaps, and operational rules.

Snapshot:

- Repository: `commercial-dispute-expert`
- Snapshot commit: `fe77fde0d9299cf998570677442d8437009063be`
- Snapshot commit message: `Remove fees and experts pages and broaden site positioning.`
- Framework: Next.js `16.2.6`, App Router, React `19.2.4`, TypeScript, Tailwind CSS v4
- Canonical production origin: `https://commercialdisputeexpert.com`
- Public sitemap entries: 30
- Primary language declaration: `en`
- Contact email: `contact@commercialdisputeexpert.com`
- Current positioning: region-neutral connector between legal professionals and independent commercial dispute expert witnesses. It is not positioned as a law firm.
- Important qualification: jurisdiction-specific material still exists where it describes CPR Part 35, Practice Direction 35, the Companies Act 2006, the ICO, or London-seated arbitration. These are topical/service details, not the global geographic positioning.

## 1. SEO source-of-truth map

Core implementation files:

- `src/lib/seo.ts`
  - Builds canonical URLs and all standard page metadata.
  - Exports `absoluteUrl()`, `buildMetadata()`, `buildNotFoundMetadata()`, and `defaultKeywords`.
- `src/lib/seo/publicUrlInventory.ts`
  - Source of truth for sitemap URLs.
  - Combines static routes, service slugs, case-type slugs, and MDX insight slugs.
- `src/lib/seo/sitemap-lastmod.ts`
  - Controls per-path sitemap dates.
- `src/lib/seo/placeholders.ts`
  - Detects `[PLACEHOLDER]` values so unverified organization fields are omitted from structured data.
- `scripts/generate-seo.ts`
  - Generates `public/sitemap.xml` and `public/robots.txt`.
- `scripts/verify-seo-sitemap.ts`
  - Fails if committed sitemap URLs differ from the URL inventory.
- `scripts/verify-seo-ssr.ts`
  - Checks that first-class static routes have page files and metadata exports.
- `scripts/verify-seo-canonical.ts`
  - Checks that the homepage canonical equals the first sitemap URL.
- `src/components/json-ld.tsx`
  - Defines all JSON-LD schemas.
- `src/components/breadcrumb.tsx`
  - Emits visible breadcrumbs and `BreadcrumbList` JSON-LD.
- `src/config/site.ts`
  - Central brand, contact, positioning, jurisdiction, navigation, service labels, and placeholder data.
- `src/lib/services-content.ts`
  - Source of truth for all 10 service routes, metadata, keyword arrays, visible service copy, FAQs, and related-service links.
- `src/lib/case-types.ts`
  - Source of truth for all 6 case-type routes and their metadata/content.
- `content/insights/*.mdx`
  - Source of truth for insight titles, descriptions, dates, authors, tags/meta keywords, headings, body copy, and editorial links.
- `src/lib/mdx.ts`
  - Reads MDX frontmatter, sorts insights, and selects related insights by shared tags.
- `src/app/layout.tsx`
  - Root metadata, metadata base, language, viewport, global JSON-LD, global header/footer, and font behavior.
- `next.config.ts`
  - Permanent redirects for removed routes.
- `netlify.toml`
  - Build command, Next.js plugin, and content-type headers for sitemap/robots.
- `.github/workflows/seo-checks.yml`
  - Pull-request SEO checks.
- `docs/SEO.md`, `LAUNCH_CHECKLIST.md`, and `POST_LAUNCH_SEO.md`
  - Human documentation and launch plan. Some items are stale; see the caveats section.

Generated files, which must not be hand-edited:

- `public/sitemap.xml`
- `public/robots.txt`

## 2. Brand, entity, and topical positioning

Exact central values from `src/config/site.ts`:

- Business name: `Commercial Dispute Expert`
- Short brand: `CommercialDisputeExpert`
- Domain fallback: `https://commercialdisputeexpert.com`
- Domain resolution: `process.env.NEXT_PUBLIC_SITE_URL ?? "https://commercialdisputeexpert.com"`
- Tagline: `Commercial disputes. Financial clarity. Court-ready evidence.`
- Connector pitch: `CommercialDisputeExpert.com connects solicitors, counsel and law firms with qualified commercial dispute expert witnesses - forensic accounting, quantum analysis and court-ready expert reports.`
- Description: `We connect legal professionals with independent commercial dispute expert witnesses and forensic accountants for litigation and arbitration. Not a law firm - we do not provide legal advice.`
- Email: `contact@commercialdisputeexpert.com`
- Declared jurisdictions: `Courts and tribunals`; `International arbitration`
- Current organization type in schema: `ProfessionalService`
- Service audience in schema: `Legal professionals`
- Service area in service schema: `Worldwide`

The site targets these core topic clusters:

- Commercial dispute expert witnesses
- Forensic accounting
- Quantum and damages
- Loss of profits
- Litigation support
- Breach of contract damages
- Shareholder and partnership disputes
- Business valuation
- Business interruption
- Professional negligence quantum
- Expert reports and testimony
- Arbitration and mediation
- CPR Part 35 and Practice Direction 35
- Single Joint Experts and party-appointed experts

## 3. Global metadata behavior

`src/lib/seo.ts` is the standard metadata factory.

### Canonical URL behavior

`absoluteUrl(path)`:

- Uses `siteConfig.domain`.
- Removes a trailing slash from the origin.
- Returns the bare origin for `/` or an empty path.
- Adds a leading slash to other paths when missing.
- Removes trailing slashes from non-homepage paths.

Therefore:

- Homepage canonical: `https://commercialdisputeexpert.com`
- Subpage canonical pattern: `https://commercialdisputeexpert.com/<path>`
- Canonicals intentionally have no trailing slash.

### Title behavior

Every call to `buildMetadata()` creates:

`<page title> | Commercial Dispute Expert`

The code contains a redundant `path === "/"` conditional, but both branches produce the same title format. There is no title template object; the complete title is assembled directly.

### Standard tags generated for indexed pages

For every normal page passed through `buildMetadata()`:

- `title`: page title plus ` | Commercial Dispute Expert`
- `description`: exact route description
- `keywords`: emitted only if a non-empty array is supplied
- `alternates.canonical`: normalized absolute canonical
- `robots.index`: `true`
- `robots.follow`: `true`
- `robots.googleBot.index`: `true`
- `robots.googleBot.follow`: `true`
- `robots.googleBot.max-image-preview`: `large`
- Open Graph:
  - `type`: `article` for `/insights/*`; otherwise `website`
  - `locale`: `en`
  - `url`: canonical URL
  - `siteName`: `Commercial Dispute Expert`
  - `title`: complete suffixed title
  - `description`: page description
  - image URL: `https://commercialdisputeexpert.com/opengraph-image`
  - image width: `1200`
  - image height: `630`
  - image alt: `Commercial Dispute Expert`
- Twitter:
  - `card`: `summary_large_image`
  - `title`: complete suffixed title
  - `description`: page description
  - image: `https://commercialdisputeexpert.com/opengraph-image`

For `noIndex: true`:

- `robots.index`: `false`
- `robots.follow`: `false`
- `robots.googleBot.index`: `false`
- `robots.googleBot.follow`: `false`

### Root layout metadata

`src/app/layout.tsx` defines:

- `metadataBase`: `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.domain)`
- Root metadata title input: `Commercial Dispute Expert Witness`
- Rendered title: `Commercial Dispute Expert Witness | Commercial Dispute Expert`
- Description: the exact connector pitch listed above
- Homepage keywords:
  - `commercial dispute expert witness`
  - `forensic accounting expert witness`
  - `loss of profits expert witness`
- HTML language: `<html lang="en">`
- Viewport width: `device-width`
- Initial scale: `1`
- Font: Google `Source Sans 3`, Latin subset, `display: "swap"` to reduce rendering delay/layout disruption
- Main landmark: `<main id="main-content">`
- Global schemas: `OrganizationJsonLd` and `WebSiteJsonLd`

### Exported but currently unused default keywords

`src/lib/seo.ts` exports `defaultKeywords`, but no route imports or uses it:

- `commercial dispute expert witness`
- `forensic accounting expert witness`
- `loss of profits expert witness`
- `CPR Part 35 expert report`

## 4. Open Graph image

Route: `/opengraph-image`

Source: `src/app/opengraph-image.tsx`

- Generated dynamically with Next.js `ImageResponse`
- Dimensions: `1200 × 630`
- Content type: `image/png`
- Alt text: `Commercial Dispute Expert`
- Visible lines:
  - `Forensic accounting & quantum`
  - `CommercialDisputeExpert`
  - `Commercial dispute expert witness services for legal professionals`
- This one image is used globally for Open Graph, Twitter cards, Article schema image, and Article publisher logo.
- There are no route-specific social images.

## 5. Complete route and metadata inventory

All rendered metadata titles below include the suffix ` | Commercial Dispute Expert`.

### Homepage `/`

- Metadata title input: `Commercial Dispute Expert Witness`
- Rendered title: `Commercial Dispute Expert Witness | Commercial Dispute Expert`
- Description: central connector pitch
- Canonical: `https://commercialdisputeexpert.com`
- Keywords:
  - `commercial dispute expert witness`
  - `forensic accounting expert witness`
  - `loss of profits expert witness`
- H1: `Commercial Dispute Expert Witness Services for Solicitors & Law Firms`
- H2s:
  - `What our commercial dispute expert witnesses cover`
  - `Commercial dispute expert witness: key industry statistics`
  - `Why legal professionals trust our expert network`
  - `What is a commercial dispute expert witness?`
  - `Explore our expert witness resources`
- Important visible topic text:
  - Defines the role as an independent forensic accountant or financial expert.
  - Mentions quantum, valuation, financial misconduct, litigation support, CPR Part 35, Single Joint Experts, litigation, arbitration, damages models, methodology, and sector analysis.
- Primary CTA anchor: `Instruct an Expert Witness` → `/contact`
- Contextual links:
  - `Read how to instruct` → `/how-to-instruct`
  - `case types` → `/case-types`
  - All 10 service cards → their service routes
  - Cluster links to services, case types, insights, how to instruct, and contact

### About `/about`

- Title input: `About - Commercial Dispute Expert Witness`
- Rendered title: `About - Commercial Dispute Expert Witness | Commercial Dispute Expert`
- Description: central site description
- Canonical: `/about`
- No explicit keywords meta array
- H1: `About us`
- H2s:
  - `How we work`
  - `Independence`
- Breadcrumb: Home → About
- Includes connector positioning, not-a-law-firm disclaimer, matching process, conflicts/suitability, expert duty, statements of truth, and independence.

### Services hub `/services`

- Title input: `Commercial Dispute Expert Services`
- Description: `Expert witness and forensic accounting services for commercial disputes: quantum, valuations, litigation support and CPR Part 35 reports.`
- Canonical: `/services`
- No explicit keywords meta array
- H1: `Our services`
- Each service card title is rendered as an H3 in `ServiceCard`.
- Links to all 10 service pages.
- Breadcrumb: Home → Services

### Case-types hub `/case-types`

- Title input: `Case Types - Commercial Dispute Expert Witness`
- Description: `Commercial litigation and dispute case types where forensic accounting and expert witness evidence is commonly required.`
- Canonical: `/case-types`
- No explicit keywords meta array
- H1: `Case types`
- Six H2 card headings, one for each case type.
- Breadcrumb: Home → Case types

### Contact `/contact`

- Title input: `Contact Commercial Dispute Expert`
- Description: `Contact Commercial Dispute Expert for confidential expert witness matching enquiries from solicitors and counsel.`
- Canonical: `/contact`
- No explicit keywords meta array
- H1: `Contact us`
- H2: `Get in touch`
- Email link: `contact@commercialdisputeexpert.com`
- Internal link: `How to instruct` → `/how-to-instruct`
- Breadcrumb: Home → Contact

### How to instruct `/how-to-instruct`

- Title input: `How to Instruct a Forensic Expert Witness`
- Description: `How to instruct Commercial Dispute Expert: engagement process, documents required and expert witness appointments for legal professionals.`
- Canonical: `/how-to-instruct`
- No explicit keywords meta array
- H1: `How to instruct us`
- H2s:
  - `Initial enquiry`
  - `Letter of instruction checklist`
  - Contact-form title `Submit an instruction enquiry` is rendered by the form component
- H3s:
  - `1. Scope`
  - `2. Documents`
  - `3. Expert intro`
- Visible checklist: parties/claim/forum; financial questions; pleadings/orders/disclosure; opposing reports; timetable.
- Breadcrumb: Home → How to instruct

### Insights hub `/insights`

- Title input: `Insights - Commercial Dispute & Expert Witness`
- Description: `Articles for solicitors on CPR Part 35, loss of profits quantum, expert witness appointments and commercial dispute forensic accounting.`
- Canonical: `/insights`
- No explicit keywords meta array
- H1: `Insights`
- One H2 per article title
- Includes `Blog` JSON-LD and `BreadcrumbList` JSON-LD
- Articles sorted newest first by frontmatter `date`
- Display dates use `toLocaleDateString("en-GB")`; this affects visible date formatting only, while global metadata/schema language is `en`.

### Privacy policy `/privacy-policy`

- Title input: `Privacy Policy`
- Description: `Privacy policy for commercialdisputeexpert.com.`
- Canonical: `/privacy-policy`
- Explicit `noIndex: false`, so it is indexable
- H1: `Privacy policy`
- H2s:
  - `Data we collect`
  - `How we use your data`
  - `Legal basis`
  - `Retention`
  - `Your rights`
  - `[PLACEHOLDER] Controller details`
- Breadcrumb: Home → Privacy policy

### Terms `/terms`

- Title input: `Terms of Use`
- Description: `Terms of use for commercialdisputeexpert.com.`
- Canonical: `/terms`
- Indexable
- H1: `Terms of use`
- H2s:
  - `Website purpose`
  - `No reliance`
  - `Intellectual property`
  - `Limitation of liability`
  - `Governing law`
- Breadcrumb: Home → Terms of use

### Cookie policy `/cookie-policy`

- Title input: `Cookie Policy`
- Description: `How commercialdisputeexpert.com uses cookies and similar technologies, and how you can control your preferences.`
- Canonical: `/cookie-policy`
- Indexable
- H1: `Cookie policy`
- H2s:
  - `What are cookies?`
  - `How we use cookies`
  - `Cookie categories`
  - `Third-party services`
  - `Google Consent Mode`
  - `Legal basis (GDPR / ePrivacy)`
  - `California residents (CCPA)`
  - `Managing cookies in your browser`
  - `Contact`
- H3s are generated from cookie category labels.
- Breadcrumb: Home → Cookie policy

### Thank-you `/thank-you`

- Title input: `Thank You`
- Description: `Your enquiry has been received. We will respond shortly.`
- Canonical metadata points to `/thank-you`
- `noIndex: true`, `noFollow: true`
- Excluded from sitemap
- Disallowed in robots.txt
- H1: `Thank you`
- Dynamic visible confirmation based on `?type=instruct`

### 404

- Metadata title input: `Page not found`
- Description: `The page you requested could not be found on Commercial Dispute Expert.`
- Canonical metadata points to `/404`
- `noIndex: true`, `noFollow: true`
- H1: `Page not found`
- Internal recovery links: Home, Contact, Services, Case types

## 6. Service SEO inventory

All 10 service routes are statically generated from `allServiceSlugs`. Unknown slugs call `notFound()`.

Every service page receives:

- Metadata from `service.metaTitle`, `service.metaDescription`, `service.path`, and `service.keywords`
- Canonical URL from `service.path`
- H1 from `service.title`
- Breadcrumb: Home → Services → service title
- `Service` JSON-LD
- `FAQPage` JSON-LD
- Shared H2s:
  - `When solicitors instruct us`
  - `Deliverables`
  - `Our process`
  - `Frequently asked questions`
  - `Related services` when related routes exist
- Process-step titles rendered as H3s
- FAQ questions rendered as buttons, not heading elements; all FAQ answers remain in the rendered React tree, while closed answers receive `hidden`.
- Related services create reciprocal topical internal-link clusters.
- Global CTA links to `/contact`.

### Commercial Dispute Expert Witness

- Route: `/services/commercial-dispute-expert-witness`
- H1/title: `Commercial Dispute Expert Witness`
- Meta title: `Commercial Dispute Expert Witness`
- Meta description: `Independent commercial dispute expert witness services for legal professionals. Forensic accounting, quantum analysis and court-compliant expert reports.`
- Keywords exactly as stored:
  - `commercial dispute expert witness`
  - `commercial dispute expert witness`
  - `forensic accountant commercial litigation`
- Note: the first keyword is duplicated in the source array.
- Process H3s:
  - `Initial consultation`
  - `Analysis`
  - `Expert report`
  - `Testimony & support`
- FAQ questions:
  - `Do you act for claimants and defendants?`
  - `What jurisdictions do you cover?`
  - `How quickly can you produce an initial report?`
  - `What is the expert's duty?`
- Related service links:
  - Loss of Profits & Quantum
  - Expert Reports & Testimony
  - Litigation Support
- Prominent terms in body copy: courts, tribunals, independent expert, forensic accounting, quantum assessments, testimony, breach of contract, consequential loss, shareholder disputes, partnership disputes, valuation, business interruption, insurance, professional negligence, Single Joint Expert, party-appointed expert, CPR Part 35, Practice Direction 35, quantum schedules, damages models, expert meetings, joint statements, oral testimony.

### Litigation Support

- Route: `/services/litigation-support`
- H1/title: `Litigation Support`
- Meta title: `Litigation Support Forensic Accountant`
- Meta description: `Privileged litigation support for solicitors: financial analysis, quantum assessment and cross-examination preparation without expert disclosure.`
- Keywords:
  - `litigation support forensic accountant`
  - `forensic accounting litigation support`
- Process H3s:
  - `Scope agreement`
  - `Document review`
  - `Advisory output`
  - `Ongoing support`
- FAQ questions:
  - `What is the difference between litigation support and expert witness work?`
  - `Can litigation support become expert witness work later?`
  - `Who can instruct litigation support?`
  - `Is work product confidential?`
- Related:
  - Commercial Dispute Expert Witness
  - Loss of Profits & Quantum
- Prominent terms: privileged advisory work, cross-examination, settlement negotiation, quantum analysis, pleadings, legal professional privilege, expert disclosure, opponent reports, settlement modelling.

### Loss of Profits & Quantum

- Route: `/services/loss-of-profits-quantum`
- H1/title: `Loss of Profits & Quantum`
- Meta title: `Loss of Profits Expert Witness`
- Meta description: `Loss of profits and quantum expert witness services for commercial litigation. Rigorous damages modelling for legal teams.`
- Keywords:
  - `loss of profits expert witness`
  - `quantum expert witness commercial dispute`
- Process H3s:
  - `Issue framing`
  - `Data gathering`
  - `Modelling`
  - `Reporting`
- FAQ questions:
  - `What records are typically required?`
  - `Do you quantify consequential loss?`
  - `Can you review the opposing expert's quantum?`
  - `How do you handle uncertain future losses?`
- Related:
  - Breach of Contract Damages
  - Business Interruption
- Prominent terms: damages models, lost revenue, margin, commercial tort, wasted expenditure, reliance loss, but-for scenario, mitigation, management accounts, forecasts, comparators, present value, sensitivity analysis, rebuttal.

### Breach of Contract Damages

- Route: `/services/breach-of-contract-damages`
- H1/title: `Breach of Contract Damages`
- Meta title: `Breach of Contract Expert Witness Damages`
- Meta description: `Expert witness damages analysis for breach of contract disputes. Financial quantification and forensic accounting for commercial litigation.`
- Keywords:
  - `breach of contract expert witness damages`
  - `contract dispute forensic accountant`
- Process H3s:
  - `Contract review`
  - `Impact analysis`
  - `Recoverability assessment`
  - `Expert delivery`
- FAQ questions:
  - `Do you advise on legal interpretation of contracts?`
  - `Can you assist before proceedings are issued?`
  - `What about international contracts?`
  - `Do you work with construction contracts?`
- Related:
  - Loss of Profits & Quantum
  - Commercial Dispute Expert Witness
- Prominent terms: breach, recoverability, mitigation, causation, but-for performance, consequential loss, supplier/customer contracts, service agreement failure, delayed delivery, defective performance, repudiation.

### Shareholder & Partnership Disputes

- Route: `/services/shareholder-partnership-disputes`
- H1/title: `Shareholder & Partnership Disputes`
- Meta title: `Shareholder Dispute Expert Witness`
- Meta description: `Expert witness and valuation support for shareholder and partnership disputes. Forensic accounting for unfair prejudice and dissolution claims.`
- Keywords:
  - `shareholder dispute expert witness`
  - `partnership dispute forensic accountant`
- Process H3s:
  - `Structure mapping`
  - `Financial reconstruction`
  - `Valuation / loss`
  - `Reporting`
- FAQ questions:
  - `What valuation approaches do you use?`
  - `Minority discount issues?`
  - `Can you act as SJE?`
  - `Matrimonial overlap?`
- Related:
  - Business Valuation
  - Commercial Dispute Expert Witness
- Prominent terms: unfair prejudice, s.994 Companies Act 2006, partnership dissolution, account-taking, deadlock, buy-out, dividends, drawings, related-party transactions, DCF, earnings multiples, net assets, minority discount.

### Business Valuation

- Route: `/services/business-valuation`
- H1/title: `Business Valuation`
- Meta title: `Business Valuation Expert Witness Litigation`
- Meta description: `Business valuation expert witness for commercial litigation, arbitration and dispute resolution. Independent opinions for legal teams.`
- Keywords:
  - `business valuation expert witness litigation`
  - `company valuation dispute expert`
- Process H3s:
  - `Valuation brief`
  - `Information review`
  - `Method selection`
  - `Conclusion & report`
- FAQ questions:
  - `Do you provide tax valuations?`
  - `Can you value intangible assets?`
  - `How do you treat forecasts?`
  - `International businesses?`
- Related:
  - Shareholder & Partnership Disputes
  - Commercial Dispute Expert Witness
- Prominent terms: enterprise value, share valuation, purchase-price adjustment, earn-out, shareholder buy-out, partnership exit, breach of warranty, intellectual property, comparables, market data, currency, cross-border groups.

### Business Interruption

- Route: `/services/business-interruption`
- H1/title: `Business Interruption`
- Meta title: `Business Interruption Expert Witness`
- Meta description: `Business interruption expert witness and quantum analysis for insurance and commercial disputes. Forensic support for legal professionals.`
- Keywords:
  - `business interruption expert witness`
  - `BI claim forensic accountant`
- Process H3s:
  - `Policy & peril framing`
  - `Financial baseline`
  - `Loss period analysis`
  - `Reporting`
- FAQ questions:
  - `Are you loss adjusters?`
  - `COVID-related BI?`
  - `Consequential loss overlap?`
  - `Industry benchmarks?`
- Related:
  - Loss of Profits & Quantum
  - Breach of Contract Damages
- Prominent terms: insurance BI claims, insured peril, policy wording, supply chain loss, property damage, mitigation, increased cost of working, turnover, margin, extra expense, coverage dispute.

### Professional Negligence

- Route: `/services/professional-negligence`
- H1/title: `Professional Negligence`
- Meta title: `Professional Negligence Forensic Accountant`
- Meta description: `Financial quantum in professional negligence claims. Forensic accounting expert witness for solicitors handling accountant, adviser and corporate negligence disputes.`
- Keywords:
  - `professional negligence forensic accountant`
  - `accountant negligence expert witness`
- Process H3s:
  - `Allegation mapping`
  - `But-for analysis`
  - `Quantum`
  - `Disclosure`
- FAQ questions:
  - `Do you opine on professional standard of care?`
  - `Accountant negligence experience?`
  - `Limitation periods?`
  - `Insurance layer involvement?`
- Related:
  - Loss of Profits & Quantum
  - Litigation Support
- Prominent terms: accountants, auditors, corporate advisers, loss of chance, wasted costs, tax advice, structuring advice, counterfactual modelling, workpapers, audits, management accounts.

### Expert Reports & Testimony

- Route: `/services/expert-reports-testimony`
- H1/title: `Expert Reports & Testimony`
- Meta title: `CPR Part 35 Expert Report Forensic Accountant`
- Meta description: `CPR Part 35 compliant expert reports, joint statements and court testimony from a commercial dispute forensic accounting expert witness.`
- Keywords:
  - `CPR Part 35 expert report forensic accountant`
  - `expert witness report commercial`
- Process H3s:
  - `Instructions`
  - `Draft & review`
  - `Exchange`
  - `Hearing`
- FAQ questions:
  - `What must a CPR Part 35 report include?`
  - `Can you attend expert meetings?`
  - `Arbitration reports differ?`
  - `Expedited reports?`
- Related:
  - Commercial Dispute Expert Witness
  - Arbitration & Mediation
- Prominent terms: Practice Direction 35, expert report, supplemental report, rebuttal, expert meetings, joint statements, oral evidence, hot-tubbing, Part 35 questions, cross-examination.

### Arbitration & Mediation

- Route: `/services/arbitration-mediation`
- H1/title: `Arbitration & Mediation`
- Meta title: `Arbitration Expert Witness Forensic Accounting`
- Meta description: `Expert witness and quantum support for commercial arbitration and mediation. LCIA, ICC and ad hoc proceedings - forensic accounting for legal teams.`
- Keywords:
  - `arbitration expert witness forensic accounting`
  - `mediation quantum expert`
- Process H3s:
  - `Procedural alignment`
  - `Financial analysis`
  - `Exchange`
  - `Hearing`
- FAQ questions:
  - `Which arbitral seats do you support?`
  - `Do you act as arbitrator?`
  - `Mediation without full expert appointment?`
  - `Multi-party arbitrations?`
- Related:
  - Expert Reports & Testimony
  - Commercial Dispute Expert Witness
- Prominent terms: international arbitration, domestic arbitration, LCIA, ICC, SIAC, ad hoc arbitration, mediation, emergency arbitrator, enforcement, challenge proceedings, arbitral-format reports, witness statements, seat, language, procedural orders, London-seated arbitration.

## 7. Case-type SEO inventory

All six case-type pages are statically generated from `CASE_TYPES`. Unknown slugs call `notFound()`.

Shared structure:

- Metadata title: case type `title`
- Metadata description: case type `metaDescription`
- Canonical: `/case-types/<slug>`
- No explicit keyword meta arrays
- H1: case type `title`
- H2: `Related services`
- Breadcrumb: Home → Case types → hub label
- Visible summary from `CASE_TYPES`
- Intro says the brand connects the firm with independent experts and mentions CPR Part 35 reporting where required.

Entries:

- `/case-types/breach-of-contract`
  - Hub label: `Breach of contract`
  - H1/meta title: `Breach of Contract Disputes`
  - Summary: `Quantum and forensic accounting for contractual breach, delayed performance and consequential loss claims.`
  - Meta description: `Commercial dispute expert witness for breach of contract damages and loss quantification in commercial litigation.`
  - Related: Breach of Contract Damages; Loss of Profits & Quantum
- `/case-types/shareholder-partnership`
  - Hub label: `Shareholder & partnership`
  - H1/meta title: `Shareholder & Partnership Disputes`
  - Summary: `Unfair prejudice, buy-out valuations and partnership account-taking supported by independent financial evidence.`
  - Meta description: `Expert witness support for shareholder disputes and partnership dissolution quantum in commercial litigation.`
  - Related: Shareholder & Partnership Disputes; Business Valuation
- `/case-types/professional-negligence`
  - Hub label/H1/meta title: `Professional Negligence`
  - Summary: `Financial quantum in accountant, auditor and corporate adviser negligence litigation.`
  - Meta description: `Forensic accounting expert witness for professional negligence damages in commercial disputes.`
  - Related: Professional Negligence
- `/case-types/business-interruption`
  - Hub label: `Business interruption`
  - H1/meta title: `Business Interruption & Insurance`
  - Summary: `BI loss quantification and insurance-related financial disputes with transparent methodology.`
  - Meta description: `Business interruption expert witness and quantum analysis for commercial and insurance disputes.`
  - Related: Business Interruption; Loss of Profits & Quantum
- `/case-types/fraud-asset-tracing`
  - Hub label: `Fraud & asset tracing`
  - H1/meta title: `Fraud & Asset Tracing`
  - Summary: `Forensic investigation, misappropriation analysis and asset tracing in contentious matters.`
  - Meta description: `Forensic accountant expert witness for fraud allegations and asset tracing in commercial litigation.`
  - Related: Litigation Support; Commercial Dispute Expert Witness
- `/case-types/international-arbitration`
  - Hub label/H1/meta title: `International Arbitration`
  - Summary: `Expert reports and testimony for LCIA, ICC and ad hoc arbitration.`
  - Meta description: `Commercial dispute expert witness for international arbitration and cross-border quantum issues.`
  - Related: Arbitration & Mediation; Expert Reports & Testimony

## 8. Insight/blog SEO inventory

### MDX mechanics

`src/lib/mdx.ts`:

- Reads files from `content/insights`.
- Slug equals the MDX filename without `.mdx`.
- Required frontmatter:
  - `title`
  - `description`
  - `date`
  - `author`
  - `tags`
- Optional `modified`.
- Article metadata uses:
  - title → metadata title and Article headline
  - description → metadata description and Article description
  - tags → metadata keywords
  - date → OG `publishedTime`, Article `datePublished`, and sitemap lastmod unless modified exists
  - modified → OG `modifiedTime`, Article `dateModified`, and sitemap lastmod
- `getAllInsights()` sorts descending by publication date.
- Related posts share at least one exact tag, exclude the current slug, and are limited to three.
- Article Open Graph is explicitly extended with `type: article`, `publishedTime`, and `modifiedTime`.
- Unknown article slugs call `notFound()`.

### Shared article heading and link structure

- H1: frontmatter title
- H2/H3: MDX headings
- Author box links `Instruct an expert` → `/contact`
- Related-insights H2: `Related insights`
- Related services are always:
  - `Commercial dispute expert witness` → `/services/commercial-dispute-expert-witness`
  - `Loss of profits & quantum` → `/services/loss-of-profits-quantum`
  - `Expert reports & testimony` → `/services/expert-reports-testimony`
- Global CTA links to `/contact`.
- Breadcrumb: Home → Insights → article title

### Expert Witness vs Litigation Support under CPR Part 35

- Slug: `expert-witness-vs-litigation-support-cpr-part-35`
- Title: `Expert Witness vs Litigation Support under CPR Part 35`
- Description: `A practical guide for solicitors on the distinction between privileged litigation support and disclosed expert witness work under CPR Part 35.`
- Date: `2026-05-01`
- Modified: not set
- Author: `[PLACEHOLDER] Expert Full Name`
- Tags/meta keywords:
  - `CPR Part 35`
  - `litigation support`
  - `expert witness`
- H2s:
  - `Why the distinction matters`
  - `Litigation support: typical scope`
  - `Expert witness appointments`
  - `Party-appointed vs Single Joint Expert`
  - `Practical tips for instructions`
  - `When to instruct a commercial dispute expert`
- Editorial links:
  - `how to instruct us` → `/how-to-instruct`
  - `commercial dispute expert witness` → `/services/commercial-dispute-expert-witness`

### How Loss of Profits Is Calculated in Commercial Litigation

- Slug: `loss-of-profits-commercial-litigation`
- Title: `How Loss of Profits Is Calculated in Commercial Litigation`
- Description: `An overview of loss of profits methodology for legal professionals handling breach of contract and commercial tort claims.`
- Date: `2026-05-08`
- Modified: not set
- Author: `[PLACEHOLDER] Expert Full Name`
- Tags/meta keywords:
  - `loss of profits`
  - `quantum`
  - `commercial litigation`
- H2s:
  - `The basic framework`
  - `But-for reconstruction`
  - `Margin and incremental costs`
  - `Mitigation`
  - `Present value and duration`
  - `Common pitfalls in disputes`
  - `Rebuttal and joint experts`
- Editorial links:
  - `loss of profits and quantum` → `/services/loss-of-profits-quantum`
  - `how to instruct` → `/how-to-instruct`

### What to Include in Instructions to a Forensic Expert

- Slug: `instructions-to-forensic-expert`
- Title: `What to Include in Instructions to a Forensic Expert`
- Description: `Checklist for legal professionals instructing a forensic accountant or commercial dispute expert witness in litigation and arbitration.`
- Date: `2026-05-15`
- Modified: not set
- Author: `[PLACEHOLDER] Expert Full Name`
- Tags/meta keywords:
  - `letter of instruction`
  - `forensic accountant`
  - `expert witness`
- H2s:
  - `Core elements of the instruction letter`
  - `CPR Part 35 compliance`
  - `Privileged advisory work`
  - `After instruction`
  - `Our intake process`
- H3s:
  - `1. Parties and forum`
  - `2. Questions for the expert`
  - `3. Documents`
  - `4. Legal framework`
  - `5. Timetable`
  - `6. Fees and terms`
- Editorial links:
  - `how to instruct us` → `/how-to-instruct`
  - `expert reports and testimony` → `/services/expert-reports-testimony`

### Party-Appointed vs Single Joint Expert: What Solicitors Should Know

- Slug: `party-appointed-vs-single-joint-expert`
- Title: `Party-Appointed vs Single Joint Expert: What Solicitors Should Know`
- Description: `Guidance on choosing between party-appointed experts and Single Joint Experts (SJE) in commercial dispute litigation.`
- Date: `2026-05-22`
- Modified: not set
- Author: `[PLACEHOLDER] Expert Full Name`
- Tags/meta keywords:
  - `Single Joint Expert`
  - `party-appointed expert`
  - `CPR Part 35`
- H2s:
  - `Party-appointed experts`
  - `Single Joint Experts`
  - `Strategic considerations`
  - `Joint instructions and disagreements`
  - `Changing model mid-case`
- Editorial links:
  - `commercial dispute expert witness` → `/services/commercial-dispute-expert-witness`
  - `contact` → `/contact`

## 9. Complete explicit keyword inventory

This section lists every explicit `keywords` or MDX `tags` value currently capable of becoming a `<meta name="keywords">` value.

Homepage:

- `commercial dispute expert witness`
- `forensic accounting expert witness`
- `loss of profits expert witness`

Service metadata:

- `commercial dispute expert witness` (appears twice in one service array)
- `forensic accountant commercial litigation`
- `litigation support forensic accountant`
- `forensic accounting litigation support`
- `loss of profits expert witness`
- `quantum expert witness commercial dispute`
- `breach of contract expert witness damages`
- `contract dispute forensic accountant`
- `shareholder dispute expert witness`
- `partnership dispute forensic accountant`
- `business valuation expert witness litigation`
- `company valuation dispute expert`
- `business interruption expert witness`
- `BI claim forensic accountant`
- `professional negligence forensic accountant`
- `accountant negligence expert witness`
- `CPR Part 35 expert report forensic accountant`
- `expert witness report commercial`
- `arbitration expert witness forensic accounting`
- `mediation quantum expert`

Insight metadata:

- `CPR Part 35`
- `litigation support`
- `expert witness`
- `loss of profits`
- `quantum`
- `commercial litigation`
- `letter of instruction`
- `forensic accountant`
- `Single Joint Expert`
- `party-appointed expert`

Exported but unused defaults:

- `commercial dispute expert witness`
- `forensic accounting expert witness`
- `loss of profits expert witness`
- `CPR Part 35 expert report`

No explicit keyword arrays exist for:

- About
- Services hub
- Case-types hub
- Case-type detail pages
- Contact
- How to instruct
- Insights hub
- Privacy policy
- Terms
- Cookie policy
- Thank-you
- 404

## 10. Structured data

All JSON-LD is serialized into `<script type="application/ld+json">`.

### ProfessionalService, global

Emitted by `OrganizationJsonLd()` in the root layout on every page:

- `@context`: `https://schema.org`
- `@type`: `ProfessionalService`
- `@id`: homepage canonical plus `#organization`
- `name`: `Commercial Dispute Expert`
- `description`: connector pitch
- `url`: homepage canonical
- `email`: `contact@commercialdisputeexpert.com`
- `inLanguage`: `en`
- `areaServed`:
  - AdministrativeArea `Courts and tribunals`
  - AdministrativeArea `International arbitration`
- `knowsAbout`:
  - `Commercial dispute expert witness`
  - `Forensic accounting`
  - `Loss of profits quantum`
  - `CPR Part 35 expert reports`
  - `Business valuation disputes`
- `serviceType`:
  - `Expert witness services`
  - `Forensic accounting`
  - `Litigation support`
  - `Quantum of damages`

Conditional fields:

- Telephone is omitted while `siteConfig.contact.phone` contains `[PLACEHOLDER]`.
- Address is omitted unless both address line 1 and line 2 are non-placeholder values.
- LinkedIn `sameAs` is omitted while the configured URL contains `[PLACEHOLDER]`.
- `isPlaceholder()` returns true for missing values or strings containing `[PLACEHOLDER]`.

### WebSite, global

- `@type`: `WebSite`
- `@id`: homepage canonical plus `#website`
- `name`: `Commercial Dispute Expert`
- `url`: homepage canonical
- `description`: connector pitch
- `inLanguage`: `en`
- `publisher`: organization `@id`

There is no `SearchAction`; the site has no internal site search.

### BreadcrumbList

`Breadcrumb` always renders both:

- Visible `<nav aria-label="Breadcrumb">`
- `BreadcrumbList` JSON-LD

Each item receives a one-based `position`, `name`, and absolute `item` URL when available. The final breadcrumb without an explicit href uses `currentPath` as its canonical item URL.

Breadcrumb schema is present on all normal static/detail pages using the component. It is absent on the homepage, thank-you page, and 404 page.

### Service

Every service page emits:

- `@type`: `Service`
- `@id`: service canonical plus `#service`
- `name`: service title
- `description`: service meta description
- `url`: service canonical
- `provider`: global organization `@id`
- `areaServed`: Place `Worldwide`
- `serviceType`: service title
- `audience`: Audience with `audienceType: Legal professionals`

### FAQPage

Every service page emits `FAQPage` with one `Question` per service FAQ and an `acceptedAnswer` containing the exact answer text.

Important: Google reduced FAQ rich-result eligibility for most commercial sites. The schema remains semantically valid but should not be assumed to produce a visible FAQ SERP treatment.

### Blog

The insights hub emits:

- `@type`: `Blog`
- `@id`: insights canonical plus `#blog`
- `name`: `Commercial Dispute Expert Insights`
- `description`: `Articles for legal professionals on commercial dispute expert witnesses, forensic accounting and expert evidence.`
- `url`: insights canonical
- `publisher`: organization `@id`
- `inLanguage`: `en`

### Article

Each insight emits:

- `@type`: `Article`
- `headline`: frontmatter title
- `description`: frontmatter description
- `datePublished`: ISO timestamp derived from `date`
- `dateModified`: ISO timestamp derived from `modified`, falling back to `date`
- `author`: Organization
  - If author contains `[PLACEHOLDER]`, author name falls back to `Commercial Dispute Expert`
  - Otherwise it uses the frontmatter author
- `publisher`: Organization named `Commercial Dispute Expert`
- Publisher logo: `/opengraph-image`
- `image`: `/opengraph-image`
- `mainEntityOfPage`: article canonical
- `url`: article canonical
- `inLanguage`: `en`

## 11. Sitemap architecture

Source: `src/lib/seo/publicUrlInventory.ts`

Hard-coded canonical host:

`https://commercialdisputeexpert.com`

This is separate from the environment-aware `siteConfig.domain`. The canonical verification script catches homepage disagreement, but production configuration should still use the same origin.

Static first-class paths:

- `/`
- `/about`
- `/services`
- `/case-types`
- `/how-to-instruct`
- `/contact`
- `/insights`
- `/privacy-policy`
- `/terms`
- `/cookie-policy`

Dynamic paths are added from:

- All keys in `servicesContent`
- All slugs in `CASE_TYPES`
- Every `.mdx` filename in `content/insights`

Excluded app path:

- `/thank-you`

Normalization:

- Ensures a leading slash
- Removes trailing slashes
- Deduplicates
- Sorts alphabetically, while forcing `/` first

Current generated sitemap contains 30 URLs:

- 1 homepage
- 9 other static/index/legal pages
- 10 service detail pages
- 6 case-type detail pages
- 4 insight detail pages

### Current sitemap frequency rules

- Homepage: `weekly`
- `/insights` and all insight articles: `weekly`
- `/services` and all service pages: `monthly`
- `/case-types` and all case-type pages: `monthly`
- Privacy, terms, cookie policy: `yearly`
- All other included paths: `monthly`

### Current sitemap priority rules

- Homepage: `1.0`
- Commercial Dispute Expert Witness service: `0.9`
- Services hub and case-types hub: `0.85`
- Other service pages: `0.8`
- Contact and how-to-instruct: `0.8`
- Case-type pages: `0.75`
- Insights hub and articles: `0.7`
- About and other defaults: `0.65`
- Privacy, terms, cookie policy: `0.3`

Search engines may ignore `changefreq` and `priority`; they are hints, not directives.

### Last-modified behavior

- Generation fallback date is the UTC date on which `npm run seo:generate` runs.
- Every non-insight path uses that generation date.
- Each insight article uses `modified` if present, otherwise publication `date`.
- `/insights` uses the newest article's effective date.
- Invalid insight dates silently fall back to the generation date.
- Current committed sitemap fallback date: `2026-06-17`
- Current insight hub lastmod: `2026-05-22`
- Current article lastmods:
  - Expert witness vs litigation support: `2026-05-01`
  - Loss of profits: `2026-05-08`
  - Instructions to forensic expert: `2026-05-15`
  - Party-appointed vs SJE: `2026-05-22`

Operational rule: add `modified: "YYYY-MM-DD"` to an MDX post whenever it is materially updated.

## 12. Robots and crawl/index controls

Generated `public/robots.txt`:

- `User-agent: *`
- `Allow: /`
- Disallow:
  - `/api/`
  - `/admin/`
  - `/private/`
  - `/.netlify/`
  - `/thank-you`
- Sitemap declaration:
  - `https://commercialdisputeexpert.com/sitemap.xml`

Indexability summary:

- All sitemap pages emit `index, follow`.
- Privacy explicitly sets `noIndex: false`.
- Thank-you emits `noindex, nofollow`, is excluded from sitemap, and is disallowed in robots.
- 404 emits `noindex, nofollow`.
- Removed Fees and Experts routes are redirects, not indexable content pages.

Potential nuance: using both `Disallow: /thank-you` and a page-level `noindex` can prevent some crawlers from seeing the noindex directive. It is redundant. A future SEO review may prefer allowing crawling while retaining `noindex`, but the current implementation uses both.

## 13. Redirects and removed content

`next.config.ts` defines permanent redirects:

- `/fees` → `/contact`
- `/experts` → `/contact`
- `/experts/:slug` → `/contact`

These routes were deliberately removed from the sitemap, footer, cluster navigation, and page tree. Next.js permanent redirects normally produce an HTTP 308 response. Check the deployed platform if a strict 301 is required.

## 14. Internal linking architecture

### Global header

Desktop:

- Brand link → `/`
- Home → `/`
- Services dropdown:
  - Hub `/services`
  - All 10 service routes
- Case Types dropdown:
  - Hub `/case-types`
  - All 6 case-type routes
- Resources dropdown uses `/insights` as its hub and includes:
  - Insights
  - How to Instruct
  - About
- Contact us → `/contact`

Mobile contains the same service, case-type, and resource routes, plus an explicit contact CTA.

### Global footer

Services column:

- First six service pages:
  - Commercial Dispute Expert Witness
  - Litigation Support
  - Loss of Profits & Quantum
  - Breach of Contract Damages
  - Shareholder & Partnership Disputes
  - Business Valuation
- `View all services →` → `/services`

Case types column:

- First five case types:
  - Breach of contract
  - Shareholder & partnership
  - Professional negligence
  - Business interruption
  - Fraud & asset tracing
- `View all →` → `/case-types`

Resources:

- Insights
- How to instruct
- About

Contact:

- Contact
- Instruct an expert

Legal:

- Privacy
- Terms
- Cookies

Fees and Our experts are intentionally absent.

### Homepage cluster links

- `Expert witness services` → `/services`
- `Case types requiring an expert` → `/case-types`
- `Insights for legal professionals` → `/insights`
- `How to instruct` → `/how-to-instruct`
- `Instruct an expert witness` → `/contact`

### Service clusters

Each service page links to its `relatedSlugs`. The complete mappings are listed in the service inventory.

### Case-type clusters

Each case-type page links to one or two highly relevant service pages. The complete mappings are listed in the case-type inventory.

### Insight clusters

- Every article links to three fixed service pages.
- Each article may include hand-authored contextual links in MDX.
- Related articles are selected by exact shared tags and limited to three.
- Current tag overlap:
  - `expert witness` links the CPR/litigation-support article with the instructions article.
  - `CPR Part 35` links the CPR/litigation-support article with the party-appointed/SJE article.
  - The loss-of-profits article has no shared tag with the other current posts and therefore may have no automatic related-insights block.

## 15. Heading semantics

Global rules:

- Each normal content page has one primary H1.
- Home H1 comes from `Hero`.
- Service pages use service titles as H1.
- Case-type pages use case-type titles as H1.
- Insight pages use frontmatter titles as H1.
- Service cards use H3 headings on both the homepage and services hub.
- Case-type hub cards use H2 headings.
- Service section labels use H2; process-step names use H3.
- Article MDX supports styled H2 and H3.
- Breadcrumbs are navigation, not headings.
- FAQ questions are buttons, not H3/H4 headings.
- Footer column labels are H2 elements on every page.

The footer therefore adds four repeated H2s to every page:

- `Services`
- `Case types`
- `Resources`
- `Contact`

This is semantically valid for footer navigation sections but must be considered when auditing page heading outlines.

## 16. Analytics, consent, and SEO measurement

Supported optional trackers:

- Google Tag Manager: `NEXT_PUBLIC_GTM_ID`, analytics category
- Google Analytics 4: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, analytics category
- Plausible: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, analytics category
- Hotjar: `NEXT_PUBLIC_HOTJAR_ID`, analytics category
- Meta Pixel: `NEXT_PUBLIC_META_PIXEL_ID`, marketing category
- LinkedIn Insight Tag: `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`, marketing category

Behavior:

- Tracker scripts load only when the relevant environment variable is non-empty and the user has consented to that category.
- Google Consent Mode v2 defaults are inlined in initial HTML before tracker loading.
- Default consent:
  - analytics storage denied
  - ad storage denied
  - ad user data denied
  - ad personalization denied
  - functionality storage denied
  - personalization storage denied
  - security storage granted
  - wait for update: 500 ms
- GA4 uses `anonymize_ip: true`.
- Consent can be changed through the footer Cookie settings control.

SEO-measurement implication:

- Analytics data may be incomplete until consent is granted.
- Google tags are not loaded unconditionally.
- Search Console and Bing Webmaster Tools are external launch tasks and are not configured in this repository.
- No hard-coded verification meta tags for Google Search Console, Bing, or other webmaster platforms were found.

Do not copy secrets or live IDs into this document. `.env.local` is gitignored. Public variable names are documented in `.env.example`.

## 17. Build, generation, CI, and deployment

NPM commands:

- `npm run build`: Next.js production build
- `npm run lint`: ESLint
- `npm run seo:generate`: regenerate sitemap and robots
- `npm run seo:verify`: compare sitemap URLs with inventory
- `npm run seo:verify:ssr`: verify metadata existence on static first-class routes
- `npm run seo:verify:canonical`: compare homepage canonical and sitemap URL
- `npm run seo:verify:all`: run all three verification commands

CI workflow `.github/workflows/seo-checks.yml`:

- Runs on pull requests and manual dispatch.
- Uses Ubuntu, Node 20, and `npm ci`.
- Runs SEO generation.
- Fails if generated sitemap or robots differ from committed files.
- Runs all three SEO verification scripts individually.
- It does not currently run on every push.
- It does not run Lighthouse, link checking, schema validation, title/description length validation, duplicate-content checks, or rendered HTML assertions.

Netlify:

- Build command: `npm run build`
- Uses `@netlify/plugin-nextjs`
- Adds XML UTF-8 content type for `/sitemap.xml`
- Adds plain-text UTF-8 content type for `/robots.txt`

## 18. Current known SEO issues, caveats, and unverified claims

These are factual current-state caveats, not instructions to silently change the site:

1. Numerous `[PLACEHOLDER]` values remain in `src/config/site.ts`.
   - Legal entity name
   - Company number
   - Expert identity and credentials
   - Experience metrics
   - Phone and address
   - Regulatory statements
   - LinkedIn URL
   - Testimonials
2. All four article authors remain `[PLACEHOLDER] Expert Full Name`.
   - Article schema safely falls back to the organization name.
   - Visible article author boxes still display the placeholder text.
3. Privacy policy visibly contains `[PLACEHOLDER] Controller details`.
4. Terms visibly contains placeholder limitation-of-liability copy.
5. The ProfessionalService schema omits phone, address, and sameAs because they are placeholders. This is intentional safety behavior.
6. The first service keyword array duplicates `commercial dispute expert witness`.
7. `defaultKeywords` exists but is unused.
8. Several pages are globally region-neutral but retain UK-specific legal topics:
   - CPR Part 35 / PD 35
   - Companies Act 2006
   - ICO
   - London-seated arbitration
9. `README.md` still describes the site as UK-focused, which is stale relative to public positioning.
10. `POST_LAUNCH_SEO.md` still references a possible UK office and UK directories.
11. `LAUNCH_CHECKLIST.md` still includes removed `/experts/lead-expert` in smoke-test URLs.
12. `CONTENT_REPLACEMENT.md` still references the deleted expert profile page.
13. The insights hub meta description still says `Articles for solicitors`, while visible copy says `legal professionals`.
14. The shared service H2 says `When solicitors instruct us`, which is narrower than the region-neutral/legal-professional positioning.
15. The arbitration FAQ says London-seated arbitrations are common.
16. Display dates use `en-GB`, even though HTML and metadata language are `en`.
17. The homepage uses sterling-denominated industry examples (`£200–£550/hr`, `£3,000–£15,000`) despite region-neutral positioning.
18. Sitemap static-page lastmod values are generation dates, not content-specific modification dates.
19. Current committed static lastmod is `2026-06-17`, while this handoff snapshot is later. Regeneration changes all fallback lastmod values even if page content did not change.
20. No route-specific social images exist.
21. There is no explicit favicon/manifest SEO discussion in the current SEO implementation.
22. There is no `hreflang` strategy; the site declares one language.
23. There is no pagination, site search, or search schema.
24. There is no automated broken-link checker.
25. There is no automated title/description length or duplication checker.
26. There is no automated rendered heading-outline checker.
27. FAQ rich results are not guaranteed for a commercial site.
28. Sitemap priorities/change frequencies are search-engine hints and may be ignored.
29. The site claims credentials, expertise, rates, response timing, court compliance, experience, and professional practices in visible copy. These must be verified before launch; SEO must not amplify unverified E-E-A-T claims.
30. The `ProfessionalService` areaServed values `Courts and tribunals` and `International arbitration` are modeled as `AdministrativeArea`, although they are not conventional geographic administrative areas.
31. Service schema says `Worldwide`, but visible service copy includes jurisdiction-dependent procedural language. Scope should be legally and operationally verified.
32. Organization schema uses the generated social image as Article publisher logo; a dedicated square organization logo would generally be more appropriate.
33. The current 404 canonical is `/404`, although actual framework-generated not-found responses may occur on arbitrary missing URLs.
34. Thank-you is both blocked in robots.txt and marked noindex. Some crawlers cannot see a page-level noindex when crawling is blocked.
35. The permanent redirects use Next.js permanent redirect semantics, typically HTTP 308 rather than 301.

## 19. Content and authority plan currently documented

`POST_LAUNCH_SEO.md` proposes:

- Verify and submit sitemap in Google Search Console and Bing Webmaster Tools.
- Build directory/entity profiles where verified and applicable.
- Maintain consistent name/address/phone information.
- Publish 8–12 articles total.
- Suggested topics:
  - Business interruption vs consequential loss
  - Preparing for expert cross-examination
  - Arbitration vs court quantum
  - Expert meetings and joint statements
  - Shareholder dispute valuations
  - Timeline and cost of forensic reports
  - Professional negligence quantum
  - Forensic-accounting data requests
- Build backlinks through professional publications, referral relationships, and permissible case-related publicity.
- Review queries, impressions, CTR, average position, crawl errors, internal links, content freshness, and Core Web Vitals monthly.

The document's 90-day targets are historical planning targets, not measured current performance:

- 15+ indexed pages
- Brand-query impression growth
- Top 20 for 2–3 service terms
- Enquiry tracking
- Good Core Web Vitals

No Search Console, Bing, ranking, backlink, traffic, or conversion data is stored in this repository, so actual performance cannot be inferred from the code.

## 20. Safe operating procedure for future SEO work

When adding or changing a static route:

1. Add/update its page metadata with `buildMetadata()`.
2. Ensure one descriptive H1.
3. Add visible breadcrumbs and pass the exact canonical `currentPath`.
4. Add the route to `APP_STATIC_PATHS` if it is a first-class static page.
5. For dynamic families, update the corresponding source collection instead.
6. Add appropriate contextual internal links.
7. Add schema only when visible content supports it.
8. Run `npm run seo:generate`.
9. Commit both `public/sitemap.xml` and `public/robots.txt`.
10. Run `npm run seo:verify:all`.
11. Run `npm run build`.

When adding or updating an insight:

1. Create/update `content/insights/<slug>.mdx`.
2. Supply title, description, ISO publication date, author, and tags.
3. Add `modified: "YYYY-MM-DD"` for material updates.
4. Use descriptive H2/H3 headings.
5. Add contextual links to the most relevant service and case-type pages.
6. Check tag overlap so related articles behave as intended.
7. Regenerate and verify SEO files.

When changing the production domain:

1. Update `NEXT_PUBLIC_SITE_URL`.
2. Update `CANONICAL_HOST` in `publicUrlInventory.ts`.
3. Configure the old domain and `www`/apex variant to permanently redirect to the chosen canonical host.
4. Regenerate sitemap/robots.
5. Run canonical verification.
6. Update Search Console/Bing properties and sitemap submissions.

When replacing placeholders:

1. Use only verified legal/entity/expert details.
2. Confirm ProfessionalService schema begins emitting valid phone/address/sameAs fields.
3. Replace visible article author placeholders.
4. Replace or remove unverified credentials/testimonials.
5. Revalidate all structured data.

## 21. Minimum verification checklist for another AI

Before proposing SEO changes, Claude or another agent should read at least:

- This document
- `src/lib/seo.ts`
- `src/lib/seo/publicUrlInventory.ts`
- `src/lib/seo/sitemap-lastmod.ts`
- `src/components/json-ld.tsx`
- `src/config/site.ts`
- `src/lib/services-content.ts`
- `src/lib/case-types.ts`
- `src/lib/mdx.ts`
- Relevant route/page source
- Relevant MDX article source
- `scripts/generate-seo.ts`
- `next.config.ts`

Do not assume training-data conventions for this Next.js version. The repository rule requires reading the relevant Next.js 16 documentation under `node_modules/next/dist/docs/` before changing framework APIs or conventions.

Do not treat this document as a substitute for source verification after later commits. It is an exhaustive snapshot of commit `fe77fde0d9299cf998570677442d8437009063be`.
