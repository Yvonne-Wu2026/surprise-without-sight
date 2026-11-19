import {
  conceptFamilies,
  principles,
  stages,
  type Block,
  type Point,
  type Reference,
} from "@/content/research";
import type { BoxTheme } from "@/lib/theme";
import { ShakeReveal } from "./ShakeReveal";
import { PeelStickers } from "./PeelStickers";
import { UnwrapGifts } from "./UnwrapGifts";
import { CapsuleMachine } from "./CapsuleMachine";
import { StarShape } from "./Decor";

function Points({ items }: { items: Point[] }) {
  return (
    <ul className="list-disc space-y-3 pl-6 text-[1.05rem] leading-[1.75] marker:text-cocoa/40">
      {items.map((p) => (
        <li key={p.lead}>
          <strong>{p.lead}</strong> {p.text}
        </li>
      ))}
    </ul>
  );
}

export function ContentBlock({
  block,
  theme,
  inPaper,
}: {
  block: Block;
  theme: BoxTheme;
  inPaper?: boolean;
}) {
  if (block.only === "paper" && !inPaper) return null;
  if (block.only === "chapter" && inPaper) return null;

  switch (block.type) {
    case "p":
      return <p className="text-[1.075rem] leading-[1.8]">{block.text}</p>;
    case "callout":
      return (
        <aside
          className="relative rounded-2xl p-5 sm:p-6"
          style={{ background: theme.soft }}
          aria-label={block.title}
        >
          <StarShape className="decor absolute -top-2 -left-2 size-6" fill={theme.shade} />
          <p className="font-display text-lg font-semibold" style={{ color: theme.ink }}>
            {block.title}
          </p>
          <p className="mt-1.5 text-[1.075rem] leading-relaxed">{block.text}</p>
        </aside>
      );
    case "quote":
      return (
        <figure className="relative my-2 py-4 pl-6 sm:pl-8">
          <span
            className="absolute top-3 bottom-3 left-0 w-1.5 rounded-full"
            style={{ background: theme.shade }}
            aria-hidden="true"
          />
          <blockquote className="font-display text-2xl leading-snug font-medium sm:text-[1.7rem]">
            “{block.text}”
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-2 text-sm font-bold text-cocoa-soft">
              {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case "figure":
      return (
        <figure className="rounded-2xl bg-white p-3 ring-1 ring-cocoa/10">
          <div
            className={`grid gap-3 ${block.images.length > 1 ? "sm:grid-cols-[1fr_1.6fr]" : ""}`}
          >
            {block.images.map((im, i) => (
              <div
                key={im.src}
                className="flex overflow-hidden rounded-xl"
                style={{ background: i === 0 ? "#fff" : theme.soft }}
              >
                <img
                  src={im.src}
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                  loading="lazy"
                  className={`block h-full w-full ${i === 0 ? "object-contain" : "object-cover"}`}
                />
              </div>
            ))}
          </div>
          <figcaption className="px-1 pt-3 text-sm leading-relaxed text-cocoa-soft">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "list": {
      const L = block.ordered ? "ol" : "ul";
      return (
        <L
          className={`space-y-1.5 pl-6 leading-relaxed ${block.ordered ? "list-decimal" : "list-disc"}`}
        >
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </L>
      );
    }
    case "points":
      return <Points items={block.items} />;
    case "interactive":
      // The full paper always shows the static version of each interactive, as in the paper.
      if (inPaper) return <StaticInteractive kind={block.kind} />;
      if (block.kind === "shake") return <ShakeReveal />;
      if (block.kind === "peel") return <PeelStickers />;
      if (block.kind === "gifts") return <UnwrapGifts />;
      return <CapsuleMachine />;
  }
}

const th = "border border-cocoa/15 px-3 py-2 text-left align-top";

export function StaticInteractive({ kind }: { kind: "shake" | "peel" | "gifts" | "capsule" }) {
  if (kind === "shake")
    return <Points items={conceptFamilies.map((c) => ({ ...c, lead: `${c.lead}.` }))} />;
  if (kind === "peel")
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-[0.95rem] leading-relaxed">
          <caption className="pb-2 text-left font-bold">
            The six IxDF aspects of participatory design applied to this project
          </caption>
          <thead className="bg-cream">
            <tr>
              <th scope="col" className={th}>
                Aspect
              </th>
              <th scope="col" className={th}>
                What it looks like here
              </th>
            </tr>
          </thead>
          <tbody>
            {principles.map((p) => (
              <tr key={p.id}>
                <th scope="row" className={th}>
                  {p.name}
                </th>
                <td className={th}>{p.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (kind === "gifts")
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-[0.95rem] leading-relaxed">
          <caption className="pb-2 text-left font-bold">Overview of the six stages</caption>
          <thead className="bg-cream">
            <tr>
              {["Stage", "Main activity", "Participants", "Output"].map((h) => (
                <th key={h} scope="col" className={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stages.map((s, i) => (
              <tr key={s.id}>
                <th scope="row" className={th}>
                  {i + 1}. {s.name}
                </th>
                <td className={th}>{s.activity}</td>
                <td className={th}>{s.participants}</td>
                <td className={th}>{s.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  // The capsule prompts are already in the paper's Stage 2 and 3 text.
  return null;
}

export function Citation({ r }: { r: Reference }) {
  return (
    <>
      {r.before}
      {r.italic && <em>{r.italic}</em>}
      {r.after}
      {r.url && (
        <>
          {" "}
          <a
            href={r.url}
            className="break-words underline decoration-cocoa/30 underline-offset-2 hover:decoration-cocoa"
          >
            {r.url}
          </a>
        </>
      )}
    </>
  );
}
