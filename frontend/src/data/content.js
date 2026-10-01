import { IMG } from "../lib/api";

export const IMAGES = {
  heroHat: "/img/hero-hat.jpg",
  heroHatFull: IMG + "9b4445339774a4461392164e177dd0003cb29138866e59b2d745390a20c5c8a4.jpeg",
  heroHatWide: IMG + "3b341fe002aea5ff4abf2a86980be2793ca3f11cabcfff3cb2ffe3b6c3d4d833.jpeg",
  panelCustom: IMG + "992e0de01c48dd2fee70764df86dd492aea1b2cfb091036b3537f3b33e9cd6bc.jpeg",
  panelStory: IMG + "52ed9c1014397fbc06cd2c8b794998b3efbac815feeff1bce1cc7562c32b8637.jpeg",
  panelTouch: IMG + "ef45626b833067a84a920929f2b4c443a0d61471a540d75a4cfd0fd2c450faf3.jpeg",
  rRenegade: IMG + "98281262151d3dac1c523701913dec58d65defd851b78f65733e8c3a6a56c870.jpeg",
  rRed: IMG + "640b0339edab737223e39a580cb47295b248f2c231078a10af5fc13110b1956e.jpeg",
  rShaman: IMG + "fcc5c108b1182483df79b2041058e8a5dbe621ca59fc54f1cfe0f66beb26a372.jpeg",
  rOutlaw: IMG + "15cd4f16ad9491247e1a1d2c795b59f0bd303563c0ff9c48f4d2529e5605cbd0.jpeg",
  rWanderer: IMG + "88afc1f505607c1f57cd987dcdbb245bef5cd095afc61f16877dca9e212a754f.jpeg",
  rMidnight: IMG + "d45bc7c69c4aae1d53f66275f1e7698f43bf60110316aef3256d4afc58014723.jpeg",
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
  { to: "/", label: "Home", id: "home", end: true },
  { to: "/shop", label: "Shop", id: "shop" },
  { to: "/story", label: "About", id: "story" },
  { to: "/gallery", label: "Gallery", id: "gallery" },
  { to: "/contact", label: "Contact", id: "contact" },
  { to: "/faq", label: "FAQ", id: "faq" },
];

export const FOOTER_LINKS = [
  { to: "/shop", label: "Shop", id: "shop" },
  { to: "/story", label: "About", id: "story" },
  { to: "/contact", label: "Contact", id: "contact" },
  { to: "/shipping", label: "Shipping & Returns", id: "shipping" },
  { to: "/faq", label: "FAQs", id: "faq" },
  { to: "/privacy", label: "Privacy", id: "privacy" },
];

export const GALLERY = [
  { src: IMAGES.heroHatWide, title: "Barn Light", tag: "Collection" },
  { src: IMAGES.rShaman, title: "The Shaman", tag: "Collection" },
  { src: IMAGES.rRed, title: "Renegade Red", tag: "Collection" },
  { src: IMAGES.panelCustom, title: "Concho Detail", tag: "Details" },
  { src: IMAGES.rMidnight, title: "Midnight Renegade", tag: "Collection" },
  { src: IMAGES.panelStory, title: "Shaping by Hand", tag: "Workshop" },
  { src: IMAGES.rOutlaw, title: "The Outlaw", tag: "Collection" },
  { src: IMAGES.panelTouch, title: "Prairie Dusk", tag: "Worn" },
  { src: IMAGES.rWanderer, title: "The Wanderer", tag: "Collection" },
  { src: IMAGES.rRenegade, title: "The Renegade", tag: "Collection" },
  { src: IMAGES.renegade, title: "The Renegade", tag: "Collection", tall: true },
  { src: IMAGES.wall, title: "The Rack", tag: "Workshop" },
  { src: IMAGES.musician, title: "Stage Ready", tag: "Worn", tall: true },
  { src: IMAGES.detail, title: "Band Detail", tag: "Details" },
  { src: IMAGES.red, title: "Renegade Red", tag: "Collection", tall: true },
  { src: IMAGES.burn, title: "Fire & Felt", tag: "Workshop" },
  { src: IMAGES.coast, title: "Pacific Wanderer", tag: "Worn", tall: true },
  { src: IMAGES.jolly, title: "Jolly Roger", tag: "Details" },
  { src: IMAGES.shaman, title: "The Shaman", tag: "Collection", tall: true },
  { src: IMAGES.midnight, title: "Midnight Renegade", tag: "Collection", tall: true },
  { src: IMAGES.workshop, title: "The Bench", tag: "Workshop" },
  { src: IMAGES.outlaw, title: "The Outlaw", tag: "Collection", tall: true },
  { src: IMAGES.wanderer, title: "The Wanderer", tag: "Collection", tall: true },
  { src: IMAGES.hero, title: "Dusk Rider", tag: "Worn" },
];

export const FAQS = [
  { q: "Are the hats one of a kind?", a: "Yes. Every Renegade Hat is individually distressed, decorated and finished by hand. Even when two hats share a name or a style, no two are ever identical. When you buy one, it's the only one." },
  { q: "Do you ship?", a: "Yes. We ship across Canada and to the United States. Every hat is packed carefully in a sturdy box so it arrives with its shape intact. See Shipping & Returns for details." },
  { q: "Where are Renegade Hats made?", a: "Every hat is made by hand in our small workshop in Powell River, British Columbia, Canada." },
  { q: "What happens if a hat sells out?", a: "Because each hat is one of a kind, once it sells it's gone for good and will be marked SOLD OUT. Keep an eye on the shop — new one-of-a-kind hats are added as they're finished." },
  { q: "How do I find my hat size?", a: "Measure around your head about a finger's width above your ears and eyebrows. Send us the measurement in centimetres or inches and we'll help you find the right fit." },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", id: "instagram" },
  { label: "Facebook", href: "https://facebook.com", id: "facebook" },
];
