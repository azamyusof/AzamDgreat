const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const { mykad } = req.query;

  if (!mykad) {
    return res.status(400).json({ error: 'MyKad number is required' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://keahlian.pejuang.org.my/semakan/');

    await page.type('input[name="kp"]', mykad);
    await page.click('button[type="submit"]');

    await page.waitForSelector('table', { timeout: 10000 });

    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      const result = {};
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length === 2) {
          const label = cells[0].innerText.toLowerCase().trim();
          const value = cells[1].innerText.trim();
          if (label.includes('nama penuh')) {
            result.nama_penuh = value;
          }
          if (label.includes('no. ahli')) {
            result.no_ahli = value;
          }
        }
      });
      return result;
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
