document.addEventListener("DOMContentLoaded", function () {
  displayRecipes(recipes);
});

function displayRecipes(recipes) {
  const responsiveContainer = document.getElementById("responsive-container");
  const recipesContainer = document.getElementById("recipes-container");
  //   responsiveContainer.appendChild(recipesContainer);
  recipesContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipesContainer.appendChild(card);
  });
}

function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const image = document.createElement("img");
  image.src = recipe.imageSrc;
  image.classList.add("recipe-card-img");
  card.appendChild(image);

  const type = document.createElement("p");
  type.textContent = `${recipe.type}`;
  card.appendChild(type);

  const recipeDetailsContainer = document.createElement("div");
  recipeDetailsContainer.classList.add("recipe-details");
  card.appendChild(recipeDetailsContainer);

  const detailsContainerOne = document.createElement("div");
  recipeDetailsContainer.append(detailsContainerOne);
  detailsContainerOne.classList.add("details-container-one");

  const detailsContainerTwo = document.createElement("div");
  recipeDetailsContainer.append(detailsContainerTwo);

  const name = document.createElement("h3");
  name.textContent = recipe.name;
  detailsContainerOne.appendChild(name);

  const time = document.createElement("p");
  time.textContent = `${recipe.time}`;
  time.classList.add("time");
  detailsContainerOne.appendChild(time);

  const rating = document.createElement("p");
  rating.innerHTML =
    '<img src="./assets/rating-star.svg" alt="rating class="star">' +
    `: ${recipe.rating}`;
  detailsContainerTwo.appendChild(rating);

  //container for like and chat buttons
  const likeAndChatContainer = document.createElement("div");
  likeAndChatContainer.classList.add("like-and-chat");
  detailsContainerTwo.appendChild(likeAndChatContainer);

  const likeButton = document.createElement("span");
  likeButton.classList.add("like-button");
  likeButton.innerHTML = "&#9825;";
  likeButton.addEventListener("click", () => toggleLike(recipe));
  if (recipe.isLiked) {
    likeButton.classList.add("liked");
  }
  likeAndChatContainer.appendChild(likeButton);

  const chatButton = document.createElement("div");
  chatButton.innerHTML = '<img src="./assets/chat-icon.svg">';
  chatButton.classList.add("chat");
  likeAndChatContainer.appendChild(chatButton);

  return card;
}

function toggleLike(recipe) {
  recipe.isLiked = !recipe.isLiked;
  displayRecipes(recipes);
}

function filterRecipes(filterType) {
  let filteredRecipes = [];

  if (filterType === "all") {
    filteredRecipes = recipes;
  } else {
    filteredRecipes = recipes.filter((recipe) => recipe.type === filterType);
  }

  displayRecipes(filteredRecipes);
}

function filterByRating(filterType) {
  let filteredRecipes = [];

  if (filterType === "above") {
    filteredRecipes = recipes.filter((recipe) => recipe.rating > 4.5);
  } else if (filterType === "below") {
    filteredRecipes = recipes.filter((recipe) => recipe.rating < 4.0);
  }

  displayRecipes(filteredRecipes);
}

// Drawer functionality for mobile screen
const drawerButton = document.createElement("div");
drawerButton.innerHTML = "&#9776;";
drawerButton.classList.add("drawer-button");
drawerButton.addEventListener("click", toggleDrawer);
document.body.appendChild(drawerButton);

function toggleDrawer() {
  const drawer = document.querySelector(".drawer");
  drawer.style.left = drawer.style.left === "0px" ? "-250px" : "0px";
}

// Search functionality
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", function () {
  const searchQuery = this.value.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery)
  );
  displayRecipes(filteredRecipes);
});
