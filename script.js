function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

function sortItems() {
    const sortValue = document.getElementById('sort-options').value;
    let items = [...document.querySelectorAll('.item')]; // Assuming your items have a class of 'item'

    if (sortValue === 'az') {
        items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    } else if (sortValue === 'za') {
        items.sort((a, b) => b.textContent.localeCompare(a.textContent));
    } else if (sortValue === 'newest') {
        // Assuming items have a data attribute for the date
        items.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    } else if (sortValue === 'oldest') {
        items.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
    }

    const container = document.querySelector('.items-container'); // Your container for the items
    container.innerHTML = ''; // Clear the container
    items.forEach(item => container.appendChild(item)); // Append sorted items
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
