# Zorbi Guitars: Frontend (React + Vite)

```bash
npm install
npm run dev        # http://localhost:5173
```

The Django backend must be running on http://localhost:8000.
Vite forwards `/api` and `/media` to it (see `vite.config.js`), so the app has no CORS or URL setup to do.
To point at a different backend: `BACKEND_URL=http://host:port npm run dev`.

## Structure

- `src/api.js`: every call to the backend, plus JWT storage and automatic token refresh
- `src/ShopContext.jsx`: signed-in user and cart state shared across pages
- `src/pages/`: Shop, ProductPage, CartPage, AuthPage, OrdersPage
- `src/components/`: Header, ProductCard, Thumb
- `src/styles.css`: all styling

The local fallback product photo is a guitar photograph from [Unsplash](https://images.unsplash.com/photo-1550291652-6ea9114a47b1).

For production, run `npm run build` and serve `dist/` behind the same domain as the API (or add your domain to `CORS_ALLOWED_ORIGINS` in Django and change `BASE` in `src/api.js`).
