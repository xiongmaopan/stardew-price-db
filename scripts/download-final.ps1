# 图片URL映射 - 从wiki获取的正确路径
$imageMap = @{
    "aged-roe" = "0/0e/Aged_Roe.png"
    "pale-ale" = "e/ec/Pale_Ale.png"
    "mead" = "4/4b/Mead.png"
    "dinosaur-mayonnaise" = "3/3f/Dinosaur_Mayonnaise.png"
    "truffle-oil" = "0/0e/Truffle_Oil.png"
    "honey" = "6/6e/Honey.png"
    "fairy-honey" = "f/f2/Fairy_Rose_Honey.png"
    "oak-resin" = "a/a4/Oak_Resin.png"
    "pine-tar" = "8/8a/Pine_Tar.png"
    "sap" = "b/b6/Sap.png"
    "stone" = "7/72/Stone.png"
    "fiber" = "d/df/Fiber.png"
    "coal" = "6/60/Coal.png"
    "gold-ore" = "a/aa/Gold_Ore.png"
    "iridium-ore" = "8/8a/Iridium_Ore.png"
    "iron-bar" = "1/1d/Iron_Bar.png"
    "gold-bar" = "5/54/Gold_Bar.png"
    "iridium-bar" = "a/a5/Iridium_Bar.png"
    "radioactive-bar" = "d/df/Radioactive_Bar.png"
    "spice-berry" = "b/bc/Spice_Berry.png"
    "grape-forage" = "c/cb/Grape.png"
    "sweet-pea" = "5/5b/Sweet_Pea.png"
    "red-mushroom" = "d/db/Red_Mushroom.png"
    "holly" = "6/67/Holly.png"
    "crocus" = "c/c0/Crocus.png"
    "nautilus-shell" = "7/7b/Nautilus_Shell.png"
    "cactus-fruit" = "6/6c/Cactus_Fruit.png"
    "ginger" = "2/23/Ginger.png"
    "magma-cap" = "8/85/Magma_Cap.png"
    "battery-pack" = "9/9b/Battery_Pack.png"
    "refined-quartz" = "9/98/Refined_Quartz.png"
    "oil" = "d/d4/Oil.png"
    "sugar" = "3/32/Sugar.png"
    "rice" = "d/da/Rice.png"
    "vinegar" = "0/04/Vinegar.png"
    "geode" = "4/43/Geode.png"
    "frozen-geode" = "b/bf/Frozen_Geode.png"
    "magma-geode" = "8/89/Magma_Geode.png"
    "omni-geode" = "0/09/Omni_Geode.png"
    "pearl" = "3/33/Pearl.png"
    "banana" = "9/94/Banana.png"
    "mango" = "0/00/Mango.png"
    "qi-fruit" = "e/e9/Qi_Fruit.png"
}

$baseUrl = "https://stardewvalleywiki.com/mediawiki/images"
$outDir = "public/images/items"

$success = 0
$failed = 0

foreach ($item in $imageMap.Keys) {
    $outFile = Join-Path $outDir "$item.webp"
    
    if (Test-Path $outFile) {
        Write-Host "Skip: $item (exists)" -ForegroundColor Gray
        continue
    }
    
    $url = "$baseUrl/$($imageMap[$item])"
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing -ErrorAction Stop
        Write-Host "OK: $item" -ForegroundColor Green
        $success++
    } catch {
        Write-Host "FAIL: $item - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host "`nDone! Success: $success, Failed: $failed" -ForegroundColor Cyan
