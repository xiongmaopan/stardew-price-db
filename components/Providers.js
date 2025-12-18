'use client';

import { ProfessionProvider } from './ProfessionContext';

export default function Providers({ children }) {
  return (
    <ProfessionProvider>
      {children}
    </ProfessionProvider>
  );
}
