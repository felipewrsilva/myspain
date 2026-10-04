---
name: add-anuncio
description: >-
  Adds a community listing (anúncio) to Minha Espanha: content/anuncios.ts,
  images in public/anuncios, WhatsApp/Instagram contacts, and detail-page
  sections. Use when the user asks to add, criar, publicar, or cadastrar
  anúncio, listing, classificado, or a new /anuncios slug.
---

# Add anúncio

Clone the last published listing. Do not invent a new page type, CMS, or route. Data lives in `content/anuncios.ts`. `getAds()` in `src/lib/anuncios.ts` already feeds `/anuncios`, `/anuncios/[slug]`, and the sitemap.

Reference implementation: slug `nomada-de-mascotas` in `content/anuncios.ts`.

## Before writing

Copy this checklist:

```
Task Progress:
- [ ] Facts from the user (do not invent phone, price, coverage)
- [ ] Unique kebab-case slug
- [ ] Hero image in public/anuncios/
- [ ] Object appended to ads[]
- [ ] Disclaimer uses ad.provider, not a hardcoded name
- [ ] Browser: /anuncios and /anuncios/[slug]
- [ ] tests/images.test.ts (local files exist)
```

If the user did not give name, what they offer, city/coverage, and at least one contact, ask. Do not fill gaps with guesses.

## Files

| Role | Path |
| --- | --- |
| Data + types | `content/anuncios.ts` |
| Getters | `src/lib/anuncios.ts` (do not duplicate the array) |
| List | `src/app/anuncios/page.tsx` |
| Detail | `src/app/anuncios/[slug]/page.tsx` |
| Contact UI | `src/components/AdContactLinks.tsx` |
| Images | `public/anuncios/*.jpg` |
| Image tests | `tests/helpers/site-images.ts`, `tests/images.test.ts` |

Append a new object to `ads`. Keep existing entries intact. Newest or `featured: true` sorts first via `getAds()`.

## Required fields

Match type `Ad`. Minimum that the UI needs:

- `slug`: unique, kebab-case, no accents
- `title`, `summary` (card + meta), `description` (lead)
- `location`, `category`, `categoryId`, `features` (3 short card bullets)
- `image`, `imageAlt`
- `contacts` (at least one)
- `publishedAt`: `YYYY-MM-DD` (today unless the user dates it)

Default category for community services: `category: "Serviços"`, `categoryId: "servicos"`. Set `subcategory` to the niche (ex.: Pet care).

## Full listing (same depth as Nómada)

Fill these unless the user says to keep it short:

- `body`: 1 or 2 short PT-BR paragraphs
- `tagline`: optional Spanish line only if the advertiser uses it
- `locationDetail`: label, region, description, map link, city photo
- `services`: 2 or 3 cards (`title` can stay in Spanish if that is the brand; `subtitle` in PT-BR)
- `audience`, `bookingSteps` (3 steps), `prepareChecklist`, `questionsToAsk`, `faqs` (include one FAQ that Minha Espanha does not take payment)
- `provider`, `providerRole`
- `price`: `null` unless they gave a real figure. `priceNote` for “a combinar”
- `featured`: only if the user asks to highlight

Do not put a second listing’s WhatsApp prefill on a file-level `const` that collides. Name the constant after the slug (`fooWhatsAppMessage`).

## Contacts

Types: `whatsapp` | `instagram` | `email` | `phone` | `url`. First contact is the primary CTA.

WhatsApp:

- Display `value` with spaces as the advertiser writes it
- `href`: `https://wa.me/34XXXXXXXXX?text=` + `encodeURIComponent(...)`
- Spain mobile: prefix `34`, digits only in the path
- Prefill: greet by first name, cite the listing title and Minha Espanha, ask for availability/values. Do not invent a different pitch per vertical unless the user supplies it.

Instagram: `value` as `@handle`, `href` `https://www.instagram.com/{handle}/`.

## Images

- Hero: `public/anuncios/{slug}.jpg` → `image: "/anuncios/{slug}.jpg"`
- File on disk must exist and be > 500 bytes (`tests/images.test.ts`)
- Do not reuse another advertiser’s photo
- Madrid city panel may reuse `/anuncios/madrid-gran-via.jpg`. Other cities: add a dedicated file
- Alt in PT-BR, concrete. No remote Unsplash URLs in `content/` or `src/`
- If the user did not attach a photo, ask. Do not steal a random image from `/public/images/unsplash/` already used as a guia cover

## Voice

- PT-BR, short sentences. Explain a Spanish term on first use.
- Minha Espanha only divulga. Deal, price, and schedule stay with the advertiser.
- Do not invent prices, coverage, or credentials.
- No em dash or en dash in copy or in this workflow’s commits.

## Page copy that must stay generic

`src/app/anuncios/[slug]/page.tsx` must not hardcode a person (the Nómada disclaimer once said “a Carol”). Use `ad.provider` (fallback: “o anunciante”). Headings like “Checklist do tutor” are pet-specific: if the new listing is not pet care, use a generic heading (“Antes de reservar”) before publishing.

Do not change list/detail layout unless a field is missing from the type.

## Verify

1. Open `/anuncios`: card title, summary, bullets, image.
2. Open `/anuncios/[slug]`: hero, contact box, body, location, services, FAQs, disclaimer with the new provider.
3. Confirm WhatsApp/Instagram `href`s. Do not send messages.
4. `npm test` (image existence) and `npm run lint` if TSX changed.
5. Do not commit unless asked.
