# 🛹 STORE 777 — Tienda de Skateboard (WooCommerce Headless)

Tienda de e-commerce de productos de skateboard (zapatillas, indumentaria, streetwear) construida con Next.js 15 + React 19 + WooCommerce headless. La marca visual está basada en el logo del tacho de basura con dientes (ver `public/logo-777.jpeg`).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript 5.8 · Tailwind 4 · WooCommerce GraphQL (REST API legacy disponible) · Sharp (imágenes)

**Repo:** local (no desplegado en Vercel aún) · **Última actualización:** 2026-06-30

---

## 🎯 Visión general

Plataforma de e-commerce para venta de productos de skate. La tienda consume el catálogo de productos de una tienda WooCommerce externa (vía GraphQL o REST API), y muestra los productos con branding propio (paleta turquesa + rojo sangre + negro profundo extraídos del logo).

**Audiencia objetivo:** skaters de Argentina / LATAM (precio en COP, contacto WhatsApp +57).

---

## ✅ Funcionalidades implementadas

### Home (`/`)

- **SeasonalBanner**: 3 slides con banners (`/banner-forza*.png`). Click → navega a `/tienda/categoria`. Autoplay, dots, flechas.
- **FeaturedProducts**: carrusel horizontal de productos destacados de WooCommerce.
  - Filtrado por marca clickeable (panel lateral con lista de categorías).
  - Botón "Todas" para limpiar el filtro.
  - Estado "sin productos": muestra placeholder sin ocultar el panel de marcas.
  - Click en card → modal fullscreen con video y acciones overlay estilo Instagram Reels.
- **CategorySectionMinimal**: grid minimalista de categorías top-level.
- **CategoryCarousel**: carrusel de marcas (Adidas, Nike, etc).
- **BrandPhilosophy**: sección con texto de marca.
- **HeroSection**: hero principal con CTA.
- **AnnouncementBar**: barra superior con anuncios.
- **Newsletter**: suscripción con validación Zod + feedback de error.
- **InstagramFeed** (presente pero no se renderiza en home).
- **N8nChatWidget**: widget de chat (n8n).

### Catálogo y productos

- `/tienda/categoria`: grid de productos por categoría con búsqueda.
- `/tienda/categoria/[collection]`: detalle de categoría (placeholder actualmente).
- `/product/[slug]`: detalle de producto con:
  - Galería de imágenes.
  - Selector de variations (talle).
  - Stock indicator.
  - Botón add-to-cart.
- `/search`: listado completo de productos con filtros.

### Cart y checkout

- Cart persistente en `localStorage` (no en BD).
- `/cart`: página de carrito con resumen.
- `/checkout`: formulario de envío (manual, no hay pasarela de pago real).

### Auth

- `/auth/signin` con `SigninButton` (menú estilo PS2):
  - Login con email + password.
  - Login con Google OAuth.
  - Link a "Crear cuenta" (modal `RegisterEmailForm`).
- `/auth/register` (legacy, redirige a signin).

### APIs (`app/api/`)

- `/api/graphql`: proxy CORS a WPGraphQL de Tory.
- `/api/test-woocommerce`: testea la conexión con la tienda externa.
- `/api/products-by-category`: lista productos por categoría.
- `/api/search`: búsqueda de productos.
- `/api/revalidate`: invalida cache.
- `/api/diagnostico-carrito`: corre 4 tests de GraphQL para debug.

---

## 🎨 Línea gráfica

Paleta extraída de `public/logo-777.jpeg`:

| Color | Hex | Uso |
|---|---|---|
| Turquesa eléctrico | `#00E5D1` | Acentos primarios, bordes, focus |
| Rojo sangre | `#D32F2F` | Acentos secundarios, sale prices, badges |
| Rojo oscuro | `#8B0000` | Variante para hover |
| Negro profundo | `#0A0A0A` | Backgrounds |
| Blanco hueso | `#FAFAFA` | Texto sobre fondos oscuros |

Aplicada en:
- `app/globals.css` con CSS variables (`--logo-cyan`, `--logo-red`, `--logo-black`, etc.).
- Componentes custom: `SeasonalBanner`, `FeaturedProducts`, `FooterCustom`.
- `tailwind.config.ts` con la paleta `brand.toxic-green` (alternativa neón).

---

## 🏗️ Hosting y deploy

- **Local**: `npm run dev` → `http://localhost:3000`.
- **Producción**: aún no deployado. Recomendación: Vercel o Netlify.
- **WooCommerce backend**: `https://dev-shoes-company-777.pantheonsite.io` (con GraphQL custom path `/graphql777`).
- **No hay Supabase** (a diferencia de TheTrickest).

**Variables de entorno** (en `.env`):
- `NEXT_PUBLIC_WOOCOMMERCE_URL="https://dev-shoes-company-777.pantheonsite.io"` (sin path, el proxy concatena `/graphql777`).
- `NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY` (placeholder).
- `NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET` (placeholder).
- `NEXT_PUBLIC_PHONE_NUMBER="3232182386"` (Colombia).
- `NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_SITE_URL`.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── [page]/                    # Páginas dinámicas (catch-all)
│   ├── account/                   # Login / register
│   ├── api/                       # 7 endpoints (graphql, search, products-by-category, etc.)
│   ├── cart/                      # Carrito
│   ├── checkout/                  # Checkout
│   ├── product/[slug]/            # Detalle de producto
│   ├── search/                    # Búsqueda
│   ├── tienda/categoria/          # Catálogo por categoría
│   ├── politica-*/                # Páginas legales
│   ├── terminos-*/                # Páginas legales
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css                # Paleta de marca (CSS vars)
├── components/
│   ├── custom/                    # Componentes específicos del sitio
│   │   ├── FeaturedProducts.tsx
│   │   ├── SeasonalBanner.tsx
│   │   ├── FooterCustom.tsx
│   │   ├── HeroSection.tsx
│   │   ├── BrandPhilosophy.tsx
│   │   ├── CategoryCarousel.tsx
│   │   ├── CategorySectionDynamic.tsx
│   │   ├── CategorySectionMinimal.tsx
│   │   ├── Newsletter.tsx
│   │   ├── InstagramFeed.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── NavbarIntegrated.tsx
│   ├── layout/                    # Navbar, Footer
│   ├── product/                   # ProductDescriptionWoo, ProductDetails, etc.
│   ├── grid/                      # Grid + tile
│   ├── cart/                      # CartDrawer, CartIcon
│   ├── ui/                        # Genéricos (button, input, etc.)
│   ├── icons/                     # lucide-react exports
│   ├── providers/                 # CartProvider
│   └── lib/                       # (no confundir con src/lib)
├── lib/
│   ├── woocommerce/                # Cliente GraphQL + queries
│   │   ├── index.ts
│   │   ├── cart.ts
│   │   ├── queries/               # product, collection, cart, search
│   │   ├── mutations/             # cart (add, update)
│   │   └── types.ts
│   ├── actions/                   # Server actions
│   ├── cookies/                   # recently-viewed
│   ├── validations/               # forms.ts (Zod schemas)
│   ├── seo/                       # (vacío, pendiente)
│   ├── env.ts                     # Validación de env vars
│   ├── structured-data.ts         # JSON-LD schemas
│   ├── fonts/                     # Fuentes belleza y moderat
│   ├── json-ld-script.tsx
│   ├── seo.ts
│   ├── type-guards.ts
│   └── utils.ts
├── messages/
│   ├── es.json                    # i18n español
│   └── en.json                    # i18n inglés
├── styles/                        # (legacy)
└── middleware.ts                  # Locale detection
```

---

## 🛠️ Comandos útiles

```bash
# Desarrollo
npm run dev                          # Dev server con HMR
npm run build                        # Build de producción
npm run start                        # Sirve el build en :3000

# Linting y formateo
npm run lint                         # ESLint
npm run lint:fix                     # ESLint con --fix
npm run prettier                     # Prettier format
npm run prettier:check               # Prettier check

# Testing (configurado pero sin tests)
npm run test:unit                    # Jest
```

---

## 🚧 Lo que NO tiene aún (roadmap 2-3 meses)

### Críticas

1. **Deploy real a Vercel/Netlify** — aún no deployado.
2. **Stripe / MercadoPago** — checkout es manual por WhatsApp.
3. **Email transaccional** (Resend) — confirmaciones de orden, recuperación de carrito.
4. **Analytics** (Plausible o GA4) — sin tracking de nada.
5. **SEO real** (sitemap, robots.txt, structured data enriquecido).
6. **Tests automatizados** (Jest configurado pero 0 tests).
7. **CI/CD** (GitHub Actions).
8. **Limpieza de archivos legacy** — hay 14+ archivos `.md` con info vieja (INTEGRATION, METAOBJECTS, etc.).

### Features

9. Sistema de variaciones de producto (talle) con selector visual.
10. Filtros por precio, marca, talle.
11. Búsqueda con autocompletado.
12. Wishlist / favoritos.
13. Reviews de productos.
14. Stock por sucursal (si la tienda tiene locales).
15. Cupones de descuento.
16. Envíos con tracking (Andreani, OCA, etc.).
17. Pagos en cuotas sin interés.
18. App nativa (React Native).

### Admin/operaciones

19. Dashboard admin para gestión de inventario.
20. Sistema de reviews moderadas.
21. Reportes de ventas.
22. Integración con sistemas contables (AFIP para Argentina, DIAN para Colombia).

---

## ⚠️ Deuda técnica conocida

- **Credenciales de WooCommerce son placeholders** (`ck_xxx...` en `.env`). El endpoint público de Tory no las usa realmente, pero hay que reemplazarlas cuando se conecte a una tienda real con auth.
- **Archivos `.md` legacy desactualizados** (INTEGRATION.md, METAOBJECTS_*, SETUP_COMPLETE.md, etc.) — contienen info de cuando era un proyecto de Shopify. Pendiente de limpieza.
- **No hay CI/CD** — los deploys son manuales.
- **`/tienda/categoria/[collection]/page.tsx` no lista productos** — solo tiene placeholder. La lógica de listar está en `/search/[collection]/page.tsx`.
- **FeaturedProducts** tiene un bug conocido donde los handlers de fetch no son memoizados, lo que puede causar re-fetches innecesarios al cambiar categoría.
- **`scripts/`** vacío (sin scripts de seed o de utilidad).
- **`lib/seo/`** está vacío.

---

## 🔗 Integraciones externas

| Servicio | Uso | Plan |
|---|---|---|
| **WooCommerce** (Tory Skateshop) | Catálogo de productos vía GraphQL | - |

---

## 📝 Convenciones

- **Tailwind v4**: `@import 'tailwindcss'` en `globals.css` (no `tailwind.config.ts` para todo; algunas cosas sí están en el config).
- **Estilo**: TypeScript estricto. ESLint con config default de Next.
- **Componentes custom**: en `src/components/custom/` (estilo feature folder).
- **i18n**: `messages/{es,en}.json` con namespaces por feature.
- **API routes**: en `src/app/api/{recurso}/route.ts` con proxy GraphQL.

---

## 🛒 Productos actuales

- Nike Force One
- Nike Airmax
- Adidas (categoría)
- Product (genérico)

(Vienen del backend de Tory. No hay inventario en BD local — todo se fetchea en runtime.)

---

## 🤝 Contacto

- **WhatsApp**: +57 323 218 2386 (Colombia)
- **Instagram**: pendiente de crear
- **Facebook**: pendiente de crear
- **Email**: hello@example.com (placeholder, no usar)

---

## 🚀 Deploy

```bash
# (Aún no deployado) En el futuro:
git add .
git commit -m "..."
git push origin main

# Vercel detectará el push y deploya automáticamente.
```

---

## 📂 Documentos relacionados

- `INTEGRATION.md`, `METAOBJECTS_*.md`, `SETUP_COMPLETE.md`, `SETUP_GUIDE.md` — **legacy, de cuando el proyecto era Shopify**. Pendiente de limpieza.
- `MIGRATION/` — esquema de referencia de WooCommerce + checklists de migración.
- `app/test-gql.ts` — script de testing de queries GraphQL.

---

_Generado automáticamente. Última revisión: 2026-06-30._
