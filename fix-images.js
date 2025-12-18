const fs = require('fs');
const path = require('path');

const itemsPath = 'd:/CODEFREE/星露谷/stardew-price-db/public/images/items';

// Read all files
const files = fs.readdirSync(itemsPath).filter(f => f.endsWith('.webp'));

console.log(`Found ${files.length} .webp files`);

let pngCount = 0;
let webpCount = 0;
let converted = [];

files.forEach(file => {
    const filePath = path.join(itemsPath, file);
    const buffer = fs.readFileSync(filePath);
    
    // Check if it's PNG (header: 89 50 4E 47 = 137 80 78 71)
    const isPng = buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71;
    
    if (isPng) {
        pngCount++;
        // Copy to .png file
        const newName = file.replace('.webp', '.png');
        const newPath = path.join(itemsPath, newName);
        fs.copyFileSync(filePath, newPath);
        converted.push(file);
        console.log(`Copied: ${file} -> ${newName}`);
    } else {
        webpCount++;
    }
});

console.log('\n=== Summary ===');
console.log(`PNG files converted: ${pngCount}`);
console.log(`WebP files (kept): ${webpCount}`);
console.log(`Total: ${pngCount + webpCount}`);
