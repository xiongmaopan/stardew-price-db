# Download missing item images from Stardew Valley Wiki

$outputDir = "public\images\items"

# Image URL mappings - using the exact wiki filenames
$images = @{
    "aged-roe" = "Aged_Roe.png"
    "pale-ale" = "Pale_Ale.png"
    "mead" = "Mead.png"
    "dinosaur-mayonnaise" = "Dinosaur_Mayonnaise.png"
    "truffle-oil" = "Truffle_Oil.png"
    "honey" = "Honey_(any).png"
    "fairy-honey" = "Fairy_Rose_Honey.png"
    "oak-resin" = "Oak_Resin.png"
    "pine-tar" = "Pine_Tar.png"
    "sap" = "Sap.png"
    "stone" = "Stone.png"
    "fiber" = "Fiber.png"
    "coal" = "Coal.png"
    "gold-ore" = "Gold_Ore.png"
    "iridium-ore" = "Iridium_Ore.png"
    "iron-bar" = "Iron_Bar.png"
    "gold-bar" = "Gold_Bar.png"
    "iridium-bar" = "Iridium_Bar.png"
    "radioactive-bar" = "Radioactive_Bar.png"
    "spice-berry" = "Spice_Berry.png"
    "grape-forage" = "Grape.png"
    "sweet-pea" = "Sweet_Pea.png"
    "red-mushroom" = "Red_Mushroom.png"
    "holly" = "Holly.png"
    "crocus" = "Crocus.png"
    "nautilus-shell" = "Nautilus_Shell.png"
    "cactus-fruit" = "Cactus_Fruit.png"
    "ginger" = "Ginger.png"
    "magma-cap" = "Magma_Cap.png"
    "battery-pack" = "Battery_Pack.png"
    "refined-quartz" = "Refined_Quartz.png"
    "oil" = "Oil.png"
    "sugar" = "Sugar.png"
    "rice" = "Rice.png"
    "vinegar" = "Vinegar.png"
    "geode" = "Geode.png"
    "frozen-geode" = "Frozen_Geode.png"
    "magma-geode" = "Magma_Geode.png"
    "omni-geode" = "Omni_Geode.png"
    "pearl" = "Pearl.png"
    "banana" = "Banana.png"
    "mango" = "Mango.png"
    "qi-fruit" = "Qi_Fruit.png"
}

$baseUrl = "https://stardewvalleywiki.com/mediawiki/images"

# Known working image hashes from wiki
$knownHashes = @{
    "aged-roe" = "b/b9"
    "pale-ale" = "e/ec"
    "mead" = "4/4b"
    "dinosaur-mayonnaise" = "3/3f"
    "truffle-oil" = "0/0e"
    "honey" = "a/a8"
    "fairy-honey" = "f/f2"
    "oak-resin" = "a/a4"
    "pine-tar" = "8/8a"
    "sap" = "b/b6"
    "stone" = "7/72"
    "fiber" = "d/df"
    "coal" = "6/60"
    "gold-ore" = "a/aa"
    "iridium-ore" = "8/8a"
    "iron-bar" = "9/9d"
    "gold-bar" = "5/54"
    "iridium-bar" = "a/a5"
    "radioactive-bar" = "7/72"
    "spice-berry" = "b/bc"
    "grape-forage" = "c/cb"
    "sweet-pea" = "5/5b"
    "red-mushroom" = "d/db"
    "holly" = "6/67"
    "crocus" = "c/c0"
    "nautilus-shell" = "7/7b"
    "cactus-fruit" = "6/6c"
    "ginger" = "2/23"
    "magma-cap" = "8/85"
    "battery-pack" = "d/d0"
    "refined-quartz" = "e/ef"
    "oil" = "5/54"
    "sugar" = "3/32"
    "rice" = "d/db"
    "vinegar" = "0/04"
    "geode" = "4/43"
    "frozen-geode" = "b/bf"
    "magma-geode" = "8/89"
    "omni-geode" = "0/09"
    "pearl" = "3/33"
    "banana" = "9/94"
    "mango" = "2/29"
    "qi-fruit" = "e/e9"
}

foreach ($item in $images.Keys) {
    $wikiFile = $images[$item]
    $outputFile = Join-Path $outputDir "$item.webp"
    
    if (Test-Path $outputFile) {
        Write-Host "Already exists: $item" -ForegroundColor Gray
        continue
    }
    
    $hash = $knownHashes[$item]
    if (-not $hash) {
        Write-Host "No hash for: $item" -ForegroundColor Yellow
        continue
    }
    
    $url = "$baseUrl/$hash/$wikiFile"
    $tempFile = Join-Path $env:TEMP "$item.png"
    
    try {
        Write-Host "Downloading: $item..." -NoNewline
        Invoke-WebRequest -Uri $url -OutFile $tempFile -ErrorAction Stop
        
        # Convert to webp using magick if available, otherwise just rename
        if (Get-Command "magick" -ErrorAction SilentlyContinue) {
            magick $tempFile -resize "48x48" -quality 90 $outputFile
            Remove-Item $tempFile -Force
        } else {
            # Just copy as-is (rename to webp)
            Copy-Item $tempFile $outputFile
            Remove-Item $tempFile -Force
        }
        
        Write-Host " OK" -ForegroundColor Green
    } catch {
        Write-Host " FAILED: $_" -ForegroundColor Red
    }
}

Write-Host "`nDone!" -ForegroundColor Cyan
