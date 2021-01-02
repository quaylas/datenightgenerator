var getRecipeByIngredient = function (ingredients, queryString) {
  event.preventDefault()
  
    var page = 2;

  var apiUrl =
    "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=" +
    ingredients +
    "&q=" +
    queryString +
    "&p=" +
    page;
  fetch(apiUrl).then(function (response) {

    
    response.json().then(function (data) {
        console.log(data);
        var recipeContainer = document.getElementById("recipe-container");
        recipeContainer.innerHTML="";
      for (i=0; i < 3; i++){
        var recipe = data.results[i].title;
        var recipeUrl = data.results[i].href;
        var recipeName = document.createElement("p");
        recipeName.innerHTML = `<a href="${recipeUrl}" target="_blank">${recipe}</a> <span class="saveRecipe">Save Recipe</span>`;
        recipeContainer.appendChild(recipeName);

      }

    });
  });

};
var saveRecipe = function (){
  if (event.target.class = "p")
  { var savedRecipes = []
  var recipeName = event.target.textContent;
  console.log(recipeName);
  savedRecipes.push(recipeName)
  console.log(savedRecipes);
}};
// getRecipeByIngredient("pasta","dinner")
var loadRecipes = function (event) {
  event.preventDefault();
  var ingredientInput = document.getElementById("ingredient-input").value.trim();
  console.log(ingredientInput);
  getRecipeByIngredient(ingredientInput, "");
  document.getElementById("food-form").reset(); 
}
var btn = document.getElementById("search-recipes");
   btn.addEventListener("click", loadRecipes);
var recipeContainerEl = document.getElementById("recipe-container");
// recipeContainerEl.addEventListener("click", saveRecipe);
