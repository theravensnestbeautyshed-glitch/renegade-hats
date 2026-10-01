# Renégade Hats — PRD

## Original problem statement
Premium e-commerce website for handmade hat brand RENÉGADE HATS — one-of-a-kind, handcrafted distressed western hats for rebels, rule breakers, musicians, free spirits. Tagline "More Than a Hat… It's a State of Mind." / "One of a Kind. Handcrafted. No Rules." Dark rugged premium western outlaw aesthetic (distressed leather, aged paper, worn metal, copper/bronze, cream type, subtle skull/Jolly Roger). Use the owner's real hat photos. Nav: Home, Shop, Custom Hats, Gallery, Our Story, FAQ, Contact (+ Shipping & Returns). Six hats in CAD: The Renegade $249, Midnight Renegade $249, Renegade Red $275, The Outlaw $275, The Wanderer $295, The Shaman $325. Shop cards (image, name, CAD price, description, VIEW HAT, ADD TO CART, SOLD OUT), product pages (gallery, details, availability, add to cart, custom inquiry), custom hat request, gallery, story (Powell River, BC), FAQ, contact form + socials, footer. Fully responsive, subtle animation, photography first.

## Architecture
- FastAPI + MongoDB (products seeded from backend/catalog.py on startup; custom_requests, contact_messages, payment_transactions)
- Stripe claimable sandbox (CA account), CAD prices via lookup keys `hat_<slug>` (setup_stripe.py), Stripe calculates tax at checkout, CA/US shipping address collection; hats auto-marked sold after paid
- React + Tailwind + framer-motion + lenis; fonts Rye / Cinzel / Figtree / IBM Plex Mono; SVG hat+skull logo & favicon
- Admin "Back Room" at /admin with passcode (env ADMIN_PASSCODE)

## Implemented (2026-10-01)
- All pages: Home, Shop, Product, Custom, Gallery (lightbox + filters), Story, FAQ, Contact, Shipping & Returns, Payment success/cancel, Admin
- Cart (localStorage) → Stripe checkout; sold-out handling; admin sold toggle and request/message/order views
- Tested: backend 15/15 after _id fix, frontend flows 100%

## Notes
- Product/gallery images are AI-generated PLACEHOLDERS until the owner uploads real photos
- Social links are placeholders (instagram.com / facebook.com / tiktok.com)
- Shipping/returns policy text is placeholder wording to be confirmed by owner

## Backlog
- P0: Swap in real hat photographs
- P1: Email notifications for custom requests/orders; admin add/edit hats
- P2: Size guide, Instagram feed
