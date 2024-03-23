const API_KEY = "1";
const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/`;
const API_SEARCH = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=Arr/`;
const API_CATEGORY_RECIPES = `https://www.themealdb.com/api/json/v1/${API_KEY}/filter.php?c=Beef`;
const API_RECIPE = `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=52772`;

getRecipes("Beef");

async function getRecipes(name) {
  const response = await fetch(API_URL + "filter.php?c=" + name);
  const respData = await response.json();
  console.log(respData);
  showRecipes(respData);
}

function showRecipes(data) {
  const recipesEl = document.querySelector(".recipes");

  document.querySelector(".recipes").innerHTML = "";

  data.meals.forEach((meal) => {
    const mealEl = document.createElement("article");
    mealEl.classList.add("card");
    mealEl.innerHTML = `
        <div class="card__cover_inner card_recipe">
        <img
          src="${meal.strMealThumb}"
          class="card__cover"
          alt="${meal.strMeal}"
        />
      </div>
        <div class="card__subtitle">${meal.strMeal.slice(0, 50)}</div>
        <div class="card__button">
        <a href="" class="card__button_btn">View recipes</a>
      </div>
        `;
    recipesEl.appendChild(mealEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".search__input");

async function searhRecipes(url) {
  const response = await fetch(url);
  const respData = await response.json();
  console.log(respData);
  showRecipes(respData);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = API_URL + "search.php?s=" + search.value;
  if (search.value) {
    searhRecipes(apiSearchUrl);
    search.value = "";
  }
});

const footerLeftEl = document.querySelector(".footer__left");
footerLeftEl.textContent = `© ${new Date().getFullYear()} All rights reserved`;
