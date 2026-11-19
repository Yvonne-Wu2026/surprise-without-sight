import { useEffect, useRef } from "react";
import { MotionConfig } from "motion/react";
import { StoreProvider, useStore } from "@/lib/store";
import { href, useRoute } from "@/lib/router";
import { getChapter, paperMeta } from "@/content/research";
import { Header } from "@/components/Header";
import { HomePage } from "@/pages/HomePage";
import { ChapterPage } from "@/pages/ChapterPage";
import { PaperPage } from "@/pages/PaperPage";
import { ReferencesPage } from "@/pages/ReferencesPage";
import { AboutPage } from "@/pages/AboutPage";

function Shell() {
  const route = useRoute();
  const { motionOff } = useStore();
  const pageKey = route.name === "chapter" ? `chapter-${route.id}` : route.name;
  const lastPage = useRef<string | null>(null);
  const chapter = route.name === "chapter" ? getChapter(route.id) : undefined;

  useEffect(() => {
    const titles: Record<string, string> = {
      home: `${paperMeta.title} — A Co-Design Protocol`,
      paper: `Full Paper — ${paperMeta.title}`,
      references: `References — ${paperMeta.title}`,
      about: `About — ${paperMeta.title}`,
    };
    document.title = chapter
      ? `${chapter.number} ${chapter.title} — ${paperMeta.title}`
      : (titles[route.name] ?? titles.home);
  }, [route.name, chapter]);

  useEffect(() => {
    const anchor = "anchor" in route ? route.anchor : undefined;
    const pageChanged = lastPage.current !== null && lastPage.current !== pageKey;
    const firstLoad = lastPage.current === null;
    lastPage.current = pageKey;
    const behavior: ScrollBehavior = motionOff ? "auto" : "smooth";
    window.setTimeout(() => {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({
            behavior: pageChanged || firstLoad ? "auto" : behavior,
            block: "start",
          });
          if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
        }
      } else if (pageChanged) {
        window.scrollTo({ top: 0 });
        document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true });
      }
    }, 30);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  let page: React.ReactNode;
  if (route.name === "chapter") {
    page = chapter ? (
      <ChapterPage key={chapter.id} chapter={chapter} />
    ) : (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 tabIndex={-1} className="text-4xl font-semibold">
          This box is empty
        </h1>
        <p className="mt-3 text-cocoa-soft">We couldn’t find that chapter.</p>
        <a
          href={href.explore}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-cocoa px-5 font-bold text-ivory"
        >
          Back to the collection
        </a>
      </div>
    );
  } else if (route.name === "paper") page = <PaperPage />;
  else if (route.name === "references") page = <ReferencesPage />;
  else if (route.name === "about") page = <AboutPage />;
  else page = <HomePage />;

  return (
    <MotionConfig reducedMotion={motionOff ? "always" : "never"}>
      <div className="flex min-h-screen flex-col">
        <Header route={route} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {page}
        </main>
        <footer role="contentinfo" className="border-t border-cocoa/10 bg-cream/60">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm sm:px-6">
            <p>
              <span className="font-display text-base font-semibold">{paperMeta.title}</span>
              <span className="text-cocoa-soft">
                {" "}
                · {paperMeta.author} · {paperMeta.date}
              </span>
            </p>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 font-bold">
                <li>
                  <a className="hover:underline" href={href.explore}>
                    Explore
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href={href.paper()}>
                    Full Paper
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href={href.references}>
                    References
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href={href.about}>
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
