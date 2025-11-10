# Key Decisions & Trade-offs (Redux + Tailwind Update)

- **Redux Toolkit for state**
  - Scales cleanly as features grow (selectors, middleware, RTK Query if needed).
  - Trade-off: extra dependency vs simple Context/Reducer, but better dev ergonomics for larger apps.

- **TailwindCSS + SCSS**
  - Tailwind for quick, consistent utility-first styling; SCSS to host Tailwind layers and tiny custom styles.
  - Trade-off: Requires small build-time setup (PostCSS, Tailwind config).

- **Vitest + React Testing Library**
  - Covered store CRUD and a simple UI flow (create & delete).
  - Trade-off: JSDOM limitations (e.g., `window.confirm` stubbed in UI test).

- **LocalStorage persistence**
  - Keeps "dummy" data sticky without a backend.
  - Trade-off: No multi-user sync or conflict handling (not required here).