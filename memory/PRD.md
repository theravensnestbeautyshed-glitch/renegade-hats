# Renégade Hats — PRD

## Original problem statement
Premium e-commerce website for handmade hat brand RENÉGADE HATS — one-of-a-kind, handcrafted distressed western hats for rebels, rule breakers, musicians, free spirits. Tagline "More Than a Hat… It's a State of Mind." / "One of a Kind. Handcrafted. No Rules." Dark rugged premium western outlaw aesthetic. Use the owner's real hat photos. Six hats in CAD: The Renegade $249, Midnight Renegade $249, Renegade Red $275, The Outlaw $275, The Wanderer $295, The Shaman $325. Later: redesign to match owner's reference image; mobile hero refinements; mobile-first Shop page; remove everything to do with custom orders; only Facebook and Instagram socials.

## Architecture
- FastAPI + MongoDB (products seeded from backend/catalog.py on startup; contact_messages, newsletter, payment_transactions)
- Stripe claimable sandbox (CA), CAD prices via lookup keys `hat_<slug>`; Stripe calculates tax; hats auto-marked sold after payment
- React + Tailwind + framer-motion + lenis; fonts Smokum / Kaushan Script / Libre Caslon Text / Figtree
- Admin "Back Room" /admin (passcode env ADMIN_PASSCODE): hats sold toggle, messages, orders, subscribers

## Implemented
- 2026-10-01: MVP (all pages, cart, Stripe checkout, admin)
- 2026-10-01: Redesign to reference image (header, hero, featured hats, promo panels, footer, privacy page, search, favourites, newsletter)
- 2026-10-01: Mobile hero refinements; new Shop page (One of a Kind badges, subtitles, "There's Only One" section)
- 2026-10-01: Removed all custom-order content (page, routes, CTAs, FAQ items, admin tab, API); socials limited to Instagram + Facebook
- 2026-10-01: Individual Hat page template (/shop/:slug, data-driven): swipe gallery, One of a Kind badge, No. XX · One of One, CLAIM THIS RENEGADE, SOLD state, Story Behind the Hat, details table (size/material/colour/hatband/details/handmade), More Renegade Hats, back links. Nav = Home/Shop/About/Gallery/Contact/FAQ. Iteration 4 tests all pass.
- To add a hat: add an entry to backend/catalog.py HATS (slug, name, price, order, subtitle, tagline, story, size, material, colour, hatband, handmade, description, details, images) then run setup_stripe.py and restart backend
- Tests: iteration 3 — backend 16/16, frontend all flows pass
- 2026-10-07: Removed FAQ and Privacy pages and their routes. Nav = Home/Shop/About/Gallery/Contact. Footer = Shop/About/Contact + © line.
- 2026-10-07: Removed Gallery page, route and nav link. Nav = Home/Shop/About/Contact.
- 2026-10-07: Home "Keep in Touch" panel -> "Find Us Out There" (pop-ups). Newsletter form removed; empty POPUPS list in content.js for future listings. Hero image replaced with user upload IMG_6669.webp (/img/hero-6669.webp, 2000x1125).
- 2026-10-07: About page "Made by Hand. Every Time." photo -> user's Renegade Hats sign image (/img/made-by-hand-sign.jpg, framed on the sign).
- 2026-10-07: About page chapters I and III photos -> user's denim-outfit woman (/img/story-denim.jpg) and Gitta musician (/img/story-gitta.jpg).
- 2026-10-13: Soapy Dragon event added (POPUPS in content.js); "Find Us Out There" panel now links to new /events page. Hero headline -> "A Little Rebellion / Looks Good on You."
- 2026-10-19: Cloudflare Pages build fix: date-fns 4.1.0 -> 3.6.0 (react-day-picker 8.10.1 peer), added frontend/.npmrc legacy-peer-deps=true (react-day-picker peer react<=18 vs React 19). Production build passes.








## Notes
- 2026-10-07: Hat Editor in admin (add/edit/delete hats, photo upload via Emergent object storage, Stripe price sync); checkout opens new tab when framed (editor preview); home hero now uses owner's real black Renegade photo (public/img/hero-renegade.jpg, from upload 74468af1); hero split layout only at xl, stacked below; Story text edits; Shipping & Returns page + links removed
- Owner has uploaded real photos for all hats via admin; product data now lives in Mongo (seed only when empty)
- Hat images are AI-generated PLACEHOLDERS based on reference image until owner uploads real photos
- Social links point to instagram.com / facebook.com placeholders
- Shipping/returns text is placeholder wording

## Backlog
- P0: Swap in real hat photographs; real Instagram/Facebook URLs
- P1: Individual product page upgrade (story per hat, one-of-one number, CLAIM THIS RENEGADE); About and Contact page restyle to match
- P2: Order notification emails, admin add/edit hats
