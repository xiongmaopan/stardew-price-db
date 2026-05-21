import WineGuide from '@/app/guide/_components/WineGuide';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Ancient Fruit Wine Guide - Stardew Valley Greenhouse Profit',
  description: 'Ancient Fruit Wine values in Stardew Valley, including Artisan price, Iridium Cask value, Greenhouse strategy, Keg timing, and long-term profit.',
  alternates: {
    canonical: '/guide/ancient-fruit-wine/',
  },
  openGraph: {
    title: 'Ancient Fruit Wine Guide',
    description: 'Ancient Fruit Wine value, Artisan price, Iridium Cask value, Greenhouse strategy, and Keg timing.',
    url: `${SITE_URL}/guide/ancient-fruit-wine/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Ancient Fruit Wine guide' }],
  },
};

export default function AncientFruitWinePage() {
  return (
    <WineGuide
      slug="ancient-fruit"
      title="Ancient Fruit Wine Guide"
      description="Ancient Fruit Wine is the default endgame income engine because Ancient Fruit regrows weekly and matches Keg timing cleanly."
      quickAnswer="Ancient Fruit Wine sells for 1,650g, 2,310g with Artisan, and 4,620g as Iridium quality with Artisan. It is usually the best low-maintenance Greenhouse and Ginger Island Wine crop."
      bestFor="Players building a permanent Greenhouse, Ginger Island farm, or weekly Keg network."
    />
  );
}
