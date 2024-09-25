/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.html',     // pages 폴더 안의 모든 HTML 파일
    './partials/**/*.html',  // partials 폴더 안의 모든 HTML 파일
    './styles/**/*.css',     // styles 폴더 안의 모든 CSS 파일
    './index.html',          // index.html 파일
  ],
  theme: {
    extend: {
     
      padding: {
        '10p': '10%', // padding 커스텀
      },
      colors: {
        'custom-primary': '#ff6218', // 사용자 정의 색상
        
      },
      screens: {
        'desktop': '850px', // 850px 이상일 때 적용될 데스크탑 브레이크포인트
      }
    },
  },
  plugins: [],
}
