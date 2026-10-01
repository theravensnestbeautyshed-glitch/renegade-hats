import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { ProductCard } from "../components/ProductCard";
import { Reveal, Eyebrow } from "../components/Motion";
import { useProducts } from "../hooks/useProducts";
import { IMAGES, CUSTOM_STEPS } from "../data/content";

const Featured = () => {
  const { products } = useProducts();
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" data-testid="featured-collection">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <Eyebrow className="mb-4">The Featured Collection</Eyebrow>
          <h2 className="font-cinzel text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">Six Hats.<br />Six Originals.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Link to="/shop" className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C87D53]" data-testid="featured-view-all">
            View all hats <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.slug} p={p} index={i} showDescription={false} />
        ))}
      </div>
    </section>
  );
};

const NoTwo = () => (
  <section className="leather-bg relative overflow-hidden py-24 sm:py-32" data-testid="no-two-section">
    <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
      <Reveal className="lg:col-span-6">
        <div className="notch spotlight aspect-[4/3] overflow-hidden">
          <img src={IMAGES.burn} alt="Burning the brim of a hat by hand" className="h-full w-full object-cover" />
        </div>
      </Reveal>
      <div className="lg:col-span-6 lg:pl-8">
        <Reveal>
          <Eyebrow className="mb-6">The Renegade Way</Eyebrow>
          <h2 className="font-rye text-5xl leading-[1] text-[#F2EADB] sm:text-6xl lg:text-7xl" data-testid="no-two-title">No Two Are<br /><span className="text-[#C87D53]">The Same.</span></h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#F2EADB]/85">
            Every Renegade Hat is individually transformed by hand. Distressed, decorated and finished with its own character. There are no factory duplicates here.
          </p>
          <div className="copper-rule my-10 max-w-md" />
          <div className="grid max-w-md grid-cols-3 gap-6">
            {[["100%", "Handmade"], ["1/1", "Every hat"], ["0", "Duplicates"]].map(([n, l]) => (
              <div key={l}>
                <p className="font-cinzel text-3xl font-black text-[#C87D53]">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#A3978C]">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const CustomStrip = () => (
  <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12" data-testid="custom-section">
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <Eyebrow className="mb-6">Custom Hats</Eyebrow>
            <h2 className="font-cinzel text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">Your Vision.<br />Our Hands.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#A3978C] md:text-lg">
              Request a one-of-a-kind custom hat built around you — your colours, your symbols, your story.
            </p>
            <Link to="/custom" className="btn-primary mt-10" data-testid="home-custom-cta">Start Your Custom Hat <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </div>
      <div className="lg:col-span-7">
        {CUSTOM_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <div className="group flex gap-6 border-t border-[#C87D53]/20 py-8 transition-colors duration-500 hover:bg-[#16120E] sm:gap-10 sm:px-4">
              <span className="font-mono-plex pt-2 text-sm text-[#C87D53]">{s.n}</span>
              <div>
                <h3 className="font-cinzel text-2xl font-bold uppercase transition-colors duration-300 group-hover:text-[#C87D53] sm:text-3xl">{s.title}</h3>
                <p className="mt-2 text-[#A3978C]">{s.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const GalleryBento = () => {
  const tiles = [
    { src: IMAGES.musician, cls: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2" },
    { src: IMAGES.detail, cls: "col-span-1 row-span-1" },
    { src: IMAGES.coast, cls: "col-span-1 row-span-2" },
    { src: IMAGES.jolly, cls: "col-span-1 row-span-1" },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12" data-testid="gallery-teaser">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow className="mb-4">From the Gallery</Eyebrow>
          <h2 className="font-cinzel text-4xl font-black uppercase leading-none sm:text-5xl">Worn by the Untamed</h2>
        </div>
        <Link to="/gallery" className="btn-ghost" data-testid="home-gallery-cta">Enter the Gallery</Link>
      </Reveal>
      <Reveal>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4 lg:auto-rows-[260px]">
          {tiles.map((t, i) => (
            <Link to="/gallery" key={i} className={`group relative overflow-hidden bg-[#16120E] ${t.cls}`} data-testid={`home-bento-${i}`}>
              <img src={t.src} alt="Renegade hat" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#0D0B08]/20 transition-colors duration-500 group-hover:bg-transparent" />
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

const StoryTeaser = () => (
  <section className="relative overflow-hidden border-t border-[#C87D53]/15" data-testid="story-teaser">
    <img src={IMAGES.workshop} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B08] via-[#0D0B08]/85 to-[#0D0B08]/40" />
    <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
      <Reveal className="max-w-2xl">
        <Eyebrow className="mb-6">Our Story</Eyebrow>
        <p className="font-cinzel text-3xl font-semibold leading-snug sm:text-4xl lg:text-5xl">
          Made by hand on the edge of the Pacific, in Powell River, B.C. — for rebels, musicians and free spirits.
        </p>
        <Link to="/story" className="btn-ghost mt-10" data-testid="home-story-cta">Read the Story</Link>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <Marquee />
      <Featured />
      <NoTwo />
      <CustomStrip />
      <GalleryBento />
      <StoryTeaser />
    </div>
  );
}
