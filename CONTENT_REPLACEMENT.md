# Content replacement guide

The site no longer shows `[PLACEHOLDER]` text publicly. To enrich structured data and legal pages, add verified details to `src/config/site.ts` when available:

| Field | When to add |
|-------|-------------|
| `legalEntityName` | Registered company or trading name (currently: Commercial Dispute Expert) |
| `companyNumber` | Companies House number |
| `contact.phone` / `phoneTel` | Working instruction line |
| `contact.address` | Registered or service address (auto-shown on privacy policy) |
| `socialLinks.linkedin` | Live company LinkedIn URL |
| `testimonials` | Signed-off quotes (section hidden until array has entries) |
| `expert.*` | Only if publishing named expert profiles in future |

Insight articles use the byline **Commercial Dispute Expert Editorial Team**. Change individual `author` fields in `content/insights/*.mdx` when named authors are approved.

Privacy policy and terms use live config values. Have a solicitor review terms before relying on them in production.

The former `/experts/` route has been removed; expert profiles are not published before instruction.
