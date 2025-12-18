# PowerShell script to download fish images from Stardew Valley Wiki
$ErrorActionPreference = "SilentlyContinue"
$outputDir = "d:\CODEFREE\星露谷\stardew-price-db\public\images\items"

$fishList = @(
    @{slug="bullhead"; wiki="Bullhead"},
    @{slug="bream"; wiki="Bream"},
    @{slug="sunfish"; wiki="Sunfish"},
    @{slug="shad"; wiki="Shad"},
    @{slug="halibut"; wiki="Halibut"},
    @{slug="lingcod"; wiki="Lingcod"},
    @{slug="squid"; wiki="Squid"},
    @{slug="tilapia"; wiki="Tilapia"},
    @{slug="dorado"; wiki="Dorado"},
    @{slug="albacore"; wiki="Albacore"},
    @{slug="woodskip"; wiki="Woodskip"},
    @{slug="ghostfish"; wiki="Ghostfish"},
    @{slug="stonefish"; wiki="Stonefish"},
    @{slug="ice-pip"; wiki="Ice_Pip"},
    @{slug="scorpion-carp"; wiki="Scorpion_Carp"},
    @{slug="sandfish"; wiki="Sandfish"}
)

foreach ($fish in $fishList) {
    $outFile = Join-Path $outputDir "$($fish.slug).png"
    
    # Skip if webp exists
    $webpFile = Join-Path $outputDir "$($fish.slug).webp"
    if (Test-Path $webpFile) {
        Write-Host "SKIP $($fish.slug) - webp exists" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "Downloading $($fish.slug)..." -NoNewline
    
    try {
        # Get wiki page to find correct image URL
        $wikiUrl = "https://stardewvalleywiki.com/$($fish.wiki)"
        $response = Invoke-WebRequest -Uri $wikiUrl -UserAgent "Mozilla/5.0" -TimeoutSec 10
        
        # Extract og:image meta tag
        if ($response.Content -match 'og:image" content="([^"]+\.png)"') {
            $imageUrl = $matches[1]
            
            # Download the image
            Invoke-WebRequest -Uri $imageUrl -OutFile $outFile -UserAgent "Mozilla/5.0" -TimeoutSec 10
            
            $size = (Get-Item $outFile).Length
            Write-Host " OK ($size bytes)" -ForegroundColor Green
        } else {
            Write-Host " FAIL (no image found)" -ForegroundColor Red
        }
    } catch {
        Write-Host " ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Milliseconds 500
}

Write-Host "`nDone!" -ForegroundColor Cyan
