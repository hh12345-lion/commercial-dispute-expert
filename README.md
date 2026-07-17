# Commercial Dispute Expert

Marketing website for [commercialdisputeexpert.com](https://commercialdisputeexpert.com) — UK-qualified commercial dispute expert witness and forensic accounting connector for legal professionals worldwide.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- MDX insights (`content/insights`)
- Resend (optional) for contact forms

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (no trailing slash) |
| `RESEND_API_KEY` | Optional — sends contact form emails via Resend |
| `CONTACT_EMAIL` | Recipient for enquiries |
| `CONTACT_FROM_EMAIL` | Verified Resend sender |
| `Lead_notification_url` | n8n (or other) webhook for lead POST on contact submit |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_PRIVATE_KEY` / `GOOGLE_SHEET_ID` | Contact form → Google Sheets (tab `GOOGLE_SHEET_TAB_NAME`, default `Sheet8`) |
| `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional — load only after analytics consent |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_HOTJAR_ID` | Optional analytics tools |
| `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | Optional — load only after marketing consent |

Cookie consent is always shown on first visit; tracking IDs are gated by category.

Without `RESEND_API_KEY`, form submissions are logged to the server console in development.

## Content placeholders

Replace all `[PLACEHOLDER]` values in `src/config/site.ts` before go-live. Do not publish fabricated credentials or testimonials.

## Deploy (Vercel)

1. Push to GitHub and import project in Vercel
2. Set environment variables from `.env.example`
3. Add domain `commercialdisputeexpert.com` and configure DNS
4. Follow `LAUNCH_CHECKLIST.md`

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint
- `npm run seo:generate` — Regenerate `public/sitemap.xml` and `public/robots.txt`
- `npm run seo:verify` — Fail if sitemap drifts from `buildPublicUrlInventory()`
- `npm run seo:verify:ssr` — Check static routes export page metadata

Run `seo:generate` after adding routes to `APP_STATIC_PATHS` in `src/lib/seo/publicUrlInventory.ts`, or before release for fresh `lastmod` dates.

## SEO files (generated)

| Output | Path | Source |
|--------|------|--------|
| XML sitemap | `public/sitemap.xml` | `scripts/generate-seo.ts` |
| robots.txt | `public/robots.txt` | `scripts/generate-seo.ts` |

URL inventory: `src/lib/seo/publicUrlInventory.ts` (static paths + services + case types + insights).

## Project structure

```
src/
  app/           # Routes and layouts
  components/    # UI components
  config/        # Site content config
  lib/           # SEO, MDX, services content
content/
  insights/      # MDX blog articles
```

See `LAUNCH_CHECKLIST.md` and `POST_LAUNCH_SEO.md` for go-live and SEO tasks.
