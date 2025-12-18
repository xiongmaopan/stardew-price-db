'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ArrowUp } from 'lucide-react';
import ItemCard from '@/components/ItemCard';
import itemsData from '@/data/items.json';

const categories = ['All', 'Crops', 'Fish', 'Forage', 'Minerals', 'Animal Products'];

export default function HomeContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 监听滚动显示返回顶部按钮
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

  // 从 URL 参数读取分类
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setFilterCat(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return itemsData.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = filterCat === 'All' || item.category === filterCat;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, filterCat]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20 bg-gradient-to-b from-[#1e293b] to-[#334155] rounded-3xl mb-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Stardew Valley <span className="text-yellow-400">Price Database</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Sell prices, Keg/Jar profits, Tiller (+10%) & Artisan (+40%) bonuses. Data verified for v1.6.
          </p>
          
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search items (e.g., Pumpkin, Ancient Fruit...)" 
              className="w-full pl-12 pr-4 py-4 rounded-full text-slate-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              filterCat === cat 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Count */}
      <div className="mb-6 text-center text-slate-500 text-sm">
        Showing {filteredItems.length} of {itemsData.items.length} items
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-xl mb-2">No items found</p>
          <p className="text-sm">Try a different search term or category</p>
        </div>
      )}

      {/* Guides Section */}
      <section className="mt-16 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">📚 In-Depth Guides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="/guide/most-profitable-crops" className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-green-300 transition group">
            <h3 className="font-bold text-slate-800 group-hover:text-green-600 transition">Most Profitable Crops</h3>
            <p className="text-sm text-slate-600 mt-1">Season-by-season crop rankings with gold/day calculations</p>
          </a>
          <a href="/guide/keg-vs-jar" className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-amber-300 transition group">
            <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition">Keg vs Preserves Jar</h3>
            <p className="text-sm text-slate-600 mt-1">When to use Kegs, when to use Jars, with the math</p>
          </a>
          <a href="/guide/ancient-fruit" className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md hover:border-purple-300 transition group">
            <h3 className="font-bold text-slate-800 group-hover:text-purple-600 transition">Ancient Fruit Guide</h3>
            <p className="text-sm text-slate-600 mt-1">From first seed to 10 million gold per year</p>
          </a>
        </div>
        <div className="text-center mt-4">
          <a href="/guide" className="text-blue-600 hover:underline text-sm font-medium">View all guides →</a>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mt-16 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">How This Calculator Works</h2>
        <div className="prose prose-slate max-w-none">
          <p>
            Every price here reflects Stardew Valley 1.6 game data. Toggle your professions in the header to see real sell prices—Tiller adds 10% to crops, Artisan adds 40% to processed goods, Angler adds 25% to fish.
          </p>
          <p>
            The Keg vs Jar comparison shows actual gold-per-day, not just final sell price. A Pale Ale (300g) takes 1.5 days; Pickled Hops (170g) takes 3 days. That&apos;s 200g/day vs 57g/day. The math matters.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">What You Can Do Here:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Compare Keg vs Preserves Jar profits with your actual profession bonuses applied</li>
            <li>See quality multipliers (Silver 1.25x, Gold 1.5x, Iridium 2x) on every item</li>
            <li>Find gold-per-day calculations to plan seasonal crops efficiently</li>
            <li>Check which items are worth processing vs selling raw</li>
          </ul>
          <p className="text-sm text-slate-500 mt-4">
            Data verified against game files and Stardew Valley Wiki. Last updated: December 2025.
          </p>
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
