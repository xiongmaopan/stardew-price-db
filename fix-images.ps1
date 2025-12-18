# Fix PNG files with wrong .webp extension
# Rename them to .png so browsers can display them correctly

$itemsPath = "d:\CODEFREE\星露谷\stardew-price-db\public\images\items"
$pngFiles = @()
$webpFiles = @()

Get-ChildItem "$itemsPath\*.webp" | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    $isPng = ($bytes[0] -eq 137) -and ($bytes[1] -eq 80) -and ($bytes[2] -eq 78) -and ($bytes[3] -eq 71)
    
    if ($isPng) {
        $pngFiles += $_.Name
        # Rename to .png
        $newName = $_.Name -replace '\.webp$', '.png'
        $newPath = Join-Path $itemsPath $newName
        Copy-Item $_.FullName $newPath -Force
        Write-Host "Converted: $($_.Name) -> $newName"
    } else {
        $webpFiles += $_.Name
    }
}

Write-Host ""
Write-Host "Summary:"
Write-Host "PNG files (copied to .png): $($pngFiles.Count)"
Write-Host "WebP files (kept as is): $($webpFiles.Count)"
