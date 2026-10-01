import { MaskLines, Eyebrow, Reveal } from "./Motion";

export const PageHeader = ({ eyebrow, lines, intro, image, testId }) => (
  <section className="relative overflow-hidden pb-14 pt-16 sm:pb-20 sm:pt-24" data-testid={testId}>
    {image && (
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B08]/60 via-[#0D0B08]/80 to-[#0D0B08]" />
      </div>
    )}
    <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
      <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
      <MaskLines lines={lines} className="font-cinzel text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#F2EADB] sm:text-5xl lg:text-7xl" />
      {intro && (
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#A3978C] md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  </section>
);
