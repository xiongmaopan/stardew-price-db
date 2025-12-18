'use client';

import ItemDetailContent from './ItemDetailContent';
import strategies from '@/data/item-strategies.json';

export default function ItemDetailClient({ item, relatedItems }) {
  // Load strategy data for this specific item
  const strategy = strategies.strategies[item.slug] || null;
  
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
      <ItemDetailContent item={item} relatedItems={relatedItems} strategy={strategy} />
    </main>
  );
}
