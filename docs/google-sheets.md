# Instruction form → Google Sheets

Each successful **`/api/instruct`** submission (how-to-instruct form only) appends one row when Google Sheets env vars are set. Contact form submissions do not write to Sheets.

## Spreadsheet header row (row 1 on tab `Sheet8`)

Create these columns **in this exact order** (columns A–I):

| Col | Header name |
|-----|-------------|
| A | Timestamp |
| B | Full Name |
| C | Email |
| D | Phone Number |
| E | Law Firm |
| F | Form Type |
| G | Case Type |
| H | Message |
| I | Brand name |

Share the spreadsheet with your service account email as **Editor** (uncheck “Notify people”).

## Environment variables

Add to `.env.local` (never commit):

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_spreadsheet_id_from_the_url
GOOGLE_SHEET_TAB_NAME=Sheet8
```

On **Netlify**: add the same variables under Site → Environment variables.

## Test connection

```bash
npx tsx scripts/test-sheets.ts
```

## Production routing

- **`/api/submit-lead`** → Netlify function → n8n webhook (see `Lead_notification_setup.md`)
- **`/api/instruct`** → Next.js route → Google Sheets (instruction enquiries only)
