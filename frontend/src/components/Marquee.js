const WORDS = ["One of a Kind", "Handcrafted", "No Rules", "Powell River, B.C.", "Distressed by Hand", "No Two Are the Same"];

export const Marquee = ({ testId = "marquee" }) => {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-[#C87D53]/20 bg-[#0D0B08] py-6" data-testid={testId}>
      <div className="marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="font-cinzel px-8 text-2xl font-bold uppercase tracking-[0.12em] text-[#F2EADB]/85 sm:text-4xl">
                  {w}
                </span>
                <span className="text-[#C87D53] text-xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
