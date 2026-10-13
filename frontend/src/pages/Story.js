import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Reveal, Eyebrow } from "../components/Motion";
import { IMAGES } from "../data/content";

const CHAPTERS = [
  {
    n: "I",
    title: "Born on the Edge",
    img: "/img/story-denim.jpg",
    pos: "center 30%",
    text: "Renegade Hats began in Powell River, British Columbia — a small town at the end of the road, where the forest meets the Pacific and people tend to do things their own way. One hat. A wild idea. A refusal to follow the pack.",
  },
  {
    n: "II",
    title: "Made by Hand. Every Time.",
    img: "/img/made-by-hand-sign.jpg",
    pos: "center 85%",
    text: "Every hat is distressed, burned, sanded, shaped and decorated by hand in our small workshop. Feathers, conchos, bone, copper, turquoise, artwork — each piece is chosen for that one hat and no other. There are no production lines, no templates and no duplicates.",
  },
  {
    n: "III",
    title: "For the Rule Breakers",
    img: "/img/story-gitta.jpg",
    pos: "30% 5%",
    text: "Handcrafted by lady renegade Gitta May Nielsen — the maker behind every one-of-a-kind Renegade Hat. These hats are made for rebels, the ones who don't fit, musicians, wanderers and free spirits — people who don't want ordinary. A Renegade Hat isn't an accessory. It's a statement about who you are and how you move through the world.",
    note: ""
  },
];

export default function Story() {
  return (
    <div data-testid="story-page">
      <PageHeader eyebrow="Our Story" lines={["More Than a Hat.", "A State of Mind."]} intro="A small handmade hat brand from Powell River, B.C., built on creativity, individuality and western outlaw style." image={IMAGES.workshop} />
      <section className="mx-auto max-w-[1440px] space-y-28 px-5 pb-28 sm:px-8 lg:px-12">
        {CHAPTERS.map((c, i) => (
          <div key={c.n} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16" data-testid={`story-chapter-${i}`}>
            <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="notch spotlight aspect-[4/5] overflow-hidden sm:aspect-[4/3]">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover" style={c.pos ? { objectPosition: c.pos } : undefined} />
              </div>
            </Reveal>
            <Reveal delay={0.12} className="lg:col-span-6">
              <span className="font-rye text-7xl text-[#C87D53]/40">{c.n}</span>
              <h2 className="font-cinzel mt-2 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">{c.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F2EADB]/85 md:text-lg">{c.text}</p>
              {c.note && <p className="font-script mt-5 max-w-xl text-xl leading-snug text-[#D9935F] md:text-2xl" data-testid="story-maker-note">{c.note}</p>}
            </Reveal>
          </div>
        ))}
        <Reveal>
          <div className="leather-bg notch px-6 py-16 text-center sm:px-16 sm:py-24">
            <Eyebrow className="mb-6">The Creed</Eyebrow>
            <p className="font-rye mx-auto max-w-3xl text-3xl leading-tight sm:text-5xl">One of a Kind.<br />Handcrafted.<br /><span className="text-[#C87D53]">No Rules.</span></p>
            <div className="mt-10 flex justify-center">
              <Link to="/shop" className="btn-primary" data-testid="story-shop-cta">Shop the Collection</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
