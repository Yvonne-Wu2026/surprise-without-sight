import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { chapters } from "@/content/research";

type Prefs = { reducedMotion: boolean; readingMode: boolean; sound: boolean };

type Store = Prefs & {
  /** True when any animation should be skipped (reduced motion or reading mode). */
  motionOff: boolean;
  setPref: <K extends keyof Prefs>(key: K, value: Prefs[K]) => void;
  explored: string[];
  markExplored: (id: string) => void;
  resetProgress: () => void;
  announce: (message: string) => void;
  chime: (kind?: "pop" | "shake" | "sparkle") => void;
};

const Ctx = createContext<Store | null>(null);
const PREFS_KEY = "surprise-without-sight:prefs";
const PROGRESS_KEY = "surprise-without-sight:explored";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function systemReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(() =>
    load<Prefs>(PREFS_KEY, {
      reducedMotion: systemReducedMotion(),
      readingMode: false,
      sound: false,
    }),
  );
  const [explored, setExplored] = useState<string[]>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "[]");
      return Array.isArray(raw) ? raw.filter((id) => chapters.some((c) => c.id === id)) : [];
    } catch {
      return [];
    }
  });
  const [message, setMessage] = useState("");
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {}
    const root = document.documentElement;
    root.dataset.reading = String(prefs.readingMode);
    root.dataset.motion = prefs.reducedMotion || prefs.readingMode ? "off" : "on";
  }, [prefs]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(explored));
    } catch {}
  }, [explored]);

  const setPref = useCallback(<K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);

  const markExplored = useCallback((id: string) => {
    setExplored((list) => (list.includes(id) ? list : [...list, id]));
  }, []);

  const announce = useCallback((m: string) => {
    // Clear first so repeated identical messages are re-announced.
    setMessage("");
    window.setTimeout(() => setMessage(m), 60);
  }, []);

  const chime = useCallback(
    (kind: "pop" | "shake" | "sparkle" = "pop") => {
      if (!prefs.sound) return;
      try {
        audio.current ??= new AudioContext();
        const ctx = audio.current;
        const notes =
          kind === "sparkle" ? [880, 1175, 1568] : kind === "shake" ? [220] : [660, 990];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = ctx.currentTime + i * 0.08;
          osc.type = kind === "shake" ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(kind === "shake" ? 0.05 : 0.08, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.4);
        });
      } catch {}
    },
    [prefs.sound],
  );

  const value = useMemo<Store>(
    () => ({
      ...prefs,
      motionOff: prefs.reducedMotion || prefs.readingMode,
      setPref,
      explored,
      markExplored,
      resetProgress: () => setExplored([]),
      announce,
      chime,
    }),
    [prefs, setPref, explored, markExplored, announce, chime],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {message}
      </div>
    </Ctx.Provider>
  );
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}
