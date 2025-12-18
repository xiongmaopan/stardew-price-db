# Download missing item images from Stardew Valley Wiki
# Using correct wiki URL format discovered through testing

$outputDir = "public\images\items"

# Corrected image paths (verified format: hash/hash/Filename.png)
$images = @{
    "aged-roe" = "0/0e/Aged_Roe.png"
    "pale-ale" = "b/bd/Pale_Ale.png"
    "mead" = "3/3a/Mead.png"
    "dinosaur-mayonnaise" = "4/45/Dinosaur_Mayonnaise.png"
    "truffle-oil" = "4/47/Truffle_Oil.png"
    "honey" = "6/69/Honey.png"
    "fairy-honey" = "a/a2/Fairy_Rose_Honey.png"
    "oak-resin" = "5/5b/Oak_Resin.png"
    "pine-tar" = "4/45/Pine_Tar.png"
    "sap" = "b/b6/Sap.png"
    "stone" = "7/72/Stone.png"
    "fiber" = "f/f2/Fiber.png"
    "coal" = "6/60/Coal.png"
    "gold-ore" = "a/aa/Gold_Ore.png"
    "iridium-ore" = "8/8a/Iridium_Ore.png"
    "iron-bar" = "1/1e/Iron_Bar.png"
    "gold-bar" = "3/33/Gold_Bar.png"
    "iridium-bar" = "4/4e/Iridium_Bar.png"
    "radioactive-bar" = "4/48/Radioactive_Bar.png"
    "spice-berry" = "a/a1/Spice_Berry.png"
    "grape-forage" = "c/cb/Grape.png"
    "sweet-pea" = "0/07/Sweet_Pea.png"
    "red-mushroom" = "5/57/Red_Mushroom.png"
    "holly" = "b/b3/Holly.png"
    "crocus" = "4/4f/Crocus.png"
    "nautilus-shell" = "2/24/Nautilus_Shell.png"
    "cactus-fruit" = "a/a0/Cactus_Fruit.png"
    "ginger" = "6/62/Ginger.png"
    "magma-cap" = "3/36/Magma_Cap.png"
    "battery-pack" = "7/78/Battery_Pack.png"
    "refined-quartz" = "a/ab/Refined_Quartz.png"
    "oil" = "5/5f/Oil.png"
    "sugar" = "a/a9/Sugar.png"
    "rice" = "8/83/Rice.png"
    "vinegar" = "1/17/Vinegar.png"
    "geode" = "4/43/Geode.png"
    "frozen-geode" = "b/bf/Frozen_Geode.png"
    "magma-geode" = "8/89/Magma_Geode.png"
    "omni-geode" = "0/09/Omni_Geode.png"
    "pearl" = "8/88/Pearl.png"
    "banana" = "0/04/Banana.png"
    "mango" = "0/00/Mango.png"
    "qi-fruit" = "8/8d/Qi_Fruit.png"
}

$baseUrl = "https://stardewvalleywiki.com/mediawiki/images"

foreach ($item in $images.Keys) {
    $wikiPath = $images[$item]
    $outputFile = Join-Path $outputDir "$item.webp"
    
    if (Test-Path $outputFile) {
        Write-Host "Skip: $item" -ForegroundColor Gray
        continue
    }
    
    $url = "$baseUrl/$wikiPath"
    
    try {
        Write-Host "Downloading: $item..." -NoNewline
        Invoke-WebRequest -Uri $url -OutFile $outputFile -ErrorAction Stop
        Write-Host " OK" -ForegroundColor Green
    } catch {
        Write-Host " FAIL" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 100
}

Write-Host "Done!"
