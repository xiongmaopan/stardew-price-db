'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-[#1e293b] text-white sticky top-0 z-50 shadow-lg border-b border-[#334155]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded flex items-center justify-center font-bold text-[#1e293b]">
              S
            </div>
            <span className="font-bold text-xl tracking-tight">
              StardewPrice<span className="text-yellow-400">DB</span>
            </span>
          </Link>          <div className="hidden md:flex space-x-5 text-sm font-medium text-gray-300">
            <Link href="/selling-prices/" className="hover:text-white transition">Sell Prices</Link>
            <Link href="/crops/" className="hover:text-white transition">Crops</Link>
            <Link href="/artisan-goods/" className="hover:text-white transition">Artisan</Link>
            <Link href="/fishing/" className="hover:text-white transition">Fishing</Link>
            <Link href="/recipes/" className="hover:text-white transition">Recipes</Link>
            <Link href="/bundles/" className="hover:text-white transition">Bundles</Link>
            <Link href="/guide/" className="hover:text-white transition">Guides</Link>
            <Link href="/calculator/spring/" className="hover:text-white transition">Calculator</Link>
          </div>
          
          <div className="md:hidden text-gray-300">
            <Menu size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
}
