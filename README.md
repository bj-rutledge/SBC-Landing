# Sound Building Components Inc. | Sedro Woolley, WA

Marketing and informational landing page for **Sound Building Components Inc.** (SBC), a wall panel manufacturer based in Sedro Woolley, WA. Built by [BJ Rutledge](https://github.com/bj-rutledge) / Big Dog Development.

## Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Pages](#pages)
- [Job Data Utility](#job-data-utility)
- [Email Handler](#email-handler)

---

## Project Overview

The SBC landing page showcases the company's projects, team, and services. Key features include:

- **Hero section** with drone footage video and animated stats (total linear feet built, miles, etc.)
- **Interactive projects map** powered by Google Maps, with aerial and street views for each job site
- **Our Team** page with animated profile cards
- **Contact Us** form that submits to a serverless email handler
- Responsive layout with a hamburger menu on mobile

---

## Repository Structure

```
SBC-Landing/
├── Source/                      # Main Gatsby website (React + TypeScript)
│   ├── src/
│   │   ├── pages/               # Gatsby pages (index, projects, our-team, contact-us, 404)
│   │   ├── components/          # Reusable UI components
│   │   ├── contexts/            # React context providers (job data, etc.)
│   │   ├── data/                # Static JSON data consumed by the site
│   │   ├── hooks/               # Custom React hooks
│   │   ├── images/              # Static images and media
│   │   ├── interfaces/          # TypeScript interfaces
│   │   ├── models/              # TypeScript types and models
│   │   └── theme/               # Chakra UI theme customisation
│   ├── static/                  # Public static assets (favicon, etc.)
│   ├── gatsby-config.ts         # Gatsby configuration and plugins
│   ├── gatsby-browser.tsx       # Gatsby Browser API hooks
│   └── gatsby-ssr.tsx           # Gatsby SSR API hooks
├── convert-sbc-jobs-to-json/    # Node.js utility: Excel → JSON job data
├── email-handler/               # Serverless contact-form email handler (GCP Cloud Functions)
└── api-calls-serverless-function/  # Supporting serverless utilities
```

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | [Gatsby 5](https://www.gatsbyjs.com/) |
| UI library | [React 18](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Component library | [Chakra UI 2](https://chakra-ui.com/) |
| Animations | [Framer Motion 11](https://www.framer.com/motion/) |
| Maps | [Google Maps JS API](https://developers.google.com/maps) (Aerial View + Street View) |
| Email (serverless) | [Resend](https://resend.com/) via Google Cloud Functions Gen 2 |
| Data pipeline | Node.js + [xlsx](https://www.npmjs.com/package/xlsx) (Excel → JSON) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm

### Install and run

```bash
cd Source
npm install
npm run develop
```

The site is available at `http://localhost:8000`.

> **Note:** The site requires environment variables to be set for the Google Maps integration and the contact form (see [Environment Variables](#environment-variables) below).

---

## Available Scripts

Run these from the `Source/` directory.

| Script | Description |
|---|---|
| `npm run develop` | Start the Gatsby development server (`localhost:8000`) |
| `npm start` | Same as `develop`, but binds to `0.0.0.0` (useful in containers) |
| `npm run build` | Create an optimised production build in `Source/public/` |
| `npm run serve` | Serve the production build locally |
| `npm run clean` | Clear the Gatsby cache (`.cache/` and `public/`) |
| `npm run typecheck` | Run TypeScript type-checking without emitting files |
| `npm run theme` | Regenerate Chakra UI token types from `src/theme/index.ts` |
| `npm run theme:watch` | Same as above, but watches for changes |
| `npm run update-jobs` | Run the job-data conversion utility (see [Job Data Utility](#job-data-utility)) |
| `npm run dev-server` | Start a local HTTP server to serve job JSON files during development |

---

## Environment Variables

Create a `.env.development` (and `.env.production`) file in the `Source/` directory.

```env
# Google Maps JavaScript API key (required for the Projects page map and aerial/street views)
GATSBY_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# URL of the deployed contact-form serverless function
# Falls back to http://localhost:8080 when not set
GATSBY_CONTACT_FORM_ENDPOINT=https://your-cloud-function-url
```

> Gatsby exposes only variables prefixed with `GATSBY_` to the browser bundle.

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/index.tsx` | Home — hero video, company stats, services overview, customer quotes |
| `/projects` | `src/pages/projects.tsx` | Interactive Google Map of completed job sites |
| `/our-team` | `src/pages/our-team.tsx` | Team member profiles with animated cards |
| `/contact-us` | `src/pages/contact-us.tsx` | Contact form (name, email, message) |
| `/*` | `src/pages/404.tsx` | 404 not found |

---

## Job Data Utility

The `convert-sbc-jobs-to-json/` directory contains a standalone Node.js script that:

1. Reads a job-list Excel spreadsheet (`spreadsheets/*.xlsm`).
2. Geocodes each job address using the Google Maps Geocoding API.
3. Attaches project photos from local directories.
4. Writes the result to `convert-sbc-jobs-to-json/<filename>.json` **and** copies it to `Source/src/components/data/sbc-website-jobs-list.json` for use in the website.

### Usage

```bash
cd convert-sbc-jobs-to-json
cp .env.example .env   # add MAPS_API_KEY
npm install
node index.js
```

Or from the `Source/` directory:

```bash
npm run update-jobs
```

---

## Email Handler

The `email-handler/` directory is a **Google Cloud Functions Gen 2** serverless function that receives contact form POSTs and sends emails via [Resend](https://resend.com/).

See [`email-handler/README.md`](email-handler/README.md) for full setup and deployment instructions.

### Required environment variables (serverless function)

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Verified sender address |
| `CONTACT_TO_EMAIL` | Recipient address for contact form submissions |
| `ALLOWED_ORIGIN` | CORS allowed origin |

### Quick local start

```bash
cd email-handler
npm install
npm start   # listens on http://localhost:8080
```

---

*Built by BJ Rutledge / Big Dog Development.*
