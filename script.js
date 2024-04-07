let search = document.querySelector("#searchbox");
let submit = document.querySelector(".submit");
let itemlist = document.querySelector(".itemlist");
let name = document.querySelector(".name");
let box = document.querySelector(".box");
let ingredients = document.querySelector(".ingredients");
let recipedetails = document.querySelector(".recipe");

let fetchapi = async (item) => {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${
      item ? item : (item = "cake")
    }`
  );
  let response = await data.json();
  // console.log(response);
  itemlist.innerHTML = "";
  response.meals.forEach((meal) => {
    // console.log(meal);
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
        <img src=${meal.strMealThumb}>
        <h2>${meal.strMeal}</h2>
        <h3>This is a ${meal.strCategory}</h3>
        <h3>This dish belongs to ${meal.strArea}</h3>
    `;
    const button = document.createElement("button");
    button.classList.add("view");
    button.textContent = "View Recipe";
    item.appendChild(button);
    button.addEventListener("click", () => {
      boxcontent(meal);
    });
    itemlist.appendChild(item);
    // console.log(button);
    // let view = document.querySelector(".view");
  });
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(search.value.trim());
  fetchapi(search.value.trim());
});

let boxcontent = (meal) => {
  name.textContent = `${meal.strMeal}`;

  box.style.display = "block";
  fetchingredients(meal);
  recipe(meal);

  let cut = document.querySelector(".cut");
  cut.addEventListener("click", () => {
    box.style.display = "none";
  });
};

const fetchingredients = (meal) => {
  let ingredientslist = "";
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    // console.log(meal);
    if (ingredient) {
      let amount = meal[`strMeasure${i}`];
      ingredientslist += `<p> ${amount} - ${ingredient} </p>`;
    } else {
      break;
    }
  }
  ingredients.innerHTML = `
  <h6>Ingregients required-:</h1>
  <ul>${ingredientslist}</ul>
  <hr>`;
  console.log(`these are ${ingredientslist}`);
};

const recipe = (meal) => {
  let details = meal.strInstructions;
  recipedetails.innerHTML = `
  <h6>Recipe Details</h6>
  <p>${details}</p>`;
};
