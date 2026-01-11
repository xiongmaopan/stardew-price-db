# StardewPriceDB - AI Coding Instructions

## Project Overview
A **Stardew Valley price database** static website using **Programmatic SEO (pSEO)** strategy. Built with Next.js 14 App Router + static export (`output: 'export'`), deployed to Cloudflare Pages.

## Core Architecture

### Data-Driven Page Generation
All pages are auto-generated from `data/*.json` following this pattern:
```
data/items.json    → app/item/[slug]/page.js
data/npcs.json     → app/gift/[npc]/page.js
data/fish.json     → app/fishing/[slug]/page.js
data/recipes.json  → app/recipe/[slug]/page.js
data/bundles.json  → app/bundle/[slug]/page.js
```

### Dynamic Route Template Structure
Each `[slug]/page.js` MUST export three core functions:
1. `generateStaticParams()` - Returns all slug params for static generation
2. `generateMetadata({ params })` - SEO metadata (title, description, keywords, OpenGraph)
3. `default function Page()` - Renders content, typically imports `*Client.js` or `*Content.js`

Reference: [app/item/\[slug\]/page.js](app/item/[slug]/page.js)

### Client/Server Component Separation
- `page.js` - Server component for SSG and SEO
- `*Client.js` / `*Content.js` - Interactive components with `'use client'`
- `ProfessionContext.js` - Global profession bonus state (Tiller +10%, Artisan +40%, etc.)

## Key Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Static build to out/ directory
npm run verify   # Validate item prices match game formulas
```

## Data Format Specification

### Item Data (`data/items.json`)
```json
{
  "id": 1, "name": "Parsnip", "slug": "parsnip",
  "category": "Crops", "subcategory": "Vegetable",
  "season": ["Spring"], "basePrice": 35,
  "seedPrice": 20, "growthTime": 4,
  "processing": { 
    "jarPrice": 120, "jarProduct": "Pickles",
    "kegPrice": 78, "kegProduct": "Juice" 
  }
}
```

### Price Calculation Formulas (MUST follow)
- **Wine**: `basePrice × 3`
- **Juice**: `floor(basePrice × 2.25)`
- **Jelly/Pickles**: `basePrice × 2 + 50`
- **Quality multipliers**: Silver ×1.25, Gold ×1.5, Iridium ×2

## Project Conventions

### Image Handling
Use `<GameImage>` component with automatic webp → png fallback:
```jsx
import GameImage from '@/components/GameImage';
<GameImage slug="parsnip" alt="Parsnip" width={48} height={48} />
```
Image path: `public/images/items/{slug}.webp` or `.png`

### JSON-LD Structured Data
Each detail page must generate FAQ Schema for search rich results. See `generateJsonLd()` function.

### Sitemap
After adding routes, update [app/sitemap.js](app/sitemap.js) to include new pages.

## Adding New Content Types

1. Create JSON data file in `data/`
2. Create `[slug]/page.js` dynamic route in `app/`
3. Implement three required exports + JSON-LD
4. Update `sitemap.js` to include new route
5. Run `npm run build` to verify generation

## Utility Scripts (`scripts/`)
- `verify-game-data.js` - Validate data against game
- `download-*` - Download sprites from Wiki
- `check-images.js` - Check for missing images
- `scheduled-sitemap.js` - Scheduled publishing feature

## Important Notes
- All pages must support static export - NO `getServerSideProps`
- Maintain Stardew Valley 1.6 data accuracy
- UI and code in English; Chinese comments acceptable for complex logic
