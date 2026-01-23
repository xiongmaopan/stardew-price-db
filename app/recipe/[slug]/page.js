import recipesData from '@/data/recipes.json';
import recipeStrategies from '@/data/recipe-strategies.json';
import RecipeDetailContent from './RecipeDetailContent';

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

  return {
    title: `${recipe.name} Recipe - Ingredients & Stats | Stardew Valley 1.6`,
    description: `How to cook ${recipe.name} in Stardew Valley: Ingredients (${ingredientList}). Sells for ${recipe.sellPrice}g. Energy: +${recipe.energy}. Source: ${recipe.source}. ${buffText}.`,
    keywords: [
      `${recipe.name} Stardew Valley`,
      `${recipe.name} recipe`,
      `how to make ${recipe.name}`,
      `${recipe.name} ingredients`,
      'Stardew Valley cooking',
      'Stardew Valley recipes',
      'Stardew Valley 1.6',
    ],
    alternates: {
      canonical: `/recipe/${recipe.slug}`,
    },
    openGraph: {
      title: `${recipe.name} - Stardew Valley Cooking Recipe`,
      description: `Cook ${recipe.name}: ${ingredientList}. Energy: +${recipe.energy}. Sell: ${recipe.sellPrice}g.`,
      url: `https://stardewpricedb.com/recipe/${recipe.slug}`,
      type: 'article',
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
    datePublished: '2025-12-09',
    prepTime: 'PT1M',
    cookTime: 'PT1M',
    totalTime: 'PT2M',
    recipeYield: '1 serving',
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.energy} energy`
    }
  });

  // FAQ Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I get the ${recipe.name} recipe in Stardew Valley?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can learn the ${recipe.name} recipe from: ${recipe.source}.`
        }
      },
      {
        '@type': 'Question',
        name: `What ingredients do I need to cook ${recipe.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `To cook ${recipe.name}, you need: ${recipe.ingredients.map(i => `${i.quantity}x ${i.item}`).join(', ')}.`
        }
      },
      {
        '@type': 'Question',
        name: `How much does ${recipe.name} sell for?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${recipe.name} sells for ${recipe.sellPrice}g. It restores ${recipe.energy} energy and ${recipe.health} health when consumed.${recipe.buffs ? ` It also provides buffs: ${Object.entries(recipe.buffs).filter(([k]) => k !== 'duration').map(([k, v]) => `+${v} ${k}`).join(', ')}.` : ''}`
        }
      }
    ]
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
