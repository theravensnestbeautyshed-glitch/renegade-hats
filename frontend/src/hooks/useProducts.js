import { useEffect, useState } from "react";
import { api, STATIC_CATALOG } from "../lib/api";
import CATALOG from "../data/catalog.json";

export const useProducts = () => {
  const [products, setProducts] = useState(STATIC_CATALOG ? CATALOG : []);
  const [loading, setLoading] = useState(!STATIC_CATALOG);
  useEffect(() => {
    if (STATIC_CATALOG) return undefined;
    let alive = true;
    api
      .get("/products")
      .then((r) => alive && setProducts(Array.isArray(r.data) ? r.data : []))
      .catch(() => alive && setProducts([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);
  return { products, loading };
};
