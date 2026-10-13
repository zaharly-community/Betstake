# Betstake — Sports & Games Template

## Direction
A dark sportsbook and gaming template with deep charcoal/green surfaces, bright lime accent, compact sports navigation, event cards, and a persistent desktop bet slip. This is an original implementation inspired by common sportsbook patterns, not a pixel-perfect copy of GigaWin; the live reference site could not be inspected reliably from this environment.

## Demo-only scope
- Fixture names, scores, markets, and odds are illustrative.
- Filtering, search, favorites, odds selection, stake presets, and potential-return calculation are client-side interactions.
- The “Demo bet” control only displays a notice; no wager is submitted.
- No user accounts, wallet, deposits, payments, or sportsbook API connections.

## Responsive behavior
- Three-column desktop layout: sports navigation, events, and bet slip.
- Tablet layout hides the permanent bet slip and opens it from a mobile summary bar.
- Mobile layout uses horizontally scrollable sport filters and compact event cards.

## Run
- `npm install`
- `npm run dev`
- `npm run build`

GitHub Pages base path remains configured in `vite.config.js`.
