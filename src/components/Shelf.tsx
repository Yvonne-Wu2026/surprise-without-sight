import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BookOpen, Check, X } from "lucide-react";
import { chapters, type Chapter } from "@/content/research";
import { href } from "@/lib/router";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";
import { MysteryBox } from "./MysteryBox";
import { SparkleBurst, StarShape } from "./Decor";
import { Progress } from "./Header";

function ShelfBox({ chapter, index }: { chapter: Chapter; index: number }) {
  const { motionOff, explored, announce, chime } = useStore();
  const theme = themes[chapter.theme];
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [burst, setBurst] = useState(0);
  const [shakes, setShakes] = useState(0);
  const shakesRef = useRef(0);
  const dragged = useRef(false);
  const lastDir = useRef(0);
  const done = explored.includes(chapter.id);
  const cardId = `card-${chapter.id}`;

  const toggle = (next = !open) => {
    setOpen(next);
    if (next) {
      setBurst((b) => b + 1);
      chime("pop");
      announce(
        `Box ${chapter.number} opened. ${chapter.title}: ${chapter.label}. Summary card shown.`,
      );
    }
  };

  return (
    <li className="relative flex flex-col">
      <div className="relative flex flex-1 flex-col rounded-[2rem] bg-white/70 p-4 pb-5 shadow-soft ring-1 ring-cocoa/8 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 font-display text-sm font-semibold"
            style={{ background: theme.soft, color: theme.ink }}
          >
            No. {chapter.number}
          </span>
          {done && (
            <motion.span
              initial={motionOff ? false : { scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -6 }}
              className="inline-flex items-center gap-1 rounded-full bg-mint px-2.5 py-0.5 text-xs font-extrabold text-[#1d5644] shadow-soft"
            >
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> Explored
            </motion.span>
          )}
        </div>

        {/* the box */}
        <div className="relative mx-auto mt-2 w-full max-w-[11rem]" style={{ perspective: 700 }}>
          <motion.div
            drag={motionOff ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            dragSnapToOrigin
            onDragStart={() => {
              dragged.current = false;
              lastDir.current = 0;
            }}
            onDrag={(_, info) => {
              if (Math.abs(info.offset.x) > 6) dragged.current = true;
              const dir = Math.sign(info.delta.x);
              if (dir && dir !== lastDir.current && Math.abs(info.offset.x) > 10) {
                lastDir.current = dir;
                const n = shakesRef.current + 1;
                if (n >= 5 && !open) {
                  shakesRef.current = 0;
                  setShakes(0);
                  toggle(true);
                } else {
                  shakesRef.current = n;
                  setShakes(n);
                  if (n % 2 === 0) chime("shake");
                }
              }
            }}
            className="touch-pan-y"
          >
            <motion.button
              type="button"
              onClick={() => {
                if (dragged.current) {
                  dragged.current = false;
                  return;
                }
                toggle();
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
              aria-expanded={open}
              aria-controls={cardId}
              aria-label={`Box ${chapter.number}, ${chapter.title}: ${chapter.label}.${done ? " Explored." : ""} ${open ? "Close box" : "Open box"}`}
              className="block w-full rounded-[2rem]"
              animate={
                motionOff
                  ? undefined
                  : hover && !open
                    ? { rotateY: -14, rotateX: 6, rotate: -2, y: -6 }
                    : { rotateY: 0, rotateX: 0, rotate: 0, y: [0, -5, 0] }
              }
              transition={
                hover && !open
                  ? { type: "spring", stiffness: 220, damping: 14 }
                  : {
                      y: {
                        duration: 3 + (index % 3) * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.25,
                      },
                    }
              }
              whileTap={motionOff ? undefined : { scale: 0.95 }}
            >
              <MysteryBox
                theme={theme}
                open={open}
                wiggle={hover && !open && !motionOff}
                tag={chapter.number}
                emblem={chapter.emblem}
                className="w-full"
              />
            </motion.button>
          </motion.div>
          <div className="pointer-events-none absolute inset-0">
            <SparkleBurst trigger={burst} count={7} radius={80} />
          </div>
        </div>
        {/* little shelf ledge */}
        <div
          className="decor -mt-3 h-3 rounded-full bg-gradient-to-b from-[#F3E4DA] to-[#E9D6CA]"
          aria-hidden="true"
        />

        <h3 className="mt-4 text-xl leading-tight font-semibold">{chapter.title}</h3>
        <p className="mt-0.5 text-sm font-semibold" style={{ color: theme.ink }}>
          {chapter.label}
        </p>

        <div id={cardId}>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={
                  motionOff ? { opacity: 0 } : { opacity: 0, height: 0, rotateX: -60, y: -10 }
                }
                animate={{ opacity: 1, height: "auto", rotateX: 0, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
                style={{ transformOrigin: "top center" }}
                className="overflow-hidden"
              >
                <div
                  className="relative mt-3 rounded-2xl p-4 ring-1 ring-cocoa/10"
                  style={{ background: theme.soft }}
                >
                  <StarShape className="decor absolute -top-2 -right-1 size-5" fill={theme.shade} />
                  <p className="text-[0.95rem] leading-relaxed">{chapter.preview}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a
                      href={href.chapter(chapter.id)}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-cocoa px-4 text-sm font-bold text-ivory transition hover:bg-[#4a3838] active:scale-95"
                    >
                      Explore This Chapter <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => toggle(false)}
                      className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-bold text-cocoa-soft hover:bg-white"
                    >
                      <X className="size-4" aria-hidden="true" /> Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!open && shakes > 0 && !motionOff && (
          <p className="mt-2 text-xs font-semibold text-cocoa-soft" aria-hidden="true">
            Keep shaking…
          </p>
        )}
      </div>
    </li>
  );
}

export function Shelf() {
  const { readingMode } = useStore();

  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className="relative scroll-mt-20 py-16 sm:py-24"
    >
      <div
        className="decor absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-cream/70 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold tracking-[0.16em] text-berry uppercase">
              The Research Collection
            </p>
            <h2 id="collection-title" className="mt-2 text-4xl font-semibold sm:text-5xl">
              Seven boxes, one protocol.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cocoa-soft">
              Each box holds one part of the paper. Open them in any order: tap or press a box to
              peek inside, or drag one side to side to shake it open.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-soft">
            <Progress />
          </div>
        </div>

        {readingMode ? (
          <ol className="mt-10 grid gap-4">
            {chapters.map((c) => (
              <li key={c.id} className="rounded-2xl border border-cocoa/15 bg-white p-5">
                <p className="text-sm font-bold text-cocoa-soft">
                  Chapter {c.number} · {c.label}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed">{c.preview}</p>
                <a
                  className="mt-3 inline-flex items-center gap-1 font-bold underline underline-offset-4"
                  href={href.chapter(c.id)}
                >
                  Read chapter {c.number} <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="mt-12 grid grid-cols-1 items-start gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {chapters.map((c, i) => (
              <ShelfBox key={c.id} chapter={c} index={i} />
            ))}
            <li className="flex h-full flex-col justify-between rounded-[2rem] border-2 border-dashed border-cocoa/20 p-6">
              <div>
                <BookOpen className="size-8 text-grape" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-semibold">Prefer to just read?</h3>
                <p className="mt-2 leading-relaxed text-cocoa-soft">
                  The whole paper is in one continuous document, ready to print or save as a PDF.
                </p>
              </div>
              <a
                href={href.paper()}
                className="mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full bg-white px-4 text-sm font-bold shadow-soft ring-1 ring-cocoa/15 hover:bg-cream"
              >
                Read Full Paper <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
