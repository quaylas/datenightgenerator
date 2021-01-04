
var spiritBtn = document.getElementById("spiritBtn");

var getDrinksByMainIngredient = function (ingredient) {

    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {

                var drinkArray = []
                var drinkList = document.getElementById("response-container")

                for (var i = 0; i < Math.min(5, data.drinks.length); i++) {
                    // var drink = (data.drinks[i]);
                    // var keys = Object.keys(drink)

                    // var random = Math.floor(Math.random() * drink.strDrink.length);
                    // var drink = data.drinks[i]
                    var random = Math.floor(Math.random() * data.drinks.length);
                    drinkArray.push(data.drinks[random].strDrink);

                    var drinkContainer = document.createElement('div');
                    drinkContainer.classList.add("drink-list-item");
                    drinkContainer.textContent = data.drinks[random].strDrink;
                    drinkContainer.setAttribute("data-drinkid", data.drinks[random].idDrink);
                    drinkContainer.setAttribute("data-id", i);
                    drinkList.appendChild(drinkContainer);
                };
            })
        }
        // if unsuccessful, open a modal
        else {
            alert('Something went wrong!');
        }
    });
};

var loadDrinks = function (event) {
    event.preventDefault();
    var spiritInput = document.getElementById("spiritInput").value.trim();
    getDrinksByMainIngredient(spiritInput);
};

// function to retrieve a drink recipe based on the drink ID
var getDrinkRecipe = function (drinkId, drinkContainer) {
    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {
                printDrinkRecipe(data, drinkContainer);
            })
        }
        // if unsuccessful, open a modal
        else {
            alert('Something went wrong!');
        }
    });
};

// function to take returned drink recipe data and inject the recipe into the page
var printDrinkRecipe = function(data, drinkContainer) {

    // create an unordered list to hold the drink recipe
    var drinkRecipe = document.createElement('article');
    var drinkIngredientsList = document.createElement('ul');

    // create an array of the object's property key-value pairs and initialize arrays for ingredients and quantities
    var properties = Object.entries(data.drinks[0]);
    var drinkIngredients = [];
    var drinkQuantities = [];

    // loop to retrieve ingredients and quantities from data and push them into our arrays
    for (var i = 0; i < properties.length; i++) {

        // declare property name and value so they can be checked by if statements
        var propertyName = properties[i][0];
        var propertyValue = properties[i][1];

        // if property name includes 'Ingredient' and the property has a value, add it to drinkIngredients
        if (propertyName.includes('Ingredient') && propertyValue) {
            drinkIngredients.push(propertyValue);
        }
        // if property name includes 'Measure' and the property has a value, add it to drinkQuantities
        else if (propertyName.includes('Measure') && propertyValue) {
            drinkQuantities.push(propertyValue);
        }
    }
    for (var k = 0; k < drinkIngredients.length; k++){
        var drinkRecipeListItem = document.createElement('li');
        if (drinkQuantities[k]){
            drinkRecipeListItem.textContent = `${drinkQuantities[k]} ${drinkIngredients[k]}`;
        }
        else {
            drinkRecipeListItem.textContent = `${drinkIngredients[k]}`;
        }
        drinkIngredientsList.appendChild(drinkRecipeListItem);
    }
    drinkRecipe.appendChild(drinkIngredientsList);
    var drinkInstructions = document.createElement('p');
    drinkInstructions.classList.add('drink-recipe-instructions');
    drinkInstructions.textContent = `${data.drinks[0].strInstructions} Serve in a ${data.drinks[0].strGlass}`;
    drinkRecipe.appendChild(drinkInstructions);

    drinkContainer.appendChild(drinkRecipe);
};

// event handler for a click on a returned drink recipe
var drinkRecipeHandler = function (event) {
    var drinkId = event.target.getAttribute('data-drinkid');
    var drinkContainer = event.target;
    getDrinkRecipe(drinkId, drinkContainer);
};

spiritBtn.addEventListener("click", loadDrinks);
var responseContainerEl = document.getElementById('response-container');
responseContainerEl.addEventListener('click', drinkRecipeHandler);


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
            var recipeContainer = document.getElementById("recipe-container");
            recipeContainer.innerHTML = "";
            for (i = 0; i < 3; i++) {
                var recipe = data.results[i].title;
                var recipeUrl = data.results[i].href;
                var recipeName = document.createElement("p");
                recipeName.innerHTML = `<a href="${recipeUrl}" target="_blank">${recipe}</a> <span class="saveRecipe">Save Recipe</span>`;
                recipeContainer.appendChild(recipeName);

            }

        });
    });

};
var saveRecipe = function () {
    if (event.target.class = "p") {
        var savedRecipes = []
        var recipeName = event.target.textContent;
        savedRecipes.push(recipeName);
    }
};
// getRecipeByIngredient("pasta","dinner")
var loadRecipes = function (event) {
    event.preventDefault();
    var ingredientInput = document.getElementById("ingredient-input").value.trim();
    getRecipeByIngredient(ingredientInput, "");
    document.getElementById("food-form").reset();
}
var btn = document.getElementById("search-recipes");
btn.addEventListener("click", loadRecipes);

var recipeContainerEl = document.getElementById("recipe-container");
// recipeContainerEl.addEventListener("click", saveRecipe);
