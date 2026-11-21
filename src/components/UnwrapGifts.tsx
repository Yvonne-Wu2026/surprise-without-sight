import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { stages } from "@/content/research";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";
import { MysteryBox } from "./MysteryBox";
import { SparkleBurst } from "./Decor";

function Detail({ a }: { a: (typeof stages)[number] }) {
  return (
    <dl className="grid gap-4 md:grid-cols-3">
      {(
        [
          ["Main activity", a.activity],
          ["Participants", a.participants],
          ["Output", a.output],
        ] as const
      ).map(([k, v]) => (
        <div key={k} className="rounded-2xl bg-white/80 p-4 ring-1 ring-cocoa/8">
          <dt
            className="text-xs font-extrabold tracking-[0.12em] uppercase"
            style={{ color: themes[a.theme].ink }}
          >
            {k}
          </dt>
          <dd className="mt-1.5 leading-relaxed">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Section 4's six stages, as gifts to unwrap. */
export function UnwrapGifts() {
  const { motionOff, readingMode, announce, chime } = useStore();
  const [active, setActive] = useState<string | null>(null);
  const [unwrapped, setUnwrapped] = useState<string[]>([]);
  const [burst, setBurst] = useState(0);

  if (readingMode) {
    return (
      <ol className="my-6 grid gap-4">
        {stages.map((a, i) => (
          <li key={a.id} className="rounded-2xl border border-cocoa/15 bg-white p-5">
            <p className="font-display text-lg font-semibold">
              Stage {i + 1}: {a.name}
            </p>
            <div className="mt-3">
              <Detail a={a} />
            </div>
          </li>
        ))}
      </ol>
    );
  }

  const current = stages.find((a) => a.id === active);
  const currentIndex = stages.findIndex((a) => a.id === active);

  const open = (id: string, name: string) => {
    if (active === id) return setActive(null);
    setActive(id);
    if (!unwrapped.includes(id)) {
      setUnwrapped((u) => [...u, id]);
      setBurst((b) => b + 1);
      chime("sparkle");
    }
    announce(`${name} unwrapped. Details shown below the gifts.`);
  };

  return (
    <div className="not-prose my-8 rounded-[2rem] bg-gradient-to-b from-peach/60 to-ivory p-5 ring-1 ring-cocoa/10 sm:p-7">
      <p className="font-display text-xl font-semibold">Unwrap the protocol</p>
      <p className="mt-1 text-sm text-cocoa-soft">
        {unwrapped.length} of {stages.length} stages unwrapped
      </p>
      <ul className="relative mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stages.map((a, i) => {
          const isOpen = unwrapped.includes(a.id);
          const isActive = active === a.id;
          return (
            <li key={a.id}>
              <motion.button
                type="button"
                onClick={() => open(a.id, `Stage ${i + 1}, ${a.name}`)}
                aria-expanded={isActive}
                aria-controls="gift-detail"
                whileHover={motionOff ? undefined : { y: -4, rotate: i % 2 ? 2 : -2 }}
                whileTap={motionOff ? undefined : { scale: 0.95 }}
                className={`flex h-full w-full flex-col items-center rounded-3xl p-3 text-center transition ${isActive ? "bg-white shadow-pop ring-2 ring-cocoa" : "bg-white/60 ring-1 ring-cocoa/10 hover:bg-white"}`}
              >
                <MysteryBox
                  theme={themes[a.theme]}
                  variant="gift"
                  open={isOpen}
                  tag={String(i + 1)}
                  className="w-24 sm:w-28"
                />
                <span className="mt-1 text-xs font-bold text-cocoa-soft">Stage {i + 1}</span>
                <span className="font-display leading-tight font-semibold break-words">{a.name}</span>
                {isOpen && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#23654F]">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" /> Unwrapped
                  </span>
                )}
              </motion.button>
            </li>
          );
        })}
        <div className="pointer-events-none absolute inset-0">
          <SparkleBurst trigger={burst} count={8} radius={90} />
        </div>
      </ul>

      <div id="gift-detail" className="mt-5" aria-live="off">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.id}
              initial={motionOff ? { opacity: 0 } : { opacity: 0, y: -12, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0 }}
              style={{ transformOrigin: "top" }}
            >
              <div
                className="rounded-3xl p-5 sm:p-6"
                style={{ background: themes[current.theme].soft }}
              >
                <h4 className="text-2xl font-semibold">
                  Stage {currentIndex + 1}. {current.name}
                </h4>
                <div className="mt-4">
                  <Detail a={current} />
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="rounded-3xl border-2 border-dashed border-cocoa/15 p-5 text-center text-cocoa-soft">
              Choose a gift to unwrap its stage.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
