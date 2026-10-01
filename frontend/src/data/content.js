import { IMG } from "../lib/api";

export const IMAGES = {
  hero: IMG + "eff3b1dd14fd906ade93d98b29b5c14396b0e150628fa8b29a8f28a99263a321.jpeg",
  workshop: IMG + "e95956ae6a17eb48e773bb108fb0230235917a7fdaf48a47bddf6a55aff96070.jpeg",
  burn: IMG + "3a23bee259d0b6d83c01b44c362a1b97c6f71220a96cb67c798425ee6f72c377.jpeg",
  wall: IMG + "817e85f6a636726911e4bdea7d86549f628c2bf05cd4f293bfd2666cdc02d33a.jpeg",
  musician: IMG + "f83e20b038cc14ac8d25770450097946de8972a3f6d718a0317e194bee38749a.jpeg",
  coast: IMG + "668a455b2825dba9f953bca45e358c4128cffe86ba2a2764726f7f1e4922f333.jpeg",
  detail: IMG + "329597539d7e05cbce235d206430f4f1c891c372cd2d594f8bedb69eb1954156.jpeg",
  jolly: IMG + "52380e1585cb577e5432d1914001aefb2581257d3e2b1b46302ca861b7d0937e.jpeg",
  renegade: IMG + "7b049e3a980f7f24fb5ee02c9e9cc84099932b29ced1394090e7758dfa0cdc0e.jpeg",
  midnight: IMG + "dbaf05915ef8bf3870030cd04c0482db1973c419e2467a3ad5e18c63c256a13d.jpeg",
  red: IMG + "c924645e35271b266cdde32e300257358553ac350c7ce7fee18c41a5929b88f5.jpeg",
  outlaw: IMG + "edad95308c70ed32c27ab6b1003191d72a4046a13b56916c861235529ec97c8d.jpeg",
  wanderer: IMG + "19b137abce306c2e62ed412d2b500e7ab26ac43ae8b025460b804f641fbddc8d.jpeg",
  shaman: IMG + "03e12e58926e1a46b503d50182adf85e6e2fba67fc52c65832596315d4175abc.jpeg",
};

export const NAV = [
  { to: "/shop", label: "Shop", id: "shop" },
  { to: "/custom", label: "Custom Hats", id: "custom" },
  { to: "/gallery", label: "Gallery", id: "gallery" },
  { to: "/story", label: "Our Story", id: "story" },
  { to: "/faq", label: "FAQ", id: "faq" },
  { to: "/contact", label: "Contact", id: "contact" },
];

export const GALLERY = [
  { src: IMAGES.renegade, title: "The Renegade", tag: "Collection", tall: true },
  { src: IMAGES.wall, title: "The Rack", tag: "Workshop" },
  { src: IMAGES.musician, title: "Stage Ready", tag: "Worn", tall: true },
  { src: IMAGES.detail, title: "Band Detail", tag: "Details" },
  { src: IMAGES.red, title: "Renegade Red", tag: "Collection", tall: true },
  { src: IMAGES.burn, title: "Fire & Felt", tag: "Workshop" },
  { src: IMAGES.coast, title: "Pacific Wanderer", tag: "Worn", tall: true },
  { src: IMAGES.jolly, title: "Jolly Roger Custom", tag: "Custom" },
  { src: IMAGES.shaman, title: "The Shaman", tag: "Collection", tall: true },
  { src: IMAGES.midnight, title: "Midnight Renegade", tag: "Collection", tall: true },
  { src: IMAGES.workshop, title: "The Bench", tag: "Workshop" },
  { src: IMAGES.outlaw, title: "The Outlaw", tag: "Collection", tall: true },
  { src: IMAGES.wanderer, title: "The Wanderer", tag: "Collection", tall: true },
  { src: IMAGES.hero, title: "Dusk Rider", tag: "Worn" },
];

export const CUSTOM_STEPS = [
  { n: "01", title: "Choose your hat", text: "Start with a shape and felt that suits the way you move." },
  { n: "02", title: "Choose your colours", text: "Smoke black, oxblood, sand, charcoal, or something only you would pick." },
  { n: "03", title: "Choose your band", text: "Braided leather, studs, turquoise, copper, bone beads." },
  { n: "04", title: "Add the details", text: "Feathers, conchos, leather, hand-painted artwork, skulls and charms." },
  { n: "05", title: "Build it together", text: "Work directly with Renegade Hats to create something completely unique." },
];

export const FAQS = [
  { q: "Are the hats one of a kind?", a: "Yes. Every Renegade Hat is individually distressed, decorated and finished by hand. Even when two hats share a name or a style, no two are ever identical. When you buy one, it's the only one." },
  { q: "Can I order a custom hat?", a: "Absolutely. Head to the Custom Hats page and tell us about your vision — colours, band, feathers, conchos, artwork, the feeling you want it to carry. We'll reach out to talk through the details and a quote." },
  { q: "How long do custom hats take?", a: "Most custom hats take 2–4 weeks from the time your design is confirmed, depending on the complexity of the work and the materials involved. We'll give you a realistic timeline before we begin." },
  { q: "Do you ship?", a: "Yes. We ship across Canada and to the United States. Every hat is packed carefully in a sturdy box so it arrives with its shape intact. See Shipping & Returns for details." },
  { q: "Where are Renegade Hats made?", a: "Every hat is made by hand in our small workshop in Powell River, British Columbia, Canada." },
  { q: "Can I request specific colours or details?", a: "Yes — that's the whole point of a custom hat. Bring us colours, symbols, a feather you've been saving, a song lyric, a reference photo. If it can be done by hand, we'll try." },
  { q: "What happens if a hat sells out?", a: "Because each hat is one of a kind, once it sells it's gone for good and will be marked SOLD OUT. If you loved it, request a custom hat inspired by it — it won't be a copy, but it will carry the same spirit." },
  { q: "How do I find my hat size?", a: "Measure around your head about a finger's width above your ears and eyebrows. Send us the measurement in centimetres or inches and we'll help you find the right fit." },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", id: "instagram" },
  { label: "Facebook", href: "https://facebook.com", id: "facebook" },
  { label: "TikTok", href: "https://tiktok.com", id: "tiktok" },
];
