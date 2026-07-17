SEO Gap-Closure Plan — commercialdisputeexpert.com

Feed this file to Cursor as a task list. Repo snapshot audited: commit fe77fde0d929.
Read section 0 first — this site has one strategic decision that blocks several
otherwise-mechanical fixes, and it recurs on your contractlossexpert.com repo too.

After every batch of changes, run:

npm run seo:generate && npm run seo:verify:all && npm run build


P0.0 — Strategic decision (RESOLVED)

Decision: **Option B — UK-qualified experts, internationally instructible.**

- Keep jurisdiction-specific content (CPR Part 35, PD 35, Companies Act 2006, ICO,
  London-seated arbitration) where it is genuinely topical, with clear "under English law"
  or equivalent framing on service pages and insights.
- Walk back unqualified "worldwide" geographic claims in schema; use serviceType and
  audience instead of asserting global areaServed.
- Neutralize UK-only audience terms ("solicitors") in generic positioning copy, metadata,
  and hub pages; keep "solicitor" only inside UK-specific procedural sections or MDX where
  contextually accurate.
- Keep sterling fee benchmarks on the homepage but label them explicitly as UK market
  reference rates (industry benchmarks, not this firm's pricing).


P0 — Fix before anything else

P0.1 — Duplicate keyword in service metadata array

File: src/lib/services-content.ts
Problem: the Commercial Dispute Expert Witness service's keywords array has
"commercial dispute expert witness" twice.
Fix: de-duplicate to:

tskeywords: [
  "commercial dispute expert witness",
  "forensic accountant commercial litigation",
]

Verify: grep -n "commercial dispute expert witness" src/lib/services-content.ts
shows it once per relevant array.

P0.2 — Redundant thank-you crawl blocking hides the noindex signal

Files: scripts/generate-seo.ts (robots generation), page metadata for /thank-you
Problem: /thank-you is both Disallow-ed in robots.txt and noindex, nofollow
in meta. If a crawler respects the disallow, it never fetches the page and therefore
never sees the noindex tag — meaning if this URL was ever indexed before the disallow was
added, it can get stuck in the index because Google can't re-crawl it to learn it should
be removed.
Fix: remove /thank-you from the Disallow list in scripts/generate-seo.ts, keep
only the page-level noindex, nofollow. Crawling a thank-you page has no downside; being
unable to deindex a stale URL does.
Verify: public/robots.txt no longer lists /thank-you; the page's rendered
<meta name="robots"> still shows noindex, nofollow.

P0.3 — "Solicitors" language vs legal-professional positioning (generic copy only)

Files:
- src/components/service-page-template.tsx (shared H2)
- src/config/site.ts (connectorPitch)
- src/app/page.tsx (Hero H1)
- src/app/contact/page.tsx (metadata + visible copy)
- src/app/how-to-instruct/page.tsx (visible copy)
- src/app/case-types/page.tsx (visible copy)
- src/app/insights/page.tsx (metadata)
- src/lib/services-content.ts (litigation-support and professional-negligence meta descriptions)

Problem: generic positioning says "legal professionals" but several hub pages, metadata,
and the shared service H2 say "solicitors" — a UK-specific term narrower than the stated
audience.
Fix: change generic instances to "legal teams" / "legal professionals" / "counsel and
law firms". Keep "solicitor" inside UK-specific MDX articles and CPR Part 35 sections.
Verify: grep -rn "solicitor" src/lib/ src/app/ src/components/ src/config/ — each hit
should be either UK-specific context or neutralized.

P0.4 — Sterling pricing examples need UK-market framing (Option B)

Files: src/lib/industry-stats.ts, src/components/stats-table.tsx
Problem: homepage shows £200–£550/hr and £3,000–£15,000 fee ranges without clarifying
these are UK market reference benchmarks.
Fix: label rates as UK market reference in the stats table caption/disclaimer and
industry-stats source column where appropriate.
Verify: homepage copy no longer reads as universal pricing.

P0.5 — Placeholder data blocking schema completeness (BLOCKED — needs real business data)

File: src/config/site.ts
Problem: legal entity name, company number, expert identity/credentials, experience
metrics, phone, address, regulatory statements, LinkedIn URL, and testimonials are all
still [PLACEHOLDER]. isPlaceholder() correctly omits these from JSON-LD for now — this
is safe — but it means Organization schema is currently missing telephone, address, and
sameAs, which are meaningful trust signals once real.
This is not a code task — it needs real business data from you before Cursor can act.
Once you have real values:

- Replace every [PLACEHOLDER] in src/config/site.ts with verified data.
- Replace the four MDX article author: "[PLACEHOLDER] Expert Full Name" fields in
  content/insights/*.mdx with real author names (or a consistent "Editorial Team"
  byline if individual bylines aren't available yet).
- Replace [PLACEHOLDER] Controller details in the privacy policy content.
- Replace placeholder limitation-of-liability copy in /terms content.
Verify: grep -rn "\[PLACEHOLDER\]" src/ content/ returns nothing. Re-run Rich
Results Test — Organization schema should now include telephone/address/sameAs.


P1 — High value, do next

P1.1 — Wire up or remove unused defaultKeywords

File: src/lib/seo.ts
Problem: defaultKeywords is exported but no route imports it — dead code that could
mislead a future editor into thinking it's the fallback keywords source.
Fix: use it as the fallback in buildMetadata() when no page-specific keywords array is
supplied — several hub pages (About, Services hub, Case-types hub, Contact, How to
instruct, Insights hub, legal pages) currently have no keywords array at all.
Verify: grep -rn "defaultKeywords" src/ shows real usage.

P1.2 — Route-specific OG images instead of one shared image reused everywhere

Files: src/app/opengraph-image.tsx, new src/app/insights/[slug]/opengraph-image.tsx,
new src/app/logo/route.tsx (square brand mark)
Problem: the same 1200×630 image is used for every page's OG/Twitter card, the
Article schema image, and the Article publisher.logo — a social banner is being
reused as an organization logo, which is semantically wrong (Google's logo guidelines
expect a square, brand-mark-only image, not a wide social card).
Fix:

- Add a square logo route (/logo, ~512×512) and use that for Organization.logo /
  Article.publisher.logo instead of the OG banner.
- Add src/app/insights/[slug]/opengraph-image.tsx for a per-article OG card (title +
  "Insight" label), keeping the site-wide banner as fallback for hub/static pages.
Verify: Rich Results Test shows a proper square logo on Organization; article pages
reference per-article OG URLs in metadata and Article schema.

P1.3 — Fix lastmod accuracy for static pages

Files: src/lib/seo/sitemap-lastmod.ts, new src/lib/seo/static-lastmod.ts
Problem: every non-insight path uses the npm run seo:generate run date, not real
content-modification dates.
Fix: add a STATIC_PATH_LASTMOD map with stable ISO dates per static/service/case-type
route and have sitemap-lastmod.ts prefer it over the generation-date fallback. Insight
articles already do this correctly via modified/date frontmatter — extend the same
pattern to static pages.
Verify: two consecutive builds with no content changes produce identical lastmod
values for static pages.

P1.4 — Fix inaccurate AdministrativeArea schema typing

File: src/components/json-ld.tsx (OrganizationJsonLd, ServiceJsonLd)
Problem: areaServed uses AdministrativeArea for "Courts and tribunals" and
"International arbitration" — neither is a geographic administrative area. ServiceJsonLd
also claims areaServed: "Worldwide" despite Option B positioning.
Fix (Option B): drop geographic areaServed from OrganizationJsonLd; rely on serviceType
and knowsAbout. Change ServiceJsonLd areaServed to audience-focused or remove the
geographic Place claim.
Verify: Schema.org validator / Rich Results Test shows no type-mismatch warnings on
areaServed.

P1.5 — Verify and align jurisdiction language with Option B

Files: src/lib/services-content.ts, content/insights/*.mdx, homepage copy
Fix: grep for CPR Part 35, Practice Direction 35, Companies Act 2006, ICO, and
"London-seated arbitration" and keep with clear English-law framing where
jurisdiction-specific. Arbitration FAQ London reference is acceptable as practice detail
under Option B.
Verify: manual content read-through — no page should imply a UK-specific procedural
rule applies globally without qualification.


P2 — Cleanup and CI hardening

P2.1 — Reconcile the insights hub meta description with visible copy

File: src/app/insights/page.tsx
Problem: meta description says "Articles for solicitors," while visible page copy
says "legal professionals."
Fix: align to "legal professionals" per Option B.

P2.2 — Fix tag overlap so the "no related insights" gap closes

File: content/insights/loss-of-profits-commercial-litigation.mdx
Problem: this article shares no tag with the other three, so getAllInsights()'s
related-post selection (exact tag match, max 3) likely returns nothing for it.
Fix: add at least one shared tag (e.g. expert witness) so it participates in the
related-articles internal-linking system like the other three.
Verify: render /insights/loss-of-profits-commercial-litigation and confirm a
"Related insights" block now appears.

P2.3 — Update stale docs referencing removed pages / old positioning

Files: README.md, POST_LAUNCH_SEO.md, LAUNCH_CHECKLIST.md, CONTENT_REPLACEMENT.md
Fix: remove references to a "possible UK office," UK directories as required steps,
and the deleted /experts/lead-expert smoke-test URL. Align wording with Option B.

P2.4 — Expand CI checks

File: .github/workflows/seo-checks.yml
Problem: CI only runs on PRs (not every push), and doesn't run Lighthouse, link
checking, schema validation, or title/description length checks.
Fix: add push to main trigger and consolidate verification via npm run seo:verify:all.
Lighthouse and linkinator remain follow-up workflows.

P2.5 — Add favicon / manifest

Files: src/app/icon.tsx, src/app/apple-icon.tsx, src/app/manifest.ts
Problem: no favicon or web app manifest exists.
Fix: add icon, apple-icon, and manifest following Next.js App Router conventions.

P2.6 — 404 page emits a false /404 canonical

File: src/lib/seo.ts (buildNotFoundMetadata)
Problem: not-found metadata sets canonical to /404, but that URL is not a real route;
404 responses occur on arbitrary missing paths.
Fix: emit noindex without a canonical URL (or omit alternates.canonical entirely).
Verify: rendered 404 has robots noindex and no canonical link to /404.


P3 — Strategic, larger lift (out of scope for this implementation pass)

P3.1 — Execute the documented content plan (8–12 articles; currently 4 exist)
P3.2 — Search Console / Bing submission and monitoring (operational, not code)


Regression checklist (run after every task above)

- grep -rn "\[PLACEHOLDER\]" src/ content/ — clean once P0.5 data is supplied
- npm run seo:verify:all passes (sitemap, SSR metadata, canonical checks)
- public/robots.txt no longer disallows /thank-you; page-level noindex still present
- Rich Results Test clean on: /, one /services/[slug], /insights/[slug]
- No leftover "solicitor"-only phrasing in pages meant to read as region-neutral
- No new 404s via a full crawl
- Static sitemap lastmod stable across consecutive builds with no content changes
