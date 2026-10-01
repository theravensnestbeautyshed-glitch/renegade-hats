import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Motion";

const SECTIONS = [
  { t: "What We Collect", p: "When you place an order, request a custom hat, send a message or join our list, we collect the details you give us — such as your name, email, phone number, shipping address and the details of your request." },
  { t: "How We Use It", p: "We use your information only to fulfil orders, build custom hats, reply to your messages and, if you opt in, send occasional news about new hats and events. We never sell your information." },
  { t: "Payments", p: "Payments are processed securely by Stripe. Your card details go directly to Stripe and are never stored on our servers." },
  { t: "Your Choices", p: "You can unsubscribe from our emails at any time, or contact us to update or delete the information we hold about you." },
  { t: "Contact", p: "Questions about privacy? Reach us through the Contact page. Renégade Hats, Powell River, British Columbia, Canada." },
];

export default function Privacy() {
  return (
    <div data-testid="privacy-page">
      <PageHeader eyebrow="Privacy" lines={["Your Business", "Stays Yours."]} intro="How Renégade Hats handles your information." />
      <section className="mx-auto max-w-4xl space-y-12 px-5 pb-28 sm:px-8">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.t}>
            <div className="border-t border-[#C87D53]/20 pt-8" data-testid={`privacy-section-${i}`}>
              <h2 className="font-cinzel text-2xl uppercase sm:text-3xl">{s.t}</h2>
              <p className="mt-4 leading-relaxed text-[#F2EADB]/85">{s.p}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
