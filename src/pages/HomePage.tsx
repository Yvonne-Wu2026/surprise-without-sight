import { Hero } from "@/components/Hero";
import { Shelf } from "@/components/Shelf";
import { ShakeReveal } from "@/components/ShakeReveal";
import { PeelStickers } from "@/components/PeelStickers";
import { UnwrapGifts } from "@/components/UnwrapGifts";
import { CapsuleMachine } from "@/components/CapsuleMachine";
import { Mochi, StarDivider } from "@/components/Decor";
import { paperMeta } from "@/content/research";
import { href } from "@/lib/router";

function CornerHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-extrabold tracking-[0.16em] text-berry uppercase">{kicker}</p>
      <h3 className="mt-1 text-3xl font-semibold">{title}</h3>
      <p className="mt-2 leading-relaxed text-cocoa-soft">{children}</p>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Shelf />

      <section
        aria-labelledby="corner-title"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="flex items-end gap-4">
          <Mochi className="decor hidden size-20 sm:block" cap="#FFF0CE" />
          <div>
            <p className="text-sm font-extrabold tracking-[0.16em] text-grape uppercase">
              The Curiosity Corner
            </p>
            <h2 id="corner-title" className="mt-2 text-4xl font-semibold sm:text-5xl">
              Little experiments in wonder
            </h2>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cocoa-soft">
          Hands-on moments drawn from the chapters. Every gesture has a button alternative, and
          everything here also appears as plain text in the{" "}
          <a
            className="font-bold text-cocoa underline decoration-blush decoration-2 underline-offset-4"
            href={href.paper()}
          >
            full paper
          </a>
          .
        </p>

        <div className="mt-12 space-y-16">
          <div>
            <CornerHeading kicker="Peel to reveal" title="Six participatory principles">
              From Box 03, The Principles Box: what each aspect of participatory design looks like
              in this project.
            </CornerHeading>
            <PeelStickers />
          </div>
          <StarDivider />
          <div>
            <CornerHeading kicker="Unwrap the protocol" title="Six stages, preparation to governance">
              From Box 04, The Protocol Box.
            </CornerHeading>
            <UnwrapGifts />
          </div>
          <StarDivider />
          <div>
            <CornerHeading kicker="Shake to reveal" title="Three starting concepts">
              From Box 05, The Prototype Box. Hypotheses to test with participants, not answers.
            </CornerHeading>
            <ShakeReveal />
          </div>
          <StarDivider />
          <div>
            <CornerHeading kicker="Reflection" title="The mystery capsule">
              Questions from the Stage 2 interviews and the Stage 3 provocation. Nothing you do
              here is recorded.
            </CornerHeading>
            <CapsuleMachine />
          </div>
        </div>
      </section>

      <section aria-label="Design philosophy" className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-lavender via-blush to-butter px-6 py-14 text-center sm:px-12">
          <p className="text-sm font-extrabold tracking-[0.16em] uppercase">
            Core design philosophy
          </p>
          <p className="mx-auto mt-3 max-w-3xl font-display text-3xl leading-tight font-semibold sm:text-5xl">
            “{paperMeta.philosophy}”
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={href.chapter("curiosity")}
              className="inline-flex min-h-12 items-center rounded-full bg-cocoa px-6 font-bold text-ivory"
            >
              Start with Box 01
            </a>
            <a
              href={href.about}
              className="inline-flex min-h-12 items-center rounded-full bg-white/80 px-6 font-bold"
            >
              About this project
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
