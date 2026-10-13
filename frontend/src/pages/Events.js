import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Motion";
import { IMAGES, POPUPS } from "../data/content";

const EventCard = ({ e }) => (
  <Reveal>
    <article className="copper-frame leather-bg notch px-6 py-10 sm:px-12 sm:py-14" data-testid={`event-${e.id}`}>
      <h2 className="font-rye text-3xl uppercase leading-tight tracking-[0.04em] text-[#EFE3CC] sm:text-5xl" data-testid="event-title">{e.title}</h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#F2EADB]/85 md:text-lg">{e.text}</p>
      <dl className="mt-8 grid gap-6 border-t border-[#C87D53]/30 pt-8 sm:grid-cols-2">
        <div className="flex gap-4">
          <CalendarDays className="mt-1 h-6 w-6 shrink-0 text-[#C87D53]" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9935F]">Dates</dt>
            <dd className="font-cinzel mt-1 text-xl font-bold uppercase text-[#EFE3CC] sm:text-2xl" data-testid="event-date">{e.date}</dd>
          </div>
        </div>
        <div className="flex gap-4">
          <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#C87D53]" />
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9935F]">Location</dt>
            <dd className="mt-1 text-base font-medium leading-relaxed text-[#EFE3CC] sm:text-lg" data-testid="event-location">{e.place}</dd>
          </div>
        </div>
      </dl>
    </article>
  </Reveal>
);

export default function Events() {
  return (
    <div data-testid="events-page">
      <PageHeader eyebrow="Find Us Out There" lines={["Upcoming", "Appearances."]} intro="Upcoming pop-ups, markets & places to find Renegade Hats in person." image={IMAGES.panelTouch} />
      <section className="mx-auto max-w-[1100px] space-y-10 px-5 pb-28 sm:px-8">
        {POPUPS.map((e) => <EventCard key={e.id} e={e} />)}
      </section>
    </div>
  );
}
