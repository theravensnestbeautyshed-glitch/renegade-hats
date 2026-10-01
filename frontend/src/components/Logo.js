export const LogoMark = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <g fill="none" stroke="#C87D53" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 30c6 4 42 4 48 0" />
      <path d="M19 30c0-9 3-16 7-16 2 0 4 3 6 3s4-3 6-3c4 0 7 7 7 16" />
      <path d="M45 18c4-5 8-6 11-6-2 3-5 7-10 9" />
    </g>
    <path fill="#F2EADB" d="M32 36c-6 0-10 4-10 9 0 3 2 5 4 6v4h12v-4c2-1 4-3 4-6 0-5-4-9-10-9z" />
    <g fill="#0D0B08">
      <circle cx="28" cy="45" r="2.6" />
      <circle cx="36" cy="45" r="2.6" />
      <path d="M32 48l-1.6 2.6h3.2z" />
    </g>
  </svg>
);

export const Wordmark = ({ className = "" }) => (
  <span className={`font-rye tracking-wide leading-none ${className}`}>
    RENÉGADE <span className="text-[#C87D53]">HATS</span>
  </span>
);
