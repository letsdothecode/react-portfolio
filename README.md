# React Portfolio

Modern portfolio built with Vite + React + TypeScript + Tailwind + Framer Motion.

## Run locally

```bash
npm install
npm run dev
# open the printed localhost URL
```

## Build

```bash
npm run build
npm run preview
```

## EmailJS (optional)
To enable the contact form to send emails without opening your mail client, create a `.env` file in the project root with:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

Then restart `npm run dev`.

If these values are not set, the form gracefully falls back to `mailto:`.

## Customize
- Edit `src/App.tsx` to change your name, sections, and links.
- Add your projects in `src/data/projects.ts`.
- Replace images in `public/` (`profile.png`, `linkedin.png`, `stackoverflow.png`).

## Deploy
- GitHub Pages: `npm run build` then upload `dist/` to your hosting, or use a GitHub Action.
- Netlify/Vercel: Import the repo, set build command `npm run build`, output dir `dist`.
