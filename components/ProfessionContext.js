'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ProfessionContext = createContext();

export function ProfessionProvider({ children }) {
  const [professions, setProfessions] = useState({
    tiller: false,        // +10% Crops
    artisan: false,       // +40% Artisan Goods
    agriculturist: false, // +10% Growth Speed
    angler: false,        // +25% Fish
    rancher: false,       // +20% Animal Products
  });

  const toggleProfession = useCallback((profession) => {
    setProfessions(prev => ({
      ...prev,
      [profession]: !prev[profession]
    }));
  }, []);

  // Also provide individual setters for backward compatibility
  const setTiller = (val) => setProfessions(prev => ({ ...prev, tiller: val }));
  const setArtisan = (val) => setProfessions(prev => ({ ...prev, artisan: val }));
  const setAgriculturist = (val) => setProfessions(prev => ({ ...prev, agriculturist: val }));
  const setAngler = (val) => setProfessions(prev => ({ ...prev, angler: val }));
  const setRancher = (val) => setProfessions(prev => ({ ...prev, rancher: val }));

  return (
    <ProfessionContext.Provider value={{
      professions,
      toggleProfession,
      // Legacy support
      tiller: professions.tiller,
      artisan: professions.artisan,
      agriculturist: professions.agriculturist,
      angler: professions.angler,
      rancher: professions.rancher,
      setTiller,
      setArtisan,
      setAgriculturist,
      setAngler,
      setRancher,
    }}>
      {children}
    </ProfessionContext.Provider>
  );
}

export function useProfessions() {
  const context = useContext(ProfessionContext);
  // Return default values if context is not available (e.g., during SSR)
  if (!context) {
    return {
      professions: { tiller: false, artisan: false, agriculturist: false, angler: false, rancher: false },
      toggleProfession: () => {},
      tiller: false,
      artisan: false,
      agriculturist: false,
      angler: false,
      rancher: false,
      setTiller: () => {},
      setArtisan: () => {},
      setAgriculturist: () => {},
      setAngler: () => {},
      setRancher: () => {}
    };
  }
  return context;
}

// Price calculation utilities
export function calculatePrice(base, quality, professions, category) {
  let multiplier = 1;
  if (quality === 'silver') multiplier = 1.25;
  if (quality === 'gold') multiplier = 1.5;
  if (quality === 'iridium') multiplier = 2;

  let price = Math.floor(base * multiplier);

  // Apply Profession Bonuses
  if (professions.tiller && category === 'Crops') {
    price = Math.floor(price * 1.1);
  }
  if (professions.angler && category === 'Fish') {
    price = Math.floor(price * 1.25);
  }
  if (professions.rancher && category === 'Forage' && 
      ['Animal Product', 'Artisan'].includes(professions.subcategory)) {
    price = Math.floor(price * 1.2);
  }
  
  return price;
}

export function calculateArtisanPrice(base, professions) {
  if (!base) return 0;
  if (professions.artisan) {
    return Math.floor(base * 1.4);
  }
  return base;
}
