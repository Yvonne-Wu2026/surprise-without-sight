import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronDown, Menu, X } from "lucide-react";
import { chapters, paperMeta } from "@/content/research";
import { href, type Route } from "@/lib/router";
import { useStore } from "@/lib/store";
import { themes } from "@/lib/theme";

function Switch({
  label,
  checked,
  onChange,
  icon,
  emphasis,
  compact,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  icon: React.ReactNode;
  emphasis?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold whitespace-nowrap transition active:scale-95 ${
        checked
          ? "bg-cocoa text-ivory"
          : emphasis
            ? "bg-lavender text-cocoa hover:bg-[#cdb7ee]"
            : "bg-white/70 text-cocoa ring-1 ring-cocoa/10 hover:bg-white"
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className={compact ? "sr-only 2xl:not-sr-only" : ""}>{label}</span>
      <span
        aria-hidden="true"
        className={`relative hidden h-4 w-7 shrink-0 rounded-full transition min-[420px]:block ${checked ? "bg-mint" : "bg-cocoa/20"}`}
      >
        <span
          className={`absolute top-0.5 size-3 rounded-full bg-white shadow transition-all ${checked ? "left-3.5" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

export function Progress({ compact }: { compact?: boolean }) {
  const { explored } = useStore();
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`${explored.length} of ${chapters.length} boxes explored`}
      role="img"
    >
      <div className="flex gap-0.5" aria-hidden="true">
        {chapters.map((c) => {
          const done = explored.includes(c.id);
          return (
            <svg key={c.id} viewBox="0 0 24 24" className="size-4.5 overflow-visible">
              <path
                d="M12 20.5C6.2 16.6 2.5 13.2 2.5 8.9 2.5 6 4.7 3.8 7.4 3.8c1.9 0 3.5 1 4.6 2.6 1.1-1.6 2.7-2.6 4.6-2.6 2.7 0 4.9 2.2 4.9 5.1 0 4.3-3.7 7.7-9.5 11.6Z"
                fill={done ? themes[c.theme].shade : "transparent"}
                stroke={done ? themes[c.theme].ink : "rgb(91 70 70 / 0.35)"}
                strokeWidth={1.8}
                strokeLinejoin="round"
                className="transition-[fill] duration-300"
              />
              {done && (
                <ellipse
                  cx="7.6"
                  cy="8.4"
                  rx="1.6"
                  ry="1"
                  fill="#fff"
                  opacity="0.7"
                  transform="rotate(-35 7.6 8.4)"
                />
              )}
            </svg>
          );
        })}
      </div>
      {!compact && (
        <span className="text-xs font-bold whitespace-nowrap text-cocoa-soft" aria-hidden="true">
          {explored.length} of {chapters.length} boxes explored
        </span>
      )}
    </div>
  );
}

export function Header({ route }: { route: Route }) {
  const { readingMode, setPref, explored } = useStore();
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChaptersOpen(false);
    setMobileOpen(false);
  }, [route]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChaptersOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setChaptersOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (name: Route["name"], anchor?: string) =>
    route.name === name && (anchor === undefined || ("anchor" in route && route.anchor === anchor));

  const link = (label: string, to: string, active: boolean) => (
    <a
      href={to}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3 py-2 text-sm font-bold whitespace-nowrap transition hover:bg-white ${active ? "bg-white text-cocoa shadow-soft" : "text-cocoa-soft"}`}
    >
      {label}
    </a>
  );

  const chapterList = (
    <ul className="grid gap-1">
      {chapters.map((c) => (
        <li key={c.id}>
          <a
            href={href.chapter(c.id)}
            aria-current={route.name === "chapter" && route.id === c.id ? "page" : undefined}
            className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-cream aria-[current=page]:bg-cream"
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold"
              style={{ background: themes[c.theme].base }}
              aria-hidden="true"
            >
              {c.number}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{c.title}</span>
              <span className="block text-xs text-cocoa-soft">{c.label}</span>
            </span>
            {explored.includes(c.id) && (
              <span className="ml-auto text-xs font-bold text-[#23654F]">Explored</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 border-b border-cocoa/10 bg-ivory/85 backdrop-blur-md"
    >
      <a
        href="#main"
        onClick={(e) => {
          // Hash routing: move focus without changing the route.
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
        className="sr-only z-50 rounded-full bg-cocoa px-4 py-2 font-bold text-ivory focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6">
        <a
          href={href.home}
          className="flex items-center gap-2 rounded-2xl pr-2"
          aria-label={`${paperMeta.title}, home`}
        >
          <svg viewBox="0 0 40 40" className="size-8 shrink-0 sm:size-9" aria-hidden="true">
            <rect x="6" y="16" width="28" height="20" rx="6" fill="#F5BFD3" />
            <rect x="4" y="11" width="32" height="8" rx="4" fill="#F9D3E1" />
            <rect x="17" y="11" width="6" height="25" fill="#D8C6F2" />
            <path d="M20 11 C14 2 8 6 12 11Z M20 11 C26 2 32 6 28 11Z" fill="#D8C6F2" />
            <circle cx="14" cy="27" r="1.6" fill="#5B4646" />
            <circle cx="26" cy="27" r="1.6" fill="#5B4646" />
          </svg>
          <span className="hidden font-display text-base leading-none font-semibold min-[400px]:inline sm:text-lg">
            {paperMeta.title}
          </span>
        </a>

        <nav aria-label="Primary" className="ml-2 hidden items-center gap-0.5 lg:flex">
          {link("Home", href.home, route.name === "home" && !("anchor" in route && route.anchor))}
          {link("Explore", href.explore, isActive("home", "collection"))}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-expanded={chaptersOpen}
              aria-controls="chapters-menu"
              onClick={() => setChaptersOpen((o) => !o)}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold transition hover:bg-white ${route.name === "chapter" ? "bg-white shadow-soft" : "text-cocoa-soft"}`}
            >
              Chapters{" "}
              <ChevronDown
                className={`size-4 transition ${chaptersOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id="chapters-menu"
              hidden={!chaptersOpen}
              className="absolute top-full left-0 mt-2 w-80 rounded-3xl bg-white p-2 shadow-pop ring-1 ring-cocoa/10"
            >
              {chapterList}
            </div>
          </div>
          {link("Full Paper", href.paper(), route.name === "paper")}
          {link("References", href.references, route.name === "references")}
          {link("About", href.about, route.name === "about")}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden 2xl:block">
            <Progress />
          </div>
          <Switch
            label="Reading Mode"
            checked={readingMode}
            onChange={(v) => setPref("readingMode", v)}
            icon={<BookOpen className="size-4" />}
            emphasis
          />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-white/70 ring-1 ring-cocoa/10 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-cocoa/10 bg-ivory px-4 pb-6 lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-xl">
          <div className="flex flex-wrap gap-1 py-3">
            {link("Home", href.home, route.name === "home")}
            {link("Explore", href.explore, false)}
            {link("Full Paper", href.paper(), route.name === "paper")}
            {link("References", href.references, route.name === "references")}
            {link("About", href.about, route.name === "about")}
          </div>
          <p className="px-3 pb-1 font-display text-sm font-semibold">Chapters</p>
          {chapterList}
          <div className="mt-4 px-2">
            <Progress />
          </div>
        </nav>
      </div>
    </header>
  );
}
