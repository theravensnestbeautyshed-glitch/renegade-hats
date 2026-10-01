import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Lock } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { api, formatCAD } from "../lib/api";

export const CartDrawer = () => {
  const { items, remove, total, open, setOpen } = useCart();
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/payments/checkout", { slugs: items.map((i) => i.slug), origin_url: window.location.origin });
      if (data?.checkout_url) window.location.href = data.checkout_url;
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Checkout is unavailable right now.");
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col border-l border-[#C87D53]/20 bg-[#0D0B08] p-0 text-[#F2EADB] sm:max-w-md [&>button]:hidden" data-testid="cart-drawer">
        <div className="flex items-center justify-between border-b border-[#C87D53]/15 px-6 py-5">
          <div>
            <SheetTitle className="font-cinzel text-2xl font-bold uppercase text-[#F2EADB]">Your Cart</SheetTitle>
            <SheetDescription className="text-xs text-[#A3978C]">Each hat is one of a kind.</SheetDescription>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 text-[#F2EADB] hover:text-[#C87D53]" data-testid="cart-close-button" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
          {items.length === 0 ? (
            <div className="py-16 text-center" data-testid="cart-empty">
              <p className="font-cinzel text-xl">Your saddlebag is empty.</p>
              <Link to="/shop" onClick={() => setOpen(false)} className="btn-ghost mt-6" data-testid="cart-shop-link">Browse Hats</Link>
            </div>
          ) : (
            items.map((i) => (
              <div key={i.slug} className="flex gap-4 border-b border-[#C87D53]/10 py-4" data-testid={`cart-item-${i.slug}`}>
                <img src={i.image} alt={i.name} className="h-24 w-20 object-cover" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-cinzel text-lg font-semibold">{i.name}</p>
                    <p className="font-mono-plex text-sm text-[#C87D53]">{formatCAD(i.price)}</p>
                  </div>
                  <button onClick={() => remove(i.slug)} className="self-start text-xs uppercase tracking-[0.2em] text-[#A3978C] hover:text-[#C87D53]" data-testid={`cart-remove-${i.slug}`}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-[#C87D53]/15 px-6 py-6">
            <div className="mb-1 flex justify-between text-lg">
              <span className="font-cinzel">Subtotal</span>
              <span className="font-mono-plex text-[#C87D53]" data-testid="cart-subtotal">{formatCAD(total)}</span>
            </div>
            <p className="mb-5 text-xs text-[#A3978C]">Shipping & taxes calculated at checkout.</p>
            <button onClick={checkout} disabled={loading} className="btn-primary w-full" data-testid="cart-checkout-button">
              <Lock className="h-4 w-4" /> {loading ? "Opening checkout…" : "Secure Checkout"}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
