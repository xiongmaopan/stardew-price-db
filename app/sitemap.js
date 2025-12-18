// Static sitemap for SEO
import itemsData from '@/data/items.json';
import npcsData from '@/data/npcs.json';
import fishData from '@/data/fish.json';
import recipesData from '@/data/recipes.json';
import bundlesData from '@/data/bundles.json';

const seasons = ['spring', 'summer', 'fall', 'winter', 'greenhouse'];

// Guide pages
const guides = [
  'most-profitable-crops',
  'keg-vs-jar',
  'ancient-fruit',
  'greenhouse-layout',
  'animal-profit',
  'mining-profit',
  'best-fish-pond',
  'year-1-money',
  'community-center',
  'best-gifts',
  'foraging-profit',
  'skull-cavern',
];

export default function sitemap() {
  const baseUrl = 'https://stardewpricedb.com';
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guide/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fishing/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gifts/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bundles/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Calculator pages
  const calculatorPages = seasons.map((season) => ({
    url: `${baseUrl}/calculator/${season}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Item pages from data
  const itemPages = itemsData.items.map((item) => ({
    url: `${baseUrl}/item/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  // NPC gift guide pages
  const giftPages = npcsData.npcs.map((npc) => ({
    url: `${baseUrl}/gift/${npc.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Fish detail pages
  const fishPages = fishData.fish.map((fish) => ({
    url: `${baseUrl}/fishing/${fish.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Recipe pages
  const recipePages = [
    {
      url: `${baseUrl}/recipes/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...recipesData.recipes.map((recipe) => ({
      url: `${baseUrl}/recipe/${recipe.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  ];

  // Bundle pages
  const bundlePages = bundlesData.bundles.map((bundle) => ({
    url: `${baseUrl}/bundle/${bundle.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Guide pages
  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guide/${guide}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...calculatorPages, ...itemPages, ...giftPages, ...fishPages, ...recipePages, ...bundlePages, ...guidePages];
}
