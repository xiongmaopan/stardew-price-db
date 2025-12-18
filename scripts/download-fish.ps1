# Download missing fish images from Stardew Valley Wiki
# Uses PowerShell to scrape wiki pages for correct image URLs

$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

$OutputDir = "d:\CODEFREE\星露谷\stardew-price-db\public\images\items"

# Missing fish: slug -> wiki page name
$MissingFish = @{
    "midnight-carp" = "Midnight_Carp"
    "spook-fish" = "Spook_Fish"
    "blobfish" = "Blobfish"
    "midnight-squid" = "Midnight_Squid"
    "crab" = "Crab"
    "lobster" = "Lobster"
    "shrimp" = "Shrimp"
    "crayfish" = "Crayfish"
    "snail" = "Snail"
    "periwinkle" = "Periwinkle"
    "mussel" = "Mussel"
    "oyster" = "Oyster"
    "cockle" = "Cockle"
    "clam" = "Clam"
    "coral" = "Coral"
    "sea-urchin" = "Sea_Urchin"
    "stingray" = "Stingray"
    "lionfish" = "Lionfish"
    "blue-discus" = "Blue_Discus"
    "son-of-crimsonfish" = "Son_of_Crimsonfish"
    "ms-angler" = "Ms._Angler"
    "legend-ii" = "Legend_II"
    "glacierfish-jr" = "Glacierfish_Jr."
    "radioactive-carp" = "Radioactive_Carp"
    "goby" = "Goby"
}

$success = 0
$failed = 0
$failedList = @()

foreach ($entry in $MissingFish.GetEnumerator()) {
    $slug = $entry.Key
    $wikiName = $entry.Value
    $webpPath = Join-Path $OutputDir "$slug.webp"
    $pngPath = Join-Path $OutputDir "$slug.png"
    
    # Skip if already exists
    if (Test-Path $webpPath) {
        Write-Host "[SKIP] $slug - already exists" -ForegroundColor Gray
        $success++
        continue
    }
    
    Write-Host "`nProcessing: $slug" -ForegroundColor Cyan
    
    try {
        # Fetch wiki page
        $wikiUrl = "https://stardewvalleywiki.com/$wikiName"
        Write-Host "  Fetching: $wikiUrl"
        $response = Invoke-WebRequest -Uri $wikiUrl -UseBasicParsing -TimeoutSec 30
        $html = $response.Content
        
        # Extract image URL - look for the item image (not thumbnail)
        # Pattern: mediawiki/images/X/XX/Item_Name.png (without /thumb/)
        $searchName = $wikiName -replace "_", "_"
        $pattern = "mediawiki/images/[a-f0-9]/[a-f0-9]{2}/$searchName\.png"
        
        $match = [regex]::Match($html, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
        
        if (-not $match.Success) {
            # Try alternate pattern without exact name match
            $pattern2 = "mediawiki/images/[a-f0-9]/[a-f0-9]{2}/[^/""]+\.png"
            $matches2 = [regex]::Matches($html, $pattern2)
            foreach ($m in $matches2) {
                $val = $m.Value
                # Skip thumbnails and unrelated images
                if ($val -notmatch "thumb" -and $val -notmatch "Icon" -and $val -notmatch "Skill" -and $val -notmatch "Map") {
                    $match = $m
                    break
                }
            }
        }
        
        if (-not $match.Success) {
            Write-Host "  [FAIL] Could not find image URL" -ForegroundColor Red
            $failedList += $slug
            $failed++
            continue
        }
        
        $imgPath = $match.Value
        $imgUrl = "https://stardewvalleywiki.com/$imgPath"
        Write-Host "  Found: $imgUrl"
        
        # Download PNG
        Invoke-WebRequest -Uri $imgUrl -OutFile $pngPath -UseBasicParsing -TimeoutSec 30
        
        # Convert to WebP using sharp (via node)
        $convertCmd = "require('sharp')('$($pngPath -replace '\\','/')').webp({quality:90}).toFile('$($webpPath -replace '\\','/')')"
        node -e $convertCmd 2>$null
        
        # Check if conversion succeeded
        if (Test-Path $webpPath) {
            Remove-Item $pngPath -Force
            Write-Host "  [OK] Downloaded and converted" -ForegroundColor Green
            $success++
        } else {
            # Keep PNG if WebP conversion failed
            Write-Host "  [WARN] WebP conversion failed, keeping PNG" -ForegroundColor Yellow
            Rename-Item $pngPath $webpPath
            $success++
        }
        
    } catch {
        Write-Host "  [FAIL] $($_.Exception.Message)" -ForegroundColor Red
        $failedList += $slug
        $failed++
    }
    
    # Rate limit
    Start-Sleep -Milliseconds 500
}

Write-Host "`n========================================" -ForegroundColor White
Write-Host "Complete! Success: $success, Failed: $failed" -ForegroundColor White

if ($failedList.Count -gt 0) {
    Write-Host "`nFailed items:" -ForegroundColor Yellow
    $failedList | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
}
