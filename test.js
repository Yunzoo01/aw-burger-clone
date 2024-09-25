const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// Puppeteer로 동적 콘텐츠 처리하고 URL 변환
async function fetchAndProcessHTMLWithPuppeteer() {
  // Puppeteer 브라우저 실행
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 웹 페이지 열기 및 대기
  await page.goto('https://web.aw.ca/en/our-menu/breakfast', { waitUntil: 'networkidle0' });

  // 페이지 내 URL 변환 실행
  const updatedURLs = await page.evaluate(() => {
    const elements = document.querySelectorAll('[style]');
    const regex = /url\(["']?\/i\/menu\/\?i=([^&]+)&lang=([^"')]+)["']?\)/;
    let results = [];

    elements.forEach(element => {
      const style = element.getAttribute('style');
      if (regex.test(style)) {
        const updatedStyle = style.replace(regex, 'https://web.aw.ca/i/menu/?i=$1&lang=$2');
        element.setAttribute('style', updatedStyle);
        results.push(updatedStyle);  // 변경된 URL 저장
      }
    });

    return results;  // 변환된 URL 목록 반환
  });

  console.log('Updated URLs from Puppeteer:', updatedURLs);

  // Puppeteer 브라우저 종료
  await browser.close();
}

// Cheerio를 사용한 HTML 파싱 및 URL 변환
async function fetchAndProcessHTMLWithCheerio(url) {
  try {
    // axios로 HTML 가져오기
    const response = await axios.get(url);
    const html = response.data;

    // Cheerio로 HTML 파싱
    const $ = cheerio.load(html);

    // img 태그의 src 속성 추출
    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      console.log('Image URL (img tag):', imgSrc);
    });

    // style 속성에서 background-image URL 추출 및 변환
    $('[style]').each((index, element) => {
      const style = $(element).attr('style');
      const regex = /url\(["']?\/i\/menu\/\?i=([^&]+)&lang=([^"')]+)["']?\)/;

      // URL 패턴을 찾아서 변환
      if (regex.test(style)) {
        const updatedStyle = style.replace(
          regex,
          'https://web.aw.ca/i/menu/?i=$1&lang=$2'
        );
        console.log('Updated Style (from Cheerio):', updatedStyle);
      }
    });
  } catch (error) {
    console.error('Error fetching the HTML with Cheerio:', error);
  }
}

// Puppeteer로 동적 콘텐츠 처리 및 URL 변환
fetchAndProcessHTMLWithPuppeteer();

// Cheerio로 정적 HTML 처리 및 URL 변환
fetchAndProcessHTMLWithCheerio('https://web.aw.ca/en/our-menu/breakfast');
