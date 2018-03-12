const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ Referer: 'https://casino.eu' });
  
  page.once('load', () => console.log('Page loaded!'));

  page.on('response', async res => {
    
    const url = res.url();

    if (url.includes('/api/feed')) {
      const jsonData = await res.json();
      const textData = await res.text();

      console.log('Received response from: %s', url);
      // console.dir(jsonData);
      // console.log('Plain text: %s', textData);

      fs.writeFileSync('response.json', JSON.stringify(jsonData, null, 2));

      console.log('Finished writing json data to response.json');

      browser.close().then(() => {
        console.log('Closing browser instance.');
      });
    }
  });

  await page.goto('https://casino.eu', {
    timeout: 0,
    waitUntil: 'networkidle0'
  });

  // await 
});

// (async () => {
//   const browser = await puppeteer.launch();
  
// })();