import Link from 'next/link';
import verificationData from '@/data/verification.json';

export default function Footer() {
  const lastVerified = new Date(verificationData.lastVerified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const freshnessText = `Updated ${lastVerified} · Verified for Stardew Valley ${verificationData.gameVersion}`;
  
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Data Verification Status - 关键 SEO 信号 */}
        <div className="text-center mb-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-sm text-green-700 font-medium">✓ Data Verified</p>
          </div>
          <p className="text-xs text-green-600">
            <strong>{freshnessText}</strong>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Core prices and formulas checked against{' '}
            <a href="https://stardewvalleywiki.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Official Stardew Valley Wiki
            </a>
            {' '}| <Link href="/about-data/" className="text-blue-600 hover:underline">View formula audit</Link>
          </p>
        </div>
        
        <div className="text-center">
          {/* 版权声明 - 重要！*/}
          <p className="text-slate-500 mb-4 text-sm">
            Stardew Valley © <a href="https://www.stardewvalley.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">ConcernedApe</a>. 
            This is a fan-made tool, not affiliated with or endorsed by ConcernedApe.
          </p>
          
          {/* Main Navigation */}
          <div className="flex justify-center flex-wrap gap-4 text-sm font-medium text-blue-600 mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/selling-prices/" className="hover:underline">Selling Prices</Link>
            <Link href="/crops/" className="hover:underline">Crops</Link>
            <Link href="/artisan-goods/" className="hover:underline">Artisan Goods</Link>
            <Link href="/animal-products/" className="hover:underline">Animal Products</Link>
            <Link href="/minerals/" className="hover:underline">Minerals</Link>
            <Link href="/forage/" className="hover:underline">Forage</Link>
            <Link href="/fish-ponds/" className="hover:underline">Fish Ponds</Link>
            <Link href="/fishing/" className="hover:underline">Fishing Guide</Link>
            <Link href="/gifts/" className="hover:underline">Gift Guide</Link>
            <Link href="/calculator/spring/" className="hover:underline">Calculator</Link>
          </div>          {/* Legal & Info Links */}
          <div className="flex justify-center flex-wrap gap-4 text-sm text-slate-500 mb-4">
            <Link href="/about/" className="hover:text-blue-600 hover:underline">About</Link>
            <Link href="/about-data/" className="hover:text-blue-600 hover:underline">Data Sources</Link>
            <Link href="/contact/" className="hover:text-blue-600 hover:underline">Contact</Link>
            <Link href="/privacy/" className="hover:text-blue-600 hover:underline">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-blue-600 hover:underline">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-blue-600 hover:underline">Sitemap</Link>
          </div>
          
          <p className="mt-8 text-xs text-slate-400">
            © {new Date().getFullYear()} StardewPriceDB.com | Game sprites © ConcernedApe
          </p>
        </div>
      </div>
    </footer>
  );
}
