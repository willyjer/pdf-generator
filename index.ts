const express = require('express');
const puppeteer = require('puppeteer-core');

const app = express();
// parse JSON bodies up to 10MB
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;
const CHROME_PATH = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable';

app.post('/generate', async (req, res) => {
  const { html, options } = req.body;
  if (!html) {
    return res.status(400).json({ error: 'Missing \"html\" in request body' });
  }
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: CHROME_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf(options);
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=output.pdf',
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err);
    res.status(500).json({ error: 'Error generating PDF', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`PDF service listening on port ${PORT}`);
});
