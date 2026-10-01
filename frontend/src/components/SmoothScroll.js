import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

let lenisInstance = null;

export const SmoothScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisInstance = lenis;
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
