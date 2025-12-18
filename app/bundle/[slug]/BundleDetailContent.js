'use client';

import { useState } from 'react';
import Link from 'next/link';
import GameImage from '@/components/GameImage';
import itemsData from '@/data/items.json';
import fishData from '@/data/fish.json';
import { 
  ArrowLeft, 
  Gift, 
  CheckCircle2, 
  MapPin, 
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Sprout,
  Zap,
  Flame,
  Skull,
  Package,
  Fish,
  Hammer,
  MessageSquare,
  Coins,
  Building
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';

// Build lookup sets for items and fish
const itemSlugs = new Set(itemsData.items.map(i => i.slug));
const fishSlugs = new Set(fishData.fish.map(f => f.slug));

// Get the correct link for an item
function getItemLink(itemSlug) {
  if (itemSlugs.has(itemSlug)) {
    return `/item/${itemSlug}/`;
  }
  if (fishSlugs.has(itemSlug)) {
    return `/fishing/${itemSlug}/`;
  }
  return null; // No link available
}

// Difficulty styles with Lucide icons (Light theme)
const DIFFICULTY_STYLES = {
  'Easy': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', Icon: Sprout, desc: 'Can be completed early game' },
  'Medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', Icon: Zap, desc: 'Requires some planning' },
  'Hard': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', Icon: Flame, desc: 'Needs significant preparation' },
  'Very Hard': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', Icon: Skull, desc: 'End-game challenge' },
};

// Room styles with Lucide icons (Light theme)
const ROOM_STYLES = {
  'pantry': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', gradient: 'from-amber-50', Icon: Package },
  'fish-tank': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', gradient: 'from-blue-50', Icon: Fish },
  'crafts-room': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', gradient: 'from-green-50', Icon: Hammer },
  'boiler-room': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', gradient: 'from-orange-50', Icon: Flame },
  'bulletin-board': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', gradient: 'from-purple-50', Icon: MessageSquare },
  'vault': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', gradient: 'from-yellow-50', Icon: Coins },
  'abandoned-jojamart': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', gradient: 'from-pink-50', Icon: Building },
};

// Quality badge colors (Light theme)
const QUALITY_STYLES = {
  'any': { bg: 'bg-slate-200', text: 'text-slate-700' },
  'silver': { bg: 'bg-slate-300', text: 'text-slate-800' },
  'gold': { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  'iridium': { bg: 'bg-purple-200', text: 'text-purple-800' },
};

// Item slug converter
function toSlug(name) {
  return name.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function ItemRow({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const qualityStyle = QUALITY_STYLES[item.quality] || QUALITY_STYLES['any'];
  const itemSlug = toSlug(item.name);
  const itemLink = getItemLink(itemSlug);
  
  return (
    <div className={`border-2 border-slate-200 rounded-lg overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
      <div 
        className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Item Image */}
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200">
          {imgError ? (
            <span className="text-2xl">📦</span>
          ) : (
            <GameImage
              slug={itemSlug}
              alt={item.name}
              width={40}
              height={40}
              onAllFailed={() => setImgError(true)}
            />
          )}
        </div>
        
        {/* Item Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {itemLink ? (
              <Link 
                href={itemLink}
                className="font-medium text-slate-800 hover:text-orange-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-slate-800">{item.name}</span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full ${qualityStyle.bg} ${qualityStyle.text} font-medium`}>
              {item.quality === 'any' ? 'Any Quality' : `${item.quality.charAt(0).toUpperCase() + item.quality.slice(1)} Quality`}
            </span>
          </div>
          <p className="text-sm text-slate-500 truncate">{item.source}</p>
        </div>
        
        {/* Quantity */}
        <div className="text-right flex-shrink-0">
          <span className="text-lg font-bold text-orange-600">×{item.quantity}</span>
        </div>
        
        {/* Expand Arrow */}
        <div className="text-slate-400">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-200 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-1">📍 How to Get</h4>
              <p className="text-sm text-slate-600">{item.source}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-1">✨ Quality Required</h4>
              <p className="text-sm text-slate-600">
                {item.quality === 'any' 
                  ? 'Any quality will work - even basic quality!'
                  : `Must be ${item.quality} quality or higher. Use fertilizer!`}
              </p>
            </div>
          </div>          <div className="mt-3 flex gap-2">
            {itemLink && (
              <Link 
                href={itemLink}
                className="text-xs px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                View Details <ExternalLink size={12} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedBundleCard({ bundle }) {
  const diffStyle = DIFFICULTY_STYLES[bundle.difficulty] || DIFFICULTY_STYLES['Medium'];
  const DiffIcon = diffStyle.Icon;
  
  return (
    <Link href={`/bundle/${bundle.slug}`} className="block group">
      <div className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-orange-400 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">{bundle.name}</h4>
          <DiffIcon className={`${diffStyle.text}`} size={16} />
        </div>
        <p className="text-xs text-slate-500">{bundle.itemsRequired} items • {bundle.reward.item}</p>
      </div>
    </Link>
  );
}

export default function BundleDetailContent({ bundle, room, relatedBundles, allRooms, strategy, roomStrategy }) {
  const diffStyle = DIFFICULTY_STYLES[bundle.difficulty] || DIFFICULTY_STYLES['Medium'];
  const roomStyle = ROOM_STYLES[bundle.roomSlug] || ROOM_STYLES['pantry'];
  const DiffIcon = diffStyle.Icon;
  const RoomIcon = roomStyle.Icon;

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/bundles" className="hover:text-orange-600 transition-colors">Bundles</Link>
        <span>/</span>
        <Link href={`/bundles#${bundle.roomSlug}`} className={`hover:text-orange-600 transition-colors ${roomStyle.text} flex items-center gap-1`}>
          <RoomIcon size={14} /> {bundle.room}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{bundle.name}</span>
      </nav>

      {/* Hero Section */}
      <header className={`mb-8 bg-gradient-to-br ${roomStyle.gradient} to-white rounded-2xl p-6 md:p-8 border-2 ${roomStyle.border}`}>
        {/* Back Link */}
        <Link 
          href="/bundles" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>All Bundles</span>
        </Link>

        {/* Bundle Header */}
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Bundle Icon/Image */}
          <div className={`w-24 h-24 ${roomStyle.bg} ${roomStyle.border} border-2 rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <span className="text-5xl">{room?.icon || '📦'}</span>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{bundle.name}</h1>
            <p className="text-lg text-slate-600 mb-4">{bundle.description}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full ${roomStyle.bg} ${roomStyle.text} ${roomStyle.border} border text-sm font-medium flex items-center gap-1`}>
                <RoomIcon size={14} /> {bundle.room}
              </span>
              <span className={`px-3 py-1 rounded-full ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border} border text-sm font-medium flex items-center gap-1`}>
                <DiffIcon size={14} /> {bundle.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm">
                {bundle.itemsRequired}/{bundle.items.length} items required
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Required Items */}
          <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={24} />
                Required Items
                <span className="text-sm font-normal text-slate-500">
                  ({bundle.itemsRequired} of {bundle.items.length} needed)
                </span>
              </h2>
            </div>            <div className="p-4 space-y-3">
              {bundle.items.map((item, index) => (
                <ItemRow key={index} item={item} index={index} />
              ))}
            </div>
          </div>          {/* Expert Tips */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Lightbulb className="text-yellow-500" size={24} />
              Expert Tips
            </h2>
            <div className="space-y-3">
              <p className="text-slate-600">{bundle.tips}</p>
              
              {/* Difficulty-specific tips */}
              <div className={`mt-4 p-4 rounded-lg ${diffStyle.bg} ${diffStyle.border} border`}>
                <p className={`font-medium ${diffStyle.text} mb-1 flex items-center gap-1`}>
                  <DiffIcon size={16} /> Difficulty: {bundle.difficulty}
                </p>
                <p className="text-sm text-slate-600">{diffStyle.desc}</p>
              </div>
            </div>
          </div>

          {/* Expert Strategy Section - EEAT Content */}
          {strategy && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-emerald-300 bg-emerald-100">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="text-emerald-600" size={24} />
                  Expert Strategy Guide
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {/* Pro Tip */}
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                    <Star className="text-yellow-500" size={16} />
                    Pro Tip
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{strategy.proTip}</p>
                </div>
                
                {/* Strategy Note */}
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <h3 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                    <Lightbulb className="text-amber-500" size={16} />
                    Strategy Analysis
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{strategy.strategyNote}</p>
                </div>
                
                {/* Year One Guide */}
                {strategy.yearOneStrategy && (
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <h3 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                      <Clock className="text-blue-500" size={16} />
                      Year 1 Completion Guide
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{strategy.yearOneStrategy}</p>
                  </div>
                )}
                
                {/* Common Mistakes */}
                {strategy.commonMistake && (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                      <AlertTriangle className="text-red-500" size={16} />
                      Common Mistakes to Avoid
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{strategy.commonMistake}</p>
                  </div>
                )}
                
                {/* Reward Value */}
                {strategy.rewardValue && (
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h3 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                      <Gift className="text-amber-500" size={16} />
                      Why This Reward Matters
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{strategy.rewardValue}</p>
                  </div>
                )}
                
                {/* Alternative Source */}
                {strategy.alternativeSource && (
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                      <ExternalLink className="text-purple-500" size={16} />
                      Alternative Sources
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{strategy.alternativeSource}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Room Strategy Section */}
          {roomStrategy && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-blue-300 bg-blue-100">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="text-blue-600" size={24} />
                  {bundle.room} Room Guide
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-700 mb-2">Overview</h3>
                  <p className="text-slate-700 leading-relaxed">{roomStrategy.overview}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-700 mb-2 text-sm">Completion Order</h3>
                    <p className="text-slate-600 text-sm">{roomStrategy.completionOrder}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-700 mb-2 text-sm">Year 1 Guide</h3>
                    <p className="text-slate-600 text-sm">{roomStrategy.yearOneGuide}</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="font-semibold text-amber-700 mb-2">Room Reward</h3>
                  <p className="text-slate-700">{roomStrategy.reward}</p>
                </div>
                <div className={`rounded-lg p-3 ${
                  roomStrategy.priority.includes('HIGH') ? 'bg-green-50 border border-green-200' :
                  roomStrategy.priority.includes('MEDIUM') ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-slate-100 border border-slate-200'
                }`}>
                  <span className={`font-semibold text-sm ${
                    roomStrategy.priority.includes('HIGH') ? 'text-green-700' :
                    roomStrategy.priority.includes('MEDIUM') ? 'text-yellow-700' :
                    'text-slate-600'
                  }`}>Priority: </span>
                  <span className="text-slate-600 text-sm">{roomStrategy.priority}</span>
                </div>
              </div>
            </div>
          )}

          {/* Warning for Hard Bundles */}
          {(bundle.difficulty === 'Hard' || bundle.difficulty === 'Very Hard') && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-700 flex items-center gap-2 mb-3">
                <AlertTriangle size={20} />
                Watch Out!
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {bundle.roomSlug === 'pantry' && bundle.slug.includes('artisan') && (
                  <>
                    <li>• Fruit trees take 28 days to mature - plant in Year 1!</li>
                    <li>• You need a Deluxe Barn with a pig for Truffle Oil</li>
                    <li>• Truffles only spawn when pig is outside on non-rainy days</li>
                  </>
                )}
                {bundle.slug.includes('dye') && (
                  <>
                    <li>• Red Cabbage seeds are only sold Year 2+</li>
                    <li>• Check the Traveling Cart for early Red Cabbage!</li>
                    <li>• Duck Feather needs high friendship with your duck</li>
                  </>
                )}
                {bundle.slug.includes('specialty-fish') && (
                  <>
                    <li>• Pufferfish: Summer sunny days, 12pm-4pm ONLY</li>
                    <li>• You need Desert access for Sandfish</li>
                    <li>• Woodskip requires access to the Secret Woods</li>
                  </>
                )}
                {bundle.slug.includes('missing') && (
                  <>
                    <li>• This is post-game content - complete Community Center first!</li>
                    <li>• Prismatic Shard is very rare - keep your first one for Galaxy Sword</li>
                    <li>• Dinosaur Egg is needed - check Skull Cavern or Fishing Treasure</li>
                  </>
                )}
                {!bundle.slug.includes('artisan') && !bundle.slug.includes('dye') && 
                 !bundle.slug.includes('specialty-fish') && !bundle.slug.includes('missing') && (
                  <>
                    <li>• This bundle requires advanced preparation</li>
                    <li>• Some items are season-specific - plan ahead!</li>
                    <li>• Consider using the Traveling Cart for rare items</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Reward Card */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-300 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Gift className="text-orange-500" size={20} />
              Bundle Reward
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 border border-orange-200 rounded-lg flex items-center justify-center">
                <Sparkles className="text-yellow-500" size={32} />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{bundle.reward.quantity}×</p>
                <p className="text-slate-800 font-medium">{bundle.reward.item}</p>
              </div>
            </div>
          </div>

          {/* Room Info */}
          {room && (
            <div className={`${roomStyle.bg} ${roomStyle.border} border-2 rounded-xl p-6`}>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <MapPin className={roomStyle.text} size={20} />
                {room.name}
              </h3>
              <p className="text-sm text-slate-600 mb-3">{room.description}</p>
              <div className="bg-white/80 rounded-lg p-3 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Room Completion Reward</p>
                <p className="text-slate-800 font-medium">{room.reward}</p>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Items</span>
                <span className="text-slate-800 font-medium">{bundle.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Items Required</span>
                <span className="text-slate-800 font-medium">{bundle.itemsRequired}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Difficulty</span>
                <span className={`font-medium ${diffStyle.text}`}>{bundle.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room</span>
                <span className={`font-medium ${roomStyle.text}`}>{bundle.room}</span>
              </div>
            </div>
          </div>

          {/* Related Bundles */}
          {relatedBundles.length > 0 && (
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Other {bundle.room} Bundles
              </h3>
              <div className="space-y-3">
                {relatedBundles.map(b => (
                  <RelatedBundleCard key={b.slug} bundle={b} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 py-8 px-4 bg-slate-50 border-t border-slate-200 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link 
              href="/bundles"
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to All Bundles
            </Link>
            <div className="flex gap-3">
              <Link 
                href="/recipes"
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors text-sm"
              >
                Cooking Recipes
              </Link>
              <Link 
                href="/fishing"
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors text-sm"
              >
                Fishing Guide
              </Link>
              <Link 
                href="/"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm"
              >
                Item Prices
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </main>
  );
}
