## Kinderly

Kid apparel multi-page storefront built with vanilla HTML/CSS/JS. Includes product listing, product detail, cart, and checkout flows powered by in-browser data and localStorage.

## Live Demo
[himihiba.github.io/kinderly](https://himihiba.github.io/kinderly/)

## Features
- Multi-page experience: home, category grid, product detail, cart, and checkout flows.
- Mock product catalog stored in `productsDB` with images, pricing, colors, sizes, and ratings.
- Cart + quantity management persisted to `localStorage` (`kinderly_cart`).
- Favorites toggle with `localStorage` (`kinderly_favs`).
- Header cart badge updates automatically as items change.
- Responsive layout with dedicated styles for each page.
- Lightweight—no build step or external dependencies besides fonts/icons.

## Project Structure
- `index.html` — landing page/hero sections.
- `category.html` — product grid, links into detail pages.
- `product.html` — product details, color/size selectors, add-to-cart.
- `cart.html` — editable cart with quantity controls and removal.
- `checkout.html` — order summary and mock checkout form.
- `script.js` — product data, cart/favorites managers, and page-specific render logic.
- `css/` — modular styles per page plus shared globals/header/footer.
- `img/` — product and UI assets.

## Tech Stack
- HTML5 + CSS3 (no preprocessors)
- Vanilla JavaScript (DOM + `localStorage`)
- Ionicons for UI icons (loaded in pages)

## Getting Started
1) Clone or download this repo.
2) Open `index.html` directly in a browser **or** run a simple static server (e.g. VS Code Live Server) from the repo root.
3) Navigate between pages via the header links.

## Usage Notes
- Product data lives in `script.js` (`productsDB`). Add or edit entries to change the catalog; thumbnails reuse the `img/` assets.
- Cart state is persisted under the `kinderly_cart` key; favorites under `kinderly_favs`. Clearing browser storage resets them.
- The cart badge and page renders are driven by `CartManager.updateHeaderBadge()` and page-specific render helpers (`renderCategoryGrid`, `loadProductDetails`, `renderCartPage`, `renderCheckoutSummary`).

## Screenshots
### Desktop
![Kinderly Desktop](DesktopVersion.png)

### Mobile
![Kinderly Mobile](MobileVersion.png)

