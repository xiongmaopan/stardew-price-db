'use client';

import ItemDetailContent from './ItemDetailContent';
import coreItemGuides from '@/data/core-item-guides.json';

export default function ItemDetailClient({ item, relatedItems }) {
  // Only show manually curated strategy blocks after they pass data review.
  const strategy = null;
  const coreGuide = coreItemGuides.guides[item.slug] || null;
  
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
      <ItemDetailContent item={item} relatedItems={relatedItems} strategy={strategy} coreGuide={coreGuide} />
    </main>
  );
}
