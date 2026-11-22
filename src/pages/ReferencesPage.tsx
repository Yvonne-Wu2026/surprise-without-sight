import { ArrowRight } from "lucide-react";
import { allReferences, chapters } from "@/content/research";
import { href } from "@/lib/router";
import { themes } from "@/lib/theme";
import { Citation } from "@/components/ContentBlocks";

export function ReferencesPage() {
  const refs = allReferences();
  return (
    <div className="print-plain mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-extrabold tracking-[0.16em] text-berry uppercase">Bibliography</p>
      <h1 tabIndex={-1} className="mt-2 text-5xl font-semibold outline-none">
        References
      </h1>

      <section
        aria-labelledby="all-refs"
        className="mt-10 rounded-[2rem] bg-white p-6 ring-1 ring-cocoa/10 sm:p-10"
      >
        <h2 id="all-refs" className="text-2xl font-semibold">
          Complete list ({refs.length})
        </h2>
        <ul className="mt-5 space-y-4 leading-relaxed">
          {refs.map((r) => (
            <li key={r.id} className="pl-8 -indent-8">
              <Citation r={r} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="by-chapter" className="no-print mt-12">
        <h2 id="by-chapter" className="text-2xl font-semibold">
          By chapter
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {chapters.map((c) => (
            <li
              key={c.id}
              className="rounded-3xl p-5 ring-1 ring-cocoa/10"
              style={{ background: themes[c.theme].soft }}
            >
              <p className="font-display text-lg font-semibold">
                {c.number} · {c.title}
              </p>
              <p className="text-sm text-cocoa-soft">
                {c.references.length} {c.references.length === 1 ? "source" : "sources"}
              </p>
              <a
                href={href.chapter(c.id, c.references.length ? "chapter-references" : undefined)}
                className="mt-2 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4"
              >
                Go to chapter <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
