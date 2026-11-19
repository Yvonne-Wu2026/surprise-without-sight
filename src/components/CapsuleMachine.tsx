import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCw } from "lucide-react";
import { reflectionPrompts } from "@/content/research";
import { useStore } from "@/lib/store";
import { SparkleBurst } from "./Decor";

type State = "empty" | "turning" | "dropped" | "opened";
const capsuleColors = ["#F5BFD3", "#D8C6F2", "#C6E8DB", "#FFE7A3", "#FFD6C4", "#CDE2F5"];

export function CapsuleMachine() {
  const { motionOff, readingMode, announce, chime } = useStore();
  const [state, setState] = useState<State>("empty");
  const [pi, setPi] = useState(0);
  const [turns, setTurns] = useState(0);
  const [burst, setBurst] = useState(0);
  const timer = useRef<number>(0);
  const color = capsuleColors[pi % capsuleColors.length];

  if (readingMode) {
    return (
      <div className="my-6 rounded-2xl border border-cocoa/15 bg-white p-5">
        <p className="font-display text-lg font-semibold">Questions to reflect on</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
          {reflectionPrompts.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    );
  }

  const turn = () => {
    if (state === "turning") return;
    const next = turns === 0 ? 0 : (pi + 1) % reflectionPrompts.length;
    setPi(next);
    setTurns((t) => t + 1);
    setState("turning");
    chime("shake");
    clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => {
        setState("dropped");
        chime("pop");
        announce("A capsule dropped into the tray. Press Open the capsule to read it.");
      },
      motionOff ? 0 : 900,
    );
  };

  const openCapsule = () => {
    setState("opened");
    setBurst((b) => b + 1);
    chime("sparkle");
    announce(`Reflection prompt: ${reflectionPrompts[pi]}`);
  };

  return (
    <div className="not-prose my-8 grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-lavender/60 via-ivory to-mint/50 p-5 ring-1 ring-cocoa/10 sm:p-8 md:grid-cols-[16rem_1fr]">
      <div className="relative mx-auto w-56 sm:w-64">
        <svg viewBox="0 0 220 300" className="w-full" aria-hidden="true" focusable="false">
          <ellipse cx="110" cy="292" rx="80" ry="6" fill="#5B4646" opacity="0.12" />
          <rect x="40" y="276" width="20" height="16" rx="6" fill="#E89DBA" />
          <rect x="160" y="276" width="20" height="16" rx="6" fill="#E89DBA" />
          {/* dome with capsules */}
          <circle cx="110" cy="96" r="80" fill="#FFFFFF" opacity="0.7" />
          <motion.g
            animate={
              state === "turning" && !motionOff
                ? { y: [0, -4, 3, -2, 0], rotate: [0, 2, -2, 0] }
                : undefined
            }
            transition={{ duration: 0.8 }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {[
              [70, 130, 0],
              [104, 140, 1],
              [140, 128, 2],
              [86, 104, 3],
              [124, 102, 4],
              [150, 98, 5],
              [60, 96, 2],
              [104, 74, 0],
              [142, 68, 1],
              [76, 66, 4],
            ].map(([x, y, c], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${i * 37})`}>
                <path d="M-15 0 A15 15 0 0 1 15 0Z" fill={capsuleColors[c]} />
                <path d="M-15 0 L15 0 A15 15 0 0 1 -15 0Z" fill="#FFFAF4" stroke="#EADBD3" />
              </g>
            ))}
          </motion.g>
          <circle cx="110" cy="96" r="80" fill="none" stroke="#EADBD3" strokeWidth="5" />
          <path
            d="M58 52 A62 62 0 0 1 100 30"
            fill="none"
            stroke="#fff"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.9"
          />
          <rect x="96" y="6" width="28" height="14" rx="7" fill="#E89DBA" />
          {/* body */}
          <rect x="44" y="164" width="132" height="18" rx="9" fill="#E89DBA" />
          <rect x="30" y="176" width="160" height="104" rx="28" fill="#F5BFD3" />
          <rect x="42" y="188" width="10" height="56" rx="5" fill="#fff" opacity="0.4" />
          {/* knob */}
          <circle cx="110" cy="212" r="24" fill="#FFFAF4" stroke="#E89DBA" strokeWidth="4" />
          <motion.g
            style={{ originX: "110px", originY: "212px" }}
            animate={{ rotate: turns * 360 }}
            transition={{ duration: motionOff ? 0 : 0.8, ease: "easeInOut" }}
          >
            <rect x="104" y="192" width="12" height="40" rx="6" fill="#D8C6F2" />
          </motion.g>
          {/* chute */}
          <rect x="80" y="246" width="60" height="26" rx="12" fill="#5B4646" opacity="0.85" />
          <path
            d="M88 252 L132 252"
            stroke="#fff"
            strokeWidth="2"
            opacity="0.2"
            strokeLinecap="round"
          />
        </svg>

        {/* tray / dropped capsule */}
        <div className="absolute bottom-[3%] left-1/2 h-16 w-28 -translate-x-1/2">
          <AnimatePresence>
            {(state === "dropped" || state === "opened") && (
              <motion.button
                key={turns}
                type="button"
                onClick={openCapsule}
                disabled={state === "opened"}
                tabIndex={-1}
                aria-hidden="true"
                initial={motionOff ? { opacity: 0 } : { y: -40, opacity: 0, rotate: -40 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="absolute inset-x-0 -top-4 mx-auto size-16 rounded-full"
              >
                <svg
                  viewBox="-20 -20 40 40"
                  className="size-full overflow-visible drop-shadow-md"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M-16 0 A16 16 0 0 1 16 0Z"
                    fill={color}
                    animate={
                      state === "opened" ? { y: -14, rotate: -25, x: -6 } : { y: 0, rotate: 0 }
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  />
                  <path d="M-16 0 L16 0 A16 16 0 0 1 -16 0Z" fill="#FFFAF4" stroke="#EADBD3" />
                  {state !== "opened" && (
                    <ellipse cx="-6" cy="-8" rx="4" ry="2.4" fill="#fff" opacity="0.7" />
                  )}
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0">
            <SparkleBurst trigger={burst} count={7} radius={70} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-extrabold tracking-[0.14em] text-grape uppercase">
          Mystery capsule
        </p>
        <p className="mt-1 font-display text-2xl font-semibold">A question to carry with you</p>
        <div className="mt-4 min-h-32">
          <AnimatePresence mode="wait">
            {state === "opened" ? (
              <motion.blockquote
                key={pi}
                initial={motionOff ? { opacity: 0 } : { opacity: 0, scaleY: 0.2, y: 20 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ transformOrigin: "bottom" }}
                className="relative rounded-2xl bg-white p-5 shadow-pop ring-1 ring-cocoa/10"
              >
                <p className="font-display text-xl leading-snug font-medium">
                  {reflectionPrompts[pi]}
                </p>
                <p className="mt-2 text-sm text-cocoa-soft">
                  Sit with it for a moment. There is no right answer, and nothing is recorded.
                </p>
              </motion.blockquote>
            ) : (
              <motion.p
                key={state}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="leading-relaxed text-cocoa-soft"
              >
                {state === "empty" &&
                  "Turn the knob to release a capsule. Each one holds a question from the protocol."}
                {state === "turning" && "Turning… a capsule is on its way."}
                {state === "dropped" && "A capsule landed in the tray. Open it to read the question."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={turn}
            disabled={state === "turning"}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-cocoa px-5 font-bold text-ivory transition hover:bg-[#4a3838] active:scale-95 disabled:opacity-60"
          >
            <RotateCw className="size-4" aria-hidden="true" />
            {turns === 0 ? "Turn the knob" : "Get another capsule"}
          </button>
          {state === "dropped" && (
            <button
              type="button"
              onClick={openCapsule}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 font-bold ring-1 ring-cocoa/15 hover:bg-cream"
            >
              Open the capsule
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
