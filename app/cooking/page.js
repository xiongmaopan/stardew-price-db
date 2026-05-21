import CategoryHubPage, { buildCategoryJsonLd } from '@/components/CategoryHubPage';
import itemsData from '@/data/items.json';
import recipesData from '@/data/recipes.json';
import verificationData from '@/data/verification.json';

const items = itemsData.items.filter((item) => item.category === 'Cooking');
const title = `Stardew Valley cooking item prices (${verificationData.gameVersion})`;
const description = `Browse Stardew Valley cooking ingredient and food sell prices, including Sugar, Flour, Rice, Lucky Lunch, Spicy Eel, and recipe links.`;

export const metadata = {
  title,
  description,
  alternates: { canonical: '/cooking/' },
  openGraph: {
    title,
    description,
    url: 'https://stardewpricedb.com/cooking/',
    type: 'website',
  },
};

const jsonLd = buildCategoryJsonLd({
  slug: 'cooking',
  title,
  description,
  items,
});

export default function CookingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryHubPage
        title="Stardew Valley cooking item prices"
        eyebrow={`${recipesData.recipes.length} recipes tracked separately - prices verified for ${verificationData.gameVersion}`}
        intro="Check cooking ingredient and cooked item sell prices, then jump to the full recipe database for ingredients, buffs, energy, and Queen of Sauce unlocks."
        items={items}
        categorySlug="cooking"
        primaryLinks={[
          { href: '/recipes/', title: 'All cooking recipes', text: 'Ingredients, buffs, energy, sources, and recipe unlocks.' },
          { href: '/recipe/lucky-lunch/', title: 'Lucky Lunch recipe', text: 'High-value luck buff food for Skull Cavern planning.' },
          { href: '/recipe/spicy-eel/', title: 'Spicy Eel recipe', text: 'Popular luck and speed food for mining and late-game runs.' },
        ]}
      />
    </>
  );
}
