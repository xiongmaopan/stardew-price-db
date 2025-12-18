'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import GameImage from '@/components/GameImage';
import { 
  ChefHat, Search, Zap, Heart, Coins, Sparkles, 
  Filter, ChevronRight, BookOpen, Tv, Users, Star,
  Clock, TrendingUp, Award, Info, ChevronDown, ChevronUp,
  Target, Flame, Gift, ShoppingBag, Wheat
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';

// Featured recipes for hero section (best buff recipes)
const FEATURED_RECIPES = [
  { slug: 'lucky-lunch', highlight: '+3 Luck', desc: 'Best for Skull Cavern' },
  { slug: 'spicy-eel', highlight: '+1 Speed +1 Luck', desc: 'Speed & Luck combo' },
  { slug: 'pepper-poppers', highlight: '+2 Farming +1 Speed', desc: 'Farm faster' },
  { slug: 'dish-o-the-sea', highlight: '+3 Fishing', desc: 'Catch legendaries' },
];

// Recipe sources with icons
const RECIPE_SOURCES = {
  'Queen of Sauce': { icon: Tv, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' },
  'Hearts': { icon: Heart, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  'Skill': { icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  'Shop': { icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  'Starter': { icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
};

// Buff type colors and labels
const BUFF_STYLES = {
  farming: { color: 'text-green-600', bg: 'bg-green-100', label: 'Farming', icon: '🌾' },
  fishing: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Fishing', icon: '🎣' },
  mining: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Mining', icon: '⛏️' },
  foraging: { color: 'text-amber-600', bg: 'bg-amber-100', label: 'Foraging', icon: '🍄' },
  luck: { color: 'text-purple-600', bg: 'bg-purple-100', label: 'Luck', icon: '🍀' },
  speed: { color: 'text-cyan-600', bg: 'bg-cyan-100', label: 'Speed', icon: '⚡' },
  defense: { color: 'text-slate-600', bg: 'bg-slate-100', label: 'Defense', icon: '🛡️' },
  attack: { color: 'text-red-600', bg: 'bg-red-100', label: 'Attack', icon: '⚔️' },
  maxEnergy: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Max Energy', icon: '💪' },
  magneticRadius: { color: 'text-indigo-600', bg: 'bg-indigo-100', label: 'Magnetic Radius', icon: '🧲' },
};

// Recipe card component with enhanced visuals
function RecipeCard({ recipe }) {
  const [imgError, setImgError] = useState(false);
  const hasBuff = recipe.buffs && Object.keys(recipe.buffs).filter(k => k !== 'duration').length > 0;
  const buffKeys = hasBuff ? Object.keys(recipe.buffs).filter(k => k !== 'duration') : [];
  
  // Determine source type for badge
  const getSourceType = (source) => {
    if (source.includes('Queen of Sauce')) return 'Queen of Sauce';
    if (source.includes('Hearts')) return 'Hearts';
    if (source.includes('Level') || source.includes('Skill')) return 'Skill';
    if (source.includes('Starter')) return 'Starter';
    return 'Shop';
  };
  const sourceType = getSourceType(recipe.source);
  const sourceStyle = RECIPE_SOURCES[sourceType];

  return (
    <Link href={`/recipe/${recipe.slug}`}>
      <article className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-orange-300 hover:shadow-lg transition-all duration-200 h-full">        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-orange-200 group-hover:border-orange-400 group-hover:shadow-md transition-all">
            {imgError ? (
              <ChefHat className="text-orange-500" size={32} />
            ) : (
              <GameImage
                slug={recipe.slug}
                alt={`${recipe.name} - Stardew Valley cooking recipe`}
                width={40}
                height={40}
                onAllFailed={() => setImgError(true)}
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition truncate text-lg">
              {recipe.name}
            </h3>
            <p className="text-xs text-slate-500 truncate mb-2 flex items-center gap-1">
              {sourceStyle && <sourceStyle.icon size={10} className={sourceStyle.color} />}
              {recipe.source}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                <Zap size={10} /> {recipe.energy}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                <Coins size={10} /> {recipe.sellPrice}g
              </span>
              {hasBuff && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                  <Sparkles size={10} /> 
                  {buffKeys.map(k => BUFF_STYLES[k]?.icon || '✨').join('')}
                </span>
              )}
            </div>
          </div>

          <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-500 flex-shrink-0 mt-2 transition" />
        </div>
      </article>
    </Link>
  );
}

// Featured recipe card for hero section
function FeaturedRecipeCard({ recipe, highlight, desc }) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Link href={`/recipe/${recipe.slug}`}>
      <div className="group bg-white rounded-xl border-2 border-orange-200 p-4 hover:border-orange-400 hover:shadow-lg transition-all h-full">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center border border-orange-200">
            {imgError ? (
              <ChefHat className="text-orange-500" size={28} />
            ) : (
              <GameImage
                slug={recipe.slug}
                alt={recipe.name}
                width={36}
                height={36}
                onAllFailed={() => setImgError(true)}
              />
            )}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 group-hover:text-orange-600">{recipe.name}</h4>
            <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              {highlight}
            </span>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Stats summary card
function StatCard({ icon: Icon, value, label, color, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 border border-slate-200 text-center`}>
      <Icon className={`mx-auto ${color} mb-2`} size={24} />
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-xs text-slate-600 font-medium">{label}</div>
    </div>
  );
}

// Expandable FAQ item
function FAQItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-orange-600 transition"
      >
        <span className="font-semibold text-slate-800 pr-4">{question}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="pb-4 text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function RecipesContent({ recipes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuff, setFilterBuff] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [showFAQ, setShowFAQ] = useState(true);

  // Calculate comprehensive stats
  const stats = useMemo(() => {
    const buffRecipes = recipes.filter(r => r.buffs && Object.keys(r.buffs).filter(k => k !== 'duration').length > 0);
    const queenRecipes = recipes.filter(r => r.source.includes('Queen of Sauce'));
    const friendshipRecipes = recipes.filter(r => r.source.includes('Hearts'));
    const highEnergy = recipes.filter(r => r.energy >= 200);
    const avgEnergy = Math.round(recipes.reduce((sum, r) => sum + r.energy, 0) / recipes.length);
    const avgPrice = Math.round(recipes.reduce((sum, r) => sum + r.sellPrice, 0) / recipes.length);
    
    // Count buff types
    const buffCounts = {};
    buffRecipes.forEach(r => {
      Object.keys(r.buffs).filter(k => k !== 'duration').forEach(k => {
        buffCounts[k] = (buffCounts[k] || 0) + 1;
      });
    });
    
    return {
      total: recipes.length,
      buffRecipes: buffRecipes.length,
      queenRecipes: queenRecipes.length,
      friendshipRecipes: friendshipRecipes.length,
      highEnergy: highEnergy.length,
      avgEnergy,
      avgPrice,
      buffCounts,
    };
  }, [recipes]);

  // Get featured recipes data
  const featuredRecipesData = useMemo(() => {
    return FEATURED_RECIPES.map(f => ({
      ...f,
      recipe: recipes.find(r => r.slug === f.slug)
    })).filter(f => f.recipe);
  }, [recipes]);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(i => i.item.toLowerCase().includes(searchTerm.toLowerCase())) ||
        recipe.source.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Buff filter
      let matchesBuff = true;
      if (filterBuff === 'buff') {
        matchesBuff = recipe.buffs && Object.keys(recipe.buffs).filter(k => k !== 'duration').length > 0;
      } else if (filterBuff === 'nobuff') {
        matchesBuff = !recipe.buffs || Object.keys(recipe.buffs).filter(k => k !== 'duration').length === 0;
      } else if (filterBuff !== 'all') {
        matchesBuff = recipe.buffs && recipe.buffs[filterBuff];
      }
      
      // Source filter
      let matchesSource = true;
      if (filterSource === 'queen') {
        matchesSource = recipe.source.includes('Queen of Sauce');
      } else if (filterSource === 'friendship') {
        matchesSource = recipe.source.includes('Hearts');
      } else if (filterSource === 'starter') {
        matchesSource = recipe.source.includes('Starter');
      } else if (filterSource === 'shop') {
        matchesSource = recipe.source.includes('Gus') || recipe.source.includes('Saloon') || recipe.source.includes('Dwarf');
      }
      
      return matchesSearch && matchesBuff && matchesSource;
    });
  }, [recipes, searchTerm, filterBuff, filterSource]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      <ScrollToTop />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-slate-800">Cooking Recipes</span>
      </nav>

      {/* Hero Section */}
      <header className="mb-8">
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 md:p-8 border-2 border-orange-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            {/* Main Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center border-2 border-orange-300 shadow-md flex-shrink-0">
              <ChefHat className="text-orange-600" size={48} />
            </div>
            
            {/* Title & Description */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
                Stardew Valley Cooking Recipes
              </h1>              <p className="text-lg text-slate-600 mb-4 max-w-2xl">
                <strong>{stats.total} cooking recipes</strong> with ingredients, energy values, buff effects, 
                sell prices, and recipe sources. {stats.buffRecipes} buff foods, {stats.queenRecipes} from Queen of Sauce TV.
              </p>
              
              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-orange-200">
                  <ChefHat size={14} className="text-orange-600" /> {stats.total} Recipes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-purple-200">
                  <Sparkles size={14} className="text-purple-600" /> {stats.buffRecipes} Buff Foods
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-pink-200">
                  <Tv size={14} className="text-pink-600" /> {stats.queenRecipes} Queen of Sauce
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-green-200">
                  <Zap size={14} className="text-green-600" /> {stats.avgEnergy} Avg Energy
                </span>
              </div>
            </div>
          </div>

          {/* Featured Buff Recipes */}
          <div className="mt-6">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Star size={14} className="text-amber-500" />
              Top Buff Recipes for Pro Players
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {featuredRecipesData.map(({ recipe, highlight, desc }) => (
                <FeaturedRecipeCard 
                  key={recipe.slug} 
                  recipe={recipe} 
                  highlight={highlight}
                  desc={desc}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={ChefHat} value={stats.total} label="Total Recipes" color="text-orange-600" bgColor="bg-orange-50" />
          <StatCard icon={Sparkles} value={stats.buffRecipes} label="Buff Recipes" color="text-purple-600" bgColor="bg-purple-50" />
          <StatCard icon={Zap} value={stats.highEnergy} label="High Energy (200+)" color="text-green-600" bgColor="bg-green-50" />
          <StatCard icon={Tv} value={stats.queenRecipes} label="Queen of Sauce" color="text-pink-600" bgColor="bg-pink-50" />
        </div>
      </section>

      {/* Search & Filters */}
      <section className="mb-6 bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          {/* Buff Filter */}
          <div className="relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
            <select
              value={filterBuff}
              onChange={(e) => setFilterBuff(e.target.value)}
              className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white cursor-pointer min-w-[160px]"
            >
              <option value="all">All Buffs</option>
              <option value="buff">Has Buff</option>
              <option value="nobuff">No Buff</option>
              <option value="farming">🌾 Farming</option>
              <option value="fishing">🎣 Fishing</option>
              <option value="mining">⛏️ Mining</option>
              <option value="foraging">🍄 Foraging</option>
              <option value="luck">🍀 Luck</option>
              <option value="speed">⚡ Speed</option>
            </select>
          </div>
          
          {/* Source Filter */}
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="pl-10 pr-8 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white cursor-pointer min-w-[160px]"
            >
              <option value="all">All Sources</option>
              <option value="queen">📺 Queen of Sauce</option>
              <option value="friendship">❤️ Friendship</option>
              <option value="starter">⭐ Starter Recipe</option>
              <option value="shop">🏪 Shop Purchase</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          Showing <strong className="text-slate-700">{filteredRecipes.length}</strong> of {stats.total} recipes
        </p>
        {(filterBuff !== 'all' || filterSource !== 'all' || searchTerm) && (
          <button 
            onClick={() => { setFilterBuff('all'); setFilterSource('all'); setSearchTerm(''); }}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Recipe Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* No Results */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl">
            <ChefHat className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">No recipes found matching your criteria.</p>
            <button 
              onClick={() => { setFilterBuff('all'); setFilterSource('all'); setSearchTerm(''); }}
              className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Buff Recipes Summary */}
      <section className="mb-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-6">
        <h2 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-500" size={24} />
          Buff Food Guide - Maximize Your Performance
        </h2>
        <p className="text-slate-600 mb-6">
          Out of {stats.total} recipes, <strong>{stats.buffRecipes} provide stat buffs</strong> that can significantly boost your gameplay. 
          Here's a breakdown of buff foods by type:
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {Object.entries(stats.buffCounts).map(([buff, count]) => {
            const style = BUFF_STYLES[buff];
            return (
              <div key={buff} className={`${style?.bg || 'bg-slate-100'} rounded-lg p-3 text-center border border-slate-200`}>
                <div className="text-2xl mb-1">{style?.icon || '✨'}</div>
                <div className={`text-lg font-bold ${style?.color || 'text-slate-600'}`}>{count}</div>
                <div className="text-xs text-slate-600">{style?.label || buff}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/60 rounded-lg p-4 border border-purple-200">
          <h3 className="font-semibold text-slate-800 mb-2">💡 Pro Tip: Best Buff Combinations</h3>
          <ul className="text-sm text-slate-600 space-y-1">
            <li><strong>Skull Cavern:</strong> Lucky Lunch (+3 Luck) or Spicy Eel (+1 Luck +1 Speed) for finding ladders and avoiding monsters</li>
            <li><strong>Legendary Fishing:</strong> Dish O' The Sea (+3 Fishing) when attempting Legend, Glacierfish, etc.</li>
            <li><strong>Farm Optimization:</strong> Pepper Poppers (+2 Farming +1 Speed) during harvest season</li>
            <li><strong>Mining Runs:</strong> Miner's Treat (+3 Mining +32 Magnetism) for precious gems and ores</li>
          </ul>
        </div>
      </section>

      {/* Recipe Sources Guide */}
      <section className="mb-12 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <BookOpen className="text-orange-500" size={24} />
            How to Learn Cooking Recipes
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Tv className="text-pink-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">The Queen of Sauce</h3>
                  <span className="text-xs text-pink-600">{stats.queenRecipes} recipes available</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Watch your TV every <strong>Sunday at 9am</strong> to learn new recipes. The show teaches one unique recipe per week during Years 1-2. 
                <strong> Reruns air on Wednesdays</strong> for any recipes you missed. Make sure to check your TV regularly!
              </p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Friendship Rewards</h3>
                  <span className="text-xs text-red-600">{stats.friendshipRecipes} recipes from villagers</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Villagers mail you recipes as your friendship increases. Most recipes are given at <strong>3, 5, 7, or 9 hearts</strong>. 
                Each villager has their own signature recipes to share, so befriend everyone for the complete collection!
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Skill Level Rewards</h3>
                  <span className="text-xs text-blue-600">Unlock by leveling up</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Some recipes unlock automatically when you reach certain skill levels. For example, 
                reaching <strong>Foraging Level 2</strong> teaches Survival Burger, and <strong>Combat Level 3</strong> teaches Roots Platter.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Shop Purchases</h3>
                  <span className="text-xs text-green-600">Buy from various merchants</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Buy recipes from <strong>Gus at the Stardrop Saloon</strong>, the <strong>Dwarf</strong> in the mines (requires dwarvish translation guide), 
                the <strong>Island Trader</strong>, and the <strong>Desert Trader</strong> for special dishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12 bg-amber-50 rounded-xl border-2 border-amber-200 overflow-hidden">
        <button 
          className="w-full bg-amber-100/50 px-6 py-4 border-b border-amber-200 flex items-center justify-between"
          onClick={() => setShowFAQ(!showFAQ)}
        >
          <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
            <Info className="text-amber-600" size={24} />
            Frequently Asked Questions
          </h2>
          {showFAQ ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showFAQ && (
          <div className="p-6">
            <FAQItem 
              question="How do I unlock cooking in Stardew Valley?"
              answer={
                <p>
                  You unlock cooking after <strong>upgrading your farmhouse</strong> for the first time at Robin's Carpenter Shop 
                  (costs 10,000g + 450 Wood). This adds a kitchen with a stove and refrigerator. Ingredients can be stored in the 
                  fridge and will be automatically used when cooking. Alternatively, you can craft a <strong>Cookout Kit</strong> 
                  (unlocked at Foraging level 9) to cook anywhere outdoors.
                </p>
              }
              defaultOpen={true}
            />
            <FAQItem 
              question="What are the best recipes for making money?"
              answer={
                <p>
                  The most profitable cooked dishes consider both sell price and ingredient cost. Top choices include: 
                  <strong> Pink Cake (480g)</strong>, <strong>Pumpkin Soup (300g)</strong>, and <strong>Cranberry Candy (175g)</strong>. 
                  However, for pure profit efficiency, many players prefer selling raw ingredients or processed goods (wine, cheese) 
                  rather than cooking, as cooking doesn't benefit from the Artisan profession bonus.
                </p>
              }
            />
            <FAQItem 
              question="What food gives the most energy in Stardew Valley?"
              answer={
                <p>
                  The highest energy foods are: <strong>Fruit Salad (263 energy)</strong>, <strong>Pink Cake (250 energy)</strong>, 
                  <strong>Autumn's Bounty (220 energy)</strong>, and <strong>Complete Breakfast (200 energy)</strong>. 
                  For easy-to-make high energy food, <strong>Cheese (125 energy for gold quality)</strong> is excellent since 
                  it doesn't require a recipe and is produced passively.
                </p>
              }
            />
            <FAQItem 
              question="How do I watch The Queen of Sauce if I missed an episode?"
              answer={
                <p>
                  If you miss a Queen of Sauce episode on Sunday, <strong>reruns air every Wednesday</strong>. The show randomly 
                  selects from recipes you haven't learned yet. If you've learned all available recipes, it shows a "Best Of" 
                  compilation instead. Keep watching until you have all {stats.queenRecipes} Queen of Sauce recipes! 
                  You can also check the TV every day to see what's airing.
                </p>
              }
            />
            <FAQItem 
              question="Can I cook without upgrading my house?"
              answer={
                <p>
                  Yes! At <strong>Foraging Level 9</strong>, you unlock the Cookout Kit recipe (15 Wood, 10 Fiber, 3 Coal). 
                  This portable cooking station lets you cook anywhere outdoors. It's consumed after use, so craft several 
                  if you plan to cook on the go. Great for camping in the mines or on Ginger Island!
                </p>
              }
            />
          </div>
        )}
      </section>

      {/* Expert Tips Section */}
      <section className="mb-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center border-2 border-orange-300">
            <span className="text-3xl">👨‍🍳</span>
          </div>
          <div>
            <h2 className="font-bold text-xl text-orange-900 mb-3">Expert Cooking Tips</h2>
            <div className="prose prose-sm prose-orange max-w-none text-slate-700 space-y-3">
              <p>
                <strong>Stack Your Buffs:</strong> Food buffs don't stack - eating new food replaces the old buff. 
                Plan which buff you need for your activity before eating. The only exception is drinks (Coffee, Triple Shot Espresso) 
                which provide a separate speed buff that stacks with food.
              </p>
              <p>
                <strong>Use the Fridge:</strong> Your kitchen fridge acts as extended ingredient storage. Any ingredients 
                stored there will be automatically used when cooking, saving inventory space. The Mini-Fridge from Robin 
                works the same way.
              </p>
              <p>
                <strong>Gift Strategy:</strong> Many villagers love cooked dishes. Check each villager's loved gifts 
                to find cooking shortcuts for building friendships. For example, Penny loves Poppy Seed Muffins, 
                and Krobus loves Void Egg Mayo dishes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
