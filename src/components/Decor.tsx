import { motion } from "motion/react";
import { useStore } from "@/lib/store";

export function StarShape({ className, fill = "#FFE7A3" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10Z"
        fill={fill}
      />
    </svg>
  );
}

const burstColors = ["#F5BFD3", "#D8C6F2", "#FFE7A3", "#C6E8DB", "#FFD6C4"];

/** A gentle burst of sparkles. Re-triggers whenever `trigger` changes. Decorative only. */
export function SparkleBurst({
  trigger,
  count = 9,
  radius = 110,
}: {
  trigger: number;
  count?: number;
  radius?: number;
}) {
  const { motionOff } = useStore();
  if (!trigger || motionOff) return null;
  return (
    <div
      key={trigger}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const r = radius * (0.7 + ((i * 37) % 10) / 25);
        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * r,
              y: Math.sin(angle) * r,
              scale: [0, 1.1, 0.6],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.1, ease: "easeOut", delay: (i % 3) * 0.04 }}
          >
            <StarShape className="size-5" fill={burstColors[i % burstColors.length]} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Slow floating sparkles scattered over a region. Decorative only. */
export function FloatingStars({
  stars,
}: {
  stars: { x: string; y: string; size: number; color?: string; delay?: number }[];
}) {
  const { motionOff } = useStore();
  return (
    <div className="decor pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size }}
          animate={
            motionOff ? undefined : { y: [0, -10, 0], rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }
          }
          transition={{
            duration: 5 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay ?? i * 0.4,
          }}
        >
          <StarShape className="size-full" fill={s.color ?? burstColors[i % burstColors.length]} />
        </motion.div>
      ))}
    </div>
  );
}

/** Mochi — the project's original mascot, a small round capsule friend. */
export function Mochi({
  className,
  color = "#FFFAF4",
  cap = "#F5BFD3",
}: {
  className?: string;
  color?: string;
  cap?: string;
}) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="40" cy="74" rx="22" ry="4" fill="#5B4646" opacity="0.12" />
      <path d="M10 44 A30 30 0 0 1 70 44 Z" fill={cap} />
      <path
        d="M10 44 L70 44 C70 62 58 72 40 72 C22 72 10 62 10 44Z"
        fill={color}
        stroke="#EADBD3"
        strokeWidth="1.5"
      />
      <rect x="10" y="41" width="60" height="6" rx="3" fill="#fff" opacity="0.7" />
      <ellipse
        cx="24"
        cy="28"
        rx="5"
        ry="3"
        fill="#fff"
        opacity="0.6"
        transform="rotate(-30 24 28)"
      />
      <ellipse cx="31" cy="55" rx="3" ry="3.6" fill="#5B4646" />
      <ellipse cx="49" cy="55" rx="3" ry="3.6" fill="#5B4646" />
      <path
        d="M37 60 Q40 63 43 60"
        fill="none"
        stroke="#5B4646"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="24" cy="61" rx="4.5" ry="2.6" fill="#F28FB0" opacity="0.5" />
      <ellipse cx="56" cy="61" rx="4.5" ry="2.6" fill="#F28FB0" opacity="0.5" />
    </svg>
  );
}

/** A tiny capsule toy, used as ambient decoration. */
export function Capsule({
  className,
  top = "#D8C6F2",
  bottom = "#FFFAF4",
}: {
  className?: string;
  top?: string;
  bottom?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M6 20 A14 14 0 0 1 34 20Z" fill={top} />
      <path d="M6 20 L34 20 A14 14 0 0 1 6 20Z" fill={bottom} stroke="#EADBD3" strokeWidth="1" />
      <rect x="5" y="18.5" width="30" height="3" rx="1.5" fill="#fff" opacity="0.8" />
      <ellipse
        cx="14"
        cy="12"
        rx="3"
        ry="1.8"
        fill="#fff"
        opacity="0.7"
        transform="rotate(-30 14 12)"
      />
    </svg>
  );
}

/** A soft divider made of tiny stars. */
export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`decor flex items-center justify-center gap-3 py-2 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-cocoa/15" />
      <StarShape className="size-3" fill="#F5BFD3" />
      <StarShape className="size-4" fill="#D8C6F2" />
      <StarShape className="size-3" fill="#C6E8DB" />
      <span className="h-px w-16 bg-cocoa/15" />
    </div>
  );
}
