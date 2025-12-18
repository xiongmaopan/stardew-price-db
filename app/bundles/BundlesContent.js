'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Gift, 
  ChevronDown, 
  ChevronUp,
  Star,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  Sprout,
  Zap,
  Flame,
  Skull,
  ShoppingCart,
  CloudRain,
  Calendar,
  Gem,
  Package,
  Fish,
  Hammer,
  MessageSquare,
  Coins,
  Building
} from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';

// Room colors and icons (Light theme)
const ROOM_STYLES = {
  'pantry': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', gradient: 'from-amber-50', Icon: Package },
  'fish-tank': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', gradient: 'from-blue-50', Icon: Fish },
  'crafts-room': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', gradient: 'from-green-50', Icon: Hammer },
  'boiler-room': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', gradient: 'from-orange-50', Icon: Flame },
  'bulletin-board': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', gradient: 'from-purple-50', Icon: MessageSquare },
  'vault': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', gradient: 'from-yellow-50', Icon: Coins },
  'abandoned-jojamart': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', gradient: 'from-pink-50', Icon: Building },
};

// Difficulty styles (Light theme)
const DIFFICULTY_STYLES = {
  'Easy': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', Icon: Sprout },
  'Medium': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', Icon: Zap },
  'Hard': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', Icon: Flame },
  'Very Hard': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', Icon: Skull },
};

// Featured bundles for hero section
const FEATURED_BUNDLES = [
  { slug: 'spring-crops-bundle', reason: 'Best First Bundle' },
  { slug: 'quality-crops-bundle', reason: 'Preserves Jar Reward' },
  { slug: 'artisan-bundle', reason: 'Keg Reward (Best!)' },
  { slug: 'specialty-fish-bundle', reason: 'Hardest Fish Bundle' },
];

// Pro tips for completion (using Lucide icons)
const PRO_TIPS = [
  { Icon: ShoppingCart, tip: 'Check the Traveling Cart every Friday & Sunday for rare bundle items' },
  { Icon: CloudRain, tip: 'Fish on rainy days - many bundle fish only appear in rain' },
  { Icon: Sprout, tip: 'Plant fruit trees in Spring Year 1 - they take 28 days to mature' },
  { Icon: Star, tip: 'Use fertilizer for gold quality crops needed in bundles' },
  { Icon: Package, tip: 'Get a pig early - Truffle Oil is needed for the Artisan Bundle' },
  { Icon: Calendar, tip: 'Watch TV daily for weather forecasts and Queen of Sauce recipes' },
];

// FAQ data
const FAQ_DATA = [
  {
    question: 'Can I complete the Community Center in Year 1?',
    answer: 'Yes! The main challenges are Red Cabbage (check Traveling Cart), fruit trees (plant early), and seasonal fish. With good planning and luck, Year 1 completion is achievable.'
  },
  {
    question: 'What\'s the best order to complete bundles?',
    answer: 'Start with Foraging bundles (free!), then Seasonal Crops. Work on Fish Tank during rainy days. Save Vault for last since it only needs gold. The Artisan Bundle needs long-term planning.'
  },
  {
    question: 'What if I chose JojaMart?',
    answer: 'You can still get all community upgrades by purchasing them with gold. However, you\'ll miss bundle rewards and the post-game Missing Bundle/Movie Theater content.'
  },
  {
    question: 'What\'s the Missing Bundle?',
    answer: 'After completing the Community Center, the Abandoned JojaMart opens with a special bundle requiring rare items like Prismatic Shard and Dinosaur Mayonnaise. The reward is the Movie Theater!'
  },
  {
    question: 'Which bundle has the best reward?',
    answer: 'The Artisan Bundle gives a Keg - one of the most profitable items in the game. The Greenhouse (Pantry completion) and Bus (Vault completion) are also game-changing rewards.'
  }
];

function StatCard({ Icon, label, value, color }) {
  const colorStyles = {
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  };
  return (
    <div className={`bg-white rounded-xl p-4 border-2 ${colorStyles[color]?.split(' ')[1] || 'border-slate-200'} hover:shadow-md transition-all`}>
      <div className="flex items-center gap-3">
        <Icon className={colorStyles[color]?.split(' ')[2] || 'text-slate-600'} size={24} />
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function RoomCard({ room, bundleCount }) {
  const style = ROOM_STYLES[room.slug] || ROOM_STYLES['pantry'];
  const RoomIcon = style.Icon;
  
  return (
    <Link href={`#${room.slug}`} className="block group">
      <div className={`${style.bg} ${style.border} border-2 rounded-xl p-4 hover:scale-105 hover:shadow-md transition-all duration-200`}>
        <div className="flex items-center gap-3 mb-2">
          <RoomIcon className={`${style.text}`} size={28} />
          <div>
            <h3 className={`font-bold ${style.text}`}>{room.name}</h3>
            <p className="text-xs text-slate-500">{room.bundles} bundles</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">{room.reward}</p>
      </div>
    </Link>
  );
}

function BundleCard({ bundle }) {
  const diffStyle = DIFFICULTY_STYLES[bundle.difficulty] || DIFFICULTY_STYLES['Medium'];
  const roomStyle = ROOM_STYLES[bundle.roomSlug] || ROOM_STYLES['pantry'];
  const DiffIcon = diffStyle.Icon;
  
  return (
    <Link href={`/bundle/${bundle.slug}`} className="block group">
      <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-orange-400 hover:shadow-lg transition-all duration-200">
        {/* Header with room color */}
        <div className={`bg-gradient-to-r ${roomStyle.gradient} to-white px-4 py-3 border-b border-slate-200`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${roomStyle.text}`}>{bundle.room}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border} border flex items-center gap-1`}>
              <DiffIcon size={12} /> {bundle.difficulty}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors mb-2">
            {bundle.name}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{bundle.description}</p>
          
          {/* Items required */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={14} className="text-green-600" />
              {bundle.itemsRequired} items needed
            </span>
            <span className="flex items-center gap-1">
              <Gift size={14} className="text-orange-500" />
              {bundle.reward.item}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-2 border-slate-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-slate-800 text-left">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-orange-500 flex-shrink-0" /> : <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
          <p className="text-slate-600 text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function BundlesContent({ bundles, rooms }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRoom, setFilterRoom] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Calculate stats
  const stats = useMemo(() => ({
    total: bundles.length,
    rooms: rooms.length,
    easy: bundles.filter(b => b.difficulty === 'Easy').length,
    hard: bundles.filter(b => b.difficulty === 'Hard' || b.difficulty === 'Very Hard').length,
  }), [bundles, rooms]);

  // Filter bundles
  const filteredBundles = useMemo(() => {
    return bundles.filter(bundle => {
      const matchesSearch = bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bundle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bundle.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRoom = filterRoom === 'all' || bundle.roomSlug === filterRoom;
      const matchesDifficulty = filterDifficulty === 'all' || bundle.difficulty === filterDifficulty;
      return matchesSearch && matchesRoom && matchesDifficulty;
    });
  }, [bundles, searchQuery, filterRoom, filterDifficulty]);

  // Group bundles by room
  const bundlesByRoom = useMemo(() => {
    const grouped = {};
    filteredBundles.forEach(bundle => {
      if (!grouped[bundle.roomSlug]) {
        grouped[bundle.roomSlug] = [];
      }
      grouped[bundle.roomSlug].push(bundle);
    });
    return grouped;
  }, [filteredBundles]);

  // Featured bundles
  const featuredBundles = FEATURED_BUNDLES.map(f => ({
    ...f,
    bundle: bundles.find(b => b.slug === f.slug)
  })).filter(f => f.bundle);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      <ScrollToTop />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-slate-800">Community Center Bundles</span>
      </nav>

      {/* Hero Section */}
      <header className="mb-8">
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-6 md:p-8 border-2 border-orange-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            {/* Main Icon */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center border-2 border-orange-300 shadow-md flex-shrink-0">
              <Gift className="text-orange-600" size={48} />
            </div>
            
            {/* Title & Description */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
                Community Center <span className="text-orange-600">Bundles</span>
              </h1>              <p className="text-lg text-slate-600 mb-4 max-w-2xl">
                <strong>{stats.total} bundles</strong> across {stats.rooms} rooms. 
                Rewards: Greenhouse, Bus repair, Bridge repair, Minecarts, and more.
              </p>
              
              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-orange-200">
                  <Package size={14} className="text-orange-600" /> {stats.total} Bundles
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-blue-200">
                  <Building size={14} className="text-blue-600" /> {stats.rooms} Rooms
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-green-200">
                  <Sprout size={14} className="text-green-600" /> {stats.easy} Easy
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm font-medium border border-red-200">
                  <Flame size={14} className="text-red-600" /> {stats.hard} Hard
                </span>
              </div>
            </div>
          </div>

          {/* Room Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {rooms.map(room => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </header>

      {/* Featured Bundles */}
      <section className="py-6 px-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Sparkles className="text-yellow-500" size={24} />
          Featured Bundles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredBundles.map(({ bundle, reason }) => (
            <Link key={bundle.slug} href={`/bundle/${bundle.slug}`} className="group">
              <div className="bg-white border-2 border-orange-200 rounded-xl p-4 hover:border-orange-400 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-yellow-500" size={20} />
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{reason}</span>
                </div>
                <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{bundle.name}</h3>
                <p className="text-sm text-slate-500 mt-1">Reward: {bundle.reward.item}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-4 mb-6 sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 -mx-4 px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search bundles or items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>
          
          {/* Room Filter */}
          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="all">All Rooms</option>
            {rooms.map(room => (
              <option key={room.slug} value={room.slug}>{room.icon} {room.name}</option>
            ))}
          </select>
          
          {/* Difficulty Filter */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">🌱 Easy</option>
            <option value="Medium">⚡ Medium</option>
            <option value="Hard">🔥 Hard</option>
            <option value="Very Hard">💀 Very Hard</option>
          </select>
        </div>
        
        {/* Results count */}
        <p className="text-sm text-slate-500 mt-3">
          Showing {filteredBundles.length} of {bundles.length} bundles
        </p>
      </section>

      {/* Bundles by Room */}
      <section className="py-4">
        {rooms.map(room => {
          const roomBundles = bundlesByRoom[room.slug];
          if (!roomBundles || roomBundles.length === 0) return null;
          
          const roomStyle = ROOM_STYLES[room.slug] || ROOM_STYLES['pantry'];
          
          return (
            <div key={room.slug} id={room.slug} className="mb-12 scroll-mt-24">
              {/* Room Header */}
              <div className={`${roomStyle.bg} ${roomStyle.border} border-2 rounded-xl p-6 mb-6`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{room.icon}</span>
                    <div>
                      <h2 className={`text-2xl font-bold ${roomStyle.text}`}>{room.name}</h2>
                      <p className="text-slate-600">{room.description}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg px-4 py-2 border border-slate-200">
                    <p className="text-sm text-slate-500">Room Reward</p>
                    <p className="font-bold text-slate-800">{room.reward}</p>
                  </div>
                </div>
              </div>
              
              {/* Bundles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roomBundles.map(bundle => (
                  <BundleCard key={bundle.slug} bundle={bundle} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Pro Tips Section */}
      <section className="py-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 mb-8">
        <div className="px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Star className="text-yellow-500" size={24} />
            Pro Tips for Completing Bundles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRO_TIPS.map((tip, index) => {
              const TipIcon = tip.Icon;
              return (
                <div key={index} className="bg-white border-2 border-slate-200 rounded-lg p-4 flex items-start gap-3">
                  <TipIcon className="text-orange-500 flex-shrink-0" size={20} />
                  <p className="text-slate-600 text-sm">{tip.tip}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Info className="text-blue-500" size={24} />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQ_DATA.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 px-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to Complete the Community Center?</h2>
          <p className="text-slate-600 mb-6">
            Click on any bundle above to see detailed item requirements, sources, and expert tips!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/recipes" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors">
              View Cooking Recipes
            </Link>
            <Link href="/fishing" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Fishing Guide
            </Link>
            <Link href="/" className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
              Item Prices
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
