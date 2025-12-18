'use client';

import { Suspense } from 'react';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 min-h-[80vh]">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
