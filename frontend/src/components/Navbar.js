import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark, Wordmark } from "./Logo";
import { NAV } from "../data/content";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  const { items, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        scrolled || mobile ? "border-b border-[#C87D53]/15 bg-[#0D0B08]/85 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
      }`}
      data-testid="site-header"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to="/" className="group flex items-center gap-3" data-testid="nav-logo">
          <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:-rotate-6" />
          <Wordmark className="text-lg sm:text-xl" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.id}-link`}
              className={({ isActive }) =>
                `relative text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[#C87D53] after:transition-[width] after:duration-300 hover:text-[#F2EADB] ${
                  isActive ? "text-[#F2EADB] after:w-full" : "text-[#F2EADB]/70 after:w-0 hover:after:w-full"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center text-[#F2EADB] transition-colors hover:text-[#C87D53]"
            data-testid="nav-cart-button"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {items.length > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C87D53] text-[10px] font-bold text-[#0D0B08]" data-testid="nav-cart-count">
                {items.length}
              </span>
            )}
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center text-[#F2EADB] lg:hidden"
            onClick={() => setMobile((m) => !m)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
            data-testid="nav-mobile-menu"
          >
            <div className="flex flex-col px-5 pb-8 pt-4">
              {[{ to: "/", label: "Home", id: "home" }, ...NAV].map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <NavLink to={n.to} data-testid={`mobile-nav-${n.id}-link`} className="block border-b border-[#C87D53]/15 py-4 font-cinzel text-2xl font-bold uppercase text-[#F2EADB]">
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
