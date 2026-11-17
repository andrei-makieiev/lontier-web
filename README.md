# Lontier — website (Next.js)

Luxury Lifestyle & Executive Concierge · *The art of connection*

Production build of the approved design (`lontier-demo.html`), as a Next.js 16
App Router project in TypeScript. There's no UI library and no CSS framework.
The stylesheet is the approved one, so the site looks exactly like the demo.

## Run it

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Where things live

| Path | What |
|---|---|
| `lib/site.ts` | **All contact details**. Phone and WhatsApp are real; Telegram, Instagram and emails are placeholders marked TODO. |
| `lib/content.ts` | Page copy: the seven services, pillars, steps, Why Us. |
| `components/Sections.tsx` | Static sections: Hero, The Founder, Philosophy, How It Works, Beyond Borders, Why Us, The House, Quote, Footer. |
| `components/Services.tsx` | III. What We Do. The accordion (one panel open at a time); "Enquire about X" pre-fills the form. |
| `components/Enquiry.tsx` | VIII. Enquiry. Contact channels plus the four-field form (posts to `/api/enquiry`). |
| `components/Chrome.tsx` | Floating UI: nav, progress line, Enquire pill, "Ring the bell" contact dock. |
| `components/CookieConsent.tsx` | GDPR banner. `getConsent()` tells you whether analytics may load. |
| `components/Motion.tsx` | Scroll motion (word-by-word headlines, fade-ups, frame reveals, photo drift). Off under *reduce motion*. |
| `components/Frame.tsx` | The single image frame of the design system (photo + one hairline; `print` 4:5 or `arch`). |
| `app/privacy/page.tsx` | Privacy Policy page (**draft**, see below). |
| `app/api/enquiry/route.ts` | Enquiry endpoint: validation, honeypot, delivery to the Telegram bot (optional email copy via Resend). |
| `scripts/telegram.mjs` | Telegram helpers: `npm run telegram:chat-id` and `npm run telegram:test`. |
| `app/globals.css` | The approved stylesheet + the v11 design-system rules (at the end). |
| `app/fonts/` | Self-hosted Marcellus, Jost, Cormorant Garamond (no calls to Google). |
| `public/images/` | All photography. `next/image` serves AVIF/WebP at the right size. |

## Enquiry delivery (Telegram bot)

Every enquiry is posted by a Telegram bot to a chat you choose: your own chat
with the bot, or a private group (so several people can follow enquiries).
When the visitor leaves a phone number, the message has a **Reply on WhatsApp**
button. Visitors also get a "Continue on WhatsApp" button after sending, and if
delivery ever fails, the error offers the same WhatsApp link, so no enquiry is lost.

**Setup (about 3 minutes)**
1. In Telegram, open **@BotFather** → `/newbot` → choose a name (e.g. *Lontier
   Enquiries*) and a username ending in `bot`. BotFather replies with a **token**.
2. Decide where enquiries should arrive:
   - *Just you:* open your new bot and press **Start**.
   - *A team:* create a private group, add the bot to it, and send any message in the group.
3. Find the chat id. Either run `TELEGRAM_BOT_TOKEN=<token> npm run telegram:chat-id`
   from this folder, or open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a
   browser and copy the `chat` → `id` value. A group id starts with `-100`.
   Optional check: `TELEGRAM_BOT_TOKEN=… TELEGRAM_CHAT_ID=… npm run telegram:test`
   sends a test message.
4. In the hosting dashboard (Vercel: *Settings → Environment Variables*;
   Netlify: *Site configuration → Environment variables*) set
   `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, then **redeploy**.
5. Send a test enquiry from the site.

Keep the token secret. It lives only in the hosting settings, never in the code.
If it leaks, use `/revoke` in @BotFather and update the variable.

**Email (optional)** — also set `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM`
to keep a written copy of each enquiry.

## Deploy (free)

**Netlify (free plan allows commercial sites)**
1. Push this folder to a GitHub repository.
2. On netlify.com: *Add new project → Import from Git →* choose the repo.
   Netlify detects Next.js; keep the defaults and deploy.
3. *Site configuration → Environment variables*: add the variables above.
4. *Domain management*: connect `lontier.com` when ready.

**Vercel (made by the Next.js team; the free Hobby plan is for non-commercial use)**
Good for showing the client a preview link: `npx vercel` from this folder, or
import the GitHub repo on vercel.com. For the live business site use Vercel Pro
or Netlify.

## Before launch

- Telegram, Instagram and email in `lib/site.ts` (marked TODO).
- Telegram delivery configured (see above) and tested with a real enquiry.
- Miriam's portrait: replace `public/images/founder-placeholder.jpg` (AI-generated stand-in), same 4:5 crop.
- Privacy Policy: fill the bracketed placeholders (registered name, NIPC,
  address, providers, retention periods) and have it reviewed by a Portuguese
  data-protection lawyer.
- The client's name artwork: replace the text lockup in `Hero`
  (`components/Sections.tsx`, comment marks the spot) and the seal "L" in
  `components/Seal.tsx` once the logo exists. Swap `app/icon.png` for the logo.
- Map label: `public/images/beyond-map-gold-no-label.png` is ready if "LISBON"
  should go (one line in `BeyondBorders`).
- Photos i, iii and iv show third-party brand logos (Chanel, Rolls-Royce,
  Valentino, Cartier): confirm the usage rights or retouch them.
- If analytics are added, load them only when `getConsent() === "all"`.
