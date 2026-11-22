import { RotateCcw } from "lucide-react";
import { chapters, designQuestion, paperMeta } from "@/content/research";
import { useStore } from "@/lib/store";
import { Mochi, StarDivider } from "@/components/Decor";
import { ContentBlock } from "@/components/ContentBlocks";
import { themes } from "@/lib/theme";

export function AboutPage() {
  const { explored, resetProgress, announce } = useStore();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-4">
        <Mochi className="decor size-20 shrink-0" cap="#C6E8DB" />
        <div>
          <p className="text-sm font-extrabold tracking-[0.16em] text-berry uppercase">
            About this project
          </p>
          <h1 tabIndex={-1} className="mt-1 text-4xl font-semibold outline-none sm:text-5xl">
            Behind the boxes
          </h1>
        </div>
      </div>

      <section aria-labelledby="course" className="mt-10">
        <h2 id="course" className="text-2xl font-semibold">
          Course context
        </h2>
        <dl className="mt-4 grid gap-3 rounded-3xl bg-white p-6 ring-1 ring-cocoa/10 sm:grid-cols-[10rem_1fr]">
          <dt className="font-bold">Author</dt>
          <dd>{paperMeta.author}</dd>
          <dt className="font-bold">Course</dt>
          <dd>{paperMeta.course}</dd>
          <dt className="font-bold">Instructor</dt>
          <dd>{paperMeta.instructor}</dd>
          <dt className="font-bold">Date</dt>
          <dd>{paperMeta.date}</dd>
        </dl>
      </section>

      <StarDivider className="my-10" />

      <section aria-labelledby="purpose">
        <h2 id="purpose" className="text-2xl font-semibold">
          Research purpose
        </h2>
        <div className="mt-4 space-y-5">
          <ContentBlock
            theme={themes.mint}
            block={{ type: "callout", title: "Design question", text: designQuestion }}
          />
          <ContentBlock
            theme={themes.mint}
            block={{
              type: "p",
              text: "I do not assume to understand the experience of blind and visually impaired people. This project is organized as a participatory process, not a product brief or even a product proposal. The question itself, and what counts as “fun”, should be shaped by the people the experience is for.",
            }}
          />
        </div>
      </section>

      <section aria-labelledby="scope" className="mt-10">
        <h2 id="scope" className="text-2xl font-semibold">
          Project scope
        </h2>
        <p className="mt-4 text-[1.075rem] leading-[1.8]">
          This website presents a participatory research and co-design <em>proposal</em>: no
          sessions have been run. The mystery boxes, stickers, gifts, and capsules are storytelling
          and navigation devices for reading the paper. This is not a shop: nothing is for sale,
          and the site does not collect participant data.
        </p>
      </section>

      <section aria-labelledby="a11y" className="mt-10 rounded-3xl bg-lavender/40 p-6 sm:p-8">
        <h2 id="a11y" className="text-2xl font-semibold">
          How this site is built to be inclusive
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            Every box, sticker, gift, and capsule works with a keyboard (Enter or Space) and has a
            button alternative to dragging or shaking.
          </li>
          <li>
            Reading Mode removes decoration and shows every chapter and interactive item as plain,
            single-column text.
          </li>
          <li>
            Animation follows your system’s reduced-motion setting, and Reading Mode switches it
            off entirely.
          </li>
          <li>
            Chapters are labeled with numbers and names as well as colors, and decorative sparkles
            are hidden from screen readers. Photographs have full text descriptions.
          </li>
          <li>The Full Paper view prints cleanly or saves as a PDF.</li>
        </ul>
      </section>

      <section aria-labelledby="progress-h" className="mt-10">
        <h2 id="progress-h" className="text-2xl font-semibold">
          Your reading progress
        </h2>
        <p className="mt-3 leading-relaxed">
          You have explored {explored.length} of {chapters.length} boxes. Your progress and
          settings are saved only in this browser.
        </p>
        <button
          type="button"
          onClick={() => {
            resetProgress();
            announce("Reading progress reset.");
          }}
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 font-bold ring-1 ring-cocoa/15 hover:bg-cream"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Reset progress
        </button>
      </section>
    </div>
  );
}
