import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Lock } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { api, formatCAD } from "../lib/api";

export const CartDrawer = () => {
  const { items, remove, total, open, setOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [soldSlugs, setSoldSlugs] = useState([]);

  useEffect(() => {
    if (!open || !items.length) return undefined;
    let alive = true;
    api
      .get("/products")
      .then((r) => alive && setSoldSlugs((Array.isArray(r.data) ? r.data : []).filter((p) => p.sold).map((p) => p.slug)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [open, items.length]);

  const unavailable = items.filter((i) => soldSlugs.includes(i.slug));

  const checkout = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/payments/checkout", { slugs: items.map((i) => i.slug), origin_url: window.location.origin, previous_session_id: sessionStorage.getItem("renegade_checkout_sid") || undefined });
      if (data?.checkout_url) {
        sessionStorage.setItem("renegade_checkout_sid", data.session_id);
        window.location.href = data.checkout_url;
      }
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Checkout is unavailable right now.");
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col border-l border-[#C87D53]/20 bg-[#0D0B08] p-0 text-[#F2EADB] sm:max-w-md [&>button]:hidden" data-testid="cart-drawer">
        <div className="tex-wood flex items-center justify-between border-b border-[#C87D53]/30 px-6 py-5">
          <div>
            <SheetTitle className="font-rye text-3xl uppercase text-[#EFE3CC]">Your Cart</SheetTitle>
            <SheetDescription className="text-xs text-[#B9AC9C]">Every hat is one of a kind — limit one each.</SheetDescription>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 text-[#F2EADB] hover:text-[#C87D53]" data-testid="cart-close-button" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
          {items.length === 0 ? (
            <div className="py-16 text-center" data-testid="cart-empty">
              <p className="font-rye text-2xl uppercase">Your saddlebag is empty.</p>
              <Link to="/shop" onClick={() => setOpen(false)} className="btn-ghost mt-6" data-testid="cart-shop-link">Browse Hats</Link>
            </div>
          ) : (
            items.map((i) => {
              const isSold = soldSlugs.includes(i.slug);
              return (
              <div key={i.slug} className="flex gap-4 border-b border-[#C87D53]/15 py-4" data-testid={`cart-item-${i.slug}`}>
                <Link to={`/shop/${i.slug}`} onClick={() => setOpen(false)} className="copper-frame block h-24 w-24 shrink-0 overflow-hidden" data-testid={`cart-item-image-${i.slug}`}>
                  <img src={i.image} alt={i.name} className={`h-full w-full object-cover ${isSold ? "grayscale" : ""}`} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <p className="font-caslon text-base font-bold uppercase tracking-[0.1em] text-[#EFE3CC]" data-testid={`cart-item-name-${i.slug}`}>{i.name}</p>
                    <p className="font-caslon mt-0.5 text-sm font-bold text-[#D9935F]" data-testid={`cart-item-price-${i.slug}`}>{formatCAD(i.price)}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#B9AC9C]" data-testid={`cart-item-qty-${i.slug}`}>Qty: 1 · One of a kind</p>
                    {isSold && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#e0573f]" data-testid={`cart-item-sold-${i.slug}`}>Sold — no longer available</p>}
                  </div>
                  <button onClick={() => remove(i.slug)} className="mt-2 self-start text-xs uppercase tracking-[0.2em] text-[#B9AC9C] underline underline-offset-4 hover:text-[#D9935F]" data-testid={`cart-remove-${i.slug}`}>
                    Remove
                  </button>
                </div>
              </div>
              );
            })
          )}
        </div>
        {items.length > 0 && (
          <div className="tex-wood border-t border-[#C87D53]/30 px-6 py-6">
            <div className="mb-1 flex justify-between text-lg">
              <span className="font-caslon font-bold uppercase tracking-[0.14em]">Subtotal</span>
              <span className="font-caslon font-bold text-[#D9935F]" data-testid="cart-subtotal">{formatCAD(total)}</span>
            </div>
            <p className="mb-5 text-xs text-[#B9AC9C]">Shipping & taxes calculated at checkout.</p>
            {unavailable.length > 0 && <p className="mb-3 text-xs text-[#e0573f]" data-testid="cart-sold-warning">Remove sold hats to continue.</p>}
            <button onClick={checkout} disabled={loading || unavailable.length > 0} className="btn-primary h-[56px] w-full" data-testid="cart-checkout-button">
              <Lock className="h-4 w-4" /> {loading ? "Opening checkout…" : "Checkout"}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
