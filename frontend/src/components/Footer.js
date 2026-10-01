import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Music2 } from "lucide-react";
import { FOOTER_LINKS, SOCIALS } from "../data/content";

const Pinterest = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.5 2.1-4.5 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z" />
  </svg>
);

export const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, tiktok: Music2, youtube: Youtube, pinterest: Pinterest };

export const Footer = () => (
  <footer className="tex-wood border-t border-[#C87D53]/30" data-testid="site-footer">
    <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-8 sm:px-8 lg:grid-cols-3 lg:px-12">
      <div className="order-2 flex justify-center gap-3 lg:order-1 lg:justify-start">
        {SOCIALS.map((s) => {
          const Icon = SOCIAL_ICONS[s.id];
          return (
            <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-11 w-11 items-center justify-center text-[#EFE3CC] transition-colors hover:text-[#C87D53]" data-testid={`footer-social-${s.id}`}>
              <Icon className="h-6 w-6" />
            </a>
          );
        })}
      </div>
      <div className="order-1 text-center lg:order-2">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#C87D53]/70 sm:w-24" />
          <p className="font-caslon text-xl uppercase tracking-[0.3em] text-[#EFE3CC]">Renégade Hats</p>
          <span className="h-px w-10 bg-[#C87D53]/70 sm:w-24" />
        </div>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9B9A0]">One of a Kind. Handcrafted. No Rules.</p>
        <p className="mt-1 text-xs tracking-[0.08em] text-[#B9AC9C]" data-testid="footer-location">Handcrafted in Powell River, British Columbia, Canada 🇨🇦</p>
      </div>
      <nav className="order-3 flex flex-wrap justify-center gap-x-5 gap-y-1 lg:justify-end lg:gap-x-1">
        {FOOTER_LINKS.map((l, i) => (
          <span key={l.id} className="flex items-center">
            {i > 0 && <span className="hidden px-2 text-[#C87D53]/60 lg:inline">|</span>}
            <Link to={l.to} className="py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#EFE3CC] transition-colors hover:text-[#D9935F]" data-testid={`footer-${l.id}-link`}>
              {l.label}
            </Link>
          </span>
        ))}
      </nav>
    </div>
    <div className="border-t border-[#C87D53]/15 py-4 text-center text-[11px] text-[#A3978C]">© {new Date().getFullYear()} Renégade Hats · All prices in CAD</div>
  </footer>
);
