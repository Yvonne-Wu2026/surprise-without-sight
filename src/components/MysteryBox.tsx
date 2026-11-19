import { motion } from "motion/react";
import { useId } from "react";
import type { BoxTheme } from "@/lib/theme";
import type { Chapter } from "@/content/research";

export type Emblem = Chapter["emblem"] | "star" | "gift";

type Props = {
  theme: BoxTheme;
  open?: boolean;
  /** Ribbon/bow loosened (pre-open state). */
  loosened?: boolean;
  /** Ribbon wiggles (hover). */
  wiggle?: boolean;
  emblem?: Emblem;
  /** Number shown on the paper tag, e.g. "01". */
  tag?: string;
  variant?: "face" | "gift";
  className?: string;
};

const INK = "#5B4646";

export function EmblemShape({ emblem, color = INK }: { emblem: Emblem; color?: string }) {
  switch (emblem) {
    case "question":
      return (
        <path
          d="M-5 -5 C-5 -11 5 -11 5 -5 C5 -1 0 0 0 4 M0 9 L0 9.5"
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    case "heart":
      return (
        <path
          d="M0 8 C-12 0 -9 -10 -3 -8 C-1 -7.5 0 -6 0 -5 C0 -6 1 -7.5 3 -8 C9 -10 12 0 0 8Z"
          fill={color}
        />
      );
    case "eye":
      return (
        <g>
          <path
            d="M-10 0 Q0 -10 10 0 Q0 10 -10 0Z"
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          <circle r={3.2} fill={color} />
        </g>
      );
    case "spark":
    case "star":
      return (
        <path
          d="M0 -10 L2.6 -2.6 L10 0 L2.6 2.6 L0 10 L-2.6 2.6 L-10 0 L-2.6 -2.6Z"
          fill={color}
          strokeLinejoin="round"
        />
      );
    case "hands":
      return (
        <g fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
          <path d="M-10 4 Q-6 -6 0 -2 Q6 -6 10 4" />
          <path d="M-7 8 L7 8" />
        </g>
      );
    case "bulb":
      return (
        <g fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
          <path d="M-4 5 C-4 1 -7 0 -7 -4 C-7 -8 -4 -10 0 -10 C4 -10 7 -8 7 -4 C7 0 4 1 4 5Z" />
          <path d="M-3 9 L3 9" />
        </g>
      );
    case "moon":
      return <path d="M3 -9 A9 9 0 1 0 9 5 A7 7 0 1 1 3 -9Z" fill={color} />;
    case "gift":
      return (
        <path d="M0 -8 L0 8 M-8 0 L8 0" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
      );
  }
}

/**
 * A clay-like pastel mystery box drawn in SVG.
 * Purely decorative: always aria-hidden. Wrap it in a button with a real label.
 */
export function MysteryBox({
  theme,
  open,
  loosened,
  wiggle,
  emblem = "question",
  tag,
  variant = "face",
  className,
}: Props) {
  const id = useId().replace(/:/g, "");
  const spring = { type: "spring", stiffness: 220, damping: 16 } as const;

  return (
    <svg
      viewBox="0 0 200 210"
      className={className}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
    >
      <defs>
        <linearGradient id={`body-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={theme.base} />
          <stop offset="0.7" stopColor={theme.base} />
          <stop offset="1" stopColor={theme.shade} />
        </linearGradient>
        <linearGradient id={`lid-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={theme.lid} />
          <stop offset="1" stopColor={theme.base} />
        </linearGradient>
      </defs>

      {/* soft contact shadow */}
      <ellipse cx="100" cy="196" rx="74" ry="9" fill={INK} opacity="0.12" />

      {/* box interior, visible once the lid lifts */}
      <rect x="40" y="86" width="120" height="16" rx="8" fill={theme.shade} />
      <rect x="48" y="90" width="104" height="8" rx="4" fill={INK} opacity="0.18" />

      {/* body */}
      <rect x="34" y="92" width="132" height="98" rx="20" fill={`url(#body-${id})`} />
      <rect x="44" y="104" width="9" height="58" rx="4.5" fill="#fff" opacity="0.4" />

      {variant === "gift" ? (
        <rect x="89" y="92" width="22" height="98" fill={theme.ribbon} />
      ) : (
        <g>
          {open ? (
            <g fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round">
              <path d="M70 140 Q77 132 84 140" />
              <path d="M116 140 Q123 132 130 140" />
            </g>
          ) : (
            <g fill={INK}>
              <ellipse cx="77" cy="139" rx="5" ry="6" />
              <ellipse cx="123" cy="139" rx="5" ry="6" />
              <circle cx="78.6" cy="137" r="1.6" fill="#fff" />
              <circle cx="124.6" cy="137" r="1.6" fill="#fff" />
            </g>
          )}
          <ellipse cx="64" cy="154" rx="9" ry="5" fill="#F28FB0" opacity="0.45" />
          <ellipse cx="136" cy="154" rx="9" ry="5" fill="#F28FB0" opacity="0.45" />
          <path
            d={open ? "M92 150 Q100 162 108 150 Z" : "M94 151 Q100 157 106 151"}
            fill={open ? INK : "none"}
            stroke={INK}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* lid + ribbon + bow + tag */}
      <motion.g
        style={{ originX: 0, originY: 1 }}
        animate={open ? { rotate: -12, y: -30, x: -2 } : { rotate: 0, y: 0, x: 0 }}
        transition={spring}
      >
        <rect x="26" y="68" width="148" height="32" rx="13" fill={`url(#lid-${id})`} />
        <rect x="26" y="92" width="148" height="8" rx="4" fill={theme.shade} opacity="0.5" />
        <rect x="38" y="73" width="30" height="5" rx="2.5" fill="#fff" opacity="0.55" />
        <rect x="89" y="68" width="22" height="32" fill={theme.ribbon} />
        <rect x="89" y="92" width="22" height="8" fill={theme.ribbonShade} opacity="0.6" />

        {/* tag on a string */}
        <path d="M30 84 Q20 92 22 104" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.6" />
        <g transform="translate(22 118) rotate(-10)">
          <rect
            x="-15"
            y="-15"
            width="30"
            height="34"
            rx="7"
            fill="#FFFAF4"
            stroke={theme.shade}
            strokeWidth="2"
          />
          <circle cx="0" cy="-9" r="2.2" fill={theme.shade} />
          {tag ? (
            <text
              x="0"
              y="10"
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight="600"
              fontSize="13"
              fill={INK}
            >
              {tag}
            </text>
          ) : (
            <g transform="translate(0 4) scale(0.7)">
              <EmblemShape emblem={emblem} />
            </g>
          )}
        </g>

        {/* bow */}
        <motion.g
          style={{ originX: 0.5, originY: 0.8 }}
          animate={
            open
              ? { y: -26, x: 18, rotate: 28, opacity: 0, scale: 0.9 }
              : loosened
                ? { rotate: 10, scale: 1.08, y: -3, opacity: 1, x: 0 }
                : wiggle
                  ? { rotate: [0, -8, 7, -4, 0], scale: 1, y: 0, opacity: 1, x: 0 }
                  : { rotate: 0, scale: 1, y: 0, opacity: 1, x: 0 }
          }
          transition={wiggle && !loosened && !open ? { duration: 0.7 } : spring}
        >
          <path d="M96 72 L82 98 L91 95 L99 74Z" fill={theme.ribbonShade} />
          <path d="M104 72 L118 98 L109 95 L101 74Z" fill={theme.ribbonShade} />
          <path d="M100 66 C80 36 54 46 64 66 C70 80 90 74 100 66Z" fill={theme.ribbon} />
          <path d="M100 66 C120 36 146 46 136 66 C130 80 110 74 100 66Z" fill={theme.ribbon} />
          <path
            d="M98 66 C86 54 74 54 72 62"
            fill="none"
            stroke={theme.ribbonShade}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M102 66 C114 54 126 54 128 62"
            fill="none"
            stroke={theme.ribbonShade}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="67" r="9" fill={theme.ribbonShade} />
          <circle cx="97" cy="64" r="2.5" fill="#fff" opacity="0.6" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
