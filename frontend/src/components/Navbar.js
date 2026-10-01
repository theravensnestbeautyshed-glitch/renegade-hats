import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { LogoMark, Wordmark } from "./Logo";
import { NAV } from "../data/content";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { formatCAD } from "../lib/api";

const SearchDialog = ({ open, setOpen }) => {
  const { products } = useProducts();
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const term = q.trim().toLowerCase();
  const results = term ? products.filter((p) => `${p.name} ${p.description} ${(p.details || []).join(" ")}`.toLowerCase().includes(term)) : products;
  const go = (slug) => {
    setOpen(false);
    setQ("");
    nav(`/shop/${slug}`);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl border-[#C87D53]/40 bg-[#0D0B08] p-0 text-[#F2EADB]" data-testid="search-dialog">
        <DialogTitle className="sr-only">Search hats</DialogTitle>
        <DialogDescription className="sr-only">Search the collection</DialogDescription>
        <div className="flex items-center gap-3 border-b border-[#C87D53]/25 px-5 py-4">
          <Search className="h-5 w-5 text-[#C87D53]" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hats, feathers, skulls…" className="w-full bg-transparent text-base outline-none placeholder:text-[#8a7f74]" data-testid="search-input" />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2" data-lenis-prevent>
          {results.length === 0 ? (
            <p className="p-6 text-center text-[#A3978C]" data-testid="search-empty">No hats match “{q}”.</p>
          ) : (
            results.map((p) => (
              <button key={p.slug} onClick={() => go(p.slug)} className="flex w-full items-center gap-4 p-3 text-left transition-colors hover:bg-[#1E1813]" data-testid={`search-result-${p.slug}`}>
                <img src={p.images?.[0]} alt="" className="h-14 w-14 object-cover" />
                <span className="flex-1 font-caslon uppercase tracking-[0.12em]">{p.name}</span>
                <span className="text-sm text-[#C87D53]">{p.sold ? "Sold out" : formatCAD(p.price)}</span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const IconBtn = ({ children, className = "", ...props }) => (
  <button className={`relative flex h-11 w-11 items-center justify-center text-[#EFE3CC] transition-colors hover:text-[#C87D53] ${className}`} {...props}>
    {children}
  </button>
);

export const Navbar = () => {
  const { items, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    setMobile(false);
  }, [pathname]);

  return (
    <header className="tex-wood torn-edge sticky top-0 z-50 border-b border-[#C87D53]/30" data-testid="site-header">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-2 px-3 sm:h-[76px] sm:px-8 lg:h-[88px] lg:px-12">
        <Link to="/" className="group flex items-center gap-2" data-testid="nav-logo">
          <LogoMark className="h-10 w-11 shrink-0 transition-transform duration-500 group-hover:-rotate-3 sm:h-12 sm:w-14 lg:h-16 lg:w-[72px]" />
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-9 xl:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              data-testid={`nav-${n.id}-link`}
              className={({ isActive }) =>
                `relative py-2 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-[#C87D53] after:transition-[width] after:duration-300 ${
                  isActive ? "text-[#D9935F] after:w-full" : "text-[#EFE3CC] after:w-0 hover:text-[#D9935F] hover:after:w-full"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center">
          <IconBtn onClick={() => setSearch(true)} data-testid="nav-search-button" aria-label="Search">
            <Search className="h-[22px] w-[22px]" strokeWidth={1.5} />
          </IconBtn>
          <IconBtn className="hidden sm:flex" onClick={() => nav("/admin")} data-testid="nav-account-button" aria-label="Account">
            <User className="h-[22px] w-[22px]" strokeWidth={1.5} />
          </IconBtn>
          <IconBtn onClick={() => setOpen(true)} data-testid="nav-cart-button" aria-label="Open cart">
            <ShoppingCart className="h-[22px] w-[22px]" strokeWidth={1.5} />
            <span className="absolute right-0.5 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#EFE3CC] px-1 text-[10px] font-bold text-[#0D0B08]" data-testid="nav-cart-count">
              {items.length}
            </span>
          </IconBtn>
          <IconBtn className="xl:hidden" onClick={() => setMobile((m) => !m)} data-testid="nav-mobile-toggle" aria-label="Toggle menu">
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </IconBtn>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-[#C87D53]/20 xl:hidden" data-testid="nav-mobile-menu">
            <div className="flex flex-col px-5 pb-6 pt-2">
              {[...NAV, { to: "/faq", label: "FAQ", id: "faq" }].map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} data-testid={`mobile-nav-${n.id}-link`} className={({ isActive }) => `block border-b border-[#C87D53]/15 py-4 font-rye text-2xl uppercase ${isActive ? "text-[#D9935F]" : "text-[#EFE3CC]"}`}>
                  {n.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <SearchDialog open={search} setOpen={setSearch} />
    </header>
  );
};
