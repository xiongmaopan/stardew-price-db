# 🚀 StardewPriceDB 部署指南 (Cloudflare Pages)

## 构建成功摘要

✅ 已生成 **56 个静态页面**
- 首页 (`/`)
- 50 个物品详情页 (`/item/[slug]`)
- sitemap.xml
- robots.txt

## 部署到 Cloudflare Pages 步骤

### 第一步：上传代码到 GitHub

```bash
# 初始化 Git 仓库
cd stardew-price-db
git init
git add .
git commit -m "Initial commit: StardewPriceDB"

# 创建 GitHub 仓库后
git remote add origin https://github.com/你的用户名/stardew-price-db.git
git branch -M main
git push -u origin main
```

### 第二步：连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Pages**
3. 点击 **Connect to Git**
4. 选择你的 GitHub 仓库 `stardew-price-db`

### 第三步：配置构建设置（关键！）

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` （留空） |
| **Node.js version** | `18` 或更高 |

### 第四步：部署

点击 **Save and Deploy**，等待 2-3 分钟即可完成部署！

## 自定义域名

部署成功后，在 Cloudflare Pages 设置中：
1. 进入 **Custom domains**
2. 添加你的域名 `stardewpricedb.com`
3. 按照提示配置 DNS 记录

## 后续更新

每次更新代码并推送到 GitHub，Cloudflare Pages 会自动重新构建和部署。

```bash
# 更新物品数据后
git add .
git commit -m "Update item data for v1.6.x"
git push
# Cloudflare 会自动部署新版本
```

## 本地测试命令

```bash
# 开发模式（热重载）
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npx serve out
```

## 文件大小

- 首页: ~106 KB (包含所有 JS)
- 物品页: ~103 KB
- 所有页面共享 87.4 KB 的 JS

**速度极快** - 所有页面都是静态 HTML，Cloudflare CDN 全球加速！
