# Playwright + TypeScript 7 Starter

A tiny, complete Playwright test project used by the **SF Certified TypeScript 7 for Playwright** course. It demonstrates everything the course covers:

- the separate **type-check gate** (`tsc --noEmit`) — because Playwright does not type-check specs when it runs them;
- a **typed page object** and a **typed custom fixture**;
- a **`tests/tsconfig.json`** using the options Playwright honours (`baseUrl`, `paths`);
- a **CI pipeline** that type-checks *before* running the browser tests.

Tests target the public **TodoMVC demo** at `https://demo.playwright.dev/todomvc`.

## Prerequisites

- Node.js 20 or newer (`node -v`)

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Install the Playwright browser
npx playwright install chromium

# 3. Type-check only (the gate) — should print nothing on success
npm run typecheck

# 4. Run the tests (this runs the gate first via "pretest", then the tests)
npm test
```

## What to try

1. **Break a type on purpose.** In `tests/pages/TodoPage.ts`, change `add(text: string)` to be called with a number in `tests/todo.spec.ts` (e.g. `todoPage.add(123)`). Run `npm run typecheck` — the gate catches it. Run `npx playwright test` directly and note Playwright would have run it anyway.
2. **Watch CI.** Push to `main` (or open a PR) and open the **Actions** tab. The workflow runs the type-check gate first, then the tests.

## Layout

```
playwright-ts7-starter/
├─ package.json               # pretest = tsc --noEmit ; test = playwright test
├─ playwright.config.ts       # baseURL → the TodoMVC demo
├─ tsconfig.json              # root config
├─ tests/
│  ├─ tsconfig.json           # governs the type-check gate (baseUrl/paths honoured by Playwright)
│  ├─ pages/TodoPage.ts       # typed page object
│  ├─ fixtures.ts             # typed custom fixture
│  └─ todo.spec.ts            # spec using the fixture + page object
└─ .github/workflows/ci.yml   # type-check gate, THEN Playwright tests
```
