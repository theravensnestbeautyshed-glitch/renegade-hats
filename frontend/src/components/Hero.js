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

const BENEFITS = [
  { icon: Star, label: ["One of a Kind", "Designs"] },
  { icon: Hammer, label: ["Handcrafted", "in Small Batches"] },
  { icon: Maple, label: ["Canadian", "Made"] },
];

const ease = [0.22, 1, 0.36, 1];
const rise = (d) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });

const HeroImage = () => {
  const mx = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 60, damping: 20 });
  const onMove = (e) => mx.set(e.clientX / window.innerWidth - 0.5);
  return (
    <div className="absolute inset-0 hidden xl:block" onMouseMove={onMove}>
      <motion.div style={{ x }} initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }} className="absolute inset-y-0 right-0 w-full xl:w-[58%]">
        <img
          src={IMAGES.heroRenegade}
          alt="Renegade Hats"
          className="h-full w-full object-cover object-center"
          style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 8%)" }}
          data-testid="hero-image"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B08]/30 via-transparent to-transparent" />
    </div>
  );
};

const MobileHeroImage = () => (
  <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }} className="relative aspect-[336/192] w-full overflow-hidden sm:mx-auto sm:max-w-[760px] xl:hidden" data-testid="hero-image-mobile">
    <img src={IMAGES.heroRenegade} alt="Renegade Hats" className="h-full w-full object-cover object-center" />
    <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-[#0D0B08] via-[#0D0B08]/50 to-transparent" />
  </motion.div>
);

export const Hero = () => (
  <section className="tex-wood torn-edge relative overflow-hidden" data-testid="hero-section">
    <HeroImage />
    <MobileHeroImage />
    <div className="relative z-10 mx-auto -mt-3 flex max-w-[1440px] flex-col px-5 pb-8 sm:-mt-4 sm:px-8 xl:mt-0 xl:min-h-[540px] xl:justify-center xl:px-12 xl:py-10">
      <div className="mx-auto w-full max-w-[760px] text-center xl:mx-0 xl:text-left">
        <h1 data-testid="hero-title">
          <span className="block overflow-hidden pb-2">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} className="font-script block text-[2.05rem] leading-[1.1] text-[#E7D3B5] sm:text-6xl xl:whitespace-nowrap xl:text-[5.2rem]" style={{ textShadow: "0 4px 24px rgba(0,0,0,.7)" }}>
              More Than a Hat…
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.38, ease: [0.76, 0, 0.24, 1] }} className="font-script block text-[1.28rem] uppercase leading-tight tracking-[0.05em] text-[#E7D3B5] sm:text-4xl xl:ml-8 xl:text-[3.2rem]">
              It’s a State of Mind.
            </motion.span>
          </span>
        </h1>
        <motion.div {...rise(0.7)} className="mx-auto mt-3 max-w-[260px] xl:mx-0 xl:ml-20 xl:mt-5 xl:max-w-[340px]">
          <SkullDivider />
        </motion.div>
        <motion.p {...rise(0.85)} className="mt-3 text-[11px] font-medium uppercase tracking-[0.26em] text-[#EFE3CC] sm:text-base xl:ml-10 xl:mt-5 xl:tracking-[0.3em]" data-testid="hero-secondary-tagline">
          One of a Kind. Handcrafted. No Rules.
        </motion.p>
        <motion.div {...rise(1)} className="mt-4 flex justify-center xl:ml-20 xl:mt-7 xl:justify-start">
          <Link to="/shop" className="btn-primary group h-[50px] min-h-0 w-full max-w-[280px] whitespace-nowrap px-3 text-sm tracking-[0.14em] sm:h-auto sm:min-h-[48px] sm:w-auto sm:px-10 sm:text-base sm:tracking-[0.18em]" data-testid="hero-shop-cta">
            Shop Now <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
        <motion.ul {...rise(1.15)} className="mx-auto mt-6 grid max-w-[360px] grid-cols-3 gap-2 sm:gap-6 xl:mx-0 xl:mt-10 xl:max-w-[460px]" data-testid="hero-benefits">
          {BENEFITS.map(({ icon: Icon, label }, i) => (
            <li key={i} className="flex flex-col items-center text-center" data-testid={`hero-benefit-${i}`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C87D53]/80 text-[#C87D53] sm:h-12 sm:w-12">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="mt-2 text-[10px] font-semibold uppercase leading-snug tracking-[0.1em] text-[#EFE3CC] sm:mt-2.5 sm:text-xs sm:tracking-[0.14em]">
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
