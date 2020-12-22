var getDrinksByMainIngredient = function (ingredient) {

    var apiURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    fetch(apiURL).then(function (response) {
        // if successful, format response and return JSON
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                    return Math.floor(Math.random() * 10);
                }
            });
            document.getElementById("response-container").innerHTML = data;
        }
        // if unsuccessful, open a modal
        else {
            alert('Something went wrong!');
        }
    });
};

getDrinksByMainIngredient('vodka');