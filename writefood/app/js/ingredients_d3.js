d3.json("./static/parsed.json", function(data) {
    console.log(data);

    var div = document.getElementById("#data");

    var ingredients = [];
    for (var x in data) {
        var ingredient = data[x];
        ingredient.name = x;
        ingredients.push(ingredient);
    }

    for (var i = 0; i < ingredients.length; i++) {
        ingredients[i].match1 = [];
        for (var x in ingredients[i].match) {
            var occurrencies = ingredients[i].match[x];
            var matching = {}
            matching.name = x;
            matching.frequency = occurrencies;
            ingredients[i].match1.push(matching);
        }

        ingredients[i].popularity = [];
        for (var x in ingredients[i].style) {
            var occurrencies = ingredients[i].style[x];
            var popularity = {}
            popularity.country = x;
            popularity.frequency = occurrencies;
            ingredients[i].popularity.push(popularity);
        }
    }

    console.log(ingredients);

    for (var i = 0; i < ingredients.length; i++) {
        $("#viz").append("<h2>" + ingredients[i].name + "</h2>");


        $("#viz").append("<div class='attributes-ingredients'>");
        for (var j = 0; j < ingredients[i].match1.length; j++) {
            $("#viz").append("<span class='ingredient' popularity='"+ingredients[i].match1[j].frequency+"'>" + ingredients[i].match1[j].name);

        }
        $("#viz").append("</div>");


        // $("#viz").append("<div class='popularity'>");
        // for (var j = 0; j < ingredients[i].popularity.length; j++) {
        //     $("#viz").append("<span class='country' popularity='"+ingredients[i].popularity[j].frequency+"'>" + ingredients[i].popularity[j].country);
        // }
        // $("#viz").append("</div>");
        //

    }


    $(".country").each(function( index ) {
      $( this ).css("font-size", $(this).attr("popularity")/100+20 + "px");
    });

    $(".ingredient").each(function( index ) {
      $( this ).css("font-size", $(this).attr("popularity")/100+10 + "px");
    });
});
