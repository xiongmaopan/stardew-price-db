// Test fetching Wiki image URL
const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        console.log('Redirect to:', res.headers.location);
        fetchPage(res.headers.location).then(resolve).catch(reject);
        return;
      }
      console.log('Status:', res.statusCode);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function test() {
  console.log('Fetching Crab wiki page...');
  const html = await fetchPage('https://stardewvalleywiki.com/Crab');
  
  // Find all image URLs
  const imgPattern = /src="([^"]*mediawiki\/images[^"]*\.png)"/gi;
  const matches = [...html.matchAll(imgPattern)];
  
  console.log('\nFound images:');
  matches.slice(0, 10).forEach((m, i) => {
    console.log(`${i+1}. ${m[1]}`);
  });
}

test().catch(console.error);
