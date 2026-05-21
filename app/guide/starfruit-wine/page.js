import WineGuide from '@/app/guide/_components/WineGuide';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Starfruit Wine Guide - Stardew Valley Profit and Cask Value',
  description: 'Starfruit Wine values in Stardew Valley, including Artisan price, Iridium Cask value, seed cost, Keg timing, and when Starfruit beats Ancient Fruit.',
  alternates: {
    canonical: '/guide/starfruit-wine/',
  },
  openGraph: {
    title: 'Starfruit Wine Guide',
    description: 'Starfruit Wine value, Artisan price, Iridium Cask value, seed cost, Keg timing, and Ancient Fruit comparison.',
    url: `${SITE_URL}/guide/starfruit-wine/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Starfruit Wine guide' }],
  },
};

export default function StarfruitWinePage() {
  return (
    <WineGuide
      slug="starfruit"
      title="Starfruit Wine Guide"
      description="Starfruit Wine is one of the highest-value artisan products in Stardew Valley. It is best when you have Oasis access, Kegs, Artisan, and Casks for premium bottles."
      quickAnswer="Starfruit Wine sells for 2,250g, 3,150g with Artisan, and 6,300g as Iridium quality with Artisan. Use Starfruit for maximum per-bottle value, especially when you want Cask targets."
      bestFor="Late-game players with Kegs, Casks, Oasis access, and enough cash to buy seeds."
    />
  );
}
