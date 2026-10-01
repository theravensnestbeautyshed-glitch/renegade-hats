import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Instagram, Facebook, Music2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal, Eyebrow } from "../components/Motion";
import { api } from "../lib/api";
import { SOCIALS } from "../data/content";

const ICONS = { instagram: Instagram, facebook: Facebook, tiktok: Music2 };
const initial = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [f, setF] = useState(initial);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact", f);
      setSent(true);
      setF(initial);
      toast.success("Message sent. We'll get back to you soon.");
    } catch {
      toast.error("Please check your details and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <PageHeader eyebrow="Contact" lines={["Send Word", "Down the Trail."]} intro="Questions, orders, custom requests or just want to talk hats — we read every message." />
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 pb-28 sm:px-8 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-7">
          <form onSubmit={submit} className="notch leather-bg space-y-6 p-6 sm:p-10" data-testid="contact-form">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono-plex mb-2 block text-xs uppercase tracking-[0.2em] text-[#A3978C]">Name *</span>
                <input required className="field" value={f.name} onChange={set("name")} data-testid="contact-name-input" />
              </label>
              <label className="block">
                <span className="font-mono-plex mb-2 block text-xs uppercase tracking-[0.2em] text-[#A3978C]">Email *</span>
                <input required type="email" className="field" value={f.email} onChange={set("email")} data-testid="contact-email-input" />
              </label>
            </div>
            <label className="block">
              <span className="font-mono-plex mb-2 block text-xs uppercase tracking-[0.2em] text-[#A3978C]">Phone (optional)</span>
              <input className="field" value={f.phone} onChange={set("phone")} data-testid="contact-phone-input" />
            </label>
            <label className="block">
              <span className="font-mono-plex mb-2 block text-xs uppercase tracking-[0.2em] text-[#A3978C]">Message *</span>
              <textarea required rows={6} className="field resize-none" value={f.message} onChange={set("message")} data-testid="contact-message-input" />
            </label>
            <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto" data-testid="contact-form-submit-button">
              {sending ? "Sending…" : "Send Message"}
            </button>
            {sent && <p className="text-sm text-[#8fbf8a]" data-testid="contact-success">Thank you — your message is on its way.</p>}
          </form>
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-5">
          <Eyebrow className="mb-6">Find Us</Eyebrow>
          <p className="flex items-start gap-3 text-lg">
            <MapPin className="mt-1 h-5 w-5 text-[#C87D53]" />
            <span>Powell River, British Columbia, Canada</span>
          </p>
          <p className="mt-4 text-[#A3978C]">Workshop visits by appointment only. Custom hat requests are best started through the Custom Hats page.</p>
          <div className="copper-rule my-10" />
          <Eyebrow className="mb-6">Follow the Trail</Eyebrow>
          <div className="flex flex-col gap-3">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.id];
              return (
                <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border border-[#C87D53]/20 px-5 py-4 transition-colors duration-300 hover:border-[#C87D53] hover:bg-[#16120E]" data-testid={`contact-social-${s.id}`}>
                  <span className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#C87D53]" /> {s.label}</span>
                  <span className="text-[#A3978C] transition-transform group-hover:translate-x-1">→</span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
