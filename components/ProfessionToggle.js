'use client';

import { useProfessions } from './ProfessionContext';
import { Sprout, Wine, Fish } from 'lucide-react';

export default function ProfessionToggle() {
  const { tiller, setTiller, artisan, setArtisan, angler, setAngler } = useProfessions();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <h3 className="font-semibold text-slate-700 mb-3">🎮 Your Professions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Tiller */}
        <label 
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
            tiller 
              ? 'border-green-500 bg-green-50 shadow-sm' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <input 
            type="checkbox" 
            checked={tiller} 
            onChange={(e) => setTiller(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            tiller ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            <Sprout size={20} />
          </div>
          <div className="flex-grow">
            <div className={`font-medium ${tiller ? 'text-green-700' : 'text-slate-600'}`}>
              Tiller
            </div>
            <div className={`text-xs ${tiller ? 'text-green-600' : 'text-slate-400'}`}>
              +10% crop price
            </div>
          </div>
          {tiller && (
            <div className="text-green-500 text-lg">✓</div>
          )}
        </label>

        {/* Artisan */}
        <label 
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
            artisan 
              ? 'border-purple-500 bg-purple-50 shadow-sm' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <input 
            type="checkbox" 
            checked={artisan} 
            onChange={(e) => setArtisan(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            artisan ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            <Wine size={20} />
          </div>
          <div className="flex-grow">
            <div className={`font-medium ${artisan ? 'text-purple-700' : 'text-slate-600'}`}>
              Artisan
            </div>
            <div className={`text-xs ${artisan ? 'text-purple-600' : 'text-slate-400'}`}>
              +40% artisan goods
            </div>
          </div>
          {artisan && (
            <div className="text-purple-500 text-lg">✓</div>
          )}
        </label>

        {/* Angler */}
        <label 
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
            angler 
              ? 'border-blue-500 bg-blue-50 shadow-sm' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <input 
            type="checkbox" 
            checked={angler} 
            onChange={(e) => setAngler(e.target.checked)}
            className="sr-only"
          />
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            angler ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'
          }`}>
            <Fish size={20} />
          </div>
          <div className="flex-grow">
            <div className={`font-medium ${angler ? 'text-blue-700' : 'text-slate-600'}`}>
              Angler
            </div>
            <div className={`text-xs ${angler ? 'text-blue-600' : 'text-slate-400'}`}>
              +25% fish price
            </div>
          </div>
          {angler && (
            <div className="text-blue-500 text-lg">✓</div>
          )}
        </label>
      </div>
      
      {/* Active bonuses summary */}
      {(tiller || artisan) && (
        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-medium">Active bonuses: </span>
          {tiller && <span className="text-green-600 mr-2">Crops +10%</span>}
          {artisan && <span className="text-purple-600">Artisan Goods +40%</span>}
        </div>
      )}
    </div>
  );
}
