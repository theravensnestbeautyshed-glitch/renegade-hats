import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { SkullDivider } from "../components/Logo";
import { IMAGES } from "../data/content";
import { formatCAD } from "../lib/api";

const ShopCard = ({ p, i }) => {
  const { add, has } = useCart();
  const inCart = has(p.slug);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="copper-frame group flex min-w-0 flex-col bg-[#0A0806]"
      style={{ order: i * 10 }}
      data-testid={`product-card-${p.slug}`}
    >
      <div className="relative">
        <Link to={`/shop/${p.slug}`} className="relative block aspect-square overflow-hidden" data-testid={`product-image-link-${p.slug}`}>
          <img src={p.images?.[0]} alt={p.name} loading="lazy" className={`h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06] ${p.sold ? "grayscale-[60%] opacity-70" : ""}`} />
        </Link>
        <span className="pointer-events-none absolute left-2 top-2 border border-[#C87D53]/70 bg-[#0D0B08]/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#EFE3CC] backdrop-blur-sm sm:left-3 sm:top-3 sm:text-[11px]" data-testid={`product-ooak-badge-${p.slug}`}>
          One of a Kind
        </span>
        {p.sold && (
          <span className="font-rye pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 -rotate-3 border-2 border-[#b23a2a] bg-[#0D0B08]/85 px-3 py-1 text-sm text-[#e0573f]" data-testid={`product-sold-badge-${p.slug}`}>
            SOLD OUT
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-3 text-center sm:px-4 sm:pb-4">
        <Link to={`/shop/${p.slug}`} className="transition-colors hover:text-[#D9935F]" data-testid={`product-name-link-${p.slug}`}>
          <h3 className="font-caslon text-[13px] font-bold uppercase tracking-[0.14em] text-[#EFE3CC] sm:text-base">{p.name}</h3>
        </Link>
        <p className="mt-1 text-xs leading-snug text-[#B9AC9C] sm:text-sm">{p.subtitle}</p>
        <p className="font-caslon mt-2 text-sm font-bold tracking-[0.08em] text-[#D9935F] sm:text-base" data-testid={`product-price-${p.slug}`}>{formatCAD(p.price)}</p>
        <div className="mt-auto flex gap-1.5 pt-3 sm:gap-2">
          <Link to={`/shop/${p.slug}`} className="btn-ghost min-h-[44px] min-w-0 flex-1 gap-1 whitespace-nowrap px-1.5 text-[11px] tracking-[0.1em] sm:gap-1.5 sm:px-2 sm:tracking-[0.14em]" data-testid={`product-view-button-${p.slug}`}>
            View Hat <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => add(p)}
            disabled={p.sold || inCart}
            aria-label={p.sold ? "Sold out" : inCart ? "In cart" : "Add to cart"}
            title={p.sold ? "Sold out" : inCart ? "In cart" : "Add to cart"}
            className="btn-primary min-h-[44px] w-11 shrink-0 gap-0 px-0 shadow-none"
            data-testid={`product-add-button-${p.slug}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const OnlyOne = () => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9 }}
    className="copper-frame relative order-[35] col-span-2 my-3 overflow-hidden sm:my-5 lg:order-[25] lg:col-span-3"
    data-testid="only-one-section"
  >
    <img src={IMAGES.panelStory} alt="" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[#0D0B08]/75" />
    <div className="relative mx-auto max-w-2xl px-5 py-12 text-center sm:py-16">
      <h2 className="font-rye text-4xl uppercase text-[#EFE3CC] sm:text-5xl">There’s Only One.</h2>
      <SkullDivider className="mx-auto mt-4 max-w-[260px]" />
      <p className="mt-5 text-base leading-relaxed text-[#E2D4BD]">
        When it’s gone, it’s gone. Every Renegade Hat is individually handcrafted and finished by hand. Once someone claims it, that exact hat won’t be made again.
      </p>
      <a href="#collection" className="btn-primary mt-7" data-testid="only-one-cta">
        Claim Your Renegade <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </motion.section>
);

export default function Shop() {
  const { products, loading } = useProducts();

  return (
    <div className="tex-leather" data-testid="shop-page">
      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-8 text-center sm:px-8 sm:pt-12 lg:px-12" data-testid="shop-header">
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="font-rye text-[2.1rem] uppercase leading-[1] text-[#EFE3CC] sm:text-5xl lg:text-6xl" data-testid="shop-title">
          Shop the Renegade
          <br />
          <span className="text-[#D9935F]">Collection</span>
        </motion.h1>
        <SkullDivider className="mx-auto mt-4 max-w-[280px]" />
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#E2D4BD] sm:text-base" data-testid="shop-intro">
          One-of-a-kind hats. Handcrafted in small batches. No two Renegades are exactly alike.
        </p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A3978C]" data-testid="shop-count">
          {products.length} {products.length === 1 ? "hat" : "hats"} · Prices in CAD
        </p>
      </section>
      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-8 lg:px-12">
        {loading ? (
          <p className="py-10 text-center text-[#A3978C]" data-testid="shop-loading">Loading hats…</p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-[#A3978C]" data-testid="shop-empty">No hats here right now.</p>
        ) : (
          <>
          <div id="collection" className="grid scroll-mt-24 grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3" data-testid="shop-grid">
            {products.map((p, i) => <ShopCard key={p.slug} p={p} i={i} />)}
            <OnlyOne />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="mt-14 border-t border-[#C87D53]/25 pt-12 text-center"
            data-testid="shop-next-renegade"
          >
            <h2 className="font-rye text-3xl uppercase leading-tight text-[#EFE3CC] sm:text-4xl">Don’t See Your Next Renegade?</h2>
            <SkullDivider className="mx-auto mt-4 max-w-[240px]" />
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#E2D4BD]">Our collection changes as new one-of-a-kind hats are created.</p>
          </motion.div>
          </>
        )}
      </section>
    </div>
  );
}
