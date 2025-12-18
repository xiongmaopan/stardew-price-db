/**
 * 修复图片格式问题
 * 将 PNG 格式但使用 .webp 扩展名的文件转换为真正的 WebP 格式
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ITEMS_DIR = path.join(__dirname, '../public/images/items');

async function fixImages() {
  const files = fs.readdirSync(ITEMS_DIR).filter(f => f.endsWith('.webp'));
  
  console.log(`Found ${files.length} .webp files`);
  
  let converted = 0;
  let alreadyWebp = 0;
  let errors = 0;
  
  for (const file of files) {
    const filePath = path.join(ITEMS_DIR, file);
    const buffer = fs.readFileSync(filePath);
    
    // Check if it's PNG (header: 89 50 4E 47 = 137 80 78 71)
    const isPng = buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71;
    
    if (isPng) {
      try {
        // Convert PNG to real WebP
        const webpBuffer = await sharp(buffer)
          .webp({ quality: 100, lossless: true })
          .toBuffer();
        
        fs.writeFileSync(filePath, webpBuffer);
        converted++;
        console.log(`Converted: ${file} (${buffer.length} -> ${webpBuffer.length} bytes)`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
        errors++;
      }
    } else {
      alreadyWebp++;
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`Already WebP: ${alreadyWebp}`);
  console.log(`Converted PNG->WebP: ${converted}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total: ${files.length}`);
  
  // Also remove the duplicate .png files we created earlier
  const pngFiles = fs.readdirSync(ITEMS_DIR).filter(f => f.endsWith('.png'));
  if (pngFiles.length > 0) {
    console.log(`\nRemoving ${pngFiles.length} duplicate .png files...`);
    for (const pngFile of pngFiles) {
      fs.unlinkSync(path.join(ITEMS_DIR, pngFile));
    }
    console.log('Done!');
  }
}

fixImages().catch(console.error);
