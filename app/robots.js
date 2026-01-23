export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://stardewpricedb.com/sitemap.xml',
  };
}
