'use client';

import Link from 'next/link';
import ScrollToTop from '@/components/ScrollToTop';

function NPCCard({ npc }) {
  return (
    <Link 
      href={`/gift/${npc.slug}`}
      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-blue-300 transition group"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition bg-gradient-to-br from-blue-50 to-purple-50">
          <img 
            src={`/images/npcs/${npc.slug}.png`}
            alt={npc.name}
            className="w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
              {npc.name}
            </h3>
            {npc.marriageable && (
              <span className="text-pink-500 text-xs">💍</span>
            )}
          </div>
          <p className="text-sm text-slate-500 truncate">
            📅 {npc.birthday}
          </p>
          <p className="text-xs text-slate-400 truncate">
            ❤️ {npc.gifts.love[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function GiftsContent({ npcs }) {
  const marriageCandidates = npcs.filter(npc => npc.marriageable);
  const otherVillagers = npcs.filter(npc => !npc.marriageable);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
      <ScrollToTop />
      
      {/* Hero */}
      <div className="text-center py-12 bg-gradient-to-b from-[#1e293b] to-[#334155] rounded-3xl mb-12 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Stardew Valley <span className="text-pink-400">Gift Guide</span>
        </h1>        <p className="text-lg text-slate-300 max-w-2xl mx-auto px-4">
          {npcs.length} characters: loved gifts, liked gifts, hated gifts, birthdays. {marriageCandidates.length} marriage candidates.
        </p>
      </div>

      {/* Quick Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-10">
        <h2 className="font-bold text-yellow-800 mb-3">🎁 Gift Giving Tips</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-yellow-700">
          <div>
            <strong>Birthday Bonus:</strong> Gifts on birthdays give 8x friendship points!
          </div>
          <div>
            <strong>Universal Loves:</strong> Golden Pumpkin, Pearl, Prismatic Shard, Rabbit's Foot
          </div>
          <div>
            <strong>Gift Limit:</strong> You can give 2 gifts per week per NPC (plus birthday)
          </div>
        </div>
      </div>

      {/* Marriage Candidates */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          💍 Marriage Candidates
          <span className="text-sm font-normal text-slate-500">({marriageCandidates.length})</span>
        </h2>
        <p className="text-slate-500 mb-6">
          These villagers can be dated and married. Reach 8 hearts and give them a bouquet!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marriageCandidates.map(npc => (
            <NPCCard key={npc.id} npc={npc} />
          ))}
        </div>
      </section>

      {/* Other Villagers */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          🏘️ Other Villagers
          <span className="text-sm font-normal text-slate-500">({otherVillagers.length})</span>
        </h2>
        <p className="text-slate-500 mb-6">
          Build friendships with all the other residents of Pelican Town.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherVillagers.map(npc => (
            <NPCCard key={npc.id} npc={npc} />
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="mt-16 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Stardew Valley Gift Guide - Complete NPC Database
        </h2>
        <div className="prose prose-slate max-w-none text-sm">
          <p>
            Building friendships in Stardew Valley is essential for unlocking new recipes, 
            getting special items, and experiencing heart events. Each of the {npcs.length} NPCs 
            has unique gift preferences - some items they love, and others they hate.
          </p>
          <h3>How Gifts Work</h3>
          <ul>
            <li><strong>Loved gifts:</strong> +80 friendship points</li>
            <li><strong>Liked gifts:</strong> +45 friendship points</li>
            <li><strong>Neutral gifts:</strong> +20 friendship points</li>
            <li><strong>Disliked gifts:</strong> -20 friendship points</li>
            <li><strong>Hated gifts:</strong> -40 friendship points</li>
          </ul>
          <h3>Pro Tips</h3>
          <ul>
            <li>Mark birthdays on your calendar - the 8x multiplier is huge!</li>
            <li>Universal loves work on almost everyone (except a few exceptions)</li>
            <li>Quality of the gift matters - higher quality = bonus points</li>
            <li>Talking to NPCs daily also builds friendship (+20 points)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
