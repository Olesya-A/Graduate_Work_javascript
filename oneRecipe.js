const API_KEY = "1";
const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/`;

const randomTitle = document.querySelector(".random__title");
const randomImg = document.querySelector(".random__block_image");
const randomInstr = document.querySelector(".random__instruction");
const randomIngreds = document.querySelector(".random__block_list");

loadOneRecipe(52874);

async function getOneRecipe(id) {
  const response = await fetch(API_URL + "lookup.php?i=" + id);
  const respData = await response.json();
  return respData;
}

async function loadOneRecipe(id) {
  const data = await getOneRecipe(id);
  const random = data.meals[0];
  //console.log(recipe);
  const ingrValues = Object.values(random).slice(9, 29);
  const measurValues = Object.values(random).slice(29, 49);
  const ingredients = ingrValues.reduce((acc, element, index) => {
    return { ...acc, [element]: measurValues[index] };
  }, {});
  console.log(ingredients);

  randomTitle.textContent = random.strMeal;
  randomImg.src = random.strMealThumb;
  randomInstr.textContent = random.strInstructions;

  for (key in ingredients) {
    const ingredEl = document.createElement("li");
    ingredEl.classList.add("random__block_ingredient");

    ingredEl.textContent = `${key} - ${ingredients[key]}`;
    randomIngreds.appendChild(ingredEl);
  }
}

const footerLeftEl = document.querySelector(".footer__left");
footerLeftEl.textContent = `© ${new Date().getFullYear()} All rights reserved`;
