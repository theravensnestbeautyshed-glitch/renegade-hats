import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Truck } from "lucide-react";
import { api, formatCAD } from "../lib/api";
import { useCart } from "../context/CartContext";
import { Eyebrow, Reveal } from "../components/Motion";

export default function Product() {
  const { slug } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(0);
  const { add, has } = useCart();

  useEffect(() => {
    let alive = true;
    setP(null);
    setActive(0);
    api.get(`/products/${slug}`).then((r) => alive && setP(r.data)).catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (error)
    return (
      <div className="mx-auto max-w-[1440px] px-5 pb-32 pt-20 sm:px-8 lg:px-12" data-testid="product-not-found">
        <h1 className="font-cinzel text-4xl font-black uppercase">This hat rode off.</h1>
        <Link to="/shop" className="btn-ghost mt-8">Back to Shop</Link>
      </div>
    );
  if (!p) return <div className="min-h-screen pt-20 text-center text-[#A3978C]" data-testid="product-loading">Loading…</div>;

  const images = Array.isArray(p.images) ? p.images : [];
  const inCart = has(p.slug);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-10 sm:px-8 sm:pt-12 lg:px-12" data-testid="product-page">
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#A3978C] hover:text-[#C87D53]" data-testid="product-back-link">
        <ArrowLeft className="h-4 w-4" /> All Hats
      </Link>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="notch spotlight relative aspect-[4/5] overflow-hidden bg-[#16120E]" data-testid="product-main-image">
            {images.map((src, i) => (
              <motion.img
                key={src + i}
                src={src}
                alt={p.name}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 h-full w-full object-cover ${p.sold ? "grayscale-[50%]" : ""}`}
              />
            ))}
            {p.sold && (
              <span className="font-rye absolute right-6 top-6 z-10 -rotate-6 border-2 border-[#b23a2a] px-4 py-1.5 text-lg text-[#e0573f]">SOLD OUT</span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => setActive(i)}
                data-testid={`product-thumb-${i}`}
                className={`aspect-square overflow-hidden border transition-[border-color,opacity] duration-300 ${active === i ? "border-[#C87D53] opacity-100" : "border-transparent opacity-55 hover:opacity-90"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow className="mb-4">One of a Kind · Handmade in B.C.</Eyebrow>
              <h1 className="font-cinzel text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl" data-testid="product-name">{p.name}</h1>
              {p.tagline && <p className="font-cinzel mt-4 text-xl italic text-[#F2EADB]/80">{p.tagline}</p>}
              <p className="font-mono-plex mt-6 text-2xl text-[#C87D53]" data-testid="product-price">{formatCAD(p.price)}</p>
              <p className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] ${p.sold ? "text-[#e0573f]" : "text-[#8fbf8a]"}`} data-testid="product-availability">
                <span className={`h-2 w-2 rounded-full ${p.sold ? "bg-[#e0573f]" : "bg-[#8fbf8a]"}`} />
                {p.sold ? "Sold Out — gone for good" : "Available · Only 1"}
              </p>
              <p className="mt-8 text-base leading-relaxed text-[#F2EADB]/85" data-testid="product-description">{p.description}</p>
              <div className="mt-8 border-t border-[#C87D53]/20 pt-6">
                <p className="font-mono-plex mb-4 text-xs uppercase tracking-[0.3em] text-[#C87D53]">Materials & Details</p>
                <ul className="space-y-2.5" data-testid="product-details">
                  {(p.details || []).map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-[#F2EADB]/85">
                      <Check className="h-4 w-4 text-[#C87D53]" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                <button onClick={() => add(p)} disabled={p.sold || inCart} className="btn-primary w-full" data-testid="product-add-to-cart">
                  {p.sold ? "Sold Out" : inCart ? "In Your Cart" : `Add to Cart — ${formatCAD(p.price)}`}
                </button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs text-[#A3978C]">
                <Truck className="h-4 w-4" /> Ships across Canada & the U.S. · <Link to="/shipping" className="underline hover:text-[#C87D53]">Shipping & Returns</Link>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
