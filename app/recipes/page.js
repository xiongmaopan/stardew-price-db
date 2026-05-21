import recipesData from '@/data/recipes.json';
import RecipesContent from './RecipesContent';

// Calculate stats for meta
const buffRecipes = recipesData.recipes.filter(r => r.buffs && Object.keys(r.buffs).filter(k => k !== 'duration').length > 0);
const highEnergyRecipes = recipesData.recipes.filter(r => r.energy >= 200).length;
const queenOfSauceRecipes = recipesData.recipes.filter(r => r.source.includes('Queen of Sauce')).length;

export const metadata = {
  title: 'All 80 Cooking Recipes - Stardew Valley 1.6.15 | StardewPriceDB',
  description: `${recipesData.recipes.length} cooking recipes with ingredients, energy, ${buffRecipes.length} buff foods, sell prices, sources, and Queen of Sauce schedule. Data verified for 1.6.`,
  keywords: [
    'Stardew Valley recipes',
    'Stardew Valley cooking guide',
    'all recipes Stardew Valley 1.6.15',
    'Queen of Sauce schedule',
    'Stardew Valley food buffs',
    'best cooking recipes Stardew',
    'Stardew Valley 1.6.15 recipes list',
    'how to cook Stardew Valley',
    'Stardew Valley kitchen recipes',
    'Stardew Valley buff food',
    'farming buff food Stardew',
    'fishing buff food Stardew',
    'luck buff food Stardew',
    'mining buff food Stardew',
  ],
  alternates: {
    canonical: 'https://stardewpricedb.com/recipes/',
  },  openGraph: {
    title: 'All 80 Cooking Recipes - Stardew Valley 1.6.15',
    description: `${recipesData.recipes.length} recipes, ${buffRecipes.length} buff foods, ingredients & Queen of Sauce schedule.`,
    url: 'https://stardewpricedb.com/recipes/',
    type: 'website',
    siteName: 'StardewPriceDB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 80 Cooking Recipes - Stardew Valley 1.6.15',
    description: `${recipesData.recipes.length} recipes with ingredients, buffs, and sources.`,
  },
};

// JSON-LD structured data
function generateJsonLd() {
  const schemas = [];

  // ItemList Schema for recipe collection
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stardew Valley Cooking Recipes - Complete List',
    description: `All ${recipesData.recipes.length} cooking recipes in Stardew Valley 1.6.15 with ingredients, buffs, and sources`,
    numberOfItems: recipesData.recipes.length,
    itemListElement: recipesData.recipes.slice(0, 30).map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.name,
        description: recipe.description,
        url: `https://stardewpricedb.com/recipe/${recipe.slug}`,
        recipeIngredient: recipe.ingredients.map(i => `${i.quantity}x ${i.item}`),
      }
    }))
  });

  // CollectionPage Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Stardew Valley Cooking Recipes Database',
    description: 'Complete database of all cooking recipes in Stardew Valley',
    url: 'https://stardewpricedb.com/recipes',
    isPartOf: {
      '@type': 'WebSite',
      name: 'StardewPriceDB',
      url: 'https://stardewpricedb.com'
    },
    about: {
      '@type': 'VideoGame',
      name: 'Stardew Valley',
      gamePlatform: ['PC', 'Nintendo Switch', 'PlayStation', 'Xbox', 'Mobile']
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: recipesData.recipes.length,
      name: 'Cooking Recipes'
    }
  });

  // HowTo Schema for cooking guide
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Cook in Stardew Valley',
    description: 'Unlock kitchen (10,000g farmhouse upgrade), learn recipes from TV/NPCs/skill levels, cook dishes for energy/buffs',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upgrade Your Farmhouse',
        text: 'Visit Robin\'s Carpenter Shop and upgrade your farmhouse for 10,000g and 450 Wood to unlock the kitchen.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Learn Recipes',
        text: 'Learn recipes from: The Queen of Sauce TV show (Sundays), befriending villagers, reaching skill levels, and buying from shops.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Gather Ingredients',
        text: 'Collect required ingredients through farming, foraging, fishing, or purchasing from Pierre\'s and other shops.'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Cook the Recipe',
        text: 'Interact with your kitchen stove, select a recipe you know, and cook it if you have all ingredients in your inventory or fridge.'
      }
    ]
  });

  return schemas;
}

export default function RecipesPage() {
  const jsonLdSchemas = generateJsonLd();
  
  return (
    <>
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <RecipesContent recipes={recipesData.recipes} />
    </>
  );
}
