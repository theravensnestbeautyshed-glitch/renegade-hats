import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Truck } from "lucide-react";
import { api, formatCAD } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { FavButton } from "../components/FavButton";
import { SkullDivider } from "../components/Logo";
import { FeaturedCard, SectionTitle } from "./Home";

const BackLink = ({ testId }) => (
  <Link to="/shop" className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#C9B9A0] transition-colors hover:text-[#D9935F]" data-testid={testId}>
    <ArrowLeft className="h-4 w-4" /> Back to Shop
  </Link>
);

const SoldStamp = () => (
  <span className="font-rye pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-[3px] border-[#b23a2a] bg-[#0D0B08]/70 px-8 py-2 text-5xl text-[#e0573f]" data-testid="product-sold-stamp">
    SOLD
  </span>
);

const Gallery = ({ p }) => {
  const images = Array.isArray(p.images) ? p.images : [];
  const [active, setActive] = useState(0);
  const track = useRef(null);

  const go = (i) => {
    setActive(i);
    const el = track.current;
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div data-testid="product-gallery">
      <div className="copper-frame relative overflow-hidden bg-[#0A0806]">
        <div ref={track} onScroll={onScroll} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-testid="product-main-image">
          {images.map((src, i) => (
            <div key={src + i} className="aspect-square w-full shrink-0 snap-center">
              <img src={src} alt={`${p.name} photo ${i + 1}`} className={`h-full w-full object-cover ${p.sold ? "grayscale-[50%]" : ""}`} />
            </div>
          ))}
        </div>
        <span className="pointer-events-none absolute left-3 top-3 border border-[#C87D53]/70 bg-[#0D0B08]/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#EFE3CC]" data-testid="product-ooak-badge">
          One of a Kind
        </span>
        <FavButton slug={p.slug} className="absolute right-1 top-1" />
        {p.sold && <SoldStamp />}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 lg:hidden">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Photo ${i + 1}`} className={`h-2 rounded-full transition-[width,background-color] duration-300 ${active === i ? "w-6 bg-[#C87D53]" : "w-2 bg-[#EFE3CC]/60"}`} data-testid={`product-dot-${i}`} />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 hidden grid-cols-5 gap-3 lg:grid">
          {images.map((src, i) => (
            <button key={src + i} onClick={() => go(i)} data-testid={`product-thumb-${i}`} className={`aspect-square overflow-hidden border transition-[border-color,opacity] duration-300 ${active === i ? "border-[#C87D53] opacity-100" : "border-[#C87D53]/20 opacity-60 hover:opacity-100"}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ClaimButton = ({ p }) => {
  const { add, has, setOpen } = useCart();
  if (p.sold)
    return (
      <button disabled className="btn-primary h-[60px] w-full text-lg" data-testid="product-add-to-cart">
        Sold
      </button>
    );
  if (has(p.slug))
    return (
      <button onClick={() => setOpen(true)} className="btn-ghost h-[60px] w-full text-sm" data-testid="product-add-to-cart">
        Claimed — In Your Cart <ArrowRight className="h-4 w-4" />
      </button>
    );
  return (
    <button onClick={() => add(p)} className="btn-primary group h-[60px] w-full text-lg sm:text-xl" data-testid="product-add-to-cart">
      Claim This Renegade <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

const Info = ({ p }) => (
  <div>
    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C87D53]" data-testid="product-number">No. {String(p.order || 0).padStart(2, "0")} · One of One</p>
    <h1 className="font-rye mt-2 text-[2.6rem] uppercase leading-[0.95] text-[#EFE3CC] sm:text-6xl" data-testid="product-name">{p.name}</h1>
    {p.subtitle && <p className="font-caslon mt-2 text-base italic text-[#C9B9A0]" data-testid="product-subtitle">{p.subtitle}</p>}
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
      <p className="font-caslon text-2xl font-bold tracking-[0.06em] text-[#D9935F]" data-testid="product-price">{formatCAD(p.price)}</p>
      <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${p.sold ? "text-[#e0573f]" : "text-[#9cc59a]"}`} data-testid="product-availability">
        <span className={`h-2 w-2 rounded-full ${p.sold ? "bg-[#e0573f]" : "bg-[#9cc59a]"}`} />
        {p.sold ? "Sold — gone for good" : "Available · Only one"}
      </p>
    </div>
    <p className="mt-5 text-base leading-relaxed text-[#E2D4BD]" data-testid="product-description">{p.description}</p>
    <div className="mt-7">
      <ClaimButton p={p} />
    </div>
    <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#B9AC9C]">
      <Truck className="h-4 w-4 text-[#C87D53]" /> Ships across Canada & the U.S.
    </p>
  </div>
);

const Story = ({ p }) => (
  <section className="copper-frame tex-wood relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14" data-testid="product-story">
    <h2 className="font-rye text-center text-3xl uppercase text-[#EFE3CC] sm:text-4xl">The Story Behind the Hat</h2>
    <SkullDivider className="mx-auto mt-4 max-w-[260px]" />
    <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#E2D4BD] sm:text-lg" data-testid="product-story-text">{p.story || p.description}</p>
  </section>
);

const Details = ({ p }) => {
  const rows = [
    ["Hat Size", p.size || "Contact us for exact measurements"],
    ["Material", p.material],
    ["Colour", p.colour],
    ["Hatband", p.hatband],
    ["Details", (p.details || []).join(" · ")],
    ["Handmade", p.handmade],
  ].filter(([, v]) => v);
  return (
    <section data-testid="product-details">
      <SectionTitle>The Details</SectionTitle>
      <dl className="copper-frame mx-auto mt-6 max-w-3xl divide-y divide-[#C87D53]/20 bg-[#0A0806]/80">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[110px_1fr] gap-4 px-4 py-4 sm:grid-cols-[180px_1fr] sm:px-6" data-testid={`product-detail-${k.toLowerCase().replace(/\s+/g, "-")}`}>
            <dt className="font-caslon text-xs font-bold uppercase tracking-[0.18em] text-[#C87D53] sm:text-sm">{k}</dt>
            <dd className="text-sm text-[#EFE3CC] sm:text-base">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const Related = ({ slug }) => {
  const { products } = useProducts();
  const others = products.filter((x) => x.slug !== slug && !x.sold).slice(0, 4);
  if (!others.length) return null;
  return (
    <section data-testid="product-related">
      <SectionTitle>More Renegade Hats</SectionTitle>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {others.map((x, i) => <FeaturedCard key={x.slug} p={x} i={i} />)}
      </div>
    </section>
  );
};

export default function Product() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setP(null);
    setError(false);
    api.get(`/products/${slug}`).then((r) => alive && setP(r.data)).catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (error)
    return (
      <div className="tex-leather px-5 py-24 text-center" data-testid="product-not-found">
        <h1 className="font-rye text-4xl uppercase">This hat rode off.</h1>
        <div className="mt-6"><BackLink testId="product-back-link" /></div>
      </div>
    );
  if (!p) return <div className="tex-leather min-h-screen pt-20 text-center text-[#B9AC9C]" data-testid="product-loading">Loading…</div>;

  return (
    <div className="tex-leather" data-testid="product-page">
      <div className="mx-auto max-w-[1300px] px-4 pb-16 pt-3 sm:px-8 sm:pt-6 lg:px-12">
        <BackLink testId="product-back-link" />
        <div className="mt-2 grid gap-7 lg:grid-cols-12 lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="min-w-0 lg:col-span-7">
            <Gallery key={p.slug} p={p} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Info p={p} />
            </div>
          </motion.div>
        </div>
        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
          <Story p={p} />
          <Details p={p} />
          <Related slug={p.slug} />
          <div className="text-center">
            <BackLink testId="product-back-link-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
}
