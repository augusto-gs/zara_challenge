# MBST Mobile Store — Zara Frontend Challenge

A mobile phone store built as a technical challenge.

**[Live Demo](https://zara-challenge-henna.vercel.app)**

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + SASS
- **State Management:** React Context API
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel

---

## Prerequisites

- Node.js 20.9 or higher

> The challenge spec mentions Node 18, but Next.js 16 requires Node 20.9+.

---

## Getting Started

```bash
git clone https://github.com/augusto-gs/zara_challenge/
cd zara-challenge
npm install
```

Create a `.env.local` file in the root with the required environment variables:

```env
API_KEY=
API_BASE_URL=
```

> Contact the project maintainer for the values.

```bash
# Development
npm run dev

# Production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
