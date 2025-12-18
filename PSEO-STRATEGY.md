# 📈 StardewPriceDB 程序化 SEO 策略指南

## 什么是程序化 SEO (pSEO)?

程序化 SEO 是通过数据驱动自动生成大量优化页面的策略。本项目使用 Next.js 的 `generateStaticParams()` 实现。

## 🏗️ 当前架构

```
data/items.json          ← 数据源 (71 物品)
        ↓
generateStaticParams()    ← 生成所有 slug 参数
        ↓
generateMetadata()        ← 生成 SEO 元数据
        ↓
npm run build             ← 静态生成 82 个页面
        ↓
out/ 文件夹               ← 部署到 Cloudflare Pages
```

## 🚀 扩展页面的 3 种方法

### 方法 1: 添加更多物品数据

**操作**: 编辑 `data/items.json` 添加新物品

```json
{
  "id": "starfruit",
  "name": "Starfruit",
  "category": "Crops",
  "basePrice": 750,
  "season": ["Summer"],
  ...
}
```

**结果**: 下次构建自动生成 `/item/starfruit` 页面

---

### 方法 2: 创建新的页面模板

**示例**: 创建分类页面 `/category/[category]`

1. 创建文件夹: `app/category/[category]/`
2. 创建 `page.js`:

```jsx
import items from '@/data/items.json';

export async function generateStaticParams() {
  const categories = [...new Set(items.items.map(i => i.category))];
  return categories.map(category => ({ 
    category: category.toLowerCase().replace(' ', '-') 
  }));
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.category} - Stardew Valley Prices | StardewPriceDB`,
    description: `Complete price guide for all ${params.category} in Stardew Valley. Compare prices, profits, and find the best items.`
  };
}

export default function CategoryPage({ params }) {
  const categoryItems = items.items.filter(
    i => i.category.toLowerCase().replace(' ', '-') === params.category
  );
  
  return (
    <div>
      <h1>{params.category}</h1>
      {/* 物品列表 */}
    </div>
  );
}
```

3. 更新 `sitemap.js` 包含新路由
4. 运行 `npm run build`

---

### 方法 3: 组合页面 (高级)

**对比页面**: `/compare/parsnip-vs-potato`

```jsx
// app/compare/[slug]/page.js
export async function generateStaticParams() {
  const crops = items.items.filter(i => i.category === 'Crops');
  const params = [];
  
  // 生成所有两两组合
  for (let i = 0; i < crops.length; i++) {
    for (let j = i + 1; j < crops.length; j++) {
      params.push({ slug: `${crops[i].id}-vs-${crops[j].id}` });
    }
  }
  
  return params; // 可生成数百个对比页面!
}
```

---

## 📊 页面扩展潜力

| 页面类型 | 当前数量 | 潜在数量 | 长尾关键词示例 |
|---------|---------|---------|--------------|
| 物品详情 | 71 | 300+ | "parsnip stardew valley price" |
| 计算器 | 5 | 20+ | "spring crop calculator stardew" |
| 分类 | 0 | 10+ | "stardew valley fish prices" |
| 对比 | 0 | 500+ | "parsnip vs potato stardew" |
| 指南 | 0 | 50+ | "best spring crops stardew valley" |

**总潜力**: 从 82 页扩展到 **800+ 页**

---

## 🔧 自动化工作流

### GitHub Actions 自动构建

```yaml
# .github/workflows/build.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # 每周日自动构建

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: stardew-price-db
          directory: out
```

### 数据更新脚本

```javascript
// scripts/update-data.js
// 从 Stardew Valley Wiki 抓取最新数据
// 更新 items.json
// 触发重新构建
```

---

## 🎯 SEO 最佳实践清单

### ✅ 已实现
- [x] 动态 title 和 description
- [x] JSON-LD 结构化数据
- [x] 自动 sitemap.xml
- [x] robots.txt
- [x] 静态 HTML 输出
- [x] 语义化 URL (`/item/parsnip`)

### 📋 建议添加
- [ ] Open Graph 图片 (社交分享)
- [ ] 内部链接网络 (相关物品推荐)
- [ ] 面包屑导航
- [ ] FAQ Schema
- [ ] 页面间的上下文链接
- [ ] 404 页面优化

---

## 🔗 内部链接策略

在每个物品页面添加:

1. **相关物品**: 同季节/同类型的其他物品
2. **上级分类**: 链接到分类页面
3. **计算器**: 链接到对应季节计算器
4. **对比页面**: "Compare with similar items"

```jsx
// 在 ItemDetailContent.js 中添加
<section className="related-items">
  <h2>Related Items</h2>
  {relatedItems.map(item => (
    <Link href={`/item/${item.id}`}>{item.name}</Link>
  ))}
</section>
```

---

## 📈 流量增长预期

| 阶段 | 页面数 | 预期月流量 |
|-----|-------|----------|
| 当前 | 160 | 500-1500 |
| +分类页 | 170 | 1500-3000 |
| +对比页 | 500+ | 5000-10000 |
| +食谱页 | 600+ | 10000-25000 |

---

## 🎣 钓鱼指南页面 (已实现)

### 页面结构

```
/fishing                    ← 钓鱼指南主页 (搜索、筛选、传奇鱼展示)
/fishing/[slug]             ← 42个鱼类详情页面
  /fishing/legend           ← 传奇鱼 Legend 详细指南
  /fishing/pufferfish       ← 河豚详细指南
  /fishing/sturgeon         ← 鲟鱼详细指南 (鱼塘/鱼子酱)
  ...
```

### 数据结构 (data/fish.json)

```json
{
  "fish": [
    {
      "id": 1,
      "name": "Pufferfish",
      "slug": "pufferfish",
      "basePrice": 200,
      "description": "Detailed description for SEO...",
      "location": ["Ocean"],
      "locationDetail": "Extended location info...",
      "season": ["Summer"],
      "time": "12:00 PM - 4:00 PM",
      "weather": "Sunny",
      "difficulty": 80,
      "behavior": "Floater",
      "tips": "Pro catching tips...",
      "trivia": "Real-world fun facts...",
      "uses": ["Gift", "Recipe", "Bundle"]
    }
  ],
  "behaviors": { ... },
  "tips": { "general": [], "tackle": [], "seasonal": {} }
}
```

### SEO 特性

- ✅ 高质量 Meta 标题/描述 (每页独特)
- ✅ JSON-LD 结构化数据 (Article, Product, HowTo, FAQ)
- ✅ 面包屑导航
- ✅ 内部链接 (相关鱼类)
- ✅ 长尾关键词覆盖 ("how to catch X", "X location", "X season")

---

## 🛠️ 快速命令

```bash
# 分析 SEO 潜力
node scripts/generate-seo-pages.js

# 构建所有页面
npm run build

# 本地测试
npx serve out

# 查看生成了多少页面
ls out | wc -l
```

---

## 📚 参考资源

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org](https://schema.org/)
- [Ahrefs pSEO Guide](https://ahrefs.com/blog/programmatic-seo/)
