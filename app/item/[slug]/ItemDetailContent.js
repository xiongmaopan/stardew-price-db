'use client';

import Link from 'next/link';
import GameImage from '@/components/GameImage';
import { useState, useEffect } from 'react';
import { 
  ChevronRight, TrendingUp, Info, Calculator, Calendar, 
  Leaf, Fish, Diamond, Package, Pickaxe, ChevronUp, Egg
} from 'lucide-react';
import { useProfessions, calculatePrice, calculateArtisanPrice } from '@/components/ProfessionContext';

function getCategoryIcon(category, size = 48) {
  const iconProps = { size, className: getIconColor(category) };
  switch (category) {
    case 'Fish':
      return <Fish {...iconProps} />;
    case 'Minerals':
      return <Diamond {...iconProps} />;
    case 'Forage':
      return <Pickaxe {...iconProps} />;
    case 'Animal Products':
      return <Egg {...iconProps} />;
    default:
      return <Leaf {...iconProps} />;
  }
}

function getIconColor(category) {
  switch (category) {
    case 'Fish':
      return 'text-blue-500';
    case 'Minerals':
      return 'text-purple-500';
    case 'Forage':
      return 'text-amber-600';
    case 'Animal Products':
      return 'text-yellow-500';
    default:
      return 'text-green-600';
  }
}

// 返回顶部按钮组件
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}

// 物品图片组件
function ItemImage({ item, size = 64 }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return getCategoryIcon(item.category, size);
  }

  return (
    <GameImage
      slug={item.slug}
      alt={item.name}
      width={size}
      height={size}
      onAllFailed={() => setImgError(true)}
    />
  );
}

function formatGold(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  return `${Math.round(value).toLocaleString()}g`;
}

function hasQualityPrices(item) {
  return item.hasQuality !== false && ['Crops', 'Forage', 'Animal Products'].includes(item.category);
}

function getVariablePriceInfo(item) {
  if (item.slug === 'aged-roe') {
    return {
      label: 'Variable',
      caption: 'Depends on fish species',
      description: 'Aged Roe is not one fixed item price. Its value depends on the fish that produced the Roe; most Aged Roe is worth 2x the Roe price, while Sturgeon Roe becomes Caviar.',
      href: '/fish-ponds/',
    };
  }

  if (item.slug === 'omni-geode') {
    return {
      label: 'No sell price',
      caption: 'Utility item',
      description: 'Omni Geode is best treated as a utility item. Crack it open, trade it, or use it for unlocks instead of counting it as shipping profit.',
      href: '/resources/',
    };
  }

  return null;
}

function formatGoldPerDay(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
  return `${Math.round(value * 10) / 10}g/day`;
}

function getProcessingDecisionRows(item, rawPrice, professions) {
  if (!item.processing) return [];

  const rows = [
    {
      method: 'Sell raw',
      output: item.name,
      value: rawPrice,
      time: 0,
      gain: 0,
      gainPerDay: null,
      note: 'Fast cash, no machine slot required.',
    },
  ];

  if (item.processing.kegPrice) {
    const value = calculateArtisanPrice(item.processing.kegPrice, professions);
    const time = item.processing.kegTime || 7;
    const gain = value - rawPrice;
    rows.push({
      method: 'Keg',
      output: item.processing.kegProduct || (item.subcategory === 'Vegetable' ? 'Juice' : 'Wine'),
      value,
      time,
      gain,
      gainPerDay: gain / time,
      note: 'Best when machine capacity is available and total value matters.',
    });
  }

  if (item.processing.jarPrice) {
    const value = calculateArtisanPrice(item.processing.jarPrice, professions);
    const time = item.processing.jarTime || 3;
    const gain = value - rawPrice;
    rows.push({
      method: 'Preserves Jar',
      output: item.processing.jarProduct || (item.subcategory === 'Vegetable' ? 'Pickles' : 'Jelly'),
      value,
      time,
      gain,
      gainPerDay: gain / time,
      note: 'Useful for faster turnover or crop overflow.',
    });
  }

  if (item.processing.machine && item.processing.price) {
    const value = calculateArtisanPrice(item.processing.price, professions);
    const gain = value - rawPrice;
    rows.push({
      method: item.processing.machine,
      output: item.processing.product || item.processing.machine,
      value,
      time: item.processing.time || null,
      gain,
      gainPerDay: null,
      note: 'Special machine output.',
    });
  }

  return rows;
}

function getBestProcessingRow(rows) {
  return rows
    .filter((row) => row.method !== 'Sell raw')
    .sort((a, b) => b.value - a.value)[0];
}

function formatMachineTime(time) {
  if (!time) return 'None';
  if (typeof time === 'number') return `${time} days`;
  return time;
}

const dehydratorFruitNames = new Set(['Coconut', 'Cactus Fruit', 'Salmonberry', 'Blackberry', 'Spice Berry', 'Grape']);

function getDehydratorInfo(item, rawPrice, professions) {
  const isGrape = item.name === 'Grape';
  const isFruit = item.subcategory === 'Fruit' || dehydratorFruitNames.has(item.name);
  const isMushroom = item.subcategory === 'Mushroom' && item.name !== 'Red Mushroom';

  if (!isFruit && !isMushroom) return null;

  const baseOutputPrice = isGrape ? 600 : Math.floor(item.basePrice * 7.5 + 25);
  const value = calculateArtisanPrice(baseOutputPrice, professions);
  const rawIngredientValue = rawPrice * 5;

  return {
    output: isGrape ? 'Raisins' : (isMushroom ? 'Dried Mushrooms' : `Dried ${item.name}`),
    ingredients: `5 x ${item.name}`,
    baseOutputPrice,
    value,
    rawIngredientValue,
    gain: value - rawIngredientValue,
    formula: isGrape ? 'fixed 600g for 5 Grapes' : 'floor(base price x 7.5 + 25)',
    note: isGrape
      ? 'Grapes become Raisins instead of Dried Fruit.'
      : 'Dehydrator price uses the base item price and ignores input quality.',
  };
}

export default function ItemDetailContent({ item, relatedItems, strategy, coreGuide }) {
  const professions = useProfessions();
  const variablePrice = getVariablePriceInfo(item);
  const supportsQuality = hasQualityPrices(item);
  
  // Helper function for price calculation
  const p = (quality) => calculatePrice(item.basePrice, quality, professions, item.category);
  const normalPrice = p('normal');
  const processingDecisionRows = getProcessingDecisionRows(item, normalPrice, professions);
  const bestProcessingRow = getBestProcessingRow(processingDecisionRows);
  const dehydratorInfo = getDehydratorInfo(item, normalPrice, professions);
  
  // SEO Title
  const seoTitle = `${item.name} Sell Price & Profit Guide (2026)`;

  return (
    <div className="animate-fade-in">
      {/* 返回顶部按钮 */}
      <ScrollToTop />
      
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="cursor-pointer hover:text-blue-600 transition">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link href={`/?category=${encodeURIComponent(item.category)}`} className="cursor-pointer hover:text-blue-600 transition">
          {item.category}
        </Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="font-semibold text-gray-800">{item.name}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
        
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          {/* 物品图片 - 使用实际游戏图标 */}
          <div className="flex-shrink-0 w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-200 shadow-inner">
            <ItemImage item={item} size={64} />
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{seoTitle}</h1>
            <p className="text-slate-600 mb-4 max-w-2xl">{item.description}</p>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide border border-blue-100">
                {item.category}
              </span>              {item.subcategory && (
                <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-semibold uppercase tracking-wide border border-slate-200">
                  {item.subcategory}
                </span>
              )}
              {item.season && item.season.map(s => (
                <span key={s} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold uppercase tracking-wide border border-orange-100 flex items-center">
                  <Calendar size={12} className="mr-1" /> {s}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 min-w-[200px]">
            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Base Sell Price</div>
            <div className="text-2xl font-black text-slate-800">{variablePrice?.label || `${item.basePrice}g`}</div>
            {variablePrice && (
              <div className="mt-1 text-xs text-slate-600">{variablePrice.caption}</div>
            )}
            {item.growthTime && (
              <div className="mt-2 text-sm text-slate-600 flex items-center">
                <TrendingUp size={16} className="mr-1 text-green-600" />
                Takes {item.growthTime} Days
              </div>
            )}
            {item.regrows && (
              <div className="mt-1 text-xs text-green-600">
                ↻ Regrows every {item.regrowTime} days
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Main Data */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Sell Prices Table */}
          {variablePrice ? (
            <section className="bg-white rounded-xl shadow-sm border border-amber-200 overflow-hidden">
              <div className="bg-amber-50 px-6 py-4 border-b border-amber-200">
                <h2 className="font-bold text-lg text-amber-950 flex items-center">
                  <Package className="mr-2 text-amber-700" size={20} />
                  Variable Price Notice
                </h2>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4">{variablePrice.description}</p>
                <Link href={variablePrice.href} className="inline-flex rounded-lg bg-amber-700 px-4 py-2 text-sm font-bold text-white hover:bg-amber-800">
                  View exact related values
                </Link>
              </div>
            </section>
          ) : (
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-800 flex items-center">
                <Package className="mr-2 text-slate-500" size={20} />
                Shipping Prices
              </h2>
              {item.category === 'Crops' && (
                <div className={`text-xs px-2 py-1 rounded border ${professions.tiller ? 'bg-green-100 border-green-300 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                  Tiller: {professions.tiller ? 'Active (+10%)' : 'Inactive'}
                </div>
              )}
              {item.category === 'Fish' && (
                <div className={`text-xs px-2 py-1 rounded border ${professions.angler ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                  Angler: {professions.angler ? 'Active (+25%)' : 'Inactive'}
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm font-semibold text-slate-500 bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3">{supportsQuality ? 'Quality' : 'Price Type'}</th>
                    <th className="px-6 py-3">Sell Price</th>
                    <th className="px-6 py-3 hidden sm:table-cell">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-700">Normal</td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-800">{p('normal')}g</td>
                    <td className="px-6 py-4 hidden sm:table-cell text-slate-400 text-sm">{supportsQuality ? '1.0x' : 'Fixed'}</td>
                  </tr>
                  {item.professionBonus && (
                    <tr className="hover:bg-green-50">
                      <td className="px-6 py-4 font-medium text-green-700">{item.professionBonus.name}</td>
                      <td className="px-6 py-4 font-mono font-bold text-green-800">{formatGold(item.professionBonus.price)}</td>
                      <td className="px-6 py-4 hidden sm:table-cell text-slate-400 text-sm">
                        {item.professionBonus.multiplier}x
                      </td>
                    </tr>
                  )}
                  {supportsQuality && (
                    <>
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-700 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-gray-300 mr-2 border border-gray-400"></span> Silver
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-800">{p('silver')}g</td>
                        <td className="px-6 py-4 hidden sm:table-cell text-slate-400 text-sm">1.25x</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-yellow-600 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2 border border-yellow-500"></span> Gold
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-yellow-700">{p('gold')}g</td>
                        <td className="px-6 py-4 hidden sm:table-cell text-slate-400 text-sm">1.5x</td>
                      </tr>
                      <tr className="bg-purple-50 hover:bg-purple-100">
                        <td className="px-6 py-4 font-medium text-purple-700 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-purple-500 mr-2 border border-purple-600"></span> Iridium
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-purple-800">{p('iridium')}g</td>
                        <td className="px-6 py-4 hidden sm:table-cell text-slate-400 text-sm">2.0x</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          )}

          {/* Strategy Pro Tip - High-value SEO content */}
          {strategy && (
            <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-amber-900 mb-2">Farmer&apos;s Pro Tip</h3>
                  <p className="text-amber-800 leading-relaxed mb-4">{strategy.proTip}</p>
                  
                  <div className="bg-white/60 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-slate-700 text-sm mb-2 uppercase tracking-wide">Strategy Analysis (v1.6.15)</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{strategy.strategyNote}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
                      <span className="text-xs text-slate-500 block">Gold/Day</span>
                      <span className="font-bold text-green-700">{strategy.goldPerDay}g</span>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
                      <span className="text-xs text-slate-500 block">Best Strategy</span>
                      <span className="font-bold text-slate-700 capitalize">{strategy.recommendation.replace('-', ' → ')}</span>
                    </div>
                    <div className="bg-white rounded-lg px-3 py-2 border border-amber-200">
                      <span className="text-xs text-slate-500 block">Tier</span>
                      <span className={`font-bold capitalize ${
                        strategy.tier === 'legendary' ? 'text-purple-700' :
                        strategy.tier === 'premium' ? 'text-amber-700' :
                        strategy.tier === 'high' ? 'text-green-700' :
                        strategy.tier === 'mid' ? 'text-blue-700' : 'text-slate-500'
                      }`}>{strategy.tier}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {coreGuide && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-green-600" size={20} />
                Best Use Strategy for {item.name}
              </h2>
              <p className="text-slate-600 mb-4">{coreGuide.intent}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Best choice</h3>
                  <p className="text-sm text-green-800">{coreGuide.bestChoice}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Do this</h3>
                  <p className="text-sm text-blue-800">{coreGuide.doThis}</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-5">
                <h3 className="font-semibold text-red-900 mb-2">Avoid this mistake</h3>
                <p className="text-sm text-red-800">{coreGuide.avoidThis}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700 mb-3">Related strategy guides</h3>
                <div className="flex flex-wrap gap-2">
                  {coreGuide.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {item.processing && processingDecisionRows.length > 1 && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                <Calculator className="mr-2 text-blue-600" size={20} />
                Sell vs Process Decision for {item.name}
              </h2>
              <p className="text-slate-600 mb-4">
                If you are deciding whether to sell {item.name} raw or process it first, compare total value and machine
                time. {bestProcessingRow ? `The highest-value processed option is ${bestProcessingRow.output} from a ${bestProcessingRow.method}.` : ''}
              </p>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-sm text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Method</th>
                      <th className="px-4 py-3">Output</th>
                      <th className="px-4 py-3 text-right">Sell Value</th>
                      <th className="px-4 py-3 text-right">Gain vs Raw</th>
                      <th className="px-4 py-3 text-right">Machine Time</th>
                      <th className="px-4 py-3 text-right">Gain/Day</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {processingDecisionRows.map((row) => (
                      <tr key={row.method} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{row.method}</td>
                        <td className="px-4 py-3 text-slate-700">{row.output}</td>
                        <td className="px-4 py-3 text-right font-bold">{formatGold(row.value)}</td>
                        <td className="px-4 py-3 text-right text-green-700">{formatGold(row.gain)}</td>
                        <td className="px-4 py-3 text-right">{formatMachineTime(row.time)}</td>
                        <td className="px-4 py-3 text-right">{formatGoldPerDay(row.gainPerDay)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-950 mb-2">Use total value when</h3>
                  <p className="text-sm text-blue-900">
                    You have enough machines and want maximum gold per item, especially for premium Wine, Juice, Oil, or Caviar.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-950 mb-2">Use gain/day when</h3>
                  <p className="text-sm text-green-900">
                    Your Kegs or Jars are the bottleneck and faster processing keeps your farm cash flow moving.
                  </p>
                </div>
              </div>
            </section>
          )}

          {dehydratorInfo && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-bold text-lg text-slate-800 mb-2 flex items-center">
                    <Calculator className="mr-2 text-orange-600" size={20} />
                    Dehydrator Formula for {item.name}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Stardew Valley 1.6 Dehydrator products are variable-price goods, so this page calculates the value from the input item instead of storing one fixed price.
                  </p>
                </div>
                <div className={`text-xs px-2 py-1 rounded border self-start ${professions.artisan ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
                  Artisan: {professions.artisan ? 'Active (+40%)' : 'Inactive'}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="text-xs uppercase font-bold text-orange-700 mb-1">Output</div>
                  <div className="text-xl font-black text-orange-950">{dehydratorInfo.output}</div>
                  <div className="text-xs text-orange-800 mt-1">{dehydratorInfo.ingredients}</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs uppercase font-bold text-slate-500 mb-1">Formula</div>
                  <code className="text-sm font-bold text-slate-900">{dehydratorInfo.formula}</code>
                  <div className="text-xs text-slate-500 mt-1">Base output: {formatGold(dehydratorInfo.baseOutputPrice)}</div>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="text-xs uppercase font-bold text-green-700 mb-1">Sell Value</div>
                  <div className="text-2xl font-black text-green-900">{formatGold(dehydratorInfo.value)}</div>
                  <div className={dehydratorInfo.gain >= 0 ? 'text-xs text-green-700 mt-1' : 'text-xs text-red-700 mt-1'}>
                    {formatGold(dehydratorInfo.gain)} vs selling 5 raw
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                {dehydratorInfo.note} See the public <Link href="/about-data/" className="font-medium text-blue-700 hover:underline">formula audit</Link> for source links and known limits.
              </p>
            </section>
          )}

          {/* 2. Artisan Goods Table */}
          {item.processing && (
            <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800 flex items-center">
                  <Calculator className="mr-2 text-slate-500" size={20} />
                  Artisan Goods & Processing
                </h2>
                <div className={`text-xs px-2 py-1 rounded border ${professions.artisan ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
                  Artisan: {professions.artisan ? 'Active (+40%)' : 'Inactive'}
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4">
                  Processing {item.name} usually yields higher profits. Here is the breakdown:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.processing.kegPrice && (
                    <div className="border border-slate-200 rounded-lg p-4 bg-amber-50 relative">
                      <div className="absolute top-2 right-2 text-amber-300 opacity-20">
                        <Package size={40} />
                      </div>
                      <h3 className="font-bold text-amber-900 mb-1">Keg</h3>
                      <div className="text-xs text-amber-700 mb-3">Time: {item.processing.kegTime}</div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="block text-xs text-slate-400">
                            {item.subcategory === 'Vegetable' ? 'Juice' : 'Wine'} Price
                          </span>
                          <span className="text-2xl font-bold text-amber-800">
                            {calculateArtisanPrice(item.processing.kegPrice, professions)}g
                          </span>
                        </div>
                        <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                          +{Math.floor((calculateArtisanPrice(item.processing.kegPrice, professions) / item.basePrice * 100) - 100)}% vs Raw
                        </div>
                      </div>
                    </div>
                  )}
                  {item.processing.jarPrice && (
                    <div className="border border-slate-200 rounded-lg p-4 bg-green-50 relative">
                      <div className="absolute top-2 right-2 text-green-300 opacity-20">
                        <Package size={40} />
                      </div>
                      <h3 className="font-bold text-green-900 mb-1">Preserves Jar</h3>
                      <div className="text-xs text-green-700 mb-3">Time: {item.processing.jarTime || '2-3 days'}</div>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="block text-xs text-slate-400">
                            {item.subcategory === 'Vegetable' ? 'Pickles' : 'Jelly'} Price
                          </span>
                          <span className="text-2xl font-bold text-green-800">
                            {calculateArtisanPrice(item.processing.jarPrice, professions)}g
                          </span>
                        </div>
                        <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                          +{Math.floor((calculateArtisanPrice(item.processing.jarPrice, professions) / item.basePrice * 100) - 100)}% vs Raw
                        </div>
                      </div>
                    </div>
                  )}
                  {item.processing.machine && (
                    <div className="border border-slate-200 rounded-lg p-4 bg-orange-50 relative sm:col-span-2">
                      <h3 className="font-bold text-orange-900 mb-1">{item.processing.machine}</h3>
                      <div className="text-xs text-orange-700 mb-3">
                        Product: {item.processing.product} | Time: {item.processing.time}
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-orange-800">
                          {calculateArtisanPrice(item.processing.price, professions)}g
                        </span>
                        <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                          +{Math.floor((calculateArtisanPrice(item.processing.price, professions) / item.basePrice * 100) - 100)}% vs Raw
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Profit Recommendation */}
                {item.processing.kegPrice && item.processing.jarPrice && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Profit Tip:</strong>{' '}
                      {item.processing.kegPrice > item.processing.jarPrice 
                        ? `Use the Keg for ${item.name} - it yields ${calculateArtisanPrice(item.processing.kegPrice, professions) - calculateArtisanPrice(item.processing.jarPrice, professions)}g more per item.`
                        : `Use the Preserves Jar for ${item.name} - it's faster and yields similar or better profits.`
                      }
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 3. Text Content for SEO */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
              <Info className="mr-2 text-slate-500" size={20} />
              Location & Uses
            </h2>
            <div className="prose prose-slate prose-sm max-w-none">
              <p>
                <strong>Where to find {item.name}:</strong> You can obtain this item via {item.source || item.location || item.seedSource || 'various sources'}.
                {item.season && item.season.length > 0 && ` It is primarily found during the ${item.season.join('/')} season.`}
              </p>
              
              {item.usedIn && item.usedIn.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">Community Center Bundles</h3>
                  <ul className="list-disc pl-5">
                    {item.usedIn.map(b => <li key={b}>{b}</li>)}
                  </ul>
                </>
              )}

              {item.giftLove && item.giftLove.length > 0 && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">Gifting Guide</h3>
                  <p>The following villagers love receiving {item.name}:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.giftLove.map(npc => (
                      <span key={npc} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded border border-pink-200">
                        {npc}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Fish-specific info */}
              {item.category === 'Fish' && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">Fishing Information</h3>
                  <ul className="list-disc pl-5">
                    {item.time && <li><strong>Time:</strong> {item.time}</li>}
                    {item.weather && <li><strong>Weather:</strong> {item.weather}</li>}
                    {item.location && <li><strong>Location:</strong> {item.location}</li>}
                    {item.difficulty && <li><strong>Difficulty:</strong> {item.difficulty}</li>}
                  </ul>
                </>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sidebar / Related */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">
              Price tools
            </div>
            <div className="space-y-3">
              <Link
                href="/selling-prices/"
                className="block rounded-lg border border-slate-200 p-3 hover:border-blue-300 hover:bg-blue-50 transition"
              >
                <div className="text-sm font-bold text-slate-800">All selling prices</div>
                <div className="text-xs text-slate-500 mt-1">Compare crops, fish, minerals, artisan goods, and resources.</div>
              </Link>
              <Link
                href="/calculator/spring/"
                className="block rounded-lg border border-slate-200 p-3 hover:border-green-300 hover:bg-green-50 transition"
              >
                <div className="text-sm font-bold text-slate-800">Profit calculator</div>
                <div className="text-xs text-slate-500 mt-1">Check season profits with profession bonuses and processing values.</div>
              </Link>
              <Link
                href="/about-data/"
                className="block rounded-lg border border-slate-200 p-3 hover:border-amber-300 hover:bg-amber-50 transition"
              >
                <div className="text-sm font-bold text-slate-800">Data verification</div>
                <div className="text-xs text-slate-500 mt-1">Review sources, formulas, and the current game version.</div>
              </Link>
            </div>
          </div>

          {/* Related Items (Internal Linking) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-700">
              Related Items
            </div>
            <div className="divide-y divide-slate-100">
              {relatedItems.map(rel => (
                <Link 
                  key={rel.id}
                  href={`/item/${rel.slug}/`}
                  className="p-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center group transition block"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-100 rounded mr-3 flex items-center justify-center overflow-hidden">
                      <ItemImage item={rel} size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                      {rel.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{rel.basePrice}g</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-bold text-slate-700">
              Quick Facts
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-medium">{item.category}</span>
              </div>              <div className="flex justify-between">
                <span className="text-slate-500">Season</span>
                <span className="font-medium">{item.season ? item.season.join(', ') : 'All Year'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Base Price</span>
                <span className="font-medium">{variablePrice?.label || `${item.basePrice}g`}</span>
              </div>
              {item.growthTime && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Growth Time</span>
                  <span className="font-medium">{item.growthTime} days</span>
                </div>
              )}
              {item.seedPrice && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Seed Cost</span>
                  <span className="font-medium">{item.seedPrice}g</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
