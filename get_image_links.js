const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// 수집할 URL들
const urls = {
  breakfast: 'https://web.aw.ca/en/our-menu/breakfast',
  burgers: 'https://web.aw.ca/en/our-menu/burgers',
  chicken: 'https://web.aw.ca/en/our-menu/chicken',
  sides: 'https://web.aw.ca/en/our-menu/sides',
  kidspack: 'https://web.aw.ca/en/our-menu/kidspack',
  drinks: 'https://web.aw.ca/en/our-menu/drinks',
  brewbar: 'https://web.aw.ca/en/our-menu/brewbar',
};

// 데이터를 저장할 디렉토리 설정
const saveDirectory = path.join(__dirname, 'menu_images');

// 디렉토리가 없을 경우 생성
if (!fs.existsSync(saveDirectory)) {
  fs.mkdirSync(saveDirectory);
}

// Puppeteer를 사용하여 이미지 URL 수집
async function fetchAndProcessImages(url, category) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 페이지 내에서 background-image URL과 img 태그의 src 속성 추출
    const imageUrls = await page.evaluate(() => {
      const regex = /url\(["']?\/i\/menu\/\?i=([^&]+)&lang=([^"')]+)["']?\)/;
      let results = [];

      // style 속성에서 background-image 추출
      const elementsWithBackground = document.querySelectorAll('[style]');
      elementsWithBackground.forEach(element => {
        const style = element.getAttribute('style');
        if (regex.test(style)) {
          const match = style.match(regex);
          const fullUrl = `https://web.aw.ca/i/menu/?i=${match[1]}&lang=${match[2]}`;
          results.push(fullUrl);
        }
      });

      // img 태그의 src 속성 추출
      const imgElements = document.querySelectorAll('img');
      imgElements.forEach(img => {
        const imgSrc = img.getAttribute('src');
        if (imgSrc) {
          results.push(imgSrc);
        }
      });

      return results;
    });

    console.log(`Extracted URLs from ${category}:`, imageUrls);

    // JSON 파일로 저장
    const filePath = path.join(saveDirectory, `${category}.json`);
    fs.writeFileSync(filePath, JSON.stringify(imageUrls, null, 2), 'utf-8');
    console.log(`Data saved for category: ${category}`);
    
    await browser.close();
  } catch (error) {
    console.error(`Error fetching data for ${category}:`, error);
  }
}

// 모든 URL을 순차적으로 처리하여 이미지 수집 및 저장
async function processAllUrls() {
  for (const [category, url] of Object.entries(urls)) {
    console.log(`Processing category: ${category}`);
    await fetchAndProcessImages(url, category);
  }
}

// 데이터 수집 실행
processAllUrls();
