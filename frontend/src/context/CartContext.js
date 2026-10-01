import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);
const KEY = "renegade_cart";

const load = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((p) => {
    setItems((prev) => (prev.some((i) => i.slug === p.slug) ? prev : [...prev, { slug: p.slug, name: p.name, price: p.price, image: p.images?.[0] }]));
    setOpen(true);
  }, []);
  const remove = useCallback((slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);
  const has = useCallback((slug) => items.some((i) => i.slug === slug), [items]);
  const total = items.reduce((s, i) => s + (i.price || 0), 0);

  return (
    <CartContext.Provider value={{ items, add, remove, clear, has, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
