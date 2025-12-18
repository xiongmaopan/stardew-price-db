'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import GameImage from '../../components/GameImage';
import { 
  Fish, MapPin, Calendar, Clock, Cloud, Target, ChevronRight,
  Search, Filter, Crown, Droplets, Sun, Snowflake, Leaf, Flower2,
  Info, TrendingUp, ChevronUp, Sparkles, Anchor, Award, X
} from 'lucide-react';

// Season icons and colors
const SEASONS = {
  Spring: { icon: Flower2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  Summer: { icon: Sun, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  Fall: { icon: Leaf, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  Winter: { icon: Snowflake, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }
};

// Difficulty colors
function getDifficultyColor(difficulty) {
  if (difficulty >= 90) return { text: 'text-red-600', bg: 'bg-red-100', label: 'Extreme' };
  if (difficulty >= 70) return { text: 'text-orange-600', bg: 'bg-orange-100', label: 'Hard' };
  if (difficulty >= 50) return { text: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Medium' };
  if (difficulty >= 30) return { text: 'text-green-600', bg: 'bg-green-100', label: 'Easy' };
  return { text: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Very Easy' };
}

// Fish card component
function FishCard({ fish }) {
  const [imgError, setImgError] = useState(false);
  const difficultyStyle = getDifficultyColor(fish.difficulty);

  return (
    <Link href={`/fishing/${fish.slug}`}>
      <article className="group bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
        <div className="p-4">
          {/* Header with Image and Name */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition border border-slate-200">
              {imgError ? (
                <Fish className="text-blue-500" size={24} />
              ) : (
                <GameImage
                  slug={fish.slug}
                  alt={fish.name}
                  width={32}
                  height={32}
                  onAllFailed={() => setImgError(true)}
                />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
                  {fish.name}
                </h3>
                {fish.legendary && (
                  <Crown size={14} className="text-yellow-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-amber-600">{fish.basePrice}g</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${difficultyStyle.bg} ${difficultyStyle.text} font-medium`}>
                  {difficultyStyle.label}
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{fish.location.join(', ')}</span>
          </div>

          {/* Seasons */}
          <div className="flex flex-wrap gap-1 mb-2">
            {fish.season.map(season => {
              const seasonStyle = SEASONS[season];
              const SeasonIcon = seasonStyle?.icon || Calendar;
              return (
                <span 
                  key={season}
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium ${seasonStyle?.bg || 'bg-gray-50'} ${seasonStyle?.color || 'text-gray-600'}`}
                >
                  <SeasonIcon size={10} />
                  {season}
                </span>
              );
            })}
          </div>

          {/* Time & Weather */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {fish.time}
            </span>
            {fish.weather && fish.weather !== 'Any' && (
              <span className="flex items-center gap-1">
                {fish.weather === 'Rainy' ? <Droplets size={10} /> : <Sun size={10} />}
                {fish.weather}
              </span>
            )}
          </div>
        </div>

        {/* Hover Footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 group-hover:bg-blue-50 transition flex items-center justify-between">
          <span className="text-xs text-slate-500">View full guide</span>
          <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </article>
    </Link>
  );
}

// Legendary fish showcase card with image
function LegendaryFishCard({ fish }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/fishing/${fish.slug}`}>
      <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 p-4 hover:shadow-xl transition-all h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center border border-yellow-300">
            {imgError ? (
              <Crown className="text-yellow-600" size={20} />
            ) : (
              <GameImage
                slug={fish.slug}
                alt={fish.name}
                width={28}
                height={28}
                onAllFailed={() => setImgError(true)}
              />
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 group-hover:text-yellow-700">{fish.name}</h3>
            <span className="text-yellow-700 font-bold">{fish.basePrice}g</span>
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-2 line-clamp-2">{fish.description}</p>
        <div className="flex flex-wrap gap-1">
          {fish.season.map(s => (
            <span key={s} className={`text-xs px-1.5 py-0.5 rounded ${SEASONS[s]?.bg} ${SEASONS[s]?.color}`}>
              {s}
            </span>
          ))}
        </div>
        <div className="mt-2 text-xs text-slate-500">
          Difficulty: <span className="font-bold text-red-600">{fish.difficulty}</span>
          {fish.fishingLevel && <span className="ml-2">• Lvl {fish.fishingLevel}+</span>}
        </div>
      </div>
    </Link>
  );
}

// Legendary fish showcase
function LegendaryShowcase({ legendaryFish }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Crown className="text-yellow-600" size={24} />
        </div>        <div>
          <h2 className="text-2xl font-bold text-slate-800">Legendary Fish</h2>
          <p className="text-slate-600">5 unique fish, one-time catches, specific locations & conditions required</p>
        </div>
      </div>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {legendaryFish.map(fish => (
          <LegendaryFishCard key={fish.id} fish={fish} />
        ))}
      </div>
    </section>
  );
}

// Tackle guide section
function TackleGuide({ tackle }) {
  return (
    <section className="mb-12 bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Anchor size={20} className="text-blue-500" />
          Tackle Guide - Choose the Right Tool
        </h2>
        <p className="text-sm text-slate-600 mt-1">Tackle attaches to Iridium Rods and changes how the fishing minigame works</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tackle.map((item, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-1">{item.name}</h3>
              <p className="text-sm text-blue-600 mb-2">{item.effect}</p>
              <p className="text-xs text-slate-500">Best for: {item.best_for}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Seasonal tips
function SeasonalTips({ tips }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calendar size={20} className="text-slate-500" />
        Seasonal Fishing Strategies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(tips).map(([season, tip]) => {
          const seasonStyle = SEASONS[season.charAt(0).toUpperCase() + season.slice(1)] || {};
          const SeasonIcon = seasonStyle.icon || Calendar;
          return (
            <div key={season} className={`rounded-xl p-4 border ${seasonStyle.border || 'border-slate-200'} ${seasonStyle.bg || 'bg-slate-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <SeasonIcon size={18} className={seasonStyle.color || 'text-slate-600'} />
                <h3 className={`font-bold capitalize ${seasonStyle.color || 'text-slate-800'}`}>{season}</h3>
              </div>
              <p className="text-sm text-slate-700">{tip}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Scroll to top button
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}

export default function FishingGuideContent({ fishData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Separate legendary and regular fish
  const legendaryFish = fishData.fish.filter(f => f.legendary);
  
  // Get unique locations
  const locations = useMemo(() => {
    const locs = new Set();
    fishData.fish.forEach(fish => {
      fish.location.forEach(loc => locs.add(loc.split(' (')[0])); // Remove parenthetical info
    });
    return ['All', ...Array.from(locs).sort()];
  }, [fishData.fish]);

  // Filter fish
  const filteredFish = useMemo(() => {
    return fishData.fish.filter(fish => {
      // Search
      if (searchQuery && !fish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !fish.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Season filter
      if (selectedSeason !== 'All' && !fish.season.includes(selectedSeason)) {
        return false;
      }
      
      // Location filter
      if (selectedLocation !== 'All' && !fish.location.some(loc => loc.includes(selectedLocation))) {
        return false;
      }
      
      // Difficulty filter
      if (selectedDifficulty !== 'All') {
        const diff = getDifficultyColor(fish.difficulty).label;
        if (selectedDifficulty === 'Easy' && !['Very Easy', 'Easy'].includes(diff)) return false;
        if (selectedDifficulty === 'Medium' && diff !== 'Medium') return false;
        if (selectedDifficulty === 'Hard' && !['Hard', 'Extreme'].includes(diff)) return false;
      }
      
      return true;
    });
  }, [fishData.fish, searchQuery, selectedSeason, selectedLocation, selectedDifficulty]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSeason('All');
    setSelectedLocation('All');
    setSelectedDifficulty('All');
  };

  const hasActiveFilters = searchQuery || selectedSeason !== 'All' || selectedLocation !== 'All' || selectedDifficulty !== 'All';

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
      <ScrollToTop />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-slate-800">Fishing Guide</span>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
              <Fish size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">Stardew Valley Fishing Guide</h1>
              <p className="text-blue-100 text-lg">Complete Database • {fishData.fish.length} Fish • Updated for 1.6</p>
            </div>
          </div>
            <p className="text-blue-100 max-w-3xl text-lg leading-relaxed mb-6">
            {fishData.fish.length} catchable fish across {fishData.locations.length} locations. Includes spawn times, 
            seasons, weather conditions, and difficulty ratings. {legendaryFish.length} legendary fish with exact 
            catch requirements. All data verified for Stardew Valley 1.6.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              <Target size={16} />
              <span>{fishData.fish.length} Fish Species</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              <Crown size={16} />
              <span>{legendaryFish.length} Legendary Fish</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              <MapPin size={16} />
              <span>{fishData.locations.length} Fishing Locations</span>
            </div>
          </div>
        </div>
      </header>

      {/* Legendary Fish Showcase */}
      <LegendaryShowcase legendaryFish={legendaryFish} />

      {/* Search & Filters */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search fish by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition ${
                showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Filter size={18} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              {/* Season Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Season</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Seasons</option>
                  {Object.keys(SEASONS).map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy / Very Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard / Extreme</option>
                </select>
              </div>
            </div>
          )}

          {/* Active Filters & Clear */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
              <span className="text-sm text-slate-500">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    &quot;{searchQuery}&quot;
                  </span>
                )}
                {selectedSeason !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {selectedSeason}
                  </span>
                )}
                {selectedLocation !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {selectedLocation}
                  </span>
                )}
                {selectedDifficulty !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {selectedDifficulty} difficulty
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="ml-auto flex items-center gap-1 text-sm text-slate-500 hover:text-red-600"
              >
                <X size={14} />
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          {hasActiveFilters ? `${filteredFish.length} fish found` : 'All Fish'}
        </h2>
        <span className="text-sm text-slate-500">
          Showing {filteredFish.length} of {fishData.fish.length} fish
        </span>
      </div>

      {/* Fish Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
        {filteredFish.map(fish => (
          <FishCard key={fish.id} fish={fish} />
        ))}
      </section>

      {filteredFish.length === 0 && (
        <div className="text-center py-12">
          <Fish className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No fish found</h3>
          <p className="text-slate-500 mb-4">Try adjusting your filters or search query</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Tackle Guide */}
      <TackleGuide tackle={fishData.tips.tackle} />

      {/* Seasonal Tips */}
      <SeasonalTips tips={fishData.tips.seasonal} />

      {/* General Tips Section */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 mb-12">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Info size={20} className="text-blue-500" />
          Pro Fishing Tips
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fishData.tips.general.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <Sparkles size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Looking for Crop Profit Calculations?</h2>
        <p className="text-slate-300 mb-6">Check out our profit calculator to maximize your farm income</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/calculator/spring"
            className="px-6 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Profit Calculator
          </Link>
          <Link 
            href="/gifts"
            className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-500 transition"
          >
            Gift Guides
          </Link>
        </div>
      </section>
    </main>
  );
}
