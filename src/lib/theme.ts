import type { ThemeKey } from "@/content/research";

export type BoxTheme = {
  base: string;
  shade: string;
  lid: string;
  ribbon: string;
  ribbonShade: string;
  soft: string;
  /** Accessible accent text colour on ivory/white backgrounds. */
  ink: string;
};

export const themes: Record<ThemeKey, BoxTheme> = {
  blush: {
    base: "#F5BFD3",
    shade: "#E89DBA",
    lid: "#F9D3E1",
    ribbon: "#D8C6F2",
    ribbonShade: "#B9A2E3",
    soft: "#FDEBF2",
    ink: "#9E3A64",
  },
  lavender: {
    base: "#D8C6F2",
    shade: "#BCA5E6",
    lid: "#E6DAF7",
    ribbon: "#FFF0CE",
    ribbonShade: "#F2D893",
    soft: "#F3EDFC",
    ink: "#5E44A0",
  },
  mint: {
    base: "#C6E8DB",
    shade: "#9FD5C2",
    lid: "#DAF1E8",
    ribbon: "#F5BFD3",
    ribbonShade: "#E89DBA",
    soft: "#EAF7F1",
    ink: "#23654F",
  },
  butter: {
    base: "#FFF0CE",
    shade: "#F5D997",
    lid: "#FFF6E0",
    ribbon: "#C6E8DB",
    ribbonShade: "#9FD5C2",
    soft: "#FFF8E8",
    ink: "#7A5A12",
  },
  peach: {
    base: "#FFD6C4",
    shade: "#F5B49A",
    lid: "#FFE5D9",
    ribbon: "#CDE2F5",
    ribbonShade: "#A6C7E8",
    soft: "#FFF1EA",
    ink: "#984124",
  },
  sky: {
    base: "#CDE2F5",
    shade: "#A6C7E8",
    lid: "#DEEBF8",
    ribbon: "#FFD6C4",
    ribbonShade: "#F5B49A",
    soft: "#EEF5FC",
    ink: "#2D5A86",
  },
  lilac: {
    base: "#EBC8EE",
    shade: "#D8A4DD",
    lid: "#F3DBF5",
    ribbon: "#C6E8DB",
    ribbonShade: "#9FD5C2",
    soft: "#FAEFFB",
    ink: "#7D3A84",
  },
};
