const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = 'd:/projects/herbal_tea/frontend/public/home';

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function processFiles() {
  for (let i = 1; i <= 9; i++) {
    const file = path.join(dir, 'img' + i + '.png');
    if (!fs.existsSync(file)) continue;
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Try to find og:image first
      const ogMatch = content.match(/<meta property="og:image"[^>]*content="([^"]+)"/);
      let imageUrl = ogMatch ? ogMatch[1] : null;
      
      // If not, try to parse JSON
      if (!imageUrl) {
        const jsonMatch = content.match(/<script id="__PWS_DATA__" type="application\/json">(.+?)<\/script>/);
        if (jsonMatch) {
            const imgMatch = jsonMatch[1].match(/"url":"(https:\/\/i\.pinimg\.com\/736x\/[^"]+)"/);
            if (imgMatch) {
                imageUrl = imgMatch[1];
            } else {
                const imgMatch2 = jsonMatch[1].match(/"url":"(https:\/\/i\.pinimg\.com\/originals\/[^"]+)"/);
                if (imgMatch2) imageUrl = imgMatch2[1];
            }
        }
      }
      
      if (imageUrl) {
        console.log('Downloading ' + imageUrl + ' to ' + file);
        await downloadImage(imageUrl, file);
      } else {
        console.log('Could not find image for img' + i);
      }
    } catch (e) {
      console.log('Error processing img' + i + ': ' + e.message);
    }
  }
}

processFiles();
