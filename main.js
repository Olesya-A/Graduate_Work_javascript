const API_KEY = "1";
//const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/`;
const API_RANDOM = `https://www.themealdb.com/api/json/v1/${API_KEY}/random.php`;

const currentDate = new Date();

//console.log(currentDate);

const randomTitle = document.querySelector(".random__title");
const randomImg = document.querySelector(".random__block_image");
const randomInstr = document.querySelector(".random__instruction");
const randomIngreds = document.querySelector(".random__block_list");

async function fetchRandom() {
  const response = await fetch(API_RANDOM);
  const respData = await response.json();
  console.log(respData);
  return respData;
}

async function loadRandom() {
  const data = await fetchRandom();
  const random = data.meals[0];
  //console.log(random);
  randomTitle.textContent = `The dish of the day - ${random.strMeal}`;
  randomImg.src = random.strMealThumb;
  randomInstr.textContent = random.strInstructions;

  const ingrValues = Object.values(random).slice(9, 29);
  const measurValues = Object.values(random).slice(29, 49);
  const ingredients = ingrValues.reduce((acc, element, index) => {
    return { ...acc, [element]: measurValues[index] };
  }, {});
  //console.log(ingredients);

  for (key in ingredients) {
    const ingredEl = document.createElement("li");
    ingredEl.classList.add("random__block_ingredient");

    ingredEl.textContent = `${key} - ${ingredients[key]}`;
    randomIngreds.appendChild(ingredEl);
  }

  window.localStorage.setItem(
    "meal",
    JSON.stringify({
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      strMealThumb: random.strMealThumb,
      strMeal: random.strMeal,
      strInstructions: random.strInstructions,
      strIngredients: ingredients,
    })
  );
}

window.addEventListener("load", () => {
  const data = JSON.parse(window.localStorage.getItem("meal"));
  if (
    data === null ||
    data.day !== currentDate.getDate() ||
    data.month !== currentDate.getMonth()
  ) {
    loadRandom();
  } else {
    randomTitle.textContent = `The dish of the day - ${data.strMeal}`;
    randomImg.src = data.strMealThumb;
    randomInstr.textContent = data.strInstructions;

    for (key in data.strIngredients) {
      const ingredEl = document.createElement("li");
      ingredEl.classList.add("random__block_ingredient");

      ingredEl.textContent = `${key} - ${data.strIngredients[key]}`;
      randomIngreds.appendChild(ingredEl);
    }
  }
});

const footerLeftEl = document.querySelector(".footer__left");
footerLeftEl.textContent = `© ${new Date().getFullYear()} All rights reserved`;
