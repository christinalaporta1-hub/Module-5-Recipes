function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

function handleClick() {
    alert("Button clicked!");
}

const recipeForm = document.querySelector("#recipe-form");
const recipeSearch = document.querySelector("#recipe-search");
const recipeStatus = document.querySelector("#recipe-status");
const recipeResults = document.querySelector("#recipe-results");

const apiKey = "";

recipeForm.addEventListener("submit", searchRecipes);

async function searchRecipes(event) {
  event.preventDefault();

  const query = recipeSearch.value.trim();
  recipeStatus.textContent = "Searching...";
  recipeResults.innerHTML = "";

  const url = new URL(
    "https://api.spoonacular.com/recipes/complexSearch"
  );

  url.searchParams.set("query", query);
  url.searchParams.set("number", "6");
  url.searchParams.set("apiKey", apiKey);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    renderRecipes(data.results);
  } catch (error) {
    console.error(error);
    recipeStatus.textContent = error.message;
  }
}

function renderRecipes(recipes) {
  if (recipes.length === 0) {
    recipeStatus.textContent = "No recipes found.";
    return;
  }

  recipeStatus.textContent = `${recipes.length} recipes found`;

  recipeResults.innerHTML = recipes
    .map(
      (recipe) => `
        <article class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.title}">
          <h2>${recipe.title}</h2>
        </article>
      `
    )
    .join("");
}
