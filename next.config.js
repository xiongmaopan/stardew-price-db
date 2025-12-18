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
}

module.exports = nextConfig
