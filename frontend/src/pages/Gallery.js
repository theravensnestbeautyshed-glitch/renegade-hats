import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/Motion";
import { GALLERY, IMAGES } from "../data/content";

const TAGS = ["All", "Collection", "Custom", "Worn", "Workshop", "Details"];

export default function Gallery() {
  const [tag, setTag] = useState("All");
  const [open, setOpen] = useState(null);
  const items = GALLERY.filter((g) => tag === "All" || g.tag === tag);

  return (
    <div data-testid="gallery-page">
      <PageHeader eyebrow="The Gallery" lines={["Finished.", "Worn. Lived In."]} intro="A look at Renegade Hats out in the wild, on the bench and in the details." image={IMAGES.coast} />
      <section className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              data-testid={`gallery-filter-${t.toLowerCase()}`}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${tag === t ? "bg-[#C87D53] text-[#0D0B08]" : "border border-[#C87D53]/25 text-[#F2EADB]/80 hover:border-[#C87D53]"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <Reveal key={g.src + g.title} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
              <button onClick={() => setOpen(g)} className="group relative block w-full overflow-hidden bg-[#16120E] text-left" data-testid={`gallery-item-${i}`}>
                <img src={g.src} alt={g.title} loading="lazy" className={`w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#0D0B08]/90 to-transparent p-5 pt-16">
                  <span className="font-cinzel text-lg font-bold uppercase">{g.title}</span>
                  <span className="font-mono-plex text-[11px] uppercase tracking-[0.2em] text-[#C87D53]">{g.tag}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-5xl border-[#C87D53]/30 bg-[#0D0B08] p-2 text-[#F2EADB]" data-testid="gallery-lightbox">
          <DialogTitle className="sr-only">{open?.title}</DialogTitle>
          <DialogDescription className="sr-only">Gallery image</DialogDescription>
          {open && (
            <div>
              <img src={open.src} alt={open.title} className="max-h-[80vh] w-full object-contain" />
              <p className="font-cinzel p-3 text-lg font-bold uppercase">{open.title}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
