import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Motion";
import { FAQS } from "../data/content";

export default function FAQ() {
  return (
    <div data-testid="faq-page">
      <PageHeader eyebrow="FAQ" lines={["Questions,", "Answered."]} intro="Everything you need to know about our one-of-a-kind hats, custom orders and shipping." />
      <section className="mx-auto max-w-4xl px-5 pb-28 sm:px-8">
        <Reveal>
          <Accordion type="single" collapsible className="border-t border-[#C87D53]/20">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-b border-[#C87D53]/20" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="font-cinzel py-6 text-left text-lg font-bold uppercase tracking-wide text-[#F2EADB] hover:text-[#C87D53] hover:no-underline sm:text-xl [&>svg]:text-[#C87D53]" data-testid={`faq-trigger-${i}`}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-[#F2EADB]/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal>
          <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-cinzel text-xl">Still have a question?</p>
            <Link to="/contact" className="btn-primary" data-testid="faq-contact-cta">Get in Touch</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
