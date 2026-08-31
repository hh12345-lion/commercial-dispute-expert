# Contact / instruct forms → Google Sheets

Each successful form submission soft-appends one row to a **single shared tab** when Google Sheets env vars are set. **Form Type** distinguishes Contact vs Instruct. Sheet failures never block the user — the n8n webhook via `/api/submit-lead` is primary.

## Spreadsheet header row (row 1 on `GOOGLE_SHEET_TAB_NAME`)

Create these columns **in this exact order**:

| Col | Header name |
|-----|-------------|
| A | Timestamp |
| B | Brand |
| C | Form Type |
| D | Full Name |
| E | Email |
| F | Phone Number |
| G | Law Firm |
| H | Case Type |
| I | Message |

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

- **`/api/submit-lead`** → Netlify function → n8n webhook (see `Lead_notification_setup.md`) — **primary**
- **`/api/instruct`** → Next.js route → Google Sheets soft-fail (shared tab + Form Type)
