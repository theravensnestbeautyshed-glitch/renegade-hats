import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Star, Hammer } from "lucide-react";
import { SkullDivider } from "./Logo";
import { IMAGES } from "../data/content";

const Maple = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2l1.6 3.4 2-1-.6 4.2 2.6-2.2.6 1.8 2.8-.6-1 3 1.6.8-4.4 3.6.6 1.8-4.2-.6V22h-1.2v-5.8l-4.2.6.6-1.8L3.8 11.4l1.6-.8-1-3 2.8.6.6-1.8L10.4 8.6 9.8 4.4l2 1z" />
  </svg>
);
const HatIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 15c3 2.5 17 2.5 20 0" />
    <path d="M6.5 15c0-4 1.5-8 3.5-8 1 0 1.3 1 2 1s1-1 2-1c2 0 3.5 4 3.5 8" />
    <path d="M7 12.5c3 1 7 1 10 0" />
  </svg>
);

const BENEFITS = [
  { icon: Star, label: ["One of a Kind", "Designs"] },
  { icon: Hammer, label: ["Handcrafted", "in Small Batches"] },
  { icon: Maple, label: ["Canadian", "Made"] },
  { icon: HatIcon, label: ["Custom", "Orders Available"] },
];

const ease = [0.22, 1, 0.36, 1];
const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });

const HeroImage = () => {
  const mx = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 60, damping: 20 });
  const onMove = (e) => mx.set(e.clientX / window.innerWidth - 0.5);
  return (
    <div className="absolute inset-0 hidden lg:block" onMouseMove={onMove}>
      <motion.div style={{ x }} initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }} className="absolute inset-y-0 right-0 w-full lg:w-[66%]">
        <img
          src={IMAGES.heroHat}
          alt="Renegade Hats handcrafted distressed hat with peacock feather"
          className="h-full w-full object-cover object-[60%_center]"
          style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 28%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 28%)" }}
          data-testid="hero-image"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B08]/30 via-transparent to-transparent" />
    </div>
  );
};

const MobileHeroImage = () => (
  <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }} className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[2/1] lg:hidden" data-testid="hero-image-mobile">
    <img src={IMAGES.heroHatFull} alt="Renegade Hats handcrafted distressed hat with peacock feather" className="h-full w-full object-cover object-[52%_45%]" />
    <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-[#0D0B08] to-transparent" />
  </motion.div>
);

export const Hero = () => (
  <section className="tex-wood torn-edge relative overflow-hidden" data-testid="hero-section">
    <HeroImage />
    <MobileHeroImage />
    <div className="relative mx-auto flex max-w-[1440px] flex-col px-5 pb-10 pt-1 sm:px-8 lg:min-h-[540px] lg:justify-center lg:px-12 lg:py-10">
      <div className="max-w-[760px] text-center lg:text-left">
        <h1 data-testid="hero-title">
          <span className="block overflow-hidden pb-2">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} className="font-script block text-[2.35rem] leading-[1.1] text-[#E7D3B5] sm:text-6xl lg:whitespace-nowrap lg:text-[5.2rem]" style={{ textShadow: "0 4px 24px rgba(0,0,0,.7)" }}>
              More Than a Hat…
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.38, ease: [0.76, 0, 0.24, 1] }} className="font-script block text-[1.45rem] uppercase leading-tight tracking-[0.04em] text-[#E7D3B5] sm:text-4xl lg:ml-8 lg:text-[3.2rem]">
              It’s a State of Mind.
            </motion.span>
          </span>
        </h1>
        <motion.div {...rise(0.7)} className="mx-auto mt-3 max-w-[260px] lg:mx-0 lg:ml-20 lg:mt-5 lg:max-w-[340px]">
          <SkullDivider />
        </motion.div>
        <motion.p {...rise(0.85)} className="mt-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#EFE3CC] sm:text-base lg:ml-10 lg:mt-5 lg:tracking-[0.3em]" data-testid="hero-secondary-tagline">
          One of a Kind. Handcrafted. No Rules.
        </motion.p>
        <motion.div {...rise(1)} className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-center sm:gap-4 lg:ml-20 lg:mt-7 lg:justify-start">
          <Link to="/shop" className="btn-primary group w-full whitespace-nowrap px-3 text-sm tracking-[0.12em] sm:w-auto sm:px-8 sm:text-base sm:tracking-[0.18em]" data-testid="hero-shop-cta">
            Shop Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/custom" className="btn-ghost px-3 sm:hidden" data-testid="hero-custom-cta-mobile">
            Custom Hats <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/custom" className="group hidden min-h-[48px] items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#EFE3CC] underline decoration-[#C87D53]/60 underline-offset-8 transition-colors hover:text-[#D9935F] sm:inline-flex" data-testid="hero-custom-cta">
            Create a Custom Hat
          </Link>
        </motion.div>
        <motion.ul {...rise(1.15)} className="mt-8 grid grid-cols-4 gap-2 sm:gap-6 lg:mt-10 lg:max-w-[600px]" data-testid="hero-benefits">
          {BENEFITS.map(({ icon: Icon, label }, i) => (
            <li key={i} className="flex flex-col items-center text-center" data-testid={`hero-benefit-${i}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C87D53]/80 text-[#C87D53] sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-2.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#EFE3CC] sm:text-xs">
                {label[0]}
                <br />
                {label[1]}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  </section>
);
