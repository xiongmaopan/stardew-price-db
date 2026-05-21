import CategoryHubPage, { buildCategoryJsonLd } from '@/components/CategoryHubPage';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const items = itemsData.items.filter((item) => item.category === 'Resources');
const title = `Stardew Valley resource prices (${verificationData.gameVersion})`;
const description = `Browse Stardew Valley resource selling prices for wood, stone, ore, coal, bars, fiber, sap, geodes, and furnace processing values. Verified for ${verificationData.gameVersion}.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/resources/' },
  openGraph: {
    title,
    description,
    url: 'https://stardewpricedb.com/resources/',
    type: 'website',
  },
};

const jsonLd = buildCategoryJsonLd({
  slug: 'resources',
  title,
  description,
  items,
});

export default function ResourcesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryHubPage
        title="Stardew Valley resource prices"
        eyebrow={`Verified for Stardew Valley ${verificationData.gameVersion}`}
        intro="Check resource sell prices, furnace outputs, ore-to-bar value, and basic material sources. Most resources are better used for crafting, but this page shows their shipping value clearly."
        items={items}
        categorySlug="resources"
        note="Some resources are not practical selling targets. Omni Geode has no normal sell price, so it is shown as a utility item instead of a 0g profit item."
        primaryLinks={[
          { href: '/guide/mining-profit/', title: 'Mining profit guide', text: 'Compare ore, bars, gems, and Skull Cavern income.' },
          { href: '/item/iridium-bar/', title: 'Iridium Bar value', text: 'High-value resource with major crafting and upgrade uses.' },
          { href: '/about-data/', title: 'Formula audit', text: 'See how prices and processing formulas are checked.' },
        ]}
      />
    </>
  );
}
