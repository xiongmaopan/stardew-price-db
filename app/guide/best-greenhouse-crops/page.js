import SeasonCropGuide from '@/app/guide/_components/SeasonCropGuide';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Greenhouse Crops in Stardew Valley 1.6.15',
  description: 'Best Greenhouse crops in Stardew Valley ranked for long-term profit, Ancient Fruit Wine, Starfruit Wine, Pineapple, Strawberry, Hops, and Coffee.',
  alternates: {
    canonical: '/guide/best-greenhouse-crops/',
  },
  openGraph: {
    title: 'Best Greenhouse Crops in Stardew Valley',
    description: 'Greenhouse crop rankings for Ancient Fruit, Starfruit, Pineapple, Strawberry, Hops, and Coffee.',
    url: `${SITE_URL}/guide/best-greenhouse-crops/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best Greenhouse crops in Stardew Valley' }],
  },
};

export default function BestGreenhouseCropsPage() {
  return (
    <SeasonCropGuide
      mode="greenhouse"
      title="Best Greenhouse Crops in Stardew Valley"
      description="The Greenhouse changes crop math because season limits disappear. The best crop depends on whether you want low-maintenance weekly harvests, maximum Wine value, or fast machine throughput."
      quickAnswer="Ancient Fruit is the best default Greenhouse crop because it regrows weekly and fits Keg production cleanly. Starfruit has higher Wine value per bottle but requires seed buying and replanting. Pineapple and Strawberry are useful alternatives before a full Ancient Fruit setup."
      bestFor="Players deciding what to plant after unlocking the Greenhouse or Ginger Island farm."
      mustKnow="The table uses a 112-day long-term window to reflect protected-space farming. Seed cost is counted once, so regrowth crops become stronger over time."
      slugs={[
        'ancient-fruit',
        'starfruit',
        'pineapple',
        'strawberry',
        'hops',
        'coffee-bean',
        'cranberries',
        'blueberry',
        'melon',
        'pumpkin',
      ]}
    />
  );
}
