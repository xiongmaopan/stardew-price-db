import recipesData from '@/data/recipes.json';
import recipeStrategies from '@/data/recipe-strategies.json';
import RecipeDetailContent from './RecipeDetailContent';

const SITE_URL = 'https://stardewpricedb.com';
const OG_IMAGE = '/og-image.png';

function shortDescription(text, max = 155) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

// Generate static params for all recipes
export async function generateStaticParams() {
  return recipesData.recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug: slugId } = await params;
  const recipe = recipesData.recipes.find(r => r.slug === slugId);
  
  if (!recipe) {
    return { title: 'Recipe Not Found' };
  }

  const ingredientList = recipe.ingredients.map(i => i.item).join(', ');
  const buffText = recipe.buffs ? Object.entries(recipe.buffs)
    .filter(([k]) => k !== 'duration')
    .map(([k, v]) => `+${v} ${k}`)
    .join(', ') : 'No buffs';

  const description = shortDescription(
    `${recipe.name} recipe in Stardew Valley: ingredients ${ingredientList}. Sells for ${recipe.sellPrice}g, restores +${recipe.energy} energy. ${buffText}.`
  );

  return {
    title: `${recipe.name} Recipe - Ingredients & Stats`,
    description,
    keywords: [
      `${recipe.name} Stardew Valley`,
      `${recipe.name} recipe`,
      `how to make ${recipe.name}`,
      `${recipe.name} ingredients`,
      'Stardew Valley cooking',
      'Stardew Valley recipes',
      'Stardew Valley 1.6.15',
    ],
    alternates: {
      canonical: `/recipe/${recipe.slug}/`,
    },
    openGraph: {
      title: `${recipe.name} - Stardew Valley Cooking Recipe`,
      description,
      url: `${SITE_URL}/recipe/${recipe.slug}/`,
      type: 'article',
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${recipe.name} recipe guide` }],
    },
  };
}

// Generate JSON-LD structured data
function generateJsonLd(recipe) {
  const schemas = [];
  
  // Recipe Schema (Google Rich Results)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    recipeIngredient: recipe.ingredients.map(i => `${i.quantity}x ${i.item}`),
    recipeCategory: 'Game Cooking',
    recipeCuisine: 'Stardew Valley',
    author: {
      '@type': 'Organization',
      name: 'StardewPriceDB'
    },
    datePublished: '2026-05-19',
    prepTime: 'PT1M',
    cookTime: 'PT1M',
    totalTime: 'PT2M',
    recipeYield: '1 serving',
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.energy} energy`
    }
  });

  return schemas;
}

export default async function RecipePage({ params }) {
  const { slug: slugId } = await params;
  const recipe = recipesData.recipes.find(r => r.slug === slugId);
  
  if (!recipe) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Recipe Not Found</h1>
        <p className="text-slate-600 mt-2">The requested recipe could not be found.</p>
      </main>
    );
  }

  // Get related recipes (same buffs or similar ingredients)
  const relatedRecipes = recipesData.recipes
    .filter(r => r.id !== recipe.id)
    .filter(r => {
      // Same buff type or same category
      if (recipe.buffs && r.buffs) {
        const recipeBuffKeys = Object.keys(recipe.buffs).filter(k => k !== 'duration');
        const rBuffKeys = Object.keys(r.buffs).filter(k => k !== 'duration');
        return recipeBuffKeys.some(k => rBuffKeys.includes(k));
      }
      return false;
    })
    .slice(0, 4);

  // Get strategy data for this recipe
  const strategy = recipeStrategies.strategies[recipe.slug] || null;

  const jsonLd = generateJsonLd(recipe);

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <RecipeDetailContent recipe={recipe} relatedRecipes={relatedRecipes} strategy={strategy} />
    </>
  );
}
