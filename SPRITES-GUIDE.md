# 星露谷物语素材使用指南

## 🎨 素材来源建议

### 1. 官方 Wiki 素材（推荐）

**手动下载步骤**：
1. 访问物品 Wiki 页面，如 https://stardewvalleywiki.com/Parsnip
2. 右键点击物品图片 → "在新标签页中打开图片"
3. 右键 → "图片另存为"
4. 保存到 `public/images/items/` 目录
5. **重要**：文件名使用 slug 格式，如 `parsnip.png`

### 2. Sprite Sheet 资源

从 Spriters Resource 下载完整的 sprite sheet：
https://www.spriters-resource.com/pc_computer/stardewvalley/

### 3. 自制像素图标

参考原版风格自己画 16x16 或 24x24 像素图，保存为 SVG 或 PNG。

---

## 📥 快速下载脚本

运行以下命令批量下载 Wiki 图片：

```powershell
cd d:\CODEFREE\星露谷\stardew-price-db
node scripts/download-sprites.js
```

---

## 🖼️ 当前需要的图片

### Favicon & Logo
- [x] `/public/favicon.svg` - 金币风格（已创建）
- [ ] `/public/favicon.ico` - 需要转换 SVG
- [x] `/public/og-image.svg` - 社交分享图（已创建）
- [ ] `/public/og-image.png` - 需要转换为 PNG（1200x630）

### 分类图标
- [ ] `/public/images/categories/crop.png`
- [ ] `/public/images/categories/fish.png`
- [ ] `/public/images/categories/mineral.png`
- [ ] `/public/images/categories/forage.png`
- [ ] `/public/images/categories/animal.png`

### 物品图标（71个）
参见 `/data/items.json` 中的所有物品

---

## 🔧 SVG 转 PNG 工具

### 方法1: 在线转换
- https://svgtopng.com/
- https://cloudconvert.com/svg-to-png

### 方法2: 使用 sharp (Node.js)
```bash
npm install sharp
node -e "require('sharp')('public/og-image.svg').resize(1200,630).png().toFile('public/og-image.png')"
```

### 方法3: 使用 Inkscape (命令行)
```bash
inkscape --export-type=png --export-filename=og-image.png -w 1200 -h 630 og-image.svg
```

---

## ⚖️ 版权说明

Stardew Valley 是 ConcernedApe 的作品。根据社区惯例：

✅ **允许使用**:
- 非商业性质的粉丝网站
- 游戏攻略和工具
- 附带适当归属

❌ **不建议**:
- 直接销售包含游戏素材的产品
- 声称素材为原创

**建议在网站 Footer 添加**:
> Stardew Valley © ConcernedApe. This is a fan-made tool, not affiliated with ConcernedApe.

---

## 📦 实施步骤

1. 下载物品图片到 `/public/images/items/`
2. 修改 `ItemCard.js` 显示实际图片
3. 修改 `ItemDetailClient.js` 显示大图
4. 转换 og-image.svg 为 png
5. 生成 favicon.ico

完成后运行 `npm run build` 验证。
