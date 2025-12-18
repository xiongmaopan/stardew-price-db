'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, Heart, ThumbsUp, Meh, ThumbsDown, XCircle,
  Calendar, MapPin, Clock, Gift, Users, Sparkles, ArrowUp,
  Star, Info
} from 'lucide-react';

// Gift tier configuration
const GIFT_TIERS = {
  love: { 
    icon: Heart, 
    color: 'text-red-500', 
    bg: 'bg-red-50', 
    border: 'border-red-200',
    label: 'Loved Gifts',
    points: '+80 points',
    description: 'Best possible gifts - give these for maximum friendship!'
  },
  like: { 
    icon: ThumbsUp, 
    color: 'text-green-500', 
    bg: 'bg-green-50', 
    border: 'border-green-200',
    label: 'Liked Gifts',
    points: '+45 points',
    description: 'Good gifts that will make them happy.'
  },
  neutral: { 
    icon: Meh, 
    color: 'text-gray-500', 
    bg: 'bg-gray-50', 
    border: 'border-gray-200',
    label: 'Neutral Gifts',
    points: '+20 points',
    description: 'They don\'t mind these, but won\'t be excited.'
  },
  dislike: { 
    icon: ThumbsDown, 
    color: 'text-orange-500', 
    bg: 'bg-orange-50', 
    border: 'border-orange-200',
    label: 'Disliked Gifts',
    points: '-20 points',
    description: 'Avoid giving these items.'
  },
  hate: { 
    icon: XCircle, 
    color: 'text-red-600', 
    bg: 'bg-red-100', 
    border: 'border-red-300',
    label: 'Hated Gifts',
    points: '-40 points',
    description: 'Never give these - they will be very upset!'
  }
};

function GiftSection({ tier, gifts }) {
  const config = GIFT_TIERS[tier];
  const Icon = config.icon;
  
  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-5`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-bold flex items-center gap-2 ${config.color}`}>
          <Icon size={20} />
          {config.label}
        </h3>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
          {config.points}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-3">{config.description}</p>
      <div className="flex flex-wrap gap-2">
        {gifts.map((gift, index) => (
          <span 
            key={index}
            className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm"
          >
            {gift}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeartEventCard({ event }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(Math.floor(event.hearts / 2))].map((_, i) => (
            <Heart key={i} size={16} className="text-red-500 fill-red-500" />
          ))}
          {event.hearts % 2 === 1 && (
            <Heart size={16} className="text-red-500" />
          )}
        </div>
        <span className="text-sm font-bold text-slate-700">{event.hearts} Hearts</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <MapPin size={14} />
        <span>{event.location}</span>
      </div>
      <p className="text-sm text-slate-600">{event.description}</p>
    </div>
  );
}

function NPCCard({ npc }) {
  return (
    <Link 
      href={`/gift/${npc.slug}`}
      className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-blue-300 transition group"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition bg-gradient-to-br from-blue-50 to-purple-50">
          <img 
            src={`/images/npcs/${npc.slug}.png`}
            alt={npc.name}
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition">
            {npc.name}
          </h4>
          <p className="text-xs text-slate-500">{npc.birthday}</p>
        </div>
        {npc.marriageable && (
          <Heart size={14} className="ml-auto text-pink-500 fill-pink-500" />
        )}
      </div>
    </Link>
  );
}

export default function GiftGuideContent({ npc, relatedNpcs, universalGifts }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState('gifts');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <ChevronRight size={14} className="mx-2 flex-shrink-0" />
        <Link href="/gifts" className="hover:text-blue-600 transition">Gift Guides</Link>
        <ChevronRight size={14} className="mx-2 flex-shrink-0" />
        <span className="font-semibold text-slate-800">{npc.name}</span>
      </nav>      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8 border border-pink-100">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* NPC Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 bg-gradient-to-br from-pink-100 to-purple-100">
            <img 
              src={`/images/npcs/${npc.slug}.png`}
              alt={npc.name}
              className="w-full h-full object-cover"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          
          {/* NPC Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                {npc.name}
              </h1>
              {npc.marriageable && (
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Heart size={14} className="fill-pink-500" />
                  Marriage Candidate
                </span>
              )}
            </div>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              {npc.description}
            </p>
            
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={18} className="text-pink-500" />
                <div>
                  <span className="text-slate-500">Birthday</span>
                  <p className="font-semibold text-slate-800">{npc.birthday}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={18} className="text-blue-500" />
                <div>
                  <span className="text-slate-500">Location</span>
                  <p className="font-semibold text-slate-800">{npc.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2 md:col-span-1">
                <Gift size={18} className="text-green-500" />
                <div>
                  <span className="text-slate-500">Best Gift</span>
                  <p className="font-semibold text-slate-800">{npc.gifts.love[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Birthday Tip Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Sparkles className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="font-semibold text-yellow-800">Birthday Bonus!</h3>
          <p className="text-sm text-yellow-700">
            {npc.name}'s birthday is <strong>{npc.birthday}</strong>. Gifts given on their birthday receive an <strong>8x multiplier</strong>! 
            A loved gift on their birthday gives <strong>+640 friendship points</strong>.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'gifts', label: 'Gift Guide', icon: Gift },
          { id: 'schedule', label: 'Schedule & Events', icon: Clock },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gift Guide Tab */}
      {activeTab === 'gifts' && (
        <div className="space-y-6">
          {/* Loved Gifts - Highlighted */}
          <GiftSection tier="love" gifts={npc.gifts.love} />
          
          {/* Other Gift Tiers */}
          <div className="grid md:grid-cols-2 gap-6">
            <GiftSection tier="like" gifts={npc.gifts.like} />
            <GiftSection tier="neutral" gifts={npc.gifts.neutral} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <GiftSection tier="dislike" gifts={npc.gifts.dislike} />
            <GiftSection tier="hate" gifts={npc.gifts.hate} />
          </div>

          {/* Universal Gifts Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-8">
            <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
              <Info size={18} />
              Universal Gifts
            </h3>
            <p className="text-sm text-blue-700 mb-4">
              These items are loved/liked by almost everyone in Stardew Valley:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-600 text-sm mb-2 flex items-center gap-1">
                  <Heart size={14} /> Universal Loves
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {universalGifts.love.map((gift, i) => (
                    <span key={i} className="px-2 py-1 bg-white rounded text-xs font-medium text-slate-700 border">
                      {gift}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 text-sm mb-2 flex items-center gap-1">
                  <ThumbsUp size={14} /> Universal Likes (Examples)
                </h4>
                <p className="text-xs text-slate-600">
                  Most Artisan Goods, Cooked Dishes, Flowers, Gems, and Vegetables
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule & Events Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-8">
          {/* Schedule */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Daily Schedule
            </h2>
            <p className="text-slate-600">{npc.schedule}</p>
          </div>

          {/* Heart Events */}
          {npc.heartEvents && npc.heartEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Star size={20} className="text-yellow-500" />
                Heart Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {npc.heartEvents.map((event, index) => (
                  <HeartEventCard key={index} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* No Heart Events for non-marriageable */}
          {(!npc.heartEvents || npc.heartEvents.length === 0) && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">
              <p className="text-slate-500">
                {npc.name} doesn't have special heart events, but you can still build friendship with them!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Related NPCs */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users size={20} className="text-purple-600" />
          {npc.marriageable ? 'Other Marriage Candidates' : 'Other Villagers'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedNpcs.map(relatedNpc => (
            <NPCCard key={relatedNpc.id} npc={relatedNpc} />
          ))}
        </div>
      </div>

      {/* FAQ Section for SEO */}
      <section className="mt-12 bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Frequently Asked Questions about {npc.name}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">
              What are the best gifts for {npc.name}?
            </h3>
            <p className="text-slate-600 text-sm">
              {npc.name}'s favorite gifts (loved items) are: {npc.gifts.love.slice(0, 5).join(', ')}.
              These give +80 friendship points (+640 on their birthday!).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">
              When is {npc.name}'s birthday?
            </h3>
            <p className="text-slate-600 text-sm">
              {npc.name}'s birthday is on {npc.birthday}. Mark this date on your calendar! 
              Giving a gift on their birthday multiplies friendship points by 8x.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">
              Where can I find {npc.name}?
            </h3>
            <p className="text-slate-600 text-sm">
              {npc.name} lives at {npc.location}. {npc.schedule}
            </p>
          </div>
          {npc.marriageable && (
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Can I marry {npc.name}?
              </h3>
              <p className="text-slate-600 text-sm">
                Yes! {npc.name} is a marriage candidate. You need to reach 8 hearts and give them a bouquet 
                to start dating. At 10 hearts, you can propose with a Mermaid's Pendant (purchased from the Old Mariner on rainy days).
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
