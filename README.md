# mycarmesi.monikavaishnav.com

Campaign case study for Carmesi's "Not Her Job" takeover week. Built with [Next.js](https://nextjs.org) (App Router) and TypeScript, deployed as a static export to GitHub Pages at [mycarmesi.monikavaishnav.com](https://mycarmesi.monikavaishnav.com).

## Requirements

- Node.js 20 or later
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (pass `-- -p <port>` to `npm run dev` to use a different port).

## Other commands

```bash
npm run build   # production build — static export written to ./out
npm run lint    # ESLint
```

`npm run build` outputs a fully static site to `./out` (via `output: "export"` in `next.config.ts`) — no Node server is needed to serve it. To preview that exact output locally:

```bash
npm run build
npx serve out
```

## Project structure

```
app/
  page.tsx              Campaign landing page
  layout.tsx            Root layout, fonts
  globals.css           Base reset
public/
  CNAME                 Custom domain config
  .nojekyll             GitHub Pages config
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. The custom domain is configured via `public/CNAME`, which is why `public/.nojekyll` is also required (otherwise GitHub Pages' Jekyll processing ignores the `_next/` asset directory).
