/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  
  // 性能优化
  compiler: {
    // 移除 console.log（生产环境）
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 实验性优化
  experimental: {
    // 优化 CSS 加载
    optimizeCss: true,
  },
  
  // 更现代的浏览器 target（减少 polyfill）
  swcMinify: true,
  
  // 安全头部配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // HSTS - 强制 HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // X-Content-Type-Options - 防止 MIME 类型嗅探
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // X-Frame-Options - 防止点击劫持
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // X-XSS-Protection - 旧版浏览器保护
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer-Policy - 隐私保护
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Permissions-Policy - 权限控制
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content-Security-Policy - 防止XSS攻击
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.ahrefs.com https://pagead2.googlesyndication.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://analytics.ahrefs.com; frame-src https://www.google.com https://pagead2.googlesyndication.com;",
          },
        ],
      },
      // 针对静态资源的缓存头部
      {
        source: '/:path*.(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // 针对JS和CSS的缓存头部
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
