import { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { Eye, RotateCcw, Shuffle } from "lucide-react";
import { feedbackQuestions } from "@/content/research";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";
import { MysteryBox } from "./MysteryBox";
import { SparkleBurst } from "./Decor";

const NEEDED = 4;

/** Stage 4's feedback questions, revealed one at a time by shaking a box. */
export function ShakeReveal() {
  const { motionOff, readingMode, announce, chime } = useStore();
  const [shakes, setShakes] = useState(0);
  const [open, setOpen] = useState(false);
  const [qi, setQi] = useState(0);
  const [burst, setBurst] = useState(0);
  const lastDir = useRef(0);
  const count = useRef(0);
  const wiggle = useAnimationControls();
  const q = feedbackQuestions[qi];
  const label = `Feedback question ${qi + 1} of ${feedbackQuestions.length}`;

  if (readingMode) {
    return (
      <div className="my-6 rounded-2xl border border-cocoa/15 bg-white p-5">
        <p className="font-display text-lg font-semibold">Feedback questions for each prototype</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          {feedbackQuestions.map((c) => (
            <li key={c.id}>
              <strong>{c.lead}</strong> {c.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const reveal = () => {
    setOpen(true);
    setBurst((b) => b + 1);
    chime("sparkle");
    announce(`The box opens. ${label}: ${q.lead} ${q.text}`);
  };

  const addShake = () => {
    if (open) return;
    const n = count.current + 1;
    count.current = n;
    setShakes(n);
    chime("shake");
    if (!motionOff) wiggle.start({ rotate: [0, -9, 9, -5, 0], transition: { duration: 0.4 } });
    if (n >= NEEDED) window.setTimeout(reveal, motionOff ? 0 : 350);
  };

  const close = (nextIndex: number) => {
    setOpen(false);
    count.current = 0;
    setShakes(0);
    setQi(nextIndex);
  };

  return (
    <div className="not-prose my-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-butter via-[#FFF6E3] to-blush/50 p-5 shadow-soft ring-1 ring-cocoa/10 sm:p-8">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,15rem)_1fr]">
        <div className="relative mx-auto w-full max-w-[15rem]">
          <p className="mb-6 text-center font-display text-2xl font-semibold">What’s Inside?</p>
          <motion.div
            drag={motionOff || open ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            dragSnapToOrigin
            onDragStart={() => (lastDir.current = 0)}
            onDrag={(_, info) => {
              const dir = Math.sign(info.delta.x);
              if (dir && dir !== lastDir.current && Math.abs(info.offset.x) > 12) {
                lastDir.current = dir;
                addShake();
              }
            }}
            className="cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <motion.button
              type="button"
              animate={wiggle}
              onClick={addShake}
              disabled={open}
              aria-label={
                open ? "The box is open" : `Shake the box. ${shakes} of ${NEEDED} shakes.`
              }
              className="block w-full rounded-[2rem] disabled:cursor-default"
            >
              <MysteryBox
                theme={themes.peach}
                emblem="question"
                open={open}
                loosened={shakes >= NEEDED - 1 && !open}
                className="w-full"
              />
            </motion.button>
          </motion.div>
          <div className="pointer-events-none absolute inset-0">
            <SparkleBurst trigger={burst} />
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5" aria-hidden="true">
            {Array.from({ length: NEEDED }).map((_, i) => (
              <span
                key={i}
                className={`h-2 w-6 rounded-full transition ${i < shakes || open ? "bg-cocoa" : "bg-cocoa/15"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-sm font-semibold text-cocoa-soft">
            {open ? "Opened!" : "Drag side to side, or press the box, to shake it"}
          </p>
        </div>

        <div className="min-h-56">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key={q.id}
                initial={motionOff ? { opacity: 0 } : { opacity: 0, y: 30, rotate: -4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}
                className="relative rounded-2xl bg-white p-6 shadow-pop ring-1 ring-cocoa/10"
              >
                <span
                  className="absolute -top-3 left-8 h-6 w-16 rotate-[-4deg] rounded-sm bg-lavender/80"
                  aria-hidden="true"
                />
                <p className="text-xs font-extrabold tracking-[0.14em] text-berry uppercase">
                  {label}
                </p>
                <p className="mt-2 font-display text-xl leading-snug font-semibold sm:text-2xl">
                  {q.lead}
                </p>
                <p className="mt-2 leading-relaxed">{q.text}</p>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-2xl font-semibold">
                  A question is rattling around in here.
                </p>
                <p className="mt-2 leading-relaxed text-cocoa-soft">
                  Shake the box {NEEDED} times to loosen the lid, or skip straight to the reveal.
                  Pairs ask these questions while exploring another group’s prototype.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-5 flex flex-wrap gap-2">
            {!open ? (
              <button
                type="button"
                onClick={reveal}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-cocoa px-5 font-bold text-ivory transition hover:bg-[#4a3838] active:scale-95"
              >
                <Eye className="size-4" aria-hidden="true" /> Reveal Question
              </button>
            ) : (
              <button
                type="button"
                onClick={() => close((qi + 1) % feedbackQuestions.length)}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-cocoa px-5 font-bold text-ivory transition hover:bg-[#4a3838] active:scale-95"
              >
                <Shuffle className="size-4" aria-hidden="true" /> Shake Again
              </button>
            )}
            <button
              type="button"
              onClick={() => close(0)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/80 px-4 font-bold ring-1 ring-cocoa/15 hover:bg-white"
            >
              <RotateCcw className="size-4" aria-hidden="true" /> Reset
            </button>
          </div>
          <p className="mt-3 text-sm text-cocoa-soft">
            Question {qi + 1} of {feedbackQuestions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
