# Nike Store

Next.js (App Router) storefront with TypeScript, ESLint, Tailwind CSS, Better Auth,
Neon PostgreSQL, Drizzle ORM and Zustand. The homepage queries the `products` table
with Drizzle and renders the seeded Nike catalogue.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in your Neon connection string
npm run db:push              # create the tables
npm run db:seed              # load the sample Nike products
npm run dev
```

## Environment variables

| Variable              | Description                                   |
| --------------------- | --------------------------------------------- |
| `DATABASE_URL`        | Neon PostgreSQL connection string             |
| `BETTER_AUTH_SECRET`  | Random string used to sign Better Auth tokens |
| `BETTER_AUTH_URL`     | Base URL of the app                           |
| `NEXT_PUBLIC_APP_URL` | Base URL used by the Better Auth client       |

## Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start the dev server                 |
| `npm run build`       | Production build                     |
| `npm run lint`        | ESLint                               |
| `npm run db:generate` | Generate SQL migrations from schema  |
| `npm run db:push`     | Push the schema straight to Neon     |
| `npm run db:seed`     | Reset and seed the `products` table  |

## Structure

- `src/db/schema.ts` — Drizzle schema: `products` plus the Better Auth tables
- `src/db/index.ts` — Drizzle client over the Neon serverless driver
- `src/db/seed.ts` — sample Nike products
- `src/lib/auth.ts` — Better Auth server instance (Drizzle adapter, email + password)
- `src/app/api/auth/[...all]/route.ts` — Better Auth route handler
- `src/store/cart.ts` — Zustand cart store, persisted to local storage
- `src/app/page.tsx` — server component listing products from the database
