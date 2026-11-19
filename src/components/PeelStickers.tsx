import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Handshake, Megaphone, Repeat, Store, Users, Vote } from "lucide-react";
import { principles } from "@/content/research";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";

const icons = {
  inclusion: Users,
  collaboration: Handshake,
  empowerment: Vote,
  iteration: Repeat,
  context: Store,
  advocacy: Megaphone,
};

/** Section 3's six participatory principles, as peel-to-reveal stickers. */
export function PeelStickers() {
  const { motionOff, readingMode, announce, chime } = useStore();
  const [peeled, setPeeled] = useState<string[]>([]);

  if (readingMode) {
    return (
      <dl className="my-6 grid gap-3 rounded-2xl border border-cocoa/15 bg-white p-5">
        {principles.map((c) => (
          <div key={c.id}>
            <dt className="font-bold">{c.name}</dt>
            <dd className="leading-relaxed">{c.definition}</dd>
          </div>
        ))}
      </dl>
    );
  }

  const toggle = (id: string, name: string, def: string) => {
    const isPeeled = peeled.includes(id);
    setPeeled((p) => (isPeeled ? p.filter((x) => x !== id) : [...p, id]));
    if (!isPeeled) {
      chime("pop");
      announce(`${name}: ${def}`);
    }
  };

  return (
    <div className="not-prose my-8">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-xl font-semibold">Peel to reveal: six principles</p>
        <p className="text-sm text-cocoa-soft">
          {peeled.length} of {principles.length} peeled
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((c, i) => {
          const t = themes[c.theme];
          const Icon = icons[c.id as keyof typeof icons];
          const isPeeled = peeled.includes(c.id);
          const defId = `principle-${c.id}`;
          return (
            <li
              key={c.id}
              className="relative min-h-52 rounded-3xl bg-white p-5 pb-14 shadow-soft ring-1 ring-cocoa/10"
            >
              {/* revealed content underneath the sticker */}
              <div id={defId} hidden={!isPeeled} className="pr-2">
                <p className="font-display text-lg font-semibold" style={{ color: t.ink }}>
                  {c.name}
                </p>
                <p className="mt-1.5 leading-relaxed">{c.definition}</p>
              </div>
              {isPeeled && (
                <div
                  className="decor pointer-events-none absolute inset-1.5 rounded-[1.4rem] border-2 border-dashed opacity-40"
                  style={{ borderColor: t.shade }}
                  aria-hidden="true"
                />
              )}

              <motion.button
                type="button"
                layout={!motionOff}
                onClick={() => toggle(c.id, c.name, c.definition)}
                aria-expanded={isPeeled}
                aria-controls={defId}
                aria-label={isPeeled ? `Stick ${c.name} back` : `Peel the ${c.name} sticker`}
                className={
                  isPeeled
                    ? "absolute right-3 bottom-3 z-10 rounded-full bg-cream px-3 py-1.5 text-xs font-bold ring-1 ring-cocoa/10 hover:bg-white"
                    : "absolute inset-3 z-10 rounded-[1.25rem]"
                }
                style={{ rotate: isPeeled ? 0 : i % 2 ? 1.2 : -1.2 }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {isPeeled ? (
                    <motion.span key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Stick back
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sticker"
                      initial={motionOff ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                      exit={
                        motionOff
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              rotate: -22,
                              x: -40,
                              y: -50,
                              scale: 0.85,
                              transition: { duration: 0.45 },
                            }
                      }
                      className="group relative flex size-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[1.25rem] px-3 text-center shadow-[0_6px_0_-2px_rgba(91,70,70,0.12)]"
                      style={{ background: t.base, transformOrigin: "0% 0%" }}
                    >
                      <span className="grid size-14 place-items-center rounded-full bg-white/70 transition group-hover:scale-110">
                        <Icon className="size-7" style={{ color: t.ink }} aria-hidden="true" />
                      </span>
                      <span className="font-display text-xl leading-tight font-semibold">
                        {c.name}
                      </span>
                      <span className="text-xs font-bold text-cocoa-soft">Tap to peel</span>
                      {/* curled corner */}
                      <span
                        className="absolute right-0 bottom-0 size-9 transition-all group-hover:size-12"
                        style={{
                          background: `linear-gradient(135deg, ${t.base} 49%, ${t.shade} 50%, #fff 75%)`,
                          borderTopLeftRadius: 14,
                        }}
                        aria-hidden="true"
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
