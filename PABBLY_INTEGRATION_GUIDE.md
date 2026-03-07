# Pabbly Connect — Webhook Integration Guide for Lead Forms

This guide explains how to replace the dummy lead capture with a live Pabbly Connect webhook.

## Step 1: Create a Pabbly Connect Workflow

1. Log in to [Pabbly Connect](https://www.pabbly.com/connect/)
2. Click **"Create Workflow"**
3. Name it: `Narayana IIT-JEE Guwahati — Lead Capture`

## Step 2: Set Up the Trigger (Webhook)

1. For the **Trigger**, select **"Webhook / API"**
2. Pabbly will generate a unique webhook URL, for example:
   `https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNT...`
3. **Copy this URL** — you'll need it in Step 4

## Step 3: Test the Webhook

1. In Pabbly, click **"Capture Webhook Response"** to start listening
2. Send a test POST request using curl or the test form:
   ```bash
   curl -X POST "YOUR_PABBLY_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Student",
       "mobile": "9876543210",
       "email": "test@example.com",
       "course_interest": "2-Year Programme (TYCP)",
       "student_class": "Class 11",
       "source": "test",
       "submitted_at": "2025-01-01T00:00:00.000Z",
       "page_url": "https://example.com",
       "utm_source": "google",
       "utm_medium": "cpc",
       "utm_campaign": "iit-jee-assam"
     }'
   ```
3. Verify Pabbly captures the response and shows all fields

## Step 4: Update the Code

Open `src/utils/webhookSubmit.js` and make these changes:

```js
// CHANGE 1: Replace the webhook URL with YOUR Pabbly URL
const WEBHOOK_URL = 'https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_ACTUAL_WEBHOOK_ID';

// CHANGE 2: Enable Pabbly mode
const USE_PABBLY = true;

// CHANGE 3: Disable dummy mode
const DUMMY_MODE = false;
```

That's it! The forms will now send data to Pabbly.

## Step 5: Set Up Actions in Pabbly

After the webhook trigger, add actions in your Pabbly workflow:

### Option A: Save to Google Sheets
1. Add action → **Google Sheets** → **"Add Row"**
2. Connect your Google account
3. Select your spreadsheet and sheet
4. Map fields:
   - Column A → `name`
   - Column B → `mobile`
   - Column C → `email`
   - Column D → `course_interest`
   - Column E → `student_class`
   - Column F → `source`
   - Column G → `submitted_at`
   - Column H → `utm_source`
   - Column I → `utm_campaign`
   - Column J → `gclid`

### Option B: Send Email Notification
1. Add action → **Email by Pabbly** → **"Send Email"**
2. To: `bm.guwahati@narayanagroup.com`
3. Subject: `New Lead: {{name}} - {{course_interest}}`
4. Body: Include all lead fields

### Option C: Send WhatsApp Notification (via Pabbly)
1. Add action → **WhatsApp Cloud API** or third-party
2. Send to your team's WhatsApp number
3. Message template with lead details

### Option D: Add to CRM
1. Add action → Your CRM (e.g., Zoho, HubSpot, Salesforce)
2. Map fields accordingly

## Step 6: Set Up a Second Workflow for Foundation Leads

The foundation form sends `source: "foundation-course"`. You can either:
- Use the SAME webhook URL (and filter by source in Pabbly)
- Create a SEPARATE workflow with a different webhook URL
  - If separate, create a new constant in `webhookSubmit.js`:
    ```js
    const FOUNDATION_WEBHOOK_URL = 'https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_FOUNDATION_WEBHOOK_ID';
    ```
  - And add a parameter to `submitLeadToWebhook()` to choose the URL based on source

## Available Lead Data Fields

Every form submission sends these fields to the webhook:

| Field | Description | Example |
|-------|-------------|---------|
| name | Student's full name | "Rahul Sharma" |
| mobile | Mobile number | "6002500672" |
| email | Email address | "rahul@example.com" |
| course_interest | Selected course | "2-Year Programme (TYCP)" |
| student_class | Current class | "Class 11" |
| source | Form identifier | "hero-form", "drawer-enroll-now", "foundation-course" |
| submitted_at | ISO timestamp | "2025-03-07T10:30:00.000Z" |
| page_url | Full page URL | "https://example.com/?utm_source=google" |
| user_agent | Browser info | "Mozilla/5.0..." |
| utm_source | Google Ads source | "google" |
| utm_medium | Traffic medium | "cpc" |
| utm_campaign | Campaign name | "iit-jee-assam-2025" |
| utm_term | Search keyword | "iit jee coaching guwahati" |
| utm_content | Ad content ID | "ad-variant-1" |
| gclid | Google Click ID | "EAIaIQobChMI..." |

## Google Ads UTM Tracking

When setting up Google Ads, use this URL template:
```
https://your-domain.com/?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}&gclid={gclid}
```

The landing page automatically captures all these parameters and sends them with every lead submission.

## Troubleshooting

- **Leads not appearing:** Check browser console for errors. Verify WEBHOOK_URL is correct.
- **CORS errors:** Pabbly webhooks accept POST from any origin, so this shouldn't happen. If it does, check your Pabbly plan.
- **Duplicate leads:** The app prevents duplicate submissions by mobile number (stored in localStorage). To reset, clear browser storage.
- **Test mode:** To re-enable test mode, set `DUMMY_MODE = true` in webhookSubmit.js.
