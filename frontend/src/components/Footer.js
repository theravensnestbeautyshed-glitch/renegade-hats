import { Link } from "react-router-dom";
import { LogoMark, Wordmark } from "./Logo";
import { NAV, SOCIALS } from "../data/content";

export const Footer = () => (
  <footer className="leather-bg relative border-t border-[#C87D53]/20" data-testid="site-footer">
    <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12">
      <div className="lg:col-span-6">
        <div className="flex items-center gap-4">
          <LogoMark className="h-14 w-14" />
          <Wordmark className="text-3xl sm:text-4xl" />
        </div>
        <p className="font-cinzel mt-6 text-xl italic text-[#F2EADB]/90">“More Than a Hat… It’s a State of Mind.”</p>
        <p className="mt-3 text-sm text-[#A3978C]" data-testid="footer-location">Powell River, British Columbia, Canada</p>
      </div>
      <div className="lg:col-span-3">
        <p className="font-mono-plex mb-5 text-xs uppercase tracking-[0.3em] text-[#C87D53]">Explore</p>
        <ul className="space-y-3">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="text-[#F2EADB]/80 transition-colors hover:text-[#C87D53]" data-testid={`footer-${n.id}-link`}>
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/shipping" className="text-[#F2EADB]/80 transition-colors hover:text-[#C87D53]" data-testid="footer-shipping-link">
              Shipping & Returns
            </Link>
          </li>
        </ul>
      </div>
      <div className="lg:col-span-3">
        <p className="font-mono-plex mb-5 text-xs uppercase tracking-[0.3em] text-[#C87D53]">Follow the Trail</p>
        <ul className="space-y-3">
          {SOCIALS.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noreferrer" className="text-[#F2EADB]/80 transition-colors hover:text-[#C87D53]" data-testid={`footer-social-${s.id}`}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-[#C87D53]/15">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-6 text-xs text-[#A3978C] sm:flex-row sm:justify-between sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} Renégade Hats. All prices in CAD.</span>
        <span className="font-mono-plex uppercase tracking-[0.25em]">One of a Kind · Handcrafted · No Rules</span>
      </div>
    </div>
  </footer>
);
