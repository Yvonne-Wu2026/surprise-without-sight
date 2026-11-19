import { Hero } from "@/components/Hero";
import { Shelf } from "@/components/Shelf";
import { paperMeta } from "@/content/research";
import { href } from "@/lib/router";

export function HomePage() {
  return (
    <>
      <Hero />
      <Shelf />

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
