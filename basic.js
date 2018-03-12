const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({ Referer: 'https://casino.eu' });
  await page.goto('https://casino.eu');

  // Load content
  const html = await page.content();

  // Load into cheerio so we can scrape the page
  const $ = cheerio.load(html);

  let data = {}

  const offers = $('.c-hero--feature');
  
  data.offerHeading = offers.find('.c-hero__header').text();

  console.log(data);

  await browser.close();
})();