import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, FastForward, LayoutGrid } from "lucide-react";
import { chapters, type Chapter } from "@/content/research";
import { href } from "@/lib/router";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";
import { MysteryBox } from "@/components/MysteryBox";
import { Citation, ContentBlock } from "@/components/ContentBlocks";
import { FloatingStars, SparkleBurst, StarDivider } from "@/components/Decor";
import { Progress } from "@/components/Header";

type Phase = "box" | "open" | "card" | "done";
const order: Phase[] = ["box", "open", "card", "done"];

export function ChapterPage({ chapter }: { chapter: Chapter }) {
  const { motionOff, readingMode, markExplored, chime } = useStore();
  const theme = themes[chapter.theme];
  const [phase, setPhase] = useState<Phase>(motionOff ? "done" : "box");
  const timers = useRef<number[]>([]);
  const idx = chapters.findIndex((c) => c.id === chapter.id);
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  const at = (p: Phase) => order.indexOf(phase) >= order.indexOf(p);

  useEffect(() => {
    markExplored(chapter.id);
    timers.current.forEach(clearTimeout);
    if (motionOff) {
      setPhase("done");
      return;
    }
    setPhase("box");
    timers.current = [
      window.setTimeout(() => (setPhase("open"), chime("pop")), 450),
      window.setTimeout(() => setPhase("card"), 900),
      window.setTimeout(() => setPhase("done"), 1700),
    ];
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.id]);

  useEffect(() => {
    if (motionOff) setPhase("done");
  }, [motionOff]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setPhase("done");
  };

  return (
    <article aria-labelledby="chapter-title" className="relative">
      {/* opening header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: readingMode
            ? undefined
            : `linear-gradient(180deg, ${theme.soft}, transparent)`,
        }}
      >
        <FloatingStars
          stars={[
            { x: "8%", y: "20%", size: 14 },
            { x: "88%", y: "18%", size: 18 },
            { x: "76%", y: "70%", size: 12 },
          ]}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="text-sm font-bold text-cocoa-soft">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <a className="underline-offset-4 hover:underline" href={href.explore}>
                    Research Collection
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Box {chapter.number}</li>
              </ol>
            </nav>
            <div className="no-print rounded-2xl bg-white/80 px-3.5 py-2 shadow-soft">
              <Progress />
            </div>
          </div>

          <div
            className={`mt-6 grid items-center gap-6 ${readingMode ? "" : "md:grid-cols-[13rem_1fr] md:gap-10"}`}
          >
            {!readingMode && (
              <div className="decor relative mx-auto w-40 md:w-full" aria-hidden="true">
                <motion.div
                  initial={motionOff ? false : { scale: 0.6, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 14 }}
                >
                  <MysteryBox
                    theme={theme}
                    open={at("open")}
                    tag={chapter.number}
                    className="w-full"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0">
                  <SparkleBurst trigger={at("open") && !motionOff ? 1 : 0} count={8} radius={90} />
                </div>
              </div>
            )}

            <div style={{ perspective: 1000 }}>
              <motion.header
                initial={false}
                animate={
                  at("card")
                    ? { opacity: 1, rotateX: 0, scaleY: 1, y: 0 }
                    : { opacity: 0, rotateX: 80, scaleY: 0.15, y: 60 }
                }
                transition={{ type: "spring", stiffness: 110, damping: 16 }}
                style={{ transformOrigin: "bottom center" }}
                className={`relative rounded-[2rem] bg-white p-6 sm:p-9 ${readingMode ? "ring-1 ring-cocoa/15" : "shadow-pop ring-1 ring-cocoa/8"}`}
              >
                <span
                  className="decor absolute -top-3 right-10 h-6 w-20 rotate-3 rounded-sm opacity-90"
                  style={{ background: theme.base }}
                  aria-hidden="true"
                />
                <p
                  className="text-sm font-extrabold tracking-[0.14em] uppercase"
                  style={{ color: theme.ink }}
                >
                  Chapter {chapter.number} · {chapter.label}
                </p>
                <h1
                  id="chapter-title"
                  tabIndex={-1}
                  className="mt-2 text-4xl leading-tight font-semibold outline-none sm:text-5xl"
                >
                  {chapter.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cocoa-soft">
                  {chapter.subtitle}
                </p>
              </motion.header>
            </div>
          </div>
          {!motionOff && phase !== "done" && (
            <div className="mt-4 flex justify-center md:justify-end">
              <button
                type="button"
                onClick={skip}
                className="no-print inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/80 px-4 text-sm font-bold ring-1 ring-cocoa/15 hover:bg-white"
              >
                <FastForward className="size-4" aria-hidden="true" /> Skip animation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* reading body */}
      <motion.div
        initial={false}
        animate={at("done") ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`mx-auto grid max-w-6xl gap-10 px-4 pb-20 sm:px-6 ${readingMode ? "max-w-3xl" : "lg:grid-cols-[14rem_minmax(0,1fr)]"}`}
      >
        <nav
          aria-label="In this chapter"
          className={readingMode ? "" : "lg:sticky lg:top-24 lg:self-start"}
        >
          <div className="rounded-3xl bg-white/70 p-5 ring-1 ring-cocoa/10">
            <p className="font-display font-semibold">In this chapter</p>
            <ol className="mt-3 space-y-1 text-sm">
              {chapter.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={href.chapter(chapter.id, s.id)}
                    className="flex gap-2 rounded-xl px-2 py-1.5 font-semibold hover:bg-cream"
                  >
                    <span className="text-cocoa-soft" aria-hidden="true">
                      {i + 1}.
                    </span>
                    {s.heading}
                  </a>
                </li>
              ))}
              {chapter.references.length > 0 && (
                <li>
                  <a
                    href={href.chapter(chapter.id, "chapter-references")}
                    className="flex gap-2 rounded-xl px-2 py-1.5 font-semibold hover:bg-cream"
                  >
                    <span className="text-cocoa-soft" aria-hidden="true">
                      ✦
                    </span>
                    References
                  </a>
                </li>
              )}
            </ol>
          </div>
        </nav>

        <div className="max-w-[44rem] min-w-0">
          {chapter.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
              {i > 0 && <StarDivider className="my-10" />}
              <h2 id={`${s.id}-h`} className="text-3xl font-semibold">
                {s.heading}
              </h2>
              <div className="mt-5 space-y-6">
                {s.blocks.map((b, j) => (
                  <ContentBlock key={j} block={b} theme={theme} />
                ))}
              </div>
            </section>
          ))}

          {chapter.references.length > 0 && (
            <section
              id="chapter-references"
              aria-labelledby="chapter-refs-h"
              className="mt-14 scroll-mt-24 rounded-3xl bg-white/70 p-6 ring-1 ring-cocoa/10"
            >
              <h2 id="chapter-refs-h" className="text-2xl font-semibold">
                References
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                {[...chapter.references]
                  .sort((a, b) => a.sort.localeCompare(b.sort))
                  .map((r) => (
                    <li key={r.id} className="pl-6 -indent-6">
                      <Citation r={r} />
                    </li>
                  ))}
              </ul>
            </section>
          )}

          <nav aria-label="Chapter navigation" className="no-print mt-14 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <a
                href={href.chapter(prev.id)}
                className="group rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cocoa/10 transition hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-1 text-sm font-bold text-cocoa-soft">
                  <ArrowLeft className="size-4" aria-hidden="true" /> Previous box
                </span>
                <span className="mt-1 block font-display text-lg font-semibold">
                  {prev.number} · {prev.title}
                </span>
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a
                href={href.chapter(next.id)}
                className="group rounded-3xl bg-white p-5 text-right shadow-soft ring-1 ring-cocoa/10 transition hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-end gap-1 text-sm font-bold text-cocoa-soft">
                  Next box <ArrowRight className="size-4" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-display text-lg font-semibold">
                  {next.number} · {next.title}
                </span>
              </a>
            )}
          </nav>
          <div className="no-print mt-4 flex flex-wrap gap-2">
            <a
              href={href.explore}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-cocoa px-5 text-sm font-bold text-ivory"
            >
              <LayoutGrid className="size-4" aria-hidden="true" /> Back to the collection
            </a>
            <a
              href={href.paper(`ch-${chapter.id}`)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-bold ring-1 ring-cocoa/15"
            >
              <BookOpen className="size-4" aria-hidden="true" /> Read in full paper
            </a>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
