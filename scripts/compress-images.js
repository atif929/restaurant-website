// Save this as scripts/compress-images.js
// Run with: node scripts/compress-images.js
// First install: npm install sharp --save-dev

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const categories = ['starters', 'main-course', 'desserts', 'drinks'];

async function compressImages() {
  console.log('🖼️ Starting image compression...');
  console.log('📁 This will create WebP versions of your images\n');

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let count = 0;

  for (const category of categories) {
    const categoryPath = path.join(imagesDir, category);
    if (!fs.existsSync(categoryPath)) continue;

    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
      
      const inputPath = path.join(categoryPath, file);
      const outputPath = path.join(categoryPath, file.replace(/\.[^.]+$/, '.webp'));
      
      try {
        const stats = fs.statSync(inputPath);
        const originalSize = stats.size;
        totalOriginalSize += originalSize;

        await sharp(inputPath)
          .resize(600, 450, { 
            fit: 'cover',
            withoutEnlargement: true 
          })
          .webp({ 
            quality: 75,
            effort: 4
          })
          .toFile(outputPath);

        const compressedStats = fs.statSync(outputPath);
        const compressedSize = compressedStats.size;
        totalCompressedSize += compressedSize;
        count++;

        const saved = ((1 - compressedSize / originalSize) * 100).toFixed(1);
        console.log(`✅ ${category}/${file}`);
        console.log(`   📦 ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${saved}% saved)`);
        
        // Keep original as backup, but use WebP
        // You can delete originals by uncommenting:
        // fs.unlinkSync(inputPath);
        
      } catch (error) {
        console.error(`❌ Failed to compress: ${category}/${file}`, error.message);
      }
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Images processed: ${count}`);
  console.log(`   Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Compressed total: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Total saved: ${((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('\n🎉 Compression complete! WebP versions created.');
  console.log('💡 The website will now use WebP images for faster loading.');
}

compressImages().catch(console.error);