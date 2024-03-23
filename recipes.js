const API_KEY = "1";
//const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/`;
const API_CATEGORIES = `https://www.themealdb.com/api/json/v1/${API_KEY}/categories.php`;

getCategories(API_CATEGORIES);

async function getCategories(url) {
  const response = await fetch(url);
  const respData = await response.json();
  console.log(respData);
  showCategories(respData);
}

function showCategories(data) {
  const categoriesEl = document.querySelector(".categories");
  data.categories.forEach((category) => {
    const categoryEl = document.createElement("article");
    categoryEl.classList.add("card");
    categoryEl.innerHTML = `
        <div class="card__cover_inner">
          <img
            src="${category.strCategoryThumb}"
            class="card__cover"
            alt="${category.strCategory}"
          />
          <div class="card__cover_darkened"></div>
        </div>
        <div class="card__title">${category.strCategory}</div>
        <div class="card__desc">${category.strCategoryDescription.slice(
          0,
          90
        )}...</div>
        <div class="card__button">
          <a href="" class="card__button_btn">View recipes</a>
        </div>
      
        `;
    categoryEl.addEventListener("click", () => openModal(category.idCategory));
    categoriesEl.appendChild(categoryEl);
  });
}

// Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  const resp = await fetch(API_CATEGORIES);
  const respData = await resp.json();
  let categ = respData.categories.filter((item) => item.idCategory === id);
  console.log(categ);
  modalEl.classList.add("modal__show");
  document.body.classList.add("stop_scrolling");

  modalEl.innerHTML = `
    <div class="modal__card">
      <img class="modal__card_img" src="${categ[0].strCategoryThumb}" alt="">
      <h2 class="modal__card-title">${categ[0].strCategory}</h2>
      <p class="modal__card_desc">${categ[0].strCategoryDescription}</p>
      <button type="button" class="modal__card_button">Close</button>
    </div>
  `;
  const btnClose = document.querySelector(".modal__card_button");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("modal__show");
  document.body.classList.remove("stop_scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

const footerLeftEl = document.querySelector(".footer__left");
footerLeftEl.textContent = `© ${new Date().getFullYear()} All rights reserved`;
