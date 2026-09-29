# CEDELA Tech Park Solutions: website

The corporate website and digital experience platform for CEDELA Tech Park Solutions Ltd.

- **Framework:** Next.js 16 (App Router, React 19, Turbopack), TypeScript, Tailwind CSS v4
- **Content:** Sanity v6 with an embedded Studio at `/studio` and **Sanity Live** for instant publishing
- **Email:** Resend (contact, consultation, iRES incident reports, careers with CV upload, newsletter)
- **Motion:** Motion (Framer Motion) for reveals and interactions, Lenis for smooth scrolling. Both respect reduced-motion settings.

The site ships with complete built-in content, so it renders fully before Sanity is connected. Once a Sanity project is connected, anything published in the Studio takes precedence.

---

## Getting started

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev                  # http://localhost:3000
```

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` | Generate route types and run TypeScript |
| `npm run lint` | ESLint |
| `npm run seed` | Import all built-in content into Sanity so it is editable |

---

## Sanity setup (content management)

1. Create a project at <https://www.sanity.io/manage> (dataset: `production`).
2. Add to `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. In the project's **API** settings:
   - **CORS origins:** add `http://localhost:3000` and the production URL (for example `https://www.cedelatechpark.ng`), both with **Allow credentials** ticked.
   - **Tokens:** create a **Viewer** token for `SANITY_API_READ_TOKEN` (draft previews) and an **Editor** token for `SANITY_API_WRITE_TOKEN` (seeding only).
4. Run `npm run seed` once. This uploads the images and creates site settings, home page, all 35 services, 12 industries, insights and legal pages.
5. Open `/studio`, sign in, and start editing.

### How instant publishing works

Every query runs through `sanityFetch` from `defineLive` (`sanity/lib/live.ts`). Pages are statically generated and tagged with Sanity sync tags, and `<SanityLive />` in the site layout subscribes to Sanity's Live Content API. When an editor presses **Publish**, only the affected pages are revalidated and any open browser refreshes automatically. No redeploy, no waiting.

Optional safety net: create a GROQ webhook in Sanity pointing to `https://YOUR-DOMAIN/api/revalidate`, with `SANITY_REVALIDATE_SECRET` as the secret.

### Visual editing

The Studio includes the **Presentation** tool: editors see the live site side by side with the editor and can click any text to edit it. This needs `SANITY_API_READ_TOKEN`.

### What editors can manage

| Studio section | Controls |
| --- | --- |
| Home page | Hero headline, subheading, image, featured insights, closing call to action |
| Site settings | Email, phone numbers, offices and photos, social links, corporate profile PDF, Investor Information Memorandum PDF, announcement bar, default SEO |
| Insights | Articles, white papers (with downloadable file), research, case studies, webinars and videos, regulatory updates, cyber advisories, AI updates |
| Services / Industries | Every field on every service and industry page. New slugs create new pages automatically |
| Leadership & team | Executive team, board and advisory board, with portraits and bios |
| Vacancies | Open roles, shown on `/careers` with their own application page |
| Partners | Partner names and logos, grouped by partnership type |
| Testimonials | Shown on the home page once published |
| Legal pages | Privacy Policy (`privacy`) and Terms of Use (`terms`) |

---

## Resend setup (email)

1. Create an account at <https://resend.com> and add the domain `cedelatechpark.ng`. Add the DNS records Resend provides (SPF, DKIM) at your DNS host.
2. Create an API key and set `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL` to an address on the verified domain, for example `CEDELA Website <website@cedelatechpark.ng>`.
4. Set inbox routing: `CONTACT_INBOX` is the default; `BUSINESS_INBOX`, `MEDIA_INBOX`, `CAREERS_INBOX`, `INVESTORS_INBOX`, `PARTNERSHIPS_INBOX` and `IRES_INBOX` are optional overrides. **`IRES_INBOX` should be a monitored, 24/7 address.**
5. For the newsletter, create a segment in Resend and set `RESEND_SEGMENT_ID` (optional; without it, contacts are still added).

Every form sends an internal notification (reply-to set to the visitor) and a branded acknowledgement to the visitor, with a reference number. Forms are protected by a honeypot, a minimum fill time and rate limiting. In development without an API key, emails are logged to the console instead of sent.

---

## Project structure

```
app/
  (site)/            Public website (header, footer, Sanity Live)
  studio/            Embedded Sanity Studio
  api/               Draft mode and revalidation routes
components/          UI, motion, sections, forms, layout
content/             Built-in content and shared types (seed for Sanity)
lib/                 Data layer (Sanity with fallback), server actions, email
sanity/              Schemas, Studio structure, clients
scripts/             Sanity seed script
public/images/       Photography
```

## Pages

Home · About · Leadership & governance · Our approach · Services (4 practices, 35 service pages) · Solutions (5 detail pages) · Products · iRES · iRES incident reporting portal · Industries (12) · Insights (hub and articles) · Innovation & research · Partnerships · Careers (and vacancy pages) · Investors · Sustainability & ESG · Contact · Book a consultation · Corporate profile · Client portal · Privacy · Terms · 404 · sitemap.xml · robots.txt · Open Graph image.

## Deployment

Vercel is the simplest host for Next.js and works with Sanity Live out of the box. Azure or AWS (as suggested in the content pack) also work: run `npm run build` and `npm start` on Node.js 20.9 or newer. Add every variable from `.env.example` to the host's environment settings, and add the production domain to Sanity's CORS origins.

## Notes before launch

- Official logo assets are in `public/logo` (PNG). An SVG version of the lockup would sharpen the logo further on very large screens.
- Photography is from Unsplash (free commercial licence). Swap in CEDELA's own photos through Sanity when available.
- Have the Privacy Policy and Terms of Use reviewed by counsel before launch.
- Update social media links in Site settings.
