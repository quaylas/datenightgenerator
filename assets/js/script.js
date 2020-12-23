var getDrinksByMainIngredient = function (ingredient) {

    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                for (var i = 0; i < data.drinks.length; i++) {
                    var drink = (data.drinks[i]);
                    var keys = Object.keys(drink)
                    var random = Math.floor(Math.random() * drink.strDrink.length);
                    var drink = data.drinks[i]
                    document.getElementById("response-container").innerHTML = random;
                    return Math.floor(Math.random() * 10);
                };
            })
        }
        // if unsuccessful, open a modal
        else {
            alert('Something went wrong!');
        }
    });
};

getDrinksByMainIngredient('vodka');