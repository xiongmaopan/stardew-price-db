'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import {
  ArrowUp,
  BookOpen,
  Calculator,
  ChevronRight,
  Database,
  Fish,
  Gem,
  Package,
  Search,
  Sprout,
} from 'lucide-react';
import GameImage from '@/components/GameImage';
import ItemCard from '@/components/ItemCard';
import itemsData from '@/data/items.json';
import verificationData from '@/data/verification.json';

const categories = [
  'All',
  'Crops',
  'Fish',
  'Forage',
  'Minerals',
  'Animal Products',
  'Artisan Goods',
  'Resources',
];

const featuredSlugs = [
  'starfruit',
  'ancient-fruit',
  'sweet-gem-berry',
  'pumpkin',
  'lava-eel',
  'truffle',
  'diamond',
  'raisins',
  'mystic-syrup',
];

const workflowLinks = [
  {
    href: '/selling-prices/',
    title: 'All Selling Prices',
    text: 'Full item, fish, quality, profession, and source table.',
    icon: Database,
    accent: 'text-blue-700 bg-blue-50 border-blue-100',
  },
  {
    href: '/crop-profit-calculator/',
    title: 'Crop Profit Calculator',
    text: 'Compare seed cost, harvest count, quality, Tiller, Keg, and Jar value.',
    icon: Calculator,
    accent: 'text-green-700 bg-green-50 border-green-100',
  },
  {
    href: '/guide/keg-vs-jar/',
    title: 'Keg vs Jar Math',
    text: 'Use exact processing formulas before choosing machines.',
    icon: Package,
    accent: 'text-amber-700 bg-amber-50 border-amber-100',
  },
  {
    href: '/guide/',
    title: 'Player Guides',
    text: 'Season rankings, greenhouse plans, fish ponds, gifts, and bundles.',
    icon: BookOpen,
    accent: 'text-purple-700 bg-purple-50 border-purple-100',
  },
];

const categoryHubs = [
  { href: '/crops/', title: 'Crops', text: 'Growth time, seed cost, regrowth, and processing.', icon: Sprout },
  { href: '/fishing/', title: 'Fish', text: 'Sell prices, seasons, locations, weather, and roe.', icon: Fish },
  { href: '/artisan-goods/', title: 'Artisan Goods', text: 'Wine, Juice, Jelly, Pickles, Roe, and syrups.', icon: Package },
  { href: '/minerals/', title: 'Minerals', text: 'Gem, geode, and mining sale values.', icon: Gem },
];

const guideLinks = [
  ['Most Profitable Crops', '/guide/most-profitable-crops/'],
  ['Best Greenhouse Crops', '/guide/best-greenhouse-crops/'],
  ['Ancient Fruit vs Starfruit', '/guide/ancient-fruit-vs-starfruit/'],
  ['Starfruit Wine Guide', '/guide/starfruit-wine/'],
  ['Best Keg Items', '/guide/best-keg-items/'],
  ['Best Fish by Season', '/guide/best-fish-by-season/'],
  ['Best Jar Items', '/guide/best-preserves-jar-items/'],
  ['Community Center Guide', '/guide/community-center/'],
];

const originalGuideCards = [
  {
    href: '/guide/money-making-methods-ranked/',
    title: 'Money Making Methods Ranked',
    text: 'Eight farm economies ranked by setup cost, daily labor, season limits, automation, and real player value.',
    art: ['keg', 'sheep', 'pig'],
  },
  {
    href: '/guide/year-1-spring-guide/',
    title: 'Year 1 Spring Guide',
    text: 'A first-Spring route covering crops, fishing cash, Mines, bundles, Strawberries, Speed-Gro, and Summer prep.',
    art: ['strawberry', 'speed-gro', 'quality-sprinkler'],
  },
  {
    href: '/guide/joja-vs-community-center/',
    title: 'Joja vs Community Center',
    text: 'A route-choice guide comparing story value, unlock speed, Greenhouse timing, and total gold cost.',
    art: ['spring-seeds', 'gold', 'calendar'],
  },
  {
    href: '/guide/beginner-mistakes/',
    title: 'Beginner Mistakes to Avoid',
    text: 'Ten avoidable mistakes that cost rare items, friendship, crops, machines, or farm progress.',
    art: ['prismatic-shard', 'dinosaur-egg', 'bomb'],
  },
];

const editorialSignals = [
  ['Original analysis', 'Guide pages add route choices, tradeoffs, rankings, and practical decisions instead of only repeating item facts.'],
  ['Mechanics checked', `Prices, formulas, and route notes are checked against the Stardew Valley ${verificationData.gameVersion} data audit.`],
  ['Tools connected', 'Guides link into calculators and item pages so players can verify the math behind each recommendation.'],
];

function GuideArt({ slugs }) {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {slugs.map((slug) => (
        <div key={slug} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-green-100 bg-white shadow-sm">
          <GameImage slug={slug} alt="" width={28} height={28} />
        </div>
      ))}
    </div>
  );
}

function normalize(text) {
  return text.toLowerCase().trim();
}

export default function HomeContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showAllItems, setShowAllItems] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const categoryFromUrl = new URLSearchParams(window.location.search).get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setFilterCat(categoryFromUrl);
      setShowAllItems(true);
    }
  }, []);

  const featuredItems = useMemo(() => {
    return featuredSlugs
      .map((slug) => itemsData.items.find((item) => item.slug === slug))
      .filter(Boolean);
  }, []);

  const filteredItems = useMemo(() => {
    const query = normalize(searchTerm);

    return itemsData.items.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.subcategory?.toLowerCase().includes(query);
      const matchesCat = filterCat === 'All' || item.category === filterCat;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, filterCat]);

  const isBrowsing = searchTerm.trim().length > 0 || filterCat !== 'All' || showAllItems;
  const visibleItems = isBrowsing ? filteredItems.slice(0, showAllItems ? filteredItems.length : 24) : featuredItems;
  const hiddenCount = Math.max(0, filteredItems.length - visibleItems.length);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="animate-fade-in">
      <section className="mb-8">
        <div className="max-w-2xl mx-auto relative">
          <label htmlFor="home-price-search" className="sr-only">Search Stardew Valley selling prices</label>
          <input
            id="home-price-search"
            type="search"
            placeholder="Search prices: Pumpkin, Lava Eel, Wine, Raisins..."
            className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setShowAllItems(false);
            }}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCat(cat);
                setShowAllItems(cat !== 'All');
              }}
              className={`min-h-11 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                filterCat === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {!isBrowsing && (
        <section className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflowLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border ${link.accent}`}>
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold text-slate-950">{link.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{link.text}</p>
              </Link>
            );
          })}
        </section>
      )}

      {!isBrowsing && (
        <section className="mb-12">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                StardewPriceDB original content
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Original guides built around player decisions</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The guide library is written around routes, tradeoffs, rankings, and checked formulas: what to plant,
                when to process, which path to choose, and how a decision changes the farm economy.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/guide/"
                className="inline-flex min-h-10 items-center rounded-lg bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800"
              >
                View original guides
              </Link>
              <Link
                href="/about-data/"
                className="inline-flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:border-green-300 hover:text-green-700"
              >
                Data audit
              </Link>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.45fr_0.75fr]">
            <div className="grid gap-4 md:grid-cols-2">
              {originalGuideCards.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-lg border border-green-100 bg-white p-5 shadow-sm transition hover:border-green-300 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-green-800">
                      Original Guide
                    </span>
                    <GuideArt slugs={guide.art} />
                  </div>
                  <h3 className="text-lg font-black text-slate-950">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{guide.text}</p>
                </Link>
              ))}
            </div>

            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-black text-slate-950">Editorial standards</h3>
              <div className="mt-4 grid gap-3">
                {editorialSignals.map(([title, text]) => (
                  <div key={title} className="rounded-lg bg-white p-4">
                    <p className="text-sm font-black text-slate-950">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      )}

      <section className="mb-12">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
              {isBrowsing ? `${filteredItems.length} matching entries` : 'Popular price checks'}
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {isBrowsing ? 'Browse Stardew Valley prices' : 'Fast answers for common searches'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/selling-prices/"
              className="inline-flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700"
            >
              Full price table
              <ChevronRight className="ml-1" size={16} />
            </Link>
            {!showAllItems && hiddenCount > 0 && (
              <button
                onClick={() => setShowAllItems(true)}
                className="inline-flex min-h-10 items-center rounded-lg bg-blue-700 px-4 text-sm font-bold text-white hover:bg-blue-800"
              >
                Show all {filteredItems.length}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {hiddenCount > 0 && !showAllItems && (
          <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
            Showing the first {visibleItems.length} matches. Use search, a category filter, or the full table for the rest.
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white py-16 text-center text-slate-500">
            <p className="text-lg font-bold text-slate-800">No items found</p>
            <p className="mt-2 text-sm">Try another item name, category, or guide topic.</p>
          </div>
        )}
      </section>

      <section className="mb-12 grid gap-4 lg:grid-cols-4">
        {categoryHubs.map((hub) => {
          const Icon = hub.icon;
          return (
            <Link
              key={hub.href}
              href={hub.href}
              className="group rounded-lg border border-slate-200 bg-white p-5 transition hover:border-green-300 hover:shadow-md"
            >
              <Icon className="mb-4 text-green-700" size={24} />
              <h2 className="text-lg font-bold text-slate-950 group-hover:text-green-700">{hub.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{hub.text}</p>
            </Link>
          );
        })}
      </section>

      <section className="mb-12 rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Guides</p>
            <h2 className="text-2xl font-black text-slate-950">Plan profit, not just price</h2>
          </div>
          <Link href="/guide/" className="text-sm font-bold text-blue-700 hover:underline">
            View all guides
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {guideLinks.map(([title, href]) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-14 items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {title}
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-950">How this Stardew Valley price database works</h2>
        <div className="mt-4 max-w-none space-y-4 text-slate-700">
          <p>
            Every price here reflects Stardew Valley {verificationData.gameVersion} game data. The database covers raw
            sell prices, quality multipliers, profession bonuses, Keg values, Preserves Jar values, Dehydrator formulas,
            Fish Smoker values, and Fish Pond roe calculations.
          </p>
          <p>
            The goal is to answer player decisions that a static wiki table cannot answer quickly: whether a crop is
            better raw or processed, whether a late planting can still pay back, which profession changes a result, and
            when a high-price item is actually worse after seed cost or machine time.
          </p>
          <p>
            Base sell price is only the starting point. Crop quality changes raw sale value, Tiller adds 10% to crops,
            Angler adds 25% to fish, Rancher adds 20% to animal products, and Artisan adds 40% to most processed goods.
            Use the calculator and guide pages when machine time, seed cost, or harvest count changes the real profit.
          </p>
          <ul className="grid gap-2 text-sm md:grid-cols-2">
            <li className="rounded-lg bg-slate-50 p-3">Quality values use Silver 1.25x, Gold 1.5x, and Iridium 2x.</li>
            <li className="rounded-lg bg-slate-50 p-3">Keg and Jar outputs are calculated from each input item.</li>
            <li className="rounded-lg bg-slate-50 p-3">Variable goods such as Dried Fruit and Smoked Fish use formulas.</li>
            <li className="rounded-lg bg-slate-50 p-3">Data was last checked on May 19, 2026.</li>
          </ul>
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-700 p-3 text-white shadow-lg transition hover:bg-blue-800"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
