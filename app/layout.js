import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata = {
  // 基础 TDK
  title: {
    default: 'StardewPriceDB - Item Prices, Keg Profits & Calculator (v1.6)',
    template: '%s | StardewPriceDB'
  },
  description: 'Stardew Valley price database with sell prices, Keg/Preserves Jar profits, and profession bonuses (Tiller +10%, Artisan +40%, Angler +25%). Data verified for v1.6.14.',
  keywords: ['Stardew Valley', 'price guide', 'profit calculator', 'keg', 'preserves jar', 'farming guide', 'artisan goods', 'wine profit', 'jelly profit', 'Tiller bonus', 'Artisan bonus'],
  
  // 网站基础信息
  metadataBase: new URL('https://stardewpricedb.com'),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'StardewPriceDB', url: 'https://stardewpricedb.com' }],
  creator: 'StardewPriceDB',
  publisher: 'StardewPriceDB',
  
  // Open Graph (Facebook, Discord 等)
  openGraph: {
    title: 'StardewPriceDB - Stardew Valley Price Database (v1.6)',
    description: 'Sell prices, Keg/Jar profits, profession bonuses. Tiller +10%, Artisan +40%, Angler +25%. Free calculator.',
    url: 'https://stardewpricedb.com',
    siteName: 'StardewPriceDB',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StardewPriceDB - Stardew Valley Price Database',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'StardewPriceDB - Stardew Valley Prices & Calculator',
    description: 'Keg profits, Jar values, profession bonuses. Data verified for v1.6.',
    images: ['/og-image.png'],
  },
  
  // 搜索引擎指令
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
    // 验证码（部署后添加实际值）
  verification: {
    google: 'your-google-verification-code', // 部署后替换
    // yandex: 'your-yandex-code',
    // bing: 'your-bing-code',
  },
  
  // Favicon 图标
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  
  // 其他元数据
  category: 'gaming',
  classification: 'Game Guide',
}

// 全局网站级别的 JSON-LD Schema
const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebSite Schema - 帮助 Google 理解网站结构
    {
      '@type': 'WebSite',
      '@id': 'https://stardewpricedb.com/#website',
      url: 'https://stardewpricedb.com',
      name: 'StardewPriceDB',
      description: 'The most comprehensive Stardew Valley price database with calculators, guides, and game data for version 1.6',
      publisher: {
        '@id': 'https://stardewpricedb.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://stardewpricedb.com/?search={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'en-US'
    },
    // Organization Schema - 建立网站权威性
    {
      '@type': 'Organization',
      '@id': 'https://stardewpricedb.com/#organization',
      name: 'StardewPriceDB',
      url: 'https://stardewpricedb.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stardewpricedb.com/favicon.svg',
        width: 512,
        height: 512
      },
      description: 'StardewPriceDB provides accurate, verified game data for Stardew Valley players including prices, recipes, fishing guides, and calculators.',
      sameAs: []
    },
    // Dataset Schema - 获取 Rich Snippets 排名优势
    {
      '@type': 'Dataset',
      '@id': 'https://stardewpricedb.com/#dataset',
      name: 'Stardew Valley Item Price Database',
      description: 'Complete database of Stardew Valley 1.6 item prices including base sell prices, Keg/Preserves Jar processed values, quality multipliers, and profession bonuses.',
      url: 'https://stardewpricedb.com',
      keywords: ['Stardew Valley', 'item prices', 'crop profits', 'keg values', 'preserves jar', 'artisan goods'],
      creator: {
        '@type': 'Organization',
        name: 'StardewPriceDB'
      },
      dateModified: '2025-12-14',
      license: 'https://creativecommons.org/licenses/by-nc/4.0/',
      variableMeasured: [
        { '@type': 'PropertyValue', name: 'Base Price', description: 'Item sell price at normal quality' },
        { '@type': 'PropertyValue', name: 'Wine Value', description: 'Base price × 3 for fruits processed in Keg' },
        { '@type': 'PropertyValue', name: 'Jelly Value', description: 'Base price × 2 + 50 for fruits processed in Preserves Jar' }
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Ahrefs Web Analytics */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ES4/Fw1g9NM24Zm6ecKFdA"
          async
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1411631093585461"
          crossOrigin="anonymous"
        />
        {/* 关键 CSS 内联 - 减少渲染阻塞 */}
        <style dangerouslySetInnerHTML={{ __html: `
          body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f8fafc}
          .animate-fade-in{animation:fadeIn .3s ease-out}
          @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 antialiased flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
