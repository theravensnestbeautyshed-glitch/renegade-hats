import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const MaskLines = ({ lines, className = "", lineClass = "", delay = 0.2, as: Tag = "h1", testId }) => (
  <Tag className={className} data-testid={testId}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em] pt-[0.14em]">
        <motion.span
          className={`block ${lineClass}`}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, delay: delay + i * 0.14, ease: [0.76, 0, 0.24, 1] }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Eyebrow = ({ children, className = "" }) => (
  <p className={`font-mono-plex text-xs uppercase tracking-[0.3em] text-[#C87D53] ${className}`}>{children}</p>
);
