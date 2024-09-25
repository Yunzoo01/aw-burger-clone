document.addEventListener("DOMContentLoaded", function () {
    // Swiper.js 초기화
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 'auto', // 화면 크기에 맞게 슬라이드 개수 자동 설정
      spaceBetween: 20, // 슬라이드 사이 간격
      grid: {
        rows: 2, // 데스크탑에서 2줄로 설정
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      grabCursor: true, // 마우스로 드래그 가능
      breakpoints: {
        849: {
          slidesPerView: 'auto', // 모바일에서는 1줄로 설정
          grid: {
            rows: 1,
          },
        },
      },
    });
  
    // Swiper 인스턴스를 전역으로 사용하기 위해 window에 저장
    window.swiper = swiper;
  });
  