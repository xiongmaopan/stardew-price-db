# StardewPriceDB

🌾 **Stardew Valley Price Database** - A fast, SEO-optimized static website for checking item prices, processing profits, and profession bonuses in Stardew Valley.

## Features

- ✅ **Real-time Profession Bonuses**: Toggle Tiller (+10%), Artisan (+40%), Angler (+25%)
- ✅ **Processing Comparison**: Compare Keg vs Preserves Jar profits
- ✅ **Quality Prices**: Normal, Silver, Gold, and Iridium quality calculations
- ✅ **Static Site Generation**: Super fast, SEO-friendly pages
- ✅ **Updated for v1.6**: All prices reflect the latest game version

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (Static Export)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stardew-price-db.git
cd stardew-price-db

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Build static export
npm run build
```

The static files will be generated in the `out/` directory.

## Deployment to Cloudflare Pages

1. Push your code to GitHub
2. Go to Cloudflare Dashboard → Pages → Connect to Git
3. Configure build settings:
   - **Framework Preset**: Next.js (Static HTML Export)
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`
4. Deploy!

## Project Structure

```
stardew-price-db/
├── app/
│   ├── item/
│   │   └── [slug]/         # Dynamic item pages (pSEO)
│   │       ├── page.js
│   │       ├── ItemDetailClient.js
│   │       └── ItemDetailContent.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js             # Homepage
│   ├── sitemap.js          # Auto-generated sitemap
│   └── robots.js
├── components/
│   ├── Footer.js
│   ├── HomeContent.js
│   ├── ItemCard.js
│   ├── Navbar.js
│   ├── ProfessionContext.js
│   └── ProfessionToggle.js
├── data/
│   └── items.json          # All item data
├── public/
│   └── images/             # Item icons
└── next.config.js          # Static export config
```

## Adding New Items

To add new items, edit `data/items.json`:

```json
{
  "id": 51,
  "name": "New Item",
  "slug": "new-item",
  "category": "Crops",
  "subcategory": "Vegetable",
  "season": ["Spring"],
  "basePrice": 100,
  "growthTime": 7,
  "description": "Item description...",
  "sources": ["Pierre's Store"],
  "processing": {
    "jarPrice": 250,
    "kegPrice": 225,
    "kegTime": "4 days"
  },
  "usedIn": ["Bundle Name"],
  "giftLove": ["Villager Name"]
}
```

Then rebuild the site to generate the new page.

## Game Updates

When Stardew Valley updates:
1. Update `data/items.json` with new items/prices
2. Update the `version` field in the JSON
3. Rebuild and redeploy

## License

MIT License - This is a fan-made project. Stardew Valley is a trademark of ConcernedApe.

## Contributing

Pull requests are welcome! Please open an issue first to discuss changes.
