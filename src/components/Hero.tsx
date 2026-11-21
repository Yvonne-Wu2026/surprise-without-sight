import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { BookOpen, FastForward, RotateCcw } from "lucide-react";
import { MysteryBox } from "./MysteryBox";
import { Capsule, FloatingStars, Mochi, SparkleBurst, StarShape } from "./Decor";
import { designQuestion, paperMeta } from "@/content/research";
import { href } from "@/lib/router";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";

type Phase = "idle" | "shake" | "loose" | "open";

export function Hero() {
  const { motionOff, readingMode, announce, chime } = useStore();
  const [phase, setPhase] = useState<Phase>("idle");
  const [hover, setHover] = useState(false);
  const [burst, setBurst] = useState(0);
  const timers = useRef<number[]>([]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-1, 1], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(px, [-1, 1], [-14, 14]), { stiffness: 150, damping: 15 });
  const decoX = useSpring(useTransform(px, [-1, 1], [-12, 12]), { stiffness: 60, damping: 20 });
  const decoY = useSpring(useTransform(py, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 });

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reveal = () => {
    timers.current.forEach(clearTimeout);
    setPhase("open");
    setBurst((b) => b + 1);
    chime("sparkle");
    announce(`The box is open. A note floats out with the design question: ${designQuestion}`);
  };

  const onBoxClick = () => {
    if (phase === "open") {
      setPhase("idle");
      announce("The box is closed again.");
      return;
    }
    if (phase !== "idle") return;
    if (motionOff) return reveal();
    setPhase("shake");
    chime("shake");
    timers.current = [
      window.setTimeout(() => setPhase("loose"), 650),
      window.setTimeout(reveal, 1100),
    ];
  };

  const running = phase === "shake" || phase === "loose";

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* ambient background */}
      <div className="decor pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-blush/45 blur-3xl" />
        <div className="absolute top-10 right-[-10rem] size-[30rem] rounded-full bg-lavender/50 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 size-[28rem] rounded-full bg-mint/45 blur-3xl" />
      </div>
      <FloatingStars
        stars={[
          { x: "6%", y: "18%", size: 18 },
          { x: "44%", y: "10%", size: 14 },
          { x: "52%", y: "78%", size: 20 },
          { x: "90%", y: "14%", size: 22 },
          { x: "94%", y: "64%", size: 14 },
          { x: "12%", y: "82%", size: 12 },
        ]}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-berry shadow-soft ring-1 ring-blush">
            <StarShape className="size-3.5" fill="#E89DBA" />
            {paperMeta.kind}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl xl:text-7xl"
          >
            Joy of{" "}
            <span className="text-grape">the Unknown</span>
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-cocoa-soft sm:text-xl">
            {paperMeta.subtitle}.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={href.paper()}
              className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-6 font-display text-lg font-medium shadow-soft ring-1 ring-cocoa/15 transition hover:-translate-y-0.5 hover:bg-cream active:scale-[0.98]"
            >
              <BookOpen className="size-5" aria-hidden="true" />
              Read Full Paper
            </a>
          </div>
          <p className="mt-8 max-w-md text-sm text-cocoa-soft">
            Click <strong>Read Full Paper</strong> if you would rather read in plain text.
          </p>
        </div>

        {readingMode ? (
          <div className="rounded-2xl border border-cocoa/15 bg-white p-6">
            <p className="text-sm font-bold text-cocoa-soft">The design question</p>
            <p className="mt-2 font-display text-2xl leading-snug font-medium">{designQuestion}</p>
          </div>
        ) : (
          <div
            className="relative mx-auto flex w-full max-w-[34rem] flex-col items-center"
            style={{ perspective: 900 }}
            onPointerMove={(e) => {
              if (motionOff || e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              px.set(((e.clientX - r.left) / r.width) * 2 - 1);
              py.set(((e.clientY - r.top) / r.height) * 2 - 1);
            }}
            onPointerLeave={() => {
              px.set(0);
              py.set(0);
            }}
          >
            {/* ambient toys with gentle parallax */}
            <motion.div
              className="decor pointer-events-none absolute inset-0"
              style={{ x: decoX, y: decoY }}
              aria-hidden="true"
            >
              <Capsule
                className="absolute top-[12%] left-[4%] size-12 rotate-[-18deg]"
                top="#C6E8DB"
              />
              <Capsule className="absolute top-[4%] right-[10%] size-10 rotate-12" top="#F5BFD3" />
              <Capsule
                className="absolute right-[2%] bottom-[30%] size-14 rotate-[24deg]"
                top="#FFF0CE"
              />
              <StarShape className="absolute top-[30%] right-[2%] size-6" fill="#D8C6F2" />
            </motion.div>

            <div className="relative mt-6 h-[22rem] w-full sm:h-[26rem]">
              {/* platform */}
              <div
                className="decor absolute bottom-2 left-1/2 h-24 w-[88%] -translate-x-1/2"
                aria-hidden="true"
              >
                <div className="absolute inset-x-[10%] -top-24 h-40 rounded-full bg-butter/80 blur-2xl" />
                <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-white to-[#F3E4DA] shadow-[0_24px_40px_-20px_rgba(91,70,70,0.45)]" />
                <div className="absolute inset-x-[6%] top-[14%] h-[58%] rounded-[50%] bg-gradient-to-b from-[#FDEBF2] to-white ring-1 ring-blush/60" />
              </div>
              <Mochi
                className="decor absolute bottom-6 left-[2%] size-20 sm:left-[6%] sm:size-24"
                cap="#D8C6F2"
              />
              <Mochi
                className="decor absolute right-[4%] bottom-8 size-14 sm:right-[8%] sm:size-16"
                cap="#C6E8DB"
                color="#FFF6E0"
              />

              <button
                type="button"
                onClick={onBoxClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                aria-expanded={phase === "open"}
                aria-controls="hero-note"
                aria-label={
                  phase === "open"
                    ? "Close the mystery box"
                    : "Open the mystery box to reveal the design question"
                }
                className="absolute bottom-10 left-1/2 w-[16rem] -translate-x-1/2 rounded-[2.5rem] sm:w-[20rem]"
              >
                <motion.div
                  style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                  animate={
                    motionOff
                      ? undefined
                      : phase === "shake"
                        ? { rotate: [0, -7, 7, -6, 6, -3, 0], y: 0 }
                        : phase === "open"
                          ? { y: 70, rotate: 0, scale: 0.72 }
                          : { y: [0, -12, 0], rotate: hover ? -3 : 0 }
                  }
                  transition={
                    phase === "shake"
                      ? { duration: 0.6 }
                      : phase === "open"
                        ? { type: "spring", stiffness: 120, damping: 16 }
                        : {
                            y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
                            rotate: { type: "spring", stiffness: 200 },
                          }
                  }
                >
                  <MysteryBox
                    theme={themes.blush}
                    emblem="question"
                    open={phase === "open"}
                    loosened={phase === "loose"}
                    wiggle={hover && phase === "idle" && !motionOff}
                    className="w-full drop-shadow-[0_20px_25px_rgba(91,70,70,0.18)]"
                  />
                </motion.div>
                {/* hover sparkles */}
                <AnimatePresence>
                  {hover && phase === "idle" && !motionOff && (
                    <motion.span
                      className="decor pointer-events-none absolute inset-0"
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[
                        ["8%", "16%", "size-4"],
                        ["86%", "10%", "size-5"],
                        ["92%", "46%", "size-3"],
                      ].map(([l, t, size], i) => (
                        <motion.span
                          key={i}
                          className="absolute"
                          style={{ left: l, top: t }}
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.08, type: "spring" }}
                        >
                          <StarShape className={`block ${size}`} fill="#FFD66B" />
                        </motion.span>
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <div className="pointer-events-none absolute bottom-40 left-1/2 size-0">
                <SparkleBurst trigger={burst} count={11} radius={150} />
              </div>

              {/* floating paper note */}
              <div id="hero-note" className="absolute inset-x-0 -top-6 z-10 flex justify-center">
                <AnimatePresence>
                  {phase === "open" && (
                    <motion.div
                      initial={
                        motionOff ? { opacity: 0 } : { opacity: 0, y: 150, scale: 0.4, rotate: -8 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
                      exit={{ opacity: 0, y: 80, scale: 0.6 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                        delay: motionOff ? 0 : 0.15,
                      }}
                      className="relative w-[min(24rem,94%)] rounded-2xl bg-[#FFFDF8] p-5 shadow-pop ring-1 ring-cocoa/10"
                    >
                      <span
                        className="decor absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 rounded-sm bg-mint/80"
                        aria-hidden="true"
                      />
                      <p className="text-xs font-extrabold tracking-[0.14em] text-berry uppercase">
                        The question inside
                      </p>
                      <p className="mt-2 font-display text-lg leading-snug font-medium">
                        {designQuestion}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="no-print relative z-10 -mt-2 flex min-h-11 flex-wrap items-center justify-center gap-2 text-sm">
              {phase === "open" ? (
                <button
                  type="button"
                  onClick={onBoxClick}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/80 px-4 font-bold ring-1 ring-cocoa/15 hover:bg-white"
                >
                  <RotateCcw className="size-4" aria-hidden="true" /> Close the box
                </button>
              ) : (
                <>
                  <span className="font-semibold text-cocoa-soft">
                    {running ? "Opening…" : "Tap the box to open it"}
                  </span>
                  <button
                    type="button"
                    onClick={reveal}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/80 px-4 font-bold ring-1 ring-cocoa/15 hover:bg-white"
                  >
                    <FastForward className="size-4" aria-hidden="true" /> Skip animation
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
