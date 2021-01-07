
// begin drink section

var spiritBtn = document.getElementById("spiritBtn");
// variables for food API's
var eatsContainerEl = document.getElementById("menu-eats");
var drinksContainerEl = document.getElementById("menu-drinks");


var getDrinksByMainIngredient = function (ingredient) {

    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {

                var drinkArray = [];
                var drinkList = document.getElementById("response-container");
                drinkList.innerHTML = '';

                for (var i = 0; i < Math.min(5, data.drinks.length); i++) {

                    var random = Math.floor(Math.random() * data.drinks.length);
                    drinkArray.push(data.drinks[random].strDrink);

                    var drinkContainer = document.createElement('div');
                    drinkContainer.classList.add("drink-list-item");
                    // drinkContainer.textContent = data.drinks[random].strDrink;
                    drinkContainer.innerHTML = `<div class="drink-name" data-drinkid="${data.drinks[random].idDrink}">${data.drinks[random].strDrink}</div> <i class="fas fa-save saveDrinkBtn" data-drinkname="${data.drinks[random].strDrink}" data-drinkid="${data.drinks[random].idDrink}"></i>`;
                    drinkContainer.setAttribute("data-drinkid", data.drinks[random].idDrink);
                    drinkContainer.setAttribute("data-id", i);
                    drinkList.appendChild(drinkContainer);
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

    });
};

// function to take returned drink recipe data and inject the recipe into the page
var printDrinkRecipe = function (data, drinkContainer) {

    // create an unordered list to hold the drink recipe
    var drinkRecipe = document.createElement('div');
    drinkRecipe.classList.add('recipe-displayed');
    drinkRecipe.setAttribute('id', `recipe-${data.drinks[0].idDrink}`);
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
    for (var k = 0; k < drinkIngredients.length; k++) {
        var drinkRecipeListItem = document.createElement('li');
        if (drinkQuantities[k]) {
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

var toggleDrinkRecipe = function(drinkRecipeContainer){
    var recipeClassName = drinkRecipeContainer.className;

    if (recipeClassName === 'recipe-displayed'){
        drinkRecipeContainer.className = 'recipe-hidden';
    }
    else if (recipeClassName === 'recipe-hidden'){
        drinkRecipeContainer.className = 'recipe-displayed';
    }

};

var saveDrinkRecipe = function(drinkId, drinkName){
    console.log(drinkId, drinkName);

    var savedDrinkRecipes = JSON.parse(localStorage.getItem("drinkRecipes")) || [];
    var drinkRecipe = { "name": drinkName, "id": drinkId };
    savedDrinkRecipes.push(drinkRecipe);
    localStorage.setItem("drinkRecipes", JSON.stringify(savedDrinkRecipes));

    var drinkMenuItemContainer = document.createElement("div");
    drinkMenuItemContainer.textContent = `${drinkName}`;
    drinksContainerEl.appendChild(drinkMenuItemContainer);

    drinkMenuItemContainer.innerHTML = `<div class="drink-name" data-drinkid="${drinkId}">${drinkName}</div> <span class="oi" data-glyph="trash"></span>`;

};

// event handler for a click on a returned drink recipe
var drinkRecipeHandler = function (event) {
    var drinkId = event.target.getAttribute('data-drinkid');
    var drinkContainer = event.target;
    var drinkRecipeContainer = drinkContainer.firstElementChild;

    if(drinkContainer.tagName === 'DIV'){

        if (!drinkRecipeContainer){
            getDrinkRecipe(drinkId, drinkContainer);
        }
        else {
            toggleDrinkRecipe(drinkRecipeContainer);
        }
    }

    else if (drinkContainer.tagName === 'I'){
        var drinkName = event.target.getAttribute('data-drinkname');
        saveDrinkRecipe(drinkId, drinkName);
    }
};

// event  handler for a click on a drink in the menu
var drinkMenuHandler = function(event){
    console.log('a drink in the menu was clicked');
};


// saving recipe into array and populating the first 3 results, then we are able to save the recipe to the Menu section of the page AKA append to the child container of menu 
;
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
// save the recipe into localStrorage/Menu section of page
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
            var recipeContainer = document.getElementById("recipe-container");
            recipeContainer.innerHTML = "";
            var recipeObject = data.results;
            console.log(recipeObject.length);
            if (recipeObject.length > 0) {
                for (i = 0; i < 3; i++) {
                    var recipe = data.results[i].title;
                    var recipeUrl = data.results[i].href;
                    var recipeName = document.createElement("p");
                    recipeName.innerHTML = `<a href="${recipeUrl}" target="_blank">${recipe}</a> <span class="saveRecipe" data-name="${recipe}" data-url="${recipeUrl}">Save Recipe</span>`;
                    recipeContainer.appendChild(recipeName);
                }
            } else {
                var modal = document.getElementById("myModal");
                modal.style.display = "block";
                // Get the <span> element that closes the modal
                var span = document.getElementById("modal-close");
                // When the user clicks on <span> (x), close the modal
                span.onclick = function () {
                    modal.style.display = "none";
                }
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
    // load eats section START
    var foodRecipesLocal = JSON.parse(localStorage.getItem("foodRecipes"));

    if (foodRecipesLocal) {
        for (i = 0; i < foodRecipesLocal.length; i++) {
            var menuItemContainer = document.createElement("p");
            menuItemContainer.innerHTML = `<a href="${foodRecipesLocal[i].url}" target="_blank">${foodRecipesLocal[i].name}</a>`;
            eatsContainerEl.appendChild(menuItemContainer);
        }
    }
    // load eats section END

    // load drinks section START
    var drinkRecipesLocal = JSON. parse(localStorage.getItem("drinkRecipes"));
    console.log(drinkRecipesLocal);

    if (drinkRecipesLocal) {
        for (k = 0; k < drinkRecipesLocal.length; k++) {
            var drinkMenuItemContainer = document.createElement("p");
            drinkMenuItemContainer.innerHTML = `<div class="drink-name" data-drinkid="${drinkRecipesLocal[k].id}">${drinkRecipesLocal[k].name}</div> <span class="oi" data-glyph="trash"></span>`;
            drinksContainerEl.appendChild(drinkMenuItemContainer);
        }
    }
    // load drinks section END
};

var loadRecipes = function (event) {
    event.preventDefault();
    var ingredientInput = document.getElementById("ingredient-input").value.trim();
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
drinksContainerEl.addEventListener('click', drinkMenuHandler);

loadSavedMenu();
