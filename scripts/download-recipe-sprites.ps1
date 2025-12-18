# 下载 Stardew Valley 食谱图片
# 使用 Stardew Valley Wiki 的图片

$ErrorActionPreference = "SilentlyContinue"

# 食谱物品映射 (slug -> Wiki名称)
$recipes = @{
    "fried-egg" = "Fried_Egg"
    "omelet" = "Omelet"
    "salad" = "Salad"
    "cheese-cauliflower" = "Cheese_Cauliflower"
    "baked-fish" = "Baked_Fish"
    "parsnip-soup" = "Parsnip_Soup"
    "vegetable-medley" = "Vegetable_Medley"
    "complete-breakfast" = "Complete_Breakfast"
    "fried-calamari" = "Fried_Calamari"
    "strange-bun" = "Strange_Bun"
    "lucky-lunch" = "Lucky_Lunch"
    "fried-mushroom" = "Fried_Mushroom"
    "pizza" = "Pizza"
    "bean-hotpot" = "Bean_Hotpot"
    "glazed-yams" = "Glazed_Yams"
    "carp-surprise" = "Carp_Surprise"
    "hashbrowns" = "Hashbrowns"
    "pancakes" = "Pancakes"
    "salmon-dinner" = "Salmon_Dinner"
    "fish-taco" = "Fish_Taco"
    "crispy-bass" = "Crispy_Bass"
    "pepper-poppers" = "Pepper_Poppers"
    "bread" = "Bread"
    "tom-kha-soup" = "Tom_Kha_Soup"
    "trout-soup" = "Trout_Soup"
    "chocolate-cake" = "Chocolate_Cake"
    "pink-cake" = "Pink_Cake"
    "rhubarb-pie" = "Rhubarb_Pie"
    "cookie" = "Cookie"
    "spaghetti" = "Spaghetti"
    "fried-eel" = "Fried_Eel"
    "spicy-eel" = "Spicy_Eel"
    "sashimi" = "Sashimi"
    "maki-roll" = "Maki_Roll"
    "tortilla" = "Tortilla"
    "red-plate" = "Red_Plate"
    "eggplant-parmesan" = "Eggplant_Parmesan"
    "rice-pudding" = "Rice_Pudding"
    "ice-cream" = "Ice_Cream"
    "blueberry-tart" = "Blueberry_Tart"
    "autumns-bounty" = "Autumn%27s_Bounty"
    "pumpkin-soup" = "Pumpkin_Soup"
    "super-meal" = "Super_Meal"
    "cranberry-sauce" = "Cranberry_Sauce"
    "stuffing" = "Stuffing"
    "farmers-lunch" = "Farmer%27s_Lunch"
    "survival-burger" = "Survival_Burger"
    "dish-o-the-sea" = "Dish_O%27_The_Sea"
    "miners-treat" = "Miner%27s_Treat"
    "roots-platter" = "Roots_Platter"
    "seafoam-pudding" = "Seafoam_Pudding"
    "pale-broth" = "Pale_Broth"
    "plum-pudding" = "Plum_Pudding"
    "artichoke-dip" = "Artichoke_Dip"
    "stir-fry" = "Stir_Fry"
    "roasted-hazelnuts" = "Roasted_Hazelnuts"
    "poppyseed-muffin" = "Poppyseed_Muffin"
    "chowder" = "Chowder"
    "lobster-bisque" = "Lobster_Bisque"
    "escargot" = "Escargot"
    "fish-stew" = "Fish_Stew"
    "maple-bar" = "Maple_Bar"
    "crab-cakes" = "Crab_Cakes"
    "shrimp-cocktail" = "Shrimp_Cocktail"
    "ginger-ale" = "Ginger_Ale"
    "banana-pudding" = "Banana_Pudding"
    "mango-sticky-rice" = "Mango_Sticky_Rice"
    "poi" = "Poi"
    "tropical-curry" = "Tropical_Curry"
    "squid-ink-ravioli" = "Squid_Ink_Ravioli"
    "pumpkin-pie" = "Pumpkin_Pie"
    "radish-salad" = "Radish_Salad"
    "fruit-salad" = "Fruit_Salad"
    "blackberry-cobbler" = "Blackberry_Cobbler"
    "cranberry-candy" = "Cranberry_Candy"
    "bruschetta" = "Bruschetta"
    "coleslaw" = "Coleslaw"
    "fiddlehead-risotto" = "Fiddlehead_Risotto"
    "moss-soup" = "Moss_Soup"
    "triple-shot-espresso" = "Triple_Shot_Espresso"
}

$outputDir = "public\images\items"
$success = 0
$failed = 0
$skipped = 0

Write-Host "🍳 开始下载 Stardew Valley 食谱图片..." -ForegroundColor Cyan
Write-Host ""

foreach ($entry in $recipes.GetEnumerator()) {
    $slug = $entry.Key
    $wikiName = $entry.Value
    $outputFile = "$outputDir\$slug.webp"
    
    # 跳过已存在的文件
    if (Test-Path $outputFile) {
        Write-Host "⏭️  跳过 $slug (已存在)" -ForegroundColor Gray
        $skipped++
        continue
    }
    
    # 构建 Wiki 图片 URL (使用 API 方式获取实际图片 URL)
    $apiUrl = "https://stardewvalleywiki.com/mediawiki/api.php?action=query&titles=File:${wikiName}.png&prop=imageinfo&iiprop=url&format=json"
    
    try {
        Write-Host "📥 下载 $slug..." -ForegroundColor Yellow -NoNewline
        
        # 获取图片实际 URL
        $response = Invoke-RestMethod -Uri $apiUrl -Headers @{"User-Agent"="Mozilla/5.0"}
        $pages = $response.query.pages
        $pageId = ($pages.PSObject.Properties | Select-Object -First 1).Name
        $imageUrl = $pages.$pageId.imageinfo[0].url
        
        if ($imageUrl) {
            # 下载 PNG 图片
            $tempPng = "$outputDir\$slug.png"
            Invoke-WebRequest -Uri $imageUrl -OutFile $tempPng -Headers @{"User-Agent"="Mozilla/5.0"}
            
            # 检查文件是否下载成功
            if ((Test-Path $tempPng) -and (Get-Item $tempPng).Length -gt 0) {
                # 重命名为 webp (PNG 实际上可以用，但为了一致性)
                # 简单方案：直接复制为 webp（浏览器通常也能显示 PNG）
                Copy-Item $tempPng $outputFile
                Remove-Item $tempPng
                Write-Host " ✅" -ForegroundColor Green
                $success++
            } else {
                Write-Host " ❌ (文件为空)" -ForegroundColor Red
                $failed++
            }
        } else {
            Write-Host " ❌ (未找到图片URL)" -ForegroundColor Red
            $failed++
        }
        
        # 延迟避免请求过快
        Start-Sleep -Milliseconds 300
        
    } catch {
        Write-Host " ❌ ($($_.Exception.Message))" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "📊 下载完成统计:" -ForegroundColor Cyan
Write-Host "   ✅ 成功: $success" -ForegroundColor Green
Write-Host "   ⏭️  跳过: $skipped" -ForegroundColor Gray
Write-Host "   ❌ 失败: $failed" -ForegroundColor Red
