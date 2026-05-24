// Static sitemap for SEO
import itemsData from '@/data/items.json';
import npcsData from '@/data/npcs.json';
import fishData from '@/data/fish.json';
import recipesData from '@/data/recipes.json';
import bundlesData from '@/data/bundles.json';
import verificationData from '@/data/verification.json';

const seasons = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];
const professions = ['tiller', 'artisan', 'angler', 'rancher'];
const lastModified = new Date(verificationData.lastVerified);

// Guide pages
const guides = [
  'most-profitable-crops',
  'best-crops-by-season',
  'best-spring-crops',
  'best-summer-crops',
  'best-fall-crops',
  'best-greenhouse-crops',
  'ancient-fruit-vs-starfruit',
  'ancient-fruit-wine',
  'starfruit-wine',
  'truffle-oil',
  'caviar',
  'how-to-fish',
  'legendary-fish',
  'best-fish-by-season',
  'best-keg-items',
  'best-preserves-jar-items',
  'keg-vs-jar',
  'ancient-fruit',
  'greenhouse-layout',
  'animal-profit',
  'mining-profit',
  'best-weapons',
  'best-fish-pond',
  'year-1-beginner-walkthrough',
  'first-8-days-checklist',
  'robin-shop-best-items',
  'year-1-money',
  'community-center',
  'community-center-fish-bundles',
  'best-gifts',
  'foraging-profit',
  'skull-cavern',
];

export default function sitemap() {
  const baseUrl = 'https://stardewpricedb.com';
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guide/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/crop-profit-calculator/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/selling-prices/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/crops/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artisan-goods/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/minerals/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/animal-products/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/forage/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cooking/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/fish-ponds/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fishing/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gifts/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-data/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bundles/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Calculator pages
  const calculatorPages = seasons.map((season) => ({
    url: `${baseUrl}/calculator/${season}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Item pages from data
  const indexableItems = itemsData.items.filter((item) => item.category !== 'Fish');

  const itemPages = indexableItems.map((item) => ({
    url: `${baseUrl}/item/${item.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // NPC gift guide pages
  const giftPages = npcsData.npcs.map((npc) => ({
    url: `${baseUrl}/gift/${npc.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Fish detail pages
  const fishPages = fishData.fish.map((fish) => ({
    url: `${baseUrl}/fishing/${fish.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Recipe pages
  const recipePages = [
    {
      url: `${baseUrl}/recipes/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...recipesData.recipes.map((recipe) => ({
      url: `${baseUrl}/recipe/${recipe.slug}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  ];

  // Bundle pages
  const bundlePages = bundlesData.bundles.map((bundle) => ({
    url: `${baseUrl}/bundle/${bundle.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Guide pages
  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guide/${guide}/`,
    lastModified: ['year-1-beginner-walkthrough', 'first-8-days-checklist', 'robin-shop-best-items', 'best-weapons'].includes(guide) ? new Date('2026-05-24') : lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const professionPages = professions.map((profession) => ({
    url: `${baseUrl}/guide/profession/${profession}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...itemPages, ...giftPages, ...fishPages, ...recipePages, ...bundlePages, ...guidePages, ...professionPages];
}
