import CategoryHubPage, { buildCategoryJsonLd } from '@/components/CategoryHubPage';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const items = itemsData.items.filter((item) => item.category === 'Animal Products');
const title = `Stardew Valley animal products prices (${verificationData.gameVersion})`;
const description = `Browse Stardew Valley animal product prices for milk, eggs, wool, truffles, cheese inputs, mayonnaise inputs, and Rancher values.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/animal-products/' },
  openGraph: {
    title,
    description,
    url: 'https://stardewpricedb.com/animal-products/',
    type: 'website',
  },
};

const jsonLd = buildCategoryJsonLd({
  slug: 'animal-products',
  title,
  description,
  items,
});

export default function AnimalProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryHubPage
        title="Stardew Valley animal products prices"
        eyebrow={`Verified for Stardew Valley ${verificationData.gameVersion}`}
        intro="Compare animal product sell prices, ranching sources, and machine outputs such as Cheese, Mayonnaise, Cloth, and Truffle Oil. Rancher and Artisan can change the best choice."
        items={items}
        categorySlug="animal-products"
        primaryLinks={[
          { href: '/guide/animal-profit/', title: 'Animal profit guide', text: 'Compare barns, coops, pigs, cows, goats, ducks, rabbits, and machine value.' },
          { href: '/guide/truffle-oil/', title: 'Truffle Oil guide', text: 'Check raw Truffle vs Truffle Oil and profession math.' },
          { href: '/guide/profession/rancher/', title: 'Rancher profession', text: 'See what the +20% animal product bonus changes.' },
        ]}
      />
    </>
  );
}
