# Surprise Without Sight

HF720 participatory research and design assignment: a co-design protocol for making
blind boxes and gachapon inclusive for blind and low-vision young adults.

The site presents the paper as seven "mystery boxes" (chapters) with small interactive
pieces (peel-to-reveal principles, unwrap-the-stages gifts, a shake-to-reveal box and a
capsule machine), plus a continuous Full Paper view that prints cleanly. The design started
in Figma Make and was brought into this repo as React + Vite + Tailwind.

## Editing the content

Every word of the paper lives in `src/content/research.ts`. The chapter view and the Full
Paper view are both generated from it, so edit text there and both update.

## Running locally

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
```

## Hosting (GitHub Pages)

Push to `main` on GitHub, then set **Settings > Pages > Source** to **GitHub Actions**.
`.github/workflows/deploy.yml` builds the site and publishes `dist/` on every push.

**Cloudflare Pages** also works: build command `npm run build`, output directory `dist`.
