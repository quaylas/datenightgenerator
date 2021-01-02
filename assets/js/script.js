
var spiritBtn = document.getElementById("spiritBtn");

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
                    var drinkContainer = document.createElement("p");
                    drinkContainer.classList.add("drink-list-item");
                    drinkContainer.setAttribute("data-id", i);
                    drinkContainer.setAttribute("data-drinkId", data.drinks[random].idDrink);
                    drinkContainer.textContent = data.drinks[random].strDrink;
                    drinkList.appendChild(drinkContainer);
                    // document.getElementById("response-container").innerHTML = drink;
                };
                // document.getElementById("response-container").innerHTML = drinkArray;
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
    console.log(spiritInput);
    getDrinksByMainIngredient(spiritInput);
};

// function to retrieve a drink recipe based on the drink ID
var getDrinkRecipe = function(drinkId) {
    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

    fetch(apiURL).then(function(response){
        // if successful, format response and return JSON
        if(response.ok){
            response.json().then(function(data){
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
                for(var i = 0; i < properties.length; i++){

                    // declare property name and value so they can be checked by if statements
                    var propertyName = properties[i][0];
                    var propertyValue = properties[i][1];

                    // if property name includes 'Ingredient' and the property has a value, add it to drinkIngredients
                    if (propertyName.includes('Ingredient') && propertyValue){
                        console.log(properties[i][1]);
                        drinkIngredients.push(propertyValue);
                    }
                    else if (propertyName.includes('Measure') && propertyValue){
                        console.log(properties[i][0], properties[i][1]);
                        drinkQuantities.push(propertyValue);
                    }
                }
                console.log(drinkIngredients);
                console.log(drinkQuantities);

            })
        }
        // if unsuccessful, open a modal
        else{
            alert('Something went wrong!');
        }
    });
};

// event handler for a click on a returned drink recipe
var drinkRecipeHandler = function(event) {
    var drinkId = event.target.getAttribute('data-drinkId');
    getDrinkRecipe(drinkId);
};

// getDrinksByMainIngredient('rum');
// spiritBtn.addEventListener("click", function () {
// loadDrinks()
// });

spiritBtn.addEventListener("click", loadDrinks);
getDrinkRecipe(13200);