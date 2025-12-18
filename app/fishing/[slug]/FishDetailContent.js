'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GameImage from '@/components/GameImage';
import { 
  Fish, MapPin, Calendar, Clock, Cloud, Target, ChevronRight,
  Crown, Droplets, Sun, Snowflake, Leaf, Flower2, ChevronUp,
  Info, TrendingUp, Award, Anchor, AlertTriangle, Star, Zap,
  Package, CheckCircle, Gift, ArrowRight
} from 'lucide-react';
import { useProfessions, calculatePrice } from '@/components/ProfessionContext';
import fishStrategies from '@/data/fish-strategies.json';

// Season styling
const SEASONS = {
  Spring: { icon: Flower2, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  Summer: { icon: Sun, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  Fall: { icon: Leaf, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  Winter: { icon: Snowflake, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }
};

// Difficulty styling
function getDifficultyStyle(difficulty) {
  if (difficulty >= 90) return { text: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', label: 'Extreme', desc: 'One of the hardest fish in the game' };
  if (difficulty >= 70) return { text: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200', label: 'Hard', desc: 'Challenging catch requiring skill' };
  if (difficulty >= 50) return { text: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200', label: 'Medium', desc: 'Moderate challenge' };
  if (difficulty >= 30) return { text: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200', label: 'Easy', desc: 'Good for building fishing XP' };
  return { text: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', label: 'Very Easy', desc: 'Perfect for beginners' };
}

// Behavior styling
const BEHAVIORS = {
  mixed: { color: 'text-purple-600', bg: 'bg-purple-100' },
  smooth: { color: 'text-green-600', bg: 'bg-green-100' },
  sinker: { color: 'text-blue-600', bg: 'bg-blue-100' },
  floater: { color: 'text-amber-600', bg: 'bg-amber-100' },
  dart: { color: 'text-red-600', bg: 'bg-red-100' }
};

// Scroll to top
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
      className={`fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}

// Fish image component
function FishImage({ fish, size = 64 }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return <Fish className="text-blue-500" size={size} />;
  }

  return (
    <GameImage
      slug={fish.slug}
      alt={fish.name}
      width={size}
      height={size}
      onAllFailed={() => setImgError(true)}
    />
  );
}

// Related fish card
function RelatedFishCard({ fish }) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Link href={`/fishing/${fish.slug}`}>
      <div className="group bg-white rounded-lg border border-slate-200 p-3 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {imgError ? (
            <Fish className="text-blue-500" size={20} />
          ) : (
            <GameImage
              slug={fish.slug}
              alt={fish.name}
              width={24}
              height={24}
              onAllFailed={() => setImgError(true)}
            />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 truncate flex items-center gap-1">
            {fish.name}
            {fish.legendary && <Crown size={12} className="text-yellow-500" />}
          </h4>
          <p className="text-xs text-slate-500">{fish.location[0]}</p>
        </div>
        <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500" />
      </div>
    </Link>
  );
}

export default function FishDetailContent({ fish, relatedFish, behaviorInfo, tackleGuide }) {
  const professions = useProfessions();
  const difficultyStyle = getDifficultyStyle(fish.difficulty);
  const behaviorStyle = BEHAVIORS[fish.behavior?.toLowerCase()] || BEHAVIORS.mixed;

  // Get strategy data for this fish
  const strategy = fishStrategies.strategies[fish.slug];

  // Calculate prices with Angler profession
  const basePrice = fish.basePrice;
  const anglerBonus = professions.angler ? 1.25 : 1;
  const prices = {
    normal: Math.floor(basePrice * anglerBonus),
    silver: Math.floor(basePrice * 1.25 * anglerBonus),
    gold: Math.floor(basePrice * 1.5 * anglerBonus),
    iridium: Math.floor(basePrice * 2 * anglerBonus)
  };

  // Recommended tackle based on difficulty and behavior
  const getRecommendedTackle = () => {
    if (fish.difficulty >= 80) return ['Cork Bobber', 'Trap Bobber'];
    if (fish.behavior?.toLowerCase() === 'dart') return ['Trap Bobber', 'Cork Bobber'];
    if (fish.behavior?.toLowerCase() === 'sinker') return ['Lead Bobber', 'Trap Bobber'];
    if (fish.difficulty >= 60) return ['Trap Bobber', 'Barbed Hook'];
    return ['Spinner', 'Barbed Hook'];
  };

  const recommendedTackle = getRecommendedTackle();

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      <ScrollToTop />

      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link href="/fishing" className="hover:text-blue-600 transition">Fishing Guide</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-slate-800">{fish.name}</span>
      </nav>

      {/* Hero Section */}
      <header className={`rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden ${fish.legendary ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-300' : 'bg-white border border-slate-200'}`}>
        {fish.legendary && (
          <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-bl-lg font-bold text-sm flex items-center gap-1">
            <Crown size={14} /> LEGENDARY
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Fish Image */}
          <div className={`w-24 h-24 md:w-32 md:h-32 rounded-xl flex items-center justify-center flex-shrink-0 ${fish.legendary ? 'bg-yellow-200/50' : 'bg-slate-100'} border-2 ${fish.legendary ? 'border-yellow-300' : 'border-slate-200'}`}>
            <FishImage fish={fish} size={80} />
          </div>

          {/* Fish Info */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
              {fish.name}
              {fish.legendary && <span className="text-yellow-600 ml-2">★</span>}
            </h1>
            <p className="text-slate-600 text-lg mb-4 max-w-2xl">{fish.description}</p>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {fish.season.map(season => {
                const style = SEASONS[season];
                const Icon = style?.icon || Calendar;
                return (
                  <span key={season} className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style?.bg} ${style?.color} border ${style?.border}`}>
                    <Icon size={14} /> {season}
                  </span>
                );
              })}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${difficultyStyle.bg} ${difficultyStyle.text} border ${difficultyStyle.border}`}>
                <Target size={14} /> {difficultyStyle.label} ({fish.difficulty})
              </span>
              {fish.weather && fish.weather !== 'Any' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-cyan-50 text-cyan-700 border border-cyan-200">
                  {fish.weather === 'Rainy' ? <Droplets size={14} /> : <Sun size={14} />}
                  {fish.weather}
                </span>
              )}
            </div>

            {/* Base Price Card */}
            <div className={`inline-block ${fish.legendary ? 'bg-yellow-100/70' : 'bg-slate-50'} rounded-lg px-4 py-2 border ${fish.legendary ? 'border-yellow-300' : 'border-slate-200'}`}>
              <span className="text-sm text-slate-500">Base Price</span>
              <div className="text-2xl font-black text-amber-600">{fish.basePrice}g</div>
              {fish.fishingLevel && (
                <span className="text-xs text-slate-500">Requires Fishing Lvl {fish.fishingLevel}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Location & Time Card */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <MapPin className="text-red-500" size={20} />
                Where & When to Find {fish.name}
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    Location
                  </h3>
                  <ul className="space-y-1">
                    {fish.location.map((loc, i) => (
                      <li key={i} className="text-slate-600 flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-500" />
                        {loc}
                      </li>
                    ))}
                  </ul>
                  {fish.locationDetail && (
                    <p className="mt-3 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                      <Info size={14} className="inline mr-1" />
                      {fish.locationDetail}
                    </p>
                  )}
                </div>

                {/* Time & Weather */}
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    Time & Conditions
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-500" />
                      <span className="text-slate-600">{fish.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {fish.weather === 'Rainy' ? (
                        <Droplets size={16} className="text-cyan-500" />
                      ) : fish.weather === 'Sunny' ? (
                        <Sun size={16} className="text-yellow-500" />
                      ) : (
                        <Cloud size={16} className="text-slate-400" />
                      )}
                      <span className="text-slate-600">
                        {fish.weather === 'Any' ? 'Any weather' : `${fish.weather} weather required`}
                      </span>
                    </div>
                    {fish.fishingLevel && (
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-purple-500" />
                        <span className="text-slate-600">
                          Fishing Level {fish.fishingLevel}+ required
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Difficulty & Behavior */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Target className="text-orange-500" size={20} />
                Difficulty & Catching Strategy
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Difficulty */}
                <div className={`p-4 rounded-xl ${difficultyStyle.bg} border ${difficultyStyle.border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${difficultyStyle.text}`}>Difficulty: {fish.difficulty}</h3>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${difficultyStyle.bg} ${difficultyStyle.text}`}>
                      {difficultyStyle.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{difficultyStyle.desc}</p>
                  <div className="mt-3 bg-white/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${fish.difficulty >= 90 ? 'bg-red-500' : fish.difficulty >= 70 ? 'bg-orange-500' : fish.difficulty >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(fish.difficulty, 110) / 110 * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Easy</span>
                    <span>Hard</span>
                    <span>Legend (110)</span>
                  </div>
                </div>

                {/* Behavior */}
                <div className={`p-4 rounded-xl ${behaviorStyle.bg} border border-slate-200`}>
                  <h3 className={`font-bold ${behaviorStyle.color} mb-2 capitalize`}>
                    {fish.behavior} Behavior
                  </h3>
                  {behaviorInfo && (
                    <>
                      <p className="text-sm text-slate-600 mb-2">{behaviorInfo.description}</p>
                      <div className="bg-white/50 rounded-lg p-2">
                        <p className="text-sm text-slate-700">
                          <Zap size={12} className="inline mr-1 text-amber-500" />
                          <strong>Tip:</strong> {behaviorInfo.tips}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pro Tips */}
              {fish.tips && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <Star className="text-blue-600" size={18} />
                    Expert Tips for {fish.name}
                  </h3>
                  <p className="text-slate-700">{fish.tips}</p>
                </div>
              )}
            </div>
          </section>

          {/* Recommended Tackle */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Anchor className="text-slate-500" size={20} />
                Recommended Tackle
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {recommendedTackle.map(tackleName => {
                  const tackle = tackleGuide.find(t => t.name === tackleName);
                  return tackle ? (
                    <div key={tackleName} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-800">{tackle.name}</h4>
                      <p className="text-sm text-blue-600">{tackle.effect}</p>
                      <p className="text-xs text-slate-500 mt-1">Best for: {tackle.best_for}</p>
                    </div>
                  ) : null;
                })}
              </div>
              <p className="text-sm text-slate-500">
                <Info size={14} className="inline mr-1" />
                Tackle requires an Iridium Rod. Purchase from Willy&apos;s shop at Fishing Level 6.
              </p>
            </div>
          </section>

          {/* Sell Prices Table */}
          <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Package className="text-slate-500" size={20} />
                Sell Prices by Quality
              </h2>
              <div className={`text-xs px-2 py-1 rounded border ${professions.angler ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                Angler: {professions.angler ? 'Active (+25%)' : 'Inactive'}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left">Quality</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left hidden sm:table-cell">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-700">Normal</td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">{prices.normal}g</td>
                    <td className="px-6 py-4 hidden sm:table-cell text-slate-400">1.0x</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-700 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-gray-300 mr-2 border border-gray-400"></span> Silver
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">{prices.silver}g</td>
                    <td className="px-6 py-4 hidden sm:table-cell text-slate-400">1.25x</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-yellow-600 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2 border border-yellow-500"></span> Gold
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-yellow-700">{prices.gold}g</td>
                    <td className="px-6 py-4 hidden sm:table-cell text-slate-400">1.5x</td>
                  </tr>
                  <tr className="bg-purple-50 hover:bg-purple-100">
                    <td className="px-6 py-4 font-medium text-purple-700 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-purple-500 mr-2 border border-purple-600"></span> Iridium
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-purple-800">{prices.iridium}g</td>
                    <td className="px-6 py-4 hidden sm:table-cell text-slate-400">2.0x</td>
                  </tr>                </tbody>
              </table>
            </div>
          </section>

          {/* Angler's Strategy Guide - High-value SEO content */}
          {strategy && (
            <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center border-2 border-cyan-300">
                  <span className="text-2xl">🎣</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-cyan-900 mb-2">Angler&apos;s Pro Tip</h3>
                  <p className="text-cyan-800 leading-relaxed mb-4">{strategy.proTip}</p>
                  
                  <div className="bg-white/60 rounded-lg p-4 border border-cyan-200">
                    <h4 className="font-semibold text-slate-700 text-sm mb-2 uppercase tracking-wide">Strategy Analysis (v1.6)</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{strategy.strategyNote}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="bg-white rounded-lg px-3 py-2 border border-cyan-200">
                      <span className="text-xs text-slate-500 block">Best Tackle</span>
                      <span className="font-bold text-cyan-700">{strategy.bestTackle}</span>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-cyan-200">
                      <span className="text-xs text-slate-500 block">Difficulty</span>
                      <span className={`font-bold ${
                        strategy.difficulty === 'Legendary' ? 'text-purple-700' :
                        strategy.difficulty === 'Very Hard' ? 'text-red-600' :
                        strategy.difficulty === 'Hard' ? 'text-orange-600' :
                        strategy.difficulty === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>{strategy.difficulty}</span>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-cyan-200">
                      <span className="text-xs text-slate-500 block">Rarity</span>
                      <span className="font-bold text-slate-700">{strategy.rarity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Uses Section */}
          {fish.uses && fish.uses.length > 0 && (
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <Gift className="text-pink-500" size={20} />
                  Uses for {fish.name}
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {fish.uses.map((use, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Fish Pond Processing */}
          {fish.processing && (
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <TrendingUp className="text-green-500" size={20} />
                  Fish Pond Production
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">{fish.processing.machine}</h3>
                  <p className="text-slate-700">
                    Produces: <strong>{fish.processing.product}</strong>
                  </p>
                  {fish.processing.roePrice && (
                    <p className="text-slate-600 mt-1">
                      Roe Value: <span className="font-bold text-amber-600">{fish.processing.roePrice}g</span>
                      {fish.processing.caviarPrice && (
                        <span> → Caviar: <span className="font-bold text-purple-600">{fish.processing.caviarPrice}g</span></span>
                      )}
                      {fish.processing.agedRoePrice && (
                        <span> → Aged Roe: <span className="font-bold text-purple-600">{fish.processing.agedRoePrice}g</span></span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Trivia */}
          {fish.trivia && (
            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
              <h2 className="font-bold text-lg text-indigo-800 mb-2 flex items-center gap-2">
                <Info className="text-indigo-500" size={20} />
                Did You Know?
              </h2>
              <p className="text-slate-700">{fish.trivia}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-4">
            <h3 className="font-bold text-slate-800 mb-4">Quick Reference</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Base Price</span>
                <span className="font-bold text-amber-600">{fish.basePrice}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Difficulty</span>
                <span className={`font-bold ${difficultyStyle.text}`}>{fish.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Behavior</span>
                <span className="font-medium capitalize">{fish.behavior}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Size Range</span>
                <span className="font-medium">{fish.size?.min}-{fish.size?.max} inches</span>
              </div>
              {fish.fishingLevel && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Min Level</span>
                  <span className="font-bold text-purple-600">{fish.fishingLevel}</span>
                </div>
              )}
            </div>

            <hr className="my-4" />

            <Link 
              href="/fishing"
              className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Fish size={16} />
              View All Fish
            </Link>
          </div>

          {/* Related Fish */}
          {relatedFish.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ArrowRight size={16} className="text-slate-400" />
                Similar Fish
              </h3>
              <div className="space-y-3">
                {relatedFish.map(f => (
                  <RelatedFishCard key={f.id} fish={f} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
