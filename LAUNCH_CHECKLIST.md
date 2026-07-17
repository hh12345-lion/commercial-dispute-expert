# Launch checklist — commercialdisputeexpert.com

## Pre-launch content (required)

- [ ] Replace all `[PLACEHOLDER]` values in `src/config/site.ts`
- [ ] Add verified expert photo to `public/images/` if publishing named expert profiles in future
- [ ] Replace testimonial placeholders with approved quotes (or remove section)
- [ ] Legal review of `privacy-policy`, `terms`, and `cookie-policy`
- [ ] Confirm company number, registered address and regulatory memberships

## DNS & hosting

- [ ] Deploy to Vercel (or chosen host)
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://commercialdisputeexpert.com`
- [ ] Point apex and `www` DNS to Vercel (choose canonical: apex or www — configure 301 redirect)
- [ ] Verify SSL certificate active
- [ ] Test all routes return 200 (no 404s)

## Forms & email

- [ ] Create Resend account and verify sending domain
- [ ] Set `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL`
- [ ] Submit test enquiry on `/contact` and `/how-to-instruct`
- [ ] Confirm emails arrive and reply-to is correct

## SEO technical

- [ ] Run `npm run seo:generate` and commit `public/sitemap.xml` + `public/robots.txt`
- [ ] Run `npm run seo:verify` and `npm run seo:verify:ssr`
- [ ] Submit sitemap in Google Search Console: `https://commercialdisputeexpert.com/sitemap.xml`
- [ ] Submit sitemap in Bing Webmaster Tools
- [ ] Request indexing for homepage and key service pages
- [ ] Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Run Lighthouse on homepage and one service page (target: good CWV)
- [ ] Confirm `robots.txt` allows crawling

## SEO (technical)

- [ ] Run `npm run seo:verify:all` before each release
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain (no trailing slash)
- [ ] Replace `[PLACEHOLDER]` in `site.ts` before expecting rich results
- [ ] Google Search Console + Bing: submit `sitemap.xml`
- [ ] See `docs/SEO.md` and `POST_LAUNCH_SEO.md` for content/backlinks

## Contact / leads

- [ ] Add row 1 headers on tab **Sheet8** (see `docs/google-sheets.md`)
- [ ] Share spreadsheet with service account as **Editor**
- [ ] Set `GOOGLE_*` env vars in Netlify and `.env.local`
- [ ] Run `npx tsx scripts/test-sheets.ts` locally
- [ ] Optional: `Lead_notification_url` for n8n (`Full Name`, `Email`, `Phone Number`, `Brand name`)
- [ ] Optional: `RESEND_API_KEY` for full enquiry email

## Analytics (optional)

- [ ] Set tracking IDs in `.env` as needed (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GTM_ID`, etc.)
- [ ] Verify cookie banner, reject/accept/customise, and footer **Cookie settings**
- [ ] Confirm trackers do not load until the matching category is consented (network tab)

## Post-launch (first 90 days)

See `POST_LAUNCH_SEO.md` for directory listings, content calendar and backlink tasks.

## Smoke test URLs

- `/`
- `/services/commercial-dispute-expert-witness`
- `/how-to-instruct`
- `/insights`
- `/contact`
