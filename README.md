# Orders CRUD (React + Vite + TypeScript + Redux Toolkit + Tailwind + SCSS)

A tiny React app that shows an **Orders** table with **create / view / update / delete**, a **status filter**, and a **search bar**.
Data is dummy and stored in `localStorage`. No backend required.

## Run locally

```bash
npm i
npm run dev
# open the URL Vite prints (usually http://localhost:5173)
```

## Test

```bash
npm test
```

## State shape (Redux)

```ts
type State = {
  orders: Order[]
  filter: OrderStatus | 'All'
  search: string
  selectedId: string | null
}
```
- Implemented with **Redux Toolkit** slice in `src/store.ts`
- Actions: `create`, `update`, `remove`, `select`, `setFilter`, `setSearch`, `hydrate`
- Persists to `localStorage` (key `orders-crud-state-v2`)

## Styling

- **TailwindCSS** utilities + **SCSS** file (`src/styles.scss`) for Tailwind layers and small custom rules.
- Dark, minimal UI with rounded cards and clean spacing.

## Notes

- Jest DOM matchers are registered in `vitest.setup.ts`.
- Vite config includes a `test` block for Vitest running in `jsdom`.
- UI test stubs `window.confirm` (JSDOM).