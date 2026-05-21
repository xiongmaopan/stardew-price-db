import SeasonCropGuide from '@/app/guide/_components/SeasonCropGuide';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Summer Crops in Stardew Valley 1.6.15',
  description: 'Best Summer crops in Stardew Valley ranked by profit, Starfruit Wine value, Blueberry safety, Hops Pale Ale throughput, and processing choices.',
  alternates: {
    canonical: '/guide/best-summer-crops/',
  },
  openGraph: {
    title: 'Best Summer Crops in Stardew Valley',
    description: 'Summer crop rankings for Starfruit Wine, Blueberry safety, Hops Pale Ale, Melon, and Coffee.',
    url: `${SITE_URL}/guide/best-summer-crops/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best Summer crops in Stardew Valley' }],
  },
};

export default function BestSummerCropsPage() {
  return (
    <SeasonCropGuide
      season="Summer"
      title="Best Summer Crops in Stardew Valley"
      description="Summer has the widest money options: Blueberry for simple repeat harvests, Starfruit for premium Wine, and Hops for players ready to run a dense Keg network."
      quickAnswer="Use Blueberry when you want safe low-maintenance profit. Use Starfruit when the Oasis is unlocked and you have Kegs. Use Hops only if you are prepared for daily harvesting and enough Kegs to turn it into Pale Ale."
      bestFor="Players choosing between Blueberries, Starfruit, Melon, Hops, Coffee, and Ginger Island crops."
      mustKnow="The table uses a 28-day Summer window. Hops can look weaker as raw crops, but Pale Ale is one of the best Keg-throughput plays in the game."
    />
  );
}
