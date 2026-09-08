# All Play Productions

A complete single-page React/Vite website and Express API, using JavaScript, Tailwind CSS 4, Lucide React and Framer Motion. Original local theatre illustrations keep the preview usable without publishing unapproved photographs or invented events. No database, CMS, authentication or personal-data storage.

## Requirements and installation

Use Node.js 22.12+ (Node 24 LTS recommended) and npm. Run commands from the project root:

```sh
npm install
```

Copy `.env.example` to `.env`. In PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS/Linux, use `cp .env.example .env`. Set `NODE_ENV=development` locally. Dependencies are pinned by the committed npm lockfile; subsequent clean deployments should use `npm ci`.

## Development

```sh
npm run dev
```

Vite serves http://localhost:5173 and proxies `/api` to Express at http://localhost:3000. Both processes reload on changes. To run separately, use `npm run dev -w server` and `npm run dev -w client` in two terminals. The Vite proxy uses port 3000; update `client/vite.config.js` if changing the backend port.

## Build and production

```sh
npm run lint
npm test
npm run build
npm start
```

Open http://127.0.0.1:3000. `build` compiles the frontend to `client/dist/` and syntax-checks the JavaScript server (Express needs no transpilation). `start` serves both the compiled React website and API through Express. Vite preview is not the production server. If port 3000 or 5173 is occupied by another application, choose a free port and update the Vite proxy and CORS allowlist to match; the server reports port conflicts explicitly.

For a Node hosting service: install with `npm ci`, build with `npm run build`, then start with `npm start`. Include client/dist, server, shared, package manifests, lockfile, and production dependencies in the deployment. Set `NODE_ENV=production`, the host-provided `PORT`, and `CORS_ORIGINS` to the exact deployed origin. Terminate HTTPS at the host/reverse proxy; enable gzip/Brotli there. Configure `TRUST_PROXY_HOPS` only for the actual trusted proxy topology (default 0). Do not set it blindly to 1. A health check is available at `/api/health`. Stop with Ctrl+C; the server closes gracefully.

## Editable content

`client/src/data/index.js` is the single content entry point, re-exporting dedicated editable data files:

| File        | Content                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------- |
| contact.js  | Brand, founder, phone, WhatsApp, email, venue, timings, social links, canonical placeholder |
| programs.js | Program cards, ages, descriptions and unconfirmed batch details                             |
| learning.js | Six learning outcomes                                                                       |
| events.js   | Seven sample activity types and highlights                                                  |
| gallery.js  | Nine gallery items and image descriptions                                                   |

Set WhatsApp to its full international digits (for example `91` plus the approved ten-digit number). Empty contact fields show “To be confirmed”; WhatsApp buttons link to Contact until configured. Program buttons preselect the corresponding enquiry option. If adding program IDs, update `shared/validation.js` as well, which intentionally supplies the server's allowlist.

Editorial section copy is in `client/src/sections/`. Theme colours and typography are in `client/src/index.css` (`@theme` provides Tailwind utility colours). Google Fonts loads only DM Sans and Playfair Display with swap behaviour. The local SVGs scale to every breakpoint without duplicate raster downloads. For approved responsive photography, see `client/src/assets/README.md`.

## API behaviour

`POST /api/enquiries` accepts JSON with `name`, `age` (string), `mobile`, `email`, `program`, optional `message`, and boolean `consent`.

```json
{
  "name": "Test Parent",
  "age": "12",
  "mobile": "+91 98765 43210",
  "email": "parent@example.com",
  "program": "children",
  "message": "Please tell me about the program.",
  "consent": true
}
```

All required values are validated on both client and server. Indian mobile formats accept spaces, parentheses, hyphens, a leading zero or country code. Age accepts whole numbers 5–99 as a reasonable enquiry range; advertised children's and teen program ages remain 7–14 and 15–19. Names support Unicode; plain text is trimmed and control characters/angle brackets removed. Name length is 2–100 and optional message maximum is 2,000 characters.

Responses consistently contain `success` and `message`, with an `errors` object on validation failures. Status codes: 200 success, 422 field validation, 400 malformed JSON, 413 oversized body, 415 unsupported content type, 403 disallowed origin, 429 rate limit. Limit: 10 requests per IP per 15 minutes; JSON body limit: 16 KB. Helmet supplies security headers. CORS uses the comma-separated `CORS_ORIGINS` environment allowlist. The built-in rate-limit memory store is appropriate to this single-process deployment; multiple replicas require a shared rate-limit store.

**The endpoint only validates and returns success. It does not email, save, register a participant or notify anyone.** The form and response explicitly explain this. Comments in `server/app.js` mark the integration point for approved email, Google Sheets or database delivery later. Add delivery failure handling and await confirmation before claiming successful delivery. No form data is logged by the application; ensure hosting logs also exclude request bodies.

## Assets, metadata and launch

All placeholder illustrations are local and original; no Instagram imagery was scraped or reused. `scripts/generate-placeholders.js` can recreate them and the PNG Apple icon. The founder illustration is explicitly not a likeness. Founder biography and quote need approval. Sample events have no fabricated dates, participants or venues. All seven activity categories appear after “Explore All Activities”. Batch details show the required confirmation notice.

Replace the example.com domain in `client/index.html`, `client/public/sitemap.xml`, `client/public/robots.txt`, `client/public/organization.jsonld`, and `contact.js` together. The JSON-LD placeholder uses Schema.org `PerformingGroup`, a valid organisation subtype, instead of inventing an unsupported Theatre/PerformingArtsOrganization type. Add only confirmed address/contact properties. Replace the SVG social-image placeholder with an approved PNG/JPG and update its absolute metadata URL. Preview privacy and terms links open clearly labelled placeholder dialogs; publish approved policies before launch. Keep the preview private or configure hosting-level noindex until approved.

## Quality checks

```sh
npm run lint
npm test
npx playwright install chromium
npm run test:browser
```

Browser tests start Express automatically (build first). They check widths 320, 375, 768, 1024 and 1440; horizontal overflow; all initial image assets; mobile menu keyboard behaviour; gallery focus containment, arrows and restoration; sample-event/policy modals; program selection; inline errors; successful form reset; and preserving input on a network failure. Screenshots are saved in the ignored `test-results/` folder. API tests cover validation, sanitisation, mobile formats, CORS, Helmet, malformed JSON, body limits, rate limits and response privacy. Lighthouse scores are environment-dependent and not guaranteed; re-audit using production hosting and final approved images.

## Final project tree

```text
All Play Production/
├── client/
│   ├── public/
│   │   ├── assets/{hero,children,teens,workshop,stage,founder,social-placeholder}.svg
│   │   ├── apple-touch-icon.png
│   │   ├── favicon.svg
│   │   ├── organization.jsonld
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── assets/README.md
│   │   ├── components/
│   │   │   ├── Cards.jsx (ProgramCard, LearningCard, EventCard, GalleryItem)
│   │   │   ├── EnquiryForm.jsx
│   │   │   ├── Footer.jsx (Footer, ScrollToTop, WhatsAppButton)
│   │   │   ├── Header.jsx (Header, Logo, MobileMenu)
│   │   │   ├── Modal.jsx
│   │   │   └── UI.jsx (SectionHeading, PrimaryButton, Reveal, Artwork, Icon)
│   │   ├── data/{index,contact,programs,learning,events,gallery}.js
│   │   ├── sections/{Hero,About,Programs,WhyTheatre,Community,Contact}.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── refinements.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   └── test/enquiries.test.js
├── shared/validation.js
├── scripts/{dev,generate-placeholders,visual-check}.js
├── tests/site.spec.js
├── .env.example
├── .gitignore
├── eslint.config.js
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

`client/dist/` is generated by the build. The pre-existing empty `example.txt` is untouched.

## Client confirmation checklist

- [ ] Approved logo files
- [ ] Founder’s approved photograph and biography
- [ ] Founder quote approval
- [ ] Phone and WhatsApp number
- [ ] Email address
- [ ] Training venue
- [ ] Session schedule
- [ ] Current admission status
- [ ] Batch start and end dates
- [ ] Program fees
- [ ] Registration terms
- [ ] Refund or cancellation policy
- [ ] Confirmed program duration
- [ ] Approval to publish “35 in-depth sessions”
- [ ] Approved performance and workshop photographs
- [ ] Event names and dates
- [ ] Privacy Policy
- [ ] Terms and Conditions
- [ ] Official domain and canonical URL
- [ ] Enquiry delivery method, if submissions should reach the team

Implementation references: [Vite guide](https://vite.dev/guide/) and [Express security guidance](https://expressjs.com/en/advanced/best-practice-security/). User-supplied Instagram references are retained as links only; their contents could not be independently retrieved during implementation.
