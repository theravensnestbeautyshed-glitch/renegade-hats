import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { IMAGES } from "../data/content";

const FILTERS = [
  { id: "all", label: "All Hats" },
  { id: "available", label: "Available" },
  { id: "sold", label: "Sold Out" },
];

export default function Shop() {
  const { products, loading } = useProducts();
  const [filter, setFilter] = useState("all");
  const shown = products.filter((p) => (filter === "all" ? true : filter === "sold" ? p.sold : !p.sold));

  return (
    <div data-testid="shop-page">
      <PageHeader
        eyebrow="The Shop · Prices in CAD"
        lines={["One of a Kind.", "Ready to Ride."]}
        intro="Every hat below is the only one of its kind. When it's gone, it's gone — so if one speaks to you, don't wait."
        image={IMAGES.wall}
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-wrap gap-2 border-b border-[#C87D53]/15 pb-6">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              data-testid={`shop-filter-${f.id}`}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                filter === f.id ? "bg-[#C87D53] text-[#0D0B08]" : "border border-[#C87D53]/25 text-[#F2EADB]/80 hover:border-[#C87D53]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="font-mono-plex ml-auto self-center text-xs uppercase tracking-[0.2em] text-[#A3978C]" data-testid="shop-count">
            {shown.length} {shown.length === 1 ? "hat" : "hats"}
          </span>
        </div>
        {loading ? (
          <p className="text-[#A3978C]" data-testid="shop-loading">Loading hats…</p>
        ) : shown.length === 0 ? (
          <p className="text-[#A3978C]" data-testid="shop-empty">No hats here right now.</p>
        ) : (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3" data-testid="shop-grid">
            {shown.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={products.indexOf(p)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
