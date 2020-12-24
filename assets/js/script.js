
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
}

// getDrinksByMainIngredient('rum');
// spiritBtn.addEventListener("click", function () {
// loadDrinks()
// });

spiritBtn.addEventListener("click", loadDrinks);