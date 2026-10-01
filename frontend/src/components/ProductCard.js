import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatCAD } from "../lib/api";
import { useCart } from "../context/CartContext";
import { FavButton } from "./FavButton";

export const ProductCard = ({ p, index = 0, showDescription = true }) => {
  const { add, has } = useCart();
  const inCart = has(p.slug);
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
      data-testid={`product-card-${p.slug}`}
    >
      <div className="relative">
      <FavButton slug={p.slug} className="absolute right-1 top-1" />
      <Link to={`/shop/${p.slug}`} className="copper-frame relative block aspect-[4/5] overflow-hidden bg-[#0A0806]" data-testid={`product-image-link-${p.slug}`}>
        <img
          src={p.images?.[0]}
          alt={p.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06] ${p.sold ? "grayscale-[60%] opacity-70" : ""}`}
        />
        <span className="font-mono-plex absolute left-4 top-4 z-10 text-[11px] uppercase tracking-[0.25em] text-[#F2EADB]/80">
          No. {String(index + 1).padStart(2, "0")} / 1 of 1
        </span>
        {p.sold && (
          <span className="font-rye absolute bottom-4 left-4 z-10 -rotate-3 border-2 border-[#b23a2a] bg-[#0D0B08]/80 px-3 py-1 text-sm text-[#e0573f]" data-testid={`product-sold-badge-${p.slug}`}>
            SOLD OUT
          </span>
        )}
      </Link>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-caslon text-base font-bold uppercase tracking-[0.12em] text-[#F2EADB] sm:text-lg">{p.name}</h3>
          <span className="font-caslon shrink-0 text-sm font-bold text-[#D9935F]" data-testid={`product-price-${p.slug}`}>{formatCAD(p.price)}</span>
        </div>
        {showDescription && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#A3978C]">{p.description}</p>}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/shop/${p.slug}`} className="btn-ghost px-3 py-3 text-[11px]" data-testid={`product-view-button-${p.slug}`}>View Hat</Link>
          <button
            onClick={() => add(p)}
            disabled={p.sold || inCart}
            className="btn-primary px-3 py-3 text-[11px]"
            data-testid={`product-add-button-${p.slug}`}
          >
            {p.sold ? "Sold Out" : inCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.article>
  );
};
