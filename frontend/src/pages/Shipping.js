import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Motion";

const SECTIONS = [
  { t: "Shipping", items: ["We ship across Canada and to the United States.", "Every hat is packed in a sturdy box with support inside the crown so it arrives in shape.", "Ready-made hats ship within 3–5 business days of purchase. Custom hats ship once complete.", "Shipping costs and any applicable taxes are calculated at checkout. All prices are in CAD.", "You'll receive tracking details by email as soon as your hat is on its way."] },
  { t: "Returns", items: ["Because every hat is one of a kind and handmade, we want you to love it.", "If your ready-made hat isn't right, contact us within 14 days of delivery to arrange a return.", "Hats must be returned unworn and in original condition. Return shipping is the buyer's responsibility.", "Custom hats are made specifically for you and are final sale."] },
  { t: "Damaged in Transit", items: ["If your hat arrives damaged, email us photos within 48 hours of delivery and we'll make it right."] },
  { t: "Hat Care", items: ["Store your hat crown-down or on a hat rack, away from heat.", "Brush gently with a soft brush. Let it air dry naturally if it gets wet.", "The distressing is intentional — every mark adds to its story."] },
];

export default function Shipping() {
  return (
    <div data-testid="shipping-page">
      <PageHeader eyebrow="Shipping & Returns" lines={["From Our Bench", "To Your Door."]} intro="Handmade in Powell River, B.C. and shipped with care." />
      <section className="mx-auto max-w-4xl space-y-14 px-5 pb-28 sm:px-8">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.t}>
            <div className="border-t border-[#C87D53]/20 pt-8" data-testid={`shipping-section-${i}`}>
              <h2 className="font-cinzel text-2xl font-black uppercase sm:text-3xl">{s.t}</h2>
              <ul className="mt-6 space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[#F2EADB]/85">
                    <span className="text-[#C87D53]">✦</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
