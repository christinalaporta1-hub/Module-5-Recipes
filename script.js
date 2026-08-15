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

