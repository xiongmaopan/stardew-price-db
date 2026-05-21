import CategoryHubPage, { buildCategoryJsonLd } from '@/components/CategoryHubPage';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const items = itemsData.items.filter((item) => item.category === 'Minerals');
const title = `Stardew Valley minerals price list (${verificationData.gameVersion})`;
const description = `Browse Stardew Valley mineral and gem selling prices, including Diamond, Prismatic Shard, Ruby, Emerald, Quartz, and mine/geode sources. Verified for ${verificationData.gameVersion}.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/minerals/' },
  openGraph: {
    title,
    description,
    url: 'https://stardewpricedb.com/minerals/',
    type: 'website',
  },
};

const jsonLd = buildCategoryJsonLd({
  slug: 'minerals',
  title,
  description,
  items,
});

export default function MineralsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryHubPage
        title="Stardew Valley minerals price list"
        eyebrow={`Verified for Stardew Valley ${verificationData.gameVersion}`}
        intro="Check mineral and gem sell prices, source notes, and quality-adjusted values where they apply. Use this page for mining, geode, Crystalarium, and gift-value decisions."
        items={items}
        categorySlug="minerals"
        primaryLinks={[
          { href: '/guide/mining-profit/', title: 'Mining profit guide', text: 'Compare gems, Crystalariums, Skull Cavern, and mining income.' },
          { href: '/item/prismatic-shard/', title: 'Prismatic Shard price', text: 'High-value rare mineral with special uses beyond selling.' },
          { href: '/selling-prices/', title: 'All selling prices', text: 'Return to the full Stardew Valley selling prices database.' },
        ]}
      />
    </>
  );
}
