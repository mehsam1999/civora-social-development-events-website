<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# civora

Single Next.js 16.4.4 app (App Router, `src/app`). Not a monorepo. No CI, no test suite.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint. Next 16 removed `next lint`; don't reintroduce it
- `npx tsc --noEmit` — typecheck (no npm script; `npm run build` also typechecks)
- `npm run build` — production build; use as final verification

No tests exist — don't guess at a test command. Verify changes with lint + typecheck + build.

## Conventions

- **Bundled version-matched docs**: `node_modules/next/dist/docs/` mirrors the installed Next.js. Read the relevant guide there before writing Next.js code — it overrides your training data.
- **Tailwind 4 is CSS-first**: no `tailwind.config` or `postcss.config`. The `@tailwindcss/turbopack` loader is wired in `next.config.ts`; theme tokens, dark-mode variant, and `@theme` live in `src/app/globals.css`. Edit that file — don't add a config.
- **shadcn/ui style is `base-nova` (Base UI)**: primitives in `src/components/ui` build on `@base-ui/react`, not Radix. Add components with `npx shadcn add <name>`; don't port them to Radix. Config: `components.json`.
- **`cn` helper**: `src/lib/utils.ts` re-exports the `cn` npm package (drop-in for clsx + tailwind-merge). Import from `@/lib/utils`; don't rewrite it.
- **React Compiler is on** (`reactCompiler: true` in `next.config.ts`): follow the Rules of React strictly; don't sprinkle manual `memo`/`useMemo`.
- Path alias `@/*` → `./src/*`.
- Type `params` with the generated helpers `PageProps<'/route'>` / `LayoutProps<'/route'>` (see `src/app/layout.tsx`), not hand-rolled types.

## AGENTS.md management

The `nextjs-agent-rules` block at the top is rewritten by `next dev`. Next rewrites only content between the markers and preserves the rest — keep this file's custom notes outside the markers, and commit changes to the block rather than fighting it.
