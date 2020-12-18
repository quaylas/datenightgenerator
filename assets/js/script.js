var getDrinksByMainIngredient = function (ingredient) {

    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
        // if unsuccessful, open a modal
        else {
            alert('Something went wrong!');
        }
    });
};

getDrinksByMainIngredient('vodka');