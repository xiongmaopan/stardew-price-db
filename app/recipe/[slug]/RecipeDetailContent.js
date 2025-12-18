'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameImage from '@/components/GameImage';
import { 
  ChefHat, ChevronRight, ChevronUp, Zap, Heart, Coins,
  Clock, BookOpen, Star, Package, Sparkles, Info,
  TrendingUp, Users, ArrowRight
} from 'lucide-react';

// Buff icons and colors
const BUFF_STYLES = {
  farming: { color: 'text-green-600', bg: 'bg-green-100', label: 'Farming' },
  fishing: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Fishing' },
  mining: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Mining' },
  foraging: { color: 'text-amber-600', bg: 'bg-amber-100', label: 'Foraging' },
  luck: { color: 'text-purple-600', bg: 'bg-purple-100', label: 'Luck' },
  speed: { color: 'text-cyan-600', bg: 'bg-cyan-100', label: 'Speed' },
  defense: { color: 'text-slate-600', bg: 'bg-slate-100', label: 'Defense' },
  attack: { color: 'text-red-600', bg: 'bg-red-100', label: 'Attack' },
  maxEnergy: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Max Energy' },
  magneticRadius: { color: 'text-indigo-600', bg: 'bg-indigo-100', label: 'Magnetic Radius' },
};

// Scroll to top component
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}

// Recipe image component
function RecipeImage({ recipe, size = 64 }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return <ChefHat className="text-orange-500" size={size} />;
  }

  return (
    <GameImage
      slug={recipe.slug}
      alt={recipe.name}
      width={size}
      height={size}
      onAllFailed={() => setImgError(true)}
    />
  );
}

// Related recipe card
function RelatedRecipeCard({ recipe }) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Link href={`/recipe/${recipe.slug}`}>
      <div className="group bg-white rounded-lg border border-slate-200 p-3 hover:border-orange-300 hover:shadow-md transition flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
          {imgError ? (
            <ChefHat className="text-orange-500" size={20} />
          ) : (
            <GameImage
              slug={recipe.slug}
              alt={recipe.name}
              width={24}
              height={24}
              onAllFailed={() => setImgError(true)}
            />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="font-semibold text-slate-800 group-hover:text-orange-600 truncate">
            {recipe.name}
          </h4>
          <p className="text-xs text-slate-500">+{recipe.energy} Energy</p>
        </div>
        <ChevronRight size={16} className="text-slate-400 group-hover:text-orange-500" />
      </div>
    </Link>
  );
}

export default function RecipeDetailContent({ recipe, relatedRecipes, strategy }) {
  const hasBuff = recipe.buffs && Object.keys(recipe.buffs).filter(k => k !== 'duration').length > 0;
  const buffDuration = recipe.buffs?.duration ? Math.floor(recipe.buffs.duration / 60) : 0;

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      <ScrollToTop />

      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link href="/recipes" className="hover:text-orange-600 transition">Recipes</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-slate-800">{recipe.name}</span>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 md:p-8 mb-8 border-2 border-orange-200">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Recipe Image */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center flex-shrink-0 bg-white border-2 border-orange-200 shadow-sm">
            <RecipeImage recipe={recipe} size={80} />
          </div>

          {/* Recipe Info */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
              {recipe.name}
            </h1>
            <p className="text-slate-600 text-lg mb-4 max-w-2xl">{recipe.description}</p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
                <Zap size={14} /> +{recipe.energy} Energy
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200">
                <Heart size={14} /> +{recipe.health} Health
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700 border border-amber-200">
                <Coins size={14} /> {recipe.sellPrice}g
              </span>
            </div>

            {/* Source */}
            <div className="inline-block bg-white rounded-lg px-4 py-2 border border-orange-200">
              <span className="text-sm text-slate-500">Recipe Source</span>
              <div className="text-base font-semibold text-orange-700">{recipe.source}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Ingredients Section */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Package className="text-orange-500" size={20} />
                Ingredients Required
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                      <span className="text-lg font-bold text-orange-600">{ingredient.quantity}x</span>
                    </div>
                    <span className="font-medium text-slate-700">{ingredient.item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 bg-orange-50 p-3 rounded-lg border border-orange-200">
                <Info size={14} className="inline mr-1" />
                Cook this recipe at any Kitchen (farmhouse upgrade) or Cookout Kit.
              </p>
            </div>
          </section>

          {/* Buffs Section */}
          {hasBuff && (
            <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 overflow-hidden">
              <div className="bg-purple-100/50 px-6 py-4 border-b border-purple-200">
                <h2 className="font-bold text-lg text-purple-800 flex items-center gap-2">
                  <Sparkles className="text-purple-500" size={20} />
                  Buff Effects
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {Object.entries(recipe.buffs)
                    .filter(([key]) => key !== 'duration')
                    .map(([key, value]) => {
                      const style = BUFF_STYLES[key] || { color: 'text-slate-600', bg: 'bg-slate-100', label: key };
                      return (
                        <div 
                          key={key}
                          className={`${style.bg} rounded-lg p-4 border border-slate-200 text-center`}
                        >
                          <div className={`text-2xl font-black ${style.color}`}>+{value}</div>
                          <div className="text-sm font-medium text-slate-600">{style.label}</div>
                        </div>
                      );
                    })}
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-700 bg-white/60 px-4 py-2 rounded-lg">
                  <Clock size={16} />
                  <span>Duration: <strong>{buffDuration} minutes</strong> ({recipe.buffs.duration} in-game time)</span>
                </div>
                {recipe.buffNote && (
                  <p className="mt-3 text-sm text-purple-700 font-medium">
                    <Star size={14} className="inline mr-1" />
                    Special: {recipe.buffNote}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Stats Comparison */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-green-500" size={20} />
                Value Analysis
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-200">
                  <Coins className="mx-auto text-amber-600 mb-2" size={24} />
                  <div className="text-xl font-bold text-amber-700">{recipe.sellPrice}g</div>
                  <div className="text-xs text-slate-500">Sell Price</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <Zap className="mx-auto text-green-600 mb-2" size={24} />
                  <div className="text-xl font-bold text-green-700">{recipe.energy}</div>
                  <div className="text-xs text-slate-500">Energy</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                  <Heart className="mx-auto text-red-600 mb-2" size={24} />
                  <div className="text-xl font-bold text-red-700">{recipe.health}</div>
                  <div className="text-xs text-slate-500">Health</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <Star className="mx-auto text-blue-600 mb-2" size={24} />
                  <div className="text-xl font-bold text-blue-700">
                    {(recipe.energy / recipe.sellPrice * 100).toFixed(1)}
                  </div>
                  <div className="text-xs text-slate-500">Energy/Gold</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Energy per gold ratio helps determine if it&apos;s better to eat or sell this dish.
                Higher ratio = better for eating. Lower ratio = better for selling.
              </p>
            </div>
          </section>

          {/* Expert Strategy Section - EEAT Content */}
          {strategy && (
            <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 overflow-hidden">
              <div className="bg-emerald-100/50 px-6 py-4 border-b border-emerald-200">
                <h2 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
                  <Sparkles className="text-emerald-600" size={20} />
                  Expert Strategy Guide
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {/* Pro Tip */}
                <div className="bg-white/60 rounded-lg p-4 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                    <Star className="text-yellow-500" size={16} />
                    Pro Tip
                  </h3>
                  <p className="text-emerald-900 leading-relaxed">{strategy.proTip}</p>
                </div>
                
                {/* Strategy Note */}
                <div className="bg-white/60 rounded-lg p-4 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                    <BookOpen className="text-emerald-600" size={16} />
                    Strategy Note
                  </h3>
                  <p className="text-emerald-900 leading-relaxed">{strategy.strategyNote}</p>
                </div>
                
                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
                    <span className="text-xs text-emerald-600 font-medium">Best Use</span>
                    <p className="text-sm text-emerald-900 font-medium">{strategy.bestUse}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
                    <span className="text-xs text-emerald-600 font-medium">Profit Tip</span>
                    <p className="text-sm text-emerald-900 font-medium">{strategy.profitTip}</p>
                  </div>
                </div>
                
                {/* Pairs Well With */}
                {strategy.pairsWellWith && (
                  <div className="bg-emerald-100/50 rounded-lg p-3 border border-emerald-300">
                    <span className="text-xs text-emerald-700 font-medium block mb-1">Pairs Well With</span>
                    <p className="text-sm text-emerald-800">{strategy.pairsWellWith}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Pro Tip */}
          <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
                <ChefHat className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">Chef&apos;s Tip</h3>
                <p className="text-amber-800 leading-relaxed">
                  {recipe.buffs ? 
                    `${recipe.name} is great for ${Object.keys(recipe.buffs).filter(k => k !== 'duration').map(k => BUFF_STYLES[k]?.label || k).join(' and ')} activities. The ${buffDuration}-minute buff duration makes it ideal for ${recipe.buffs.mining ? 'Skull Cavern runs' : recipe.buffs.fishing ? 'fishing sessions' : recipe.buffs.luck ? 'lucky activities like Skull Cavern or artifact hunting' : 'extended gameplay sessions'}.`
                    : `${recipe.name} is a straightforward recipe good for restoring ${recipe.energy} energy. Consider cooking in bulk when ingredients are plentiful.`
                  }
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-4">
            <h3 className="font-bold text-slate-800 mb-4">Quick Reference</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Sell Price</span>
                <span className="font-bold text-amber-600">{recipe.sellPrice}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Energy</span>
                <span className="font-bold text-green-600">+{recipe.energy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Health</span>
                <span className="font-bold text-red-600">+{recipe.health}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ingredients</span>
                <span className="font-medium">{recipe.ingredients.length} items</span>
              </div>
              {hasBuff && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Buff Duration</span>
                  <span className="font-bold text-purple-600">{buffDuration}m</span>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <Link 
              href="/recipes"
              className="flex items-center justify-center gap-2 w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
            >
              <BookOpen size={16} />
              All Recipes
            </Link>
          </div>

          {/* Related Recipes */}
          {relatedRecipes.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ArrowRight size={16} className="text-slate-400" />
                Similar Recipes
              </h3>
              <div className="space-y-3">
                {relatedRecipes.map(r => (
                  <RelatedRecipeCard key={r.id} recipe={r} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
