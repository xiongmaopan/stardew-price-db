import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import verificationData from '@/data/verification.json'

const SITE_URL = 'https://stardewpricedb.com'
const GAME_VERSION = verificationData.gameVersion
const LAST_VERIFIED_DATE = verificationData.lastVerified.split('T')[0]

export const metadata = {
  // 基础 TDK - 优化SEO
  title: {
    default: `Stardew Valley Selling Prices Database (${GAME_VERSION}) | Profit Calculator`,
    template: '%s'
  },
  description: `Search Stardew Valley ${GAME_VERSION} selling prices with Keg/Jar profits, quality values, profession bonuses, and verified formulas.`,
  keywords: ['Stardew Valley', 'price guide', 'profit calculator', 'keg', 'preserves jar', 'farming guide', 'artisan goods', 'wine profit', 'jelly profit', 'Tiller bonus', 'Artisan bonus', 'best crops stardew valley', 'stardew valley 1.6', 'ancient fruit profit', 'starfruit wine', 'greenhouse layout'],
  
  // 网站基础信息
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'StardewPriceDB', url: SITE_URL }],
  creator: 'StardewPriceDB',
  publisher: 'StardewPriceDB',
  
  // 语言和地区设置（SEO重要）
  language: 'en',
  languages: {
    'en': '/',
  },
  
  // Open Graph (Facebook, Discord 等)
  openGraph: {
    title: `Stardew Valley Selling Prices Database (${GAME_VERSION})`,
    description: 'Verified sell prices, Keg/Jar profits, quality values, and profession bonuses. Free Stardew Valley calculator.',
    url: `${SITE_URL}/`,
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
    title: `Stardew Valley Selling Prices Database (${GAME_VERSION})`,
    description: `Free Stardew Valley ${GAME_VERSION} price database with Keg/Jar values, quality prices, and profession bonuses.`,
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
    // 搜索引擎验证码
  verification: {
    google: 'dA0Qd8q-tz5V8z8X8X8X8X8X8X8X8X8X8X8X8X8X8', // Google Search Console
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

// 全局网站级别的 JSON-LD Schema - 增强SEO
const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebSite Schema - 帮助 Google 理解网站结构
    {
      '@type': 'WebSite',
      '@id': 'https://stardewpricedb.com/#website',
      url: SITE_URL,
      name: 'StardewPriceDB',
      description: `A curated Stardew Valley price database with calculators, guides, and game data for version ${GAME_VERSION}. Calculate profits for crops, artisan goods, and fishing.`,
      publisher: {
        '@id': 'https://stardewpricedb.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'en-US',
      dateModified: LAST_VERIFIED_DATE
    },
    // Organization Schema - 建立网站权威性
    {
      '@type': 'Organization',
      '@id': 'https://stardewpricedb.com/#organization',
      name: 'StardewPriceDB',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
        width: 512,
        height: 512
      },
      description: 'StardewPriceDB provides accurate, verified game data for Stardew Valley players including prices, recipes, fishing guides, and calculators.',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contact@stardewpricedb.com'
      }
    },
    // WebApplication Schema - 强调工具属性
    {
      '@type': 'WebApplication',
      '@id': 'https://stardewpricedb.com/#app',
      name: 'StardewPriceDB Profit Calculator',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      version: GAME_VERSION,
      dateModified: LAST_VERIFIED_DATE,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: 'Price database, Profit calculator, Keg/Jar profit analysis, Profession bonus calculator, Fishing guide, Gift guide'
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
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="StardewPriceDB - Stardew Valley Price Database" />
        <meta name="dateModified" content={LAST_VERIFIED_DATE} />
        <meta name="version" content={GAME_VERSION} />
        <meta property="article:modified_time" content={`${LAST_VERIFIED_DATE}T00:00:00Z`} />
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
