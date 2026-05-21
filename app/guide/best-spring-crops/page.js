import SeasonCropGuide from '@/app/guide/_components/SeasonCropGuide';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Spring Crops in Stardew Valley 1.6.15',
  description: 'Best Spring crops in Stardew Valley ranked by profit, seed cost, harvest timing, and processing value for Year 1 and late-game farms.',
  alternates: {
    canonical: '/guide/best-spring-crops/',
  },
  openGraph: {
    title: 'Best Spring Crops in Stardew Valley',
    description: 'Spring crop rankings by profit, seed cost, harvest timing, Strawberry planning, and processing value.',
    url: `${SITE_URL}/guide/best-spring-crops/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best Spring crops in Stardew Valley' }],
  },
};

export default function BestSpringCropsPage() {
  return (
    <SeasonCropGuide
      season="Spring"
      title="Best Spring Crops in Stardew Valley"
      description="Spring is about early cash flow first, then scaling into Strawberry, Rhubarb, and Ancient Fruit once your farm has better access and machines."
      quickAnswer="Plant Potato or Cauliflower early if you need reliable Year 1 income. Buy Strawberry seeds at the Egg Festival and plant them immediately. Rhubarb becomes stronger once the Oasis is unlocked, and Ancient Fruit is the long-term winner when protected by Greenhouse or Ginger Island space."
      bestFor="Players planning Spring 1 planting, Egg Festival spending, and early Keg priorities."
      mustKnow="The table uses a 28-day Spring window. Raw profit/day is useful for cash-flow planning, while the Best Plan column shows what to do once processing machines and Artisan are available."
    />
  );
}
