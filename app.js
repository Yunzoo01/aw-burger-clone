// Navbar와 Footer를 불러오는 공통 함수
function loadPartial(partialUrl, elementId) {
  fetch(partialUrl)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => {
      console.error(`Error loading ${elementId}:`, error);
      document.getElementById(elementId).innerHTML = `<p>Failed to load ${elementId}</p>`;
    });
}

// Navbar와 Footer를 페이지에 로드
window.onload = function () {
  loadPartial("../partials/navbar.html", "navbar-container");
  loadPartial("../partials/footer.html", "footer-container");
  loadJsonData();  // JSON 데이터를 로드
};



// Navbar와 Footer를 불러오는 공통 함수

function loadPartial(partialUrl, elementId) {
  fetch(partialUrl)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => {
      console.error(`Error loading ${elementId}:`, error);
      document.getElementById(elementId).innerHTML = `<p>Failed to load ${elementId}</p>`;
    });
}

// Navbar와 Footer를 페이지에 로드
window.onload = function () {
  loadPartial("../partials/navbar.html", "navbar-container");
  loadPartial("../partials/footer.html", "footer-container");
  loadJsonData();  // JSON 데이터를 로드
};

// 메뉴 데이터를 저장할 객체
let allMenuData = {};

// 각 JSON 데이터를 fetch로 가져와서 저장
async function loadJsonData() {
  const categories = ['breakfast', 'burgers', 'chicken', 'sides', 'drinks', 'kidspack', 'brewbar'];

  try {
    // 모든 카테고리의 JSON 데이터를 fetch로 가져옴
    for (const category of categories) {
      const response = await fetch(`../menu_images/${category}.json`);
      const jsonData = await response.json();  // JSON 데이터 파싱
      allMenuData[category] = jsonData;  // 각 카테고리별로 데이터 저장
    }

    // 데이터를 다 불러온 후에 기본적으로 breakfast 카테고리를 렌더링
    renderMenuItems('breakfast');  // 기본적으로 'breakfast'를 렌더링
  } catch (error) {
    console.error("Error loading menu data:", error);
  }
}

// 메뉴 항목을 렌더링하는 함수
function renderMenuItems(category) {
  const menuGrid = document.querySelector('#menuGrid'); // 메뉴 그리드 선택
  const titleElement = document.querySelector('.our-menu-title h1'); // h1 태그 선택
  menuGrid.innerHTML = ''; // 기존 내용을 지우고 새롭게 추가

  // 카테고리 제목 업데이트
  titleElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);

  let itemsToRender = allMenuData[category] || [];

  // 카테고리 필터링된 데이터 렌더링
  itemsToRender.forEach(item => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    // <img> 태그 생성 (JSON 구조에 맞게 수정 필요)
    const img = document.createElement('img');
    img.src = item.imageUrl || item;  // JSON 파일에서 이미지 URL을 가져옴
    img.alt = item.name || category;  // 카테고리나 아이템 이름을 alt로 설정

    // 제목 추가
    const title = document.createElement('h3');
    title.textContent = item.name || category; // JSON에 있는 이름을 제목으로 설정

    // 아이템에 이미지, 제목 추가
    gridItem.appendChild(img);
    gridItem.appendChild(title);
    menuGrid.appendChild(gridItem);
  });


}


