import { Printer } from "lucide-react";
import { allReferences, chapters, paperMeta, type Chapter } from "@/content/research";
import { href } from "@/lib/router";
import { themes } from "@/lib/theme";
import { Citation, ContentBlock } from "@/components/ContentBlocks";

/** Consecutive chapters that share a paper section number become one numbered section. */
function paperSections() {
  const groups: { number: string; heading: string; chapters: Chapter[] }[] = [];
  for (const c of chapters) {
    const last = groups[groups.length - 1];
    if (last && last.number === c.paperNumber) last.chapters.push(c);
    else groups.push({ number: c.paperNumber, heading: c.paperHeading, chapters: [c] });
  }
  return groups;
}

export function PaperPage() {
  const refs = allReferences();
  const groups = paperSections();
  const toc = [
    ...groups.map((g) => ({ id: `ch-${g.chapters[0].id}`, label: `${g.number}. ${g.heading}` })),
    { id: "paper-references", label: "References" },
  ];

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <nav
        aria-label="Table of contents"
        className="no-print lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-auto"
      >
        <div className="rounded-3xl bg-white/80 p-5 ring-1 ring-cocoa/10">
          <p className="font-display text-lg font-semibold">Contents</p>
          <ol className="mt-3 space-y-0.5 text-sm">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={href.paper(t.id)}
                  className="block rounded-xl px-2 py-1.5 font-semibold hover:bg-cream"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-cocoa px-4 text-sm font-bold text-ivory"
          >
            <Printer className="size-4" aria-hidden="true" /> Print or save as PDF
          </button>
        </div>
      </nav>

      <article
        aria-labelledby="paper-title"
        className="print-plain min-w-0 rounded-[2rem] bg-white px-5 py-10 ring-1 ring-cocoa/10 sm:px-12 sm:py-14"
      >
        <header className="border-b border-cocoa/10 pb-8 text-center">
          <p className="text-sm font-extrabold tracking-[0.14em] text-berry uppercase">
            {paperMeta.kind}
          </p>
          <h1
            id="paper-title"
            tabIndex={-1}
            className="mt-3 text-4xl leading-tight font-semibold outline-none sm:text-5xl"
          >
            {paperMeta.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-cocoa-soft">
            {paperMeta.subtitle}
          </p>
          <p className="mt-5 font-bold">{paperMeta.author}</p>
          <p className="text-cocoa-soft">
            {paperMeta.course} · Instructor: {paperMeta.instructor} · {paperMeta.date}
          </p>
        </header>

        {groups.map((g) => (
          <section
            key={g.number}
            aria-labelledby={`sec-${g.number}-h`}
            className="mx-auto mt-14 max-w-[42rem]"
          >
            <h2 id={`sec-${g.number}-h`} className="text-3xl font-semibold">
              {g.number}. {g.heading}
            </h2>
            {g.chapters.map((c) => (
              <div key={c.id} id={`ch-${c.id}`} className="scroll-mt-24">
                <p
                  className="no-print mt-6 text-xs font-extrabold tracking-[0.14em] uppercase"
                  style={{ color: themes[c.theme].ink }}
                >
                  Box {c.number} · {c.title}
                </p>
                {c.sections.map((s) => {
                  if (s.blocks.every((b) => b.only === "chapter")) return null;
                  const heading = s.paperHeading === undefined ? s.heading : s.paperHeading;
                  return (
                    <div key={s.id} className="mt-6">
                      {heading && <h3 className="mb-4 text-xl font-semibold">{heading}</h3>}
                      <div className="space-y-5">
                        {s.blocks.map((b, k) => (
                          <ContentBlock key={k} block={b} theme={themes[c.theme]} inPaper />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </section>
        ))}

        <section
          id="paper-references"
          aria-labelledby="refs-h"
          className="mx-auto mt-16 max-w-[42rem] scroll-mt-24 border-t border-cocoa/10 pt-10"
        >
          <h2 id="refs-h" className="text-3xl font-semibold">
            References
          </h2>
          <ul className="mt-5 space-y-3 leading-relaxed">
            {refs.map((r) => (
              <li key={r.id} className="pl-8 -indent-8">
                <Citation r={r} />
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
