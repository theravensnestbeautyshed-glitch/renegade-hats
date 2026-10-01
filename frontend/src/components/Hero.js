import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskLines, Eyebrow } from "./Motion";
import { IMAGES } from "../data/content";

const TiltHat = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className="relative mx-auto w-[260px] sm:w-[320px] lg:w-[380px]"
      data-testid="hero-tilt-hat"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        <div className="notch spotlight aspect-[3/4] overflow-hidden border border-[#C87D53]/30">
          <img src={IMAGES.renegade} alt="The Renegade handmade hat" className="h-full w-full object-cover" />
        </div>
        <div style={{ transform: "translateZ(60px)" }} className="absolute -bottom-6 -left-6 border border-[#C87D53]/40 bg-[#0D0B08]/90 px-5 py-4 backdrop-blur-md">
          <p className="font-mono-plex text-[11px] uppercase tracking-[0.25em] text-[#C87D53]">No. 01 · 1 of 1</p>
          <p className="font-cinzel text-lg font-bold uppercase text-[#F2EADB]">The Renegade</p>
        </div>
        <div style={{ transform: "translateZ(40px)" }} className="font-rye absolute -right-5 -top-5 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border border-[#C87D53]/60 bg-[#0D0B08] text-center text-[10px] leading-tight text-[#C87D53]">
          HAND<br />MADE<br />B.C.
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden" data-testid="hero-section">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt=""
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover object-center opacity-55"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B08] via-[#0D0B08]/75 to-[#0D0B08]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B08] via-transparent to-[#0D0B08]/50" />

      <motion.div style={{ opacity: fade }} className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 1 }}>
            <Eyebrow className="mb-8">Est. Powell River · British Columbia</Eyebrow>
          </motion.div>
          <MaskLines
            testId="hero-title"
            lines={["RENÉGADE", <span key="h" className="text-[#C87D53]">HATS</span>]}
            className="font-rye text-[3.2rem] leading-[0.95] text-[#F2EADB] sm:text-7xl lg:text-[5.6rem] xl:text-[7rem]"
          />
          <MaskLines
            as="p"
            delay={0.6}
            lines={["More Than a Hat…", "It’s a State of Mind."]}
            className="font-cinzel mt-8 text-2xl font-semibold italic text-[#F2EADB] sm:text-3xl lg:text-4xl"
            testId="hero-tagline"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="font-mono-plex mt-6 text-xs uppercase tracking-[0.3em] text-[#A3978C] sm:text-sm"
            data-testid="hero-secondary-tagline"
          >
            One of a Kind. Handcrafted. No Rules.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/shop" className="btn-primary group" data-testid="hero-shop-cta">
              Shop the Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/custom" className="btn-ghost" data-testid="hero-custom-cta">Create a Custom Hat</Link>
          </motion.div>
        </div>
        <div className="lg:col-span-5">
          <TiltHat />
        </div>
      </motion.div>
    </section>
  );
};
