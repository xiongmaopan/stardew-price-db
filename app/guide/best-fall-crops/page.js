import SeasonCropGuide from '@/app/guide/_components/SeasonCropGuide';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

export const metadata = {
  title: 'Best Fall Crops in Stardew Valley 1.6.15',
  description: 'Best Fall crops in Stardew Valley ranked by profit, Pumpkin processing, Cranberry repeat harvests, Fairy Rose Honey support, and bundle value.',
  alternates: {
    canonical: '/guide/best-fall-crops/',
  },
  openGraph: {
    title: 'Best Fall Crops in Stardew Valley',
    description: 'Fall crop rankings for Pumpkin, Cranberries, Fairy Rose Honey support, processing, and bundle value.',
    url: `${SITE_URL}/guide/best-fall-crops/`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Best Fall crops in Stardew Valley' }],
  },
};

export default function BestFallCropsPage() {
  return (
    <SeasonCropGuide
      season="Fall"
      title="Best Fall Crops in Stardew Valley"
      description="Fall rewards players who balance cash crops, Community Center needs, Giant Crop chances, and machine processing. Pumpkin and Cranberries are the practical anchors."
      quickAnswer="Plant Pumpkins for high-value single harvests, Giant Crop chances, and strong Juice or Pickles. Use Cranberries when you want repeat harvests. Add Fairy Rose if you are running Bee Houses for Fairy Rose Honey."
      bestFor="Players planning Fall Year 1, bundle completion, Pumpkin processing, and repeat-harvest layouts."
      mustKnow="The table uses a 28-day Fall window. Keep bundle and gift needs before processing everything, especially Pumpkin, Yam, Corn, and Eggplant."
    />
  );
}
