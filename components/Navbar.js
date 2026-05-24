'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/selling-prices/', label: 'Sell Prices' },
  { href: '/crops/', label: 'Crops' },
  { href: '/artisan-goods/', label: 'Artisan' },
  { href: '/fishing/', label: 'Fishing' },
  { href: '/recipes/', label: 'Recipes' },
  { href: '/bundles/', label: 'Bundles' },
  { href: '/guide/', label: 'Guides' },
  { href: '/crop-profit-calculator/', label: 'Calculator' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          </Link>
          <div className="hidden md:flex space-x-5 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition">
                {link.label}
              </Link>
            ))}
          </div>
          
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-slate-700 pb-4 pt-3">
            <div className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-200 hover:bg-slate-700 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
