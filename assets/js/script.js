
// begin drink section

var spiritBtn = document.getElementById("spiritBtn");
// variables for food API's
var eatsContainerEl = document.getElementById("menu-eats");


var getDrinksByMainIngredient = function (ingredient) {

    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

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
                    drinkContainer.setAttribute("data-id", i);
                    drinkContainer.setAttribute("data-drinkId", data.drinks[random].idDrink);

                    var drinkName = document.createElement("h4");
                    drinkName.textContent = data.drinks[random].strDrink;
                    drinkContainer.appendChild(drinkName);
                    drinkList.appendChild(drinkContainer);
                    // document.getElementById("response-container").innerHTML = drink;
                };
                // document.getElementById("response-container").innerHTML = drinkArray;
            }, error => {
                console.error('Error', error);
                var modal = document.getElementById("myModal");
                modal.style.display = "block";

                // Get the <span> element that closes the modal
                var span = document.getElementById("modal-close");

                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                }
            });
        }

    }, error => {
        console.error('Error:', error);
        var modal = document.getElementById("errorModal");
        modal.style.display = "block";

        // Get the <span> element that closes the modal
        var span = document.getElementById("modal-exit");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    });
};

var loadDrinks = function (event) {
    event.preventDefault();
    var spiritInput = document.getElementById("spiritInput").value.trim();
    console.log(spiritInput);
    getDrinksByMainIngredient(spiritInput);
};

// function to retrieve a drink recipe based on the drink ID
var getDrinkRecipe = function (drinkId) {
    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.drinks[0]);

                // retrieve primary instructions
                var drinkInstructions = data.drinks[0].strInstructions;

                // retrieve glass type
                var drinkGlass = data.drinks[0].strGlass;

                // create an array of the object's property pairs
                var properties = Object.entries(data.drinks[0]);

                console.log(properties);

                // initialize arrays for ingredients and quantities
                var drinkIngredients = [];
                var drinkQuantities = [];

                // loop to retrieve ingredients and quantities
                for (var i = 0; i < properties.length; i++) {

                    // declare property name and value so they can be checked by if statements
                    var propertyName = properties[i][0];
                    var propertyValue = properties[i][1];

                    // if property name includes 'Ingredient' and the property has a value, add it to drinkIngredients
                    if (propertyName.includes('Ingredient') && propertyValue) {
                        console.log(properties[i][1]);
                        drinkIngredients.push(propertyValue);
                    }
                    else if (propertyName.includes('Measure') && propertyValue) {
                        console.log(properties[i][0], properties[i][1]);
                        drinkQuantities.push(propertyValue);
                    }
                }
                console.log(drinkIngredients);
                console.log(drinkQuantities);
            })
        }
    })
        .catch((error) => {
            console.error('Error:', error);
            var modal = document.getElementById("errorModal");
            modal.style.display = "block";

            // Get the <span> element that closes the modal
            var span = document.getElementById("modal-exit");

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }
        });
};

// event handler for a click on a returned drink recipe
var drinkRecipeHandler = function (event) {
    var drinkId = event.target.getAttribute('data-drinkId');
    getDrinkRecipe(drinkId);
};

var getRecipeByIngredient = function (ingredients, queryString) {
    event.preventDefault()
    // recipe code starts
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
            recipeContainer.innerHTML = "";
            for (i = 0; i < 3; i++) {
                var recipe = data.results[i].title;
                var recipeUrl = data.results[i].href;
                var recipeName = document.createElement("p");
                recipeName.innerHTML = `<a href="${recipeUrl}" target="_blank">${recipe}</a> <span class="saveRecipe" data-name="${recipe}" data-url="${recipeUrl}">Save Recipe</span>`;
                // recipeName.onclick= saveBtn;


                recipeContainer.appendChild(recipeName);

            }

        });
    }, error => {
        console.error('Error:', error);
        var modal = document.getElementById("errorModal");
        modal.style.display = "block";

        // Get the <span> element that closes the modal
        var span = document.getElementById("modal-exit");

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    });
};
var saveRecipe = function () {
    if (event.target.class = "span") {
        var savedRecipes = JSON.parse(localStorage.getItem("foodRecipes")) || [];
        var recipe = { "name": event.target.getAttribute("data-name"), "url": event.target.getAttribute("data-url") };
        savedRecipes.push(recipe);
        localStorage.setItem("foodRecipes", JSON.stringify(savedRecipes));
        console.log(savedRecipes);
        var menuItemContainer = document.createElement("p");
        menuItemContainer.innerHTML = `<a href="${event.target.getAttribute("data-url")}" target="_blank">${event.target.getAttribute("data-name")}</a>`;
        eatsContainerEl.appendChild(menuItemContainer);

    }
};
var loadSavedMenu = function () {
    // load eats section start
    var foodRecipesLocal = JSON.parse(localStorage.getItem("foodRecipes"))
    console.log(foodRecipesLocal)
    if (foodRecipesLocal) {
        for (i = 0; i < foodRecipesLocal.length; i++) {
            var menuItemContainer = document.createElement("p");
            menuItemContainer.innerHTML = `<a href="${foodRecipesLocal[i].url}" target="_blank">${foodRecipesLocal[i].name}</a>`;
            eatsContainerEl.appendChild(menuItemContainer);
        }
    }
};


var loadRecipes = function (event) {
    event.preventDefault();
    var ingredientInput = document.getElementById("ingredient-input").value.trim();
    console.log(ingredientInput);
    getRecipeByIngredient(ingredientInput, "");
    document.getElementById("food-form").reset();
}
// RECIPE END
var btn = document.getElementById("search-recipes");
btn.addEventListener("click", loadRecipes);
var recipeContainerEl = document.getElementById("recipe-container");

recipeContainerEl.addEventListener("click", saveRecipe)


spiritBtn.addEventListener("click", loadDrinks);
var responseContainerEl = document.getElementById('response-container');
responseContainerEl.addEventListener('click', drinkRecipeHandler);



loadSavedMenu();
