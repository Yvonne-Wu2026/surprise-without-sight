import { useEffect, useState } from "react";

export type Route =
  | { name: "home"; anchor?: string }
  | { name: "chapter"; id: string; anchor?: string }
  | { name: "paper"; anchor?: string }
  | { name: "references" }
  | { name: "about" };

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const [a, b, c] = parts;
  if (a === "chapter" && b) return { name: "chapter", id: b, anchor: c };
  if (a === "explore") return { name: "home", anchor: "collection" };
  if (a === "paper") return { name: "paper", anchor: b };
  if (a === "references") return { name: "references" };
  if (a === "about") return { name: "about" };
  return { name: "home", anchor: a === "home" ? b : undefined };
}

export const href = {
  home: "#/",
  explore: "#/explore",
  chapter: (id: string, anchor?: string) => `#/chapter/${id}${anchor ? `/${anchor}` : ""}`,
  paper: (anchor?: string) => `#/paper${anchor ? `/${anchor}` : ""}`,
  references: "#/references",
  about: "#/about",
};

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
