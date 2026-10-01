import { useEffect, useState } from "react";
import { api } from "../lib/api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
