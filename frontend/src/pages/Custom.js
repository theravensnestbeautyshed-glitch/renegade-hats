import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { PageHeader } from "../components/PageHeader";
import { Reveal, Eyebrow } from "../components/Motion";
import { api } from "../lib/api";
import { IMAGES, CUSTOM_STEPS } from "../data/content";

const HATS = ["The Renegade", "Midnight Renegade", "Renegade Red", "The Outlaw", "The Wanderer", "The Shaman", "Surprise me"];
const DETAILS = ["Feathers", "Conchos", "Leather work", "Hand-painted artwork", "Skull / Jolly Roger", "Turquoise / stones", "Burned brim", "Other"];
const BUDGETS = ["$250 – $350 CAD", "$350 – $500 CAD", "$500+ CAD", "Not sure yet"];

const Field = ({ label, children }) => (
  <label className="block">
    <span className="font-mono-plex mb-2 block text-xs uppercase tracking-[0.2em] text-[#A3978C]">{label}</span>
    {children}
  </label>
);

const initial = { name: "", email: "", phone: "", base_hat: "", colours: "", band: "", details: [], head_size: "", budget: "", vision: "" };

const CustomForm = () => {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";
  const refName = HATS.find((h) => h.toLowerCase().replace(/\s+/g, "-") === ref) || "";
  const [f, setF] = useState({ ...initial, base_hat: refName });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (d) => setF({ ...f, details: f.details.includes(d) ? f.details.filter((x) => x !== d) : [...f.details, d] });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/custom-requests", { ...f, reference_hat: ref });
      setDone(true);
      toast.success("Your custom hat request is in. We'll be in touch soon.");
    } catch {
      toast.error("Please check your name, email and vision, then try again.");
    } finally {
      setSending(false);
    }
  };

  if (done)
    return (
      <div className="notch leather-bg p-10 text-center sm:p-16" data-testid="custom-success">
        <p className="font-rye text-4xl text-[#C87D53]">Request Received</p>
        <p className="mx-auto mt-4 max-w-md text-[#F2EADB]/85">Thank you, {f.name.split(" ")[0]}. We'll reach out by email within a few days to talk through your one-of-a-kind hat.</p>
        <button onClick={() => { setF(initial); setDone(false); }} className="btn-ghost mt-8" data-testid="custom-new-request">Send Another</button>
      </div>
    );

  return (
    <form onSubmit={submit} className="notch leather-bg space-y-6 p-6 sm:p-10" data-testid="custom-hat-form">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name *"><input required className="field" value={f.name} onChange={set("name")} data-testid="custom-name-input" /></Field>
        <Field label="Email *"><input required type="email" className="field" value={f.email} onChange={set("email")} data-testid="custom-email-input" /></Field>
        <Field label="Phone (optional)"><input className="field" value={f.phone} onChange={set("phone")} data-testid="custom-phone-input" /></Field>
        <Field label="Starting hat">
          <select className="field" value={f.base_hat} onChange={set("base_hat")} data-testid="custom-base-select">
            <option value="">Choose a style…</option>
            {HATS.map((h) => <option key={h}>{h}</option>)}
          </select>
        </Field>
        <Field label="Colours"><input className="field" placeholder="e.g. smoke black, oxblood" value={f.colours} onChange={set("colours")} data-testid="custom-colours-input" /></Field>
        <Field label="Band"><input className="field" placeholder="e.g. braided leather, turquoise" value={f.band} onChange={set("band")} data-testid="custom-band-input" /></Field>
      </div>
      <div>
        <span className="font-mono-plex mb-3 block text-xs uppercase tracking-[0.2em] text-[#A3978C]">Details</span>
        <div className="flex flex-wrap gap-2">
          {DETAILS.map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => toggle(d)}
              data-testid={`custom-detail-${d.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${f.details.includes(d) ? "bg-[#C87D53] text-[#0D0B08]" : "border border-[#C87D53]/30 text-[#F2EADB]/80 hover:border-[#C87D53]"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Head size (if known)"><input className="field" placeholder="e.g. 58 cm / 7 1/4" value={f.head_size} onChange={set("head_size")} data-testid="custom-size-input" /></Field>
        <Field label="Budget">
          <select className="field" value={f.budget} onChange={set("budget")} data-testid="custom-budget-select">
            <option value="">Select…</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Tell us your vision *">
        <textarea required rows={5} className="field resize-none" placeholder="The feeling, the story, the symbols…" value={f.vision} onChange={set("vision")} data-testid="custom-vision-input" />
      </Field>
      <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto" data-testid="custom-hat-submit-button">
        {sending ? "Sending…" : "Start Your Custom Hat"}
      </button>
    </form>
  );
};

export default function Custom() {
  return (
    <div data-testid="custom-page">
      <PageHeader
        eyebrow="Custom Hats"
        lines={["Request Your", "Own Renegade."]}
        intro="Work directly with Renegade Hats to create something completely unique — a hat that exists nowhere else, made for nobody but you."
        image={IMAGES.jolly}
      />
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 pb-28 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Eyebrow className="mb-8">How It Works</Eyebrow>
          {CUSTOM_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="flex gap-6 border-t border-[#C87D53]/20 py-6" data-testid={`custom-step-${s.n}`}>
                <span className="font-mono-plex pt-1 text-sm text-[#C87D53]">{s.n}</span>
                <div>
                  <h3 className="font-cinzel text-xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-1 text-sm text-[#A3978C]">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="notch spotlight mt-6 aspect-[4/3] overflow-hidden">
              <img src={IMAGES.detail} alt="Hat band details" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <CustomForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
