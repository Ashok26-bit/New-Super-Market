# New Saravana Super Market — Glassmorphism Ecommerce Prototype

Static front-end prototype for **New Saravana Super Market, Samayapuram** featuring a glass-effect interface, mock ecommerce catalogue, in-memory admin CRUD, and a sales performance dashboard powered by Chart.js.

## Highlights

- Glassmorphism UI with light orange/green lighting, responsive layout, and mobile navigation.
- Product catalogue with category/availability/price filters, keyword search, and real-time cart.
- Admin control centre to add/edit/delete products, categories, and offers (in-memory store).
- Sales dashboard with year/category/metric filters, interactive charts, and summary metrics.
- Sample dataset covering supermarket staples, offers, and monthly sales (2024–2025).

## Tech Stack

- HTML5, modern CSS (no frameworks), vanilla ES2022 JavaScript
- [Chart.js v4](https://www.chartjs.org/) via CDN for dashboard visualisations (MIT License)

## Open-source Inspirations & Assets

- Glassmorphism design cues drawn from open galleries at [uiverse.io](https://uiverse.io/) and [CodePen glassmorphism collection](https://codepen.io/collection/DPOyOe).
- Product imagery sourced from [Unsplash](https://unsplash.com/) food & grocery collections (free to use under Unsplash License).
- Iconic gradient accents inspired by open-source community palettes (CoolHue, UI Gradients).

## Usage

Open `index.html` in any modern browser. All data persists only for the active session (no backend).

## Project Structure

- `index.html` — main layout and semantic sections
- `assets/styles.css` — global theme, glassmorphism styling, responsive rules
- `assets/app.js` — mock datastore, UI rendering, cart logic, admin CRUD, dashboard logic
- `README.md` — project overview, attributions, and usage notes

## Notes

- Dataset is illustrative; adjust `assets/app.js` to plug in real APIs or services.
- Admin actions mutate an in-memory store; refresh resets all data.

