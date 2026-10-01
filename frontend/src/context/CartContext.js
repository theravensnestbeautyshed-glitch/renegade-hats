import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);
const KEY = "renegade_cart";
const FAV_KEY = "renegade_favs";

const load = (k = KEY) => {
  try {
    const v = JSON.parse(localStorage.getItem(k) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => load(KEY));
  const [favs, setFavs] = useState(() => load(FAV_KEY));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }, [favs]);

  const toggleFav = useCallback((slug) => setFavs((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [...f, slug])), []);
  const isFav = useCallback((slug) => favs.includes(slug), [favs]);

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
    <CartContext.Provider value={{ items, add, remove, clear, has, total, open, setOpen, favs, toggleFav, isFav }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
