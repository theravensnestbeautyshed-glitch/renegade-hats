import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Hero } from "../components/Hero";
import { FavButton } from "../components/FavButton";
import { useProducts } from "../hooks/useProducts";
import { IMAGES } from "../data/content";
import { api, formatCAD } from "../lib/api";

export const SectionTitle = ({ children, testId }) => (
  <div className="flex items-center justify-center gap-4 sm:gap-6" data-testid={testId}>
    <span className="h-px w-8 bg-[#C87D53]/70 sm:w-24" />
    <h2 className="font-caslon whitespace-nowrap text-lg font-bold uppercase tracking-[0.25em] text-[#EFE3CC] sm:text-2xl sm:tracking-[0.4em]">{children}</h2>
    <span className="h-px w-8 bg-[#C87D53]/70 sm:w-24" />
  </div>
);

const FeaturedCard = ({ p, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
    className="min-w-0"
  >
    <Link to={`/shop/${p.slug}`} className="copper-frame group relative block bg-[#0A0806] transition-[border-color] duration-300 hover:border-[#C87D53]" data-testid={`featured-card-${p.slug}`}>
      <div className="relative aspect-[3/2.1] overflow-hidden">
        <img src={p.images?.[0]} alt={p.name} loading="lazy" className={`h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.07] ${p.sold ? "grayscale-[60%]" : ""}`} />
        <FavButton slug={p.slug} className="absolute right-1 top-1" />
        {p.sold && <span className="font-rye absolute bottom-2 left-2 border border-[#b23a2a] bg-[#0D0B08]/80 px-2 py-0.5 text-xs text-[#e0573f]">SOLD OUT</span>}
      </div>
      <div className="px-2 py-3 text-center">
        <p className="font-caslon text-[13px] font-bold uppercase tracking-[0.14em] text-[#EFE3CC] sm:text-sm">{p.name}</p>
        <p className="font-caslon mt-1 text-[13px] font-bold tracking-[0.1em] text-[#EFE3CC]/90 sm:text-sm" data-testid={`featured-price-${p.slug}`}>{formatCAD(p.price)}</p>
      </div>
    </Link>
  </motion.div>
);

const FeaturedHats = () => {
  const { products } = useProducts();
  return (
    <section className="tex-leather torn-edge px-4 pb-10 pt-10 sm:px-8 lg:px-12" data-testid="featured-collection">
      <div className="relative mx-auto max-w-[1440px]">
        <SectionTitle testId="featured-title">Featured Hats</SectionTitle>
        <Link to="/shop" className="group mt-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#EFE3CC] underline decoration-[#C87D53]/60 underline-offset-4 hover:text-[#D9935F] lg:absolute lg:right-0 lg:top-2 lg:mt-0" data-testid="featured-view-all">
          View All Hats <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-7 lg:grid-cols-6 lg:gap-4" data-testid="featured-grid">
          {products.map((p, i) => (
            <FeaturedCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Panel = ({ img, imgPos = "center", align = "right", children, testId, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="copper-frame group relative min-h-[210px] overflow-hidden"
    data-testid={testId}
  >
    <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" style={{ objectPosition: imgPos }} />
    <div className={`absolute inset-0 ${align === "right" ? "bg-gradient-to-r from-[#0D0B08]/30 via-[#0D0B08]/60 to-[#0D0B08]/90" : "bg-gradient-to-r from-[#0D0B08]/90 via-[#0D0B08]/65 to-[#0D0B08]/10"}`} />
    <div className={`relative flex h-full flex-col justify-center p-6 sm:p-7 ${align === "right" ? "items-start sm:ml-[42%]" : "items-start"}`}>{children}</div>
  </motion.div>
);

const PanelTitle = ({ children }) => <h3 className="font-rye text-[1.75rem] uppercase leading-none tracking-[0.06em] text-[#EFE3CC] sm:text-3xl">{children}</h3>;
const PanelText = ({ children }) => <p className="mt-3 text-xs font-medium uppercase leading-relaxed tracking-[0.18em] text-[#E2D4BD]">{children}</p>;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [joined, setJoined] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/newsletter", { email });
      setJoined(true);
      setEmail("");
      toast.success("You're on the list.");
    } catch {
      toast.error("Please enter a valid email address.");
    } finally {
      setBusy(false);
    }
  };
  if (joined) return <p className="font-script mt-5 text-2xl text-[#D9935F]" data-testid="newsletter-success">Welcome to the outfit.</p>;
  return (
    <form onSubmit={submit} className="mt-5 flex w-full max-w-[400px]" data-testid="newsletter-form">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="min-h-[48px] w-full min-w-0 border border-[#C87D53]/50 bg-[#0D0B08]/85 px-4 text-sm text-[#EFE3CC] outline-none placeholder:text-[#A3978C] focus:border-[#C87D53]" data-testid="newsletter-email-input" />
      <button disabled={busy} className="btn-primary shrink-0 px-5 shadow-none" data-testid="newsletter-join-button">
        Join <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

const Promos = () => (
  <section className="tex-wood px-4 py-8 sm:px-8 lg:px-12" data-testid="promo-panels">
    <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-[1.12fr_1fr_1.12fr]">
      <Panel i={0} img={IMAGES.panelCustom} imgPos="left center" testId="promo-custom">
        <PanelTitle>Custom Hats</PanelTitle>
        <PanelText>Let’s create something<br />that’s uniquely yours.</PanelText>
        <Link to="/custom" className="btn-primary mt-5 px-5 text-sm" data-testid="promo-custom-cta">Request a Custom Hat <ArrowRight className="h-4 w-4" /></Link>
      </Panel>
      <Panel i={1} img={IMAGES.panelStory} imgPos="center" testId="promo-story">
        <PanelTitle>The Story</PanelTitle>
        <PanelText>Handcrafted hats.<br />Real stories.</PanelText>
        <Link to="/story" className="btn-primary mt-5 px-5 text-sm" data-testid="promo-story-cta">Our Story <ArrowRight className="h-4 w-4" /></Link>
      </Panel>
      <Panel i={2} img={IMAGES.panelTouch} imgPos="right center" align="left" testId="promo-newsletter">
        <PanelTitle>Keep in Touch</PanelTitle>
        <PanelText>Be the first to see new hats,<br />custom pieces and upcoming events.</PanelText>
        <Newsletter />
      </Panel>
    </div>
  </section>
);

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <FeaturedHats />
      <Promos />
    </div>
  );
}
