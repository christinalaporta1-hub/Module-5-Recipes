function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

async function performSearch() {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=3cf5c313812848f8bbf02809f30f6e9d`);
    const recipes = await response.json();
    displayRecipes(recipes);
}

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = ""; // Clear previous results
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
        `;
        resultsContainer.appendChild(recipeElement);
    });
}
