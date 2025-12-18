import npcsData from '@/data/npcs.json';
import GiftsContent from './GiftsContent';

export const metadata = {
  title: 'Stardew Valley NPC Gifts - Loved Items for All 34 Characters (1.6)',
  description: 'Best gifts for every NPC in Stardew Valley 1.6. All 34 characters with loved items, birthdays, and heart event requirements. Marriage candidates included.',
  keywords: [
    'Stardew Valley gifts',
    'Stardew Valley NPC loved items',
    'best gifts Stardew Valley',
    'Stardew Valley friendship',
    'marriage candidates gifts',
    'Stardew Valley 1.6 gifts',
    'NPC birthday gifts',
    'loved gifts all characters'
  ],
  alternates: {
    canonical: '/gifts',
  },
  openGraph: {
    title: 'Stardew Valley NPC Gifts - All 34 Characters (v1.6)',
    description: 'Loved items, birthdays, and heart requirements for all NPCs.',
    url: 'https://stardewpricedb.com/gifts',
    type: 'website',
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Stardew Valley Gift Guide - All NPCs',
  description: 'Complete gift guide for all characters in Stardew Valley',
  url: 'https://stardewpricedb.com/gifts',
  numberOfItems: npcsData.npcs.length,
  itemListElement: npcsData.npcs.map((npc, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: npc.name,
    url: `https://stardewpricedb.com/gift/${npc.slug}`
  }))
};

export default function GiftsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GiftsContent npcs={npcsData.npcs} />
    </>
  );
}
