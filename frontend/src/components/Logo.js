export const LogoMark = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 120 110" className={className} aria-hidden="true">
    <g fill="none" stroke="#E9DCC3" strokeLinecap="round" strokeLinejoin="round">
      <path strokeWidth="5" d="M44 30 C30 30 16 26 6 12 C10 24 20 36 40 40" />
      <path strokeWidth="5" d="M76 30 C90 30 104 26 114 12 C110 24 100 36 80 40" />
    </g>
    <path fill="#E9DCC3" d="M60 22c-12 0-20 6-21 16-1 8 3 13 6 17l3 18c1 6 4 12 6 16 2 3 4 4 6 4s4-1 6-4c2-4 5-10 6-16l3-18c3-4 7-9 6-17-1-10-9-16-21-16z" />
    <g fill="#0D0B08">
      <path d="M45 44c3-3 9-3 11 1-2 4-8 5-11-1z" />
      <path d="M75 44c-3-3-9-3-11 1 2 4 8 5 11-1z" />
      <path d="M56 74c1 4 2 7 4 7s3-3 4-7c-3 1-5 1-8 0z" />
      <path d="M60 52l-3 10h6z" />
    </g>
    <g stroke="#C87D53" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M38 46 C30 60 26 76 28 98" />
      <path d="M28 98c-6-8-8-20-4-32 2 10 4 20 4 32z" fill="#7a3f22" />
      <path d="M36 56c-8 10-12 24-10 40" />
      <path d="M22 94c-6-10-6-22 0-32 0 10 0 22 0 32z" fill="#5e2f18" />
    </g>
    <circle cx="35" cy="54" r="2.4" fill="#C87D53" />
    <circle cx="33" cy="60" r="2" fill="#E9DCC3" />
  </svg>
);

export const Wordmark = ({ className = "", sub = true }) => (
  <span className={`flex flex-col leading-none ${className}`}>
    <span className="font-rye text-[1.3rem] uppercase tracking-[0.06em] text-[#EFE3CC] sm:text-[1.9rem]">Renégade Hats</span>
    {sub && (
      <span className="mt-1 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C9B9A0] sm:text-[10px] sm:tracking-[0.35em]">
        One of a Kind · Handcrafted Hats
      </span>
    )}
  </span>
);

export const SkullDivider = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C87D53]/70" />
    <svg viewBox="0 0 60 30" className="h-5 w-10">
      <path fill="#E9DCC3" d="M22 12C14 12 6 9 1 2c3 7 9 12 19 14zM38 12c8 0 16-3 21-10-3 7-9 12-19 14z" />
      <path fill="#E9DCC3" d="M30 6c-6 0-9 3-9 8 0 3 2 5 3 7l1 6c1 2 3 3 5 3s4-1 5-3l1-6c1-2 3-4 3-7 0-5-3-8-9-8z" />
    </svg>
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C87D53]/70" />
  </div>
);
