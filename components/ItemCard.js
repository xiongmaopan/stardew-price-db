'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Leaf, Fish, Diamond, TrendingUp, ChevronRight, Pickaxe, Egg } from 'lucide-react';
import { calculateArtisanPrice } from './ProfessionContext';

function getCategoryIcon(category) {
  switch (category) {
    case 'Fish':
      return <Fish className="w-8 h-8 text-blue-400" />;
    case 'Minerals':
      return <Diamond className="w-8 h-8 text-purple-400" />;
    case 'Forage':
      return <Pickaxe className="w-8 h-8 text-amber-400" />;
    case 'Animal Products':
      return <Egg className="w-8 h-8 text-yellow-400" />;
    default:
      return <Leaf className="w-8 h-8 text-green-400" />;
  }
}

// 获取分类对应的背景色
function getCategoryBgColor(category) {
  switch (category) {
    case 'Fish':
      return 'bg-blue-50 group-hover:bg-blue-100';
    case 'Minerals':
      return 'bg-purple-50 group-hover:bg-purple-100';
    case 'Forage':
      return 'bg-amber-50 group-hover:bg-amber-100';
    case 'Animal Products':
      return 'bg-yellow-50 group-hover:bg-yellow-100';
    default:
      return 'bg-green-50 group-hover:bg-green-100';
  }
}

export default function ItemCard({ item }) {
  const [imgFormat, setImgFormat] = useState('webp'); // 'webp' -> 'png' -> 'error'
  const maxProcessPrice = item.processing 
    ? Math.max(item.processing.kegPrice || 0, item.processing.jarPrice || 0, item.processing.price || 0)
    : 0;

  // 根据当前格式状态选择图片路径
  const imagePath = imgFormat === 'error' ? null : `/images/items/${item.slug}.${imgFormat}`;

  const handleImgError = () => {
    if (imgFormat === 'webp') {
      setImgFormat('png'); // 尝试 PNG
    } else {
      setImgFormat('error'); // 都失败，使用图标
    }
  };

  return (
    <Link 
      href={`/item/${item.slug}/`}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer border border-slate-200 group overflow-hidden block"
    >
      <div className="p-5 flex items-start space-x-4">
        {/* 物品图标区域 */}        <div className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center transition ${getCategoryBgColor(item.category)}`}>
          {imgFormat !== 'error' && imagePath ? (
            <Image
              src={imagePath}
              alt={item.name}
              width={48}
              height={48}
              className="pixelated"
              onError={handleImgError}
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            getCategoryIcon(item.category)
          )}
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition truncate">
              {item.name}
            </h3>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 flex-shrink-0">
              {item.season ? item.season[0] : item.source || item.category}
            </span>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-700">{item.basePrice}g</span>
            <span className="text-xs text-slate-400">Base Price</span>
          </div>
          {maxProcessPrice > 0 && (
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <TrendingUp size={12} className="mr-1" /> 
              Up to {calculateArtisanPrice(maxProcessPrice, { artisan: true })}g w/ Artisan
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-50 px-5 py-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 group-hover:bg-blue-50/50 transition">
        <span>View Profit Breakdown</span>
        <ChevronRight size={14} />
      </div>
    </Link>
  );
}
