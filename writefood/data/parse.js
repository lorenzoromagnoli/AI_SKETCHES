var fs = require('fs');

var ingredients = {};

var jsonfile = require('jsonfile')
var file = './parsed.json'


function parseRecipe(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);

            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            //func(remaining);
        }
        console.log(ingredients);
        jsonfile.writeFile(file, ingredients, function (err) {
          console.error(err)
        })
    });
}

function func(data) {
    //  console.log('Line: ' + data);
    columnDetail = data.split("\t");



    for (var i = 1; i < columnDetail.length; i++) {
        //  console.log (columnDetail[i]);
        if (!(columnDetail[i] in ingredients)) {
            var properties={
              match:{},
              style:{}
            };
            ingredients[columnDetail[i]] = properties;
            ingredients[columnDetail[i]].style[columnDetail[0]]=1;
        } else {
          if(ingredients[columnDetail[i]].style[columnDetail[0]]){
            ingredients[columnDetail[i]].style[columnDetail[0]]++;
          }else{
            ingredients[columnDetail[i]].style[columnDetail[0]]=1;
          }

        }
      }

    for (var i = 1; i < columnDetail.length; i++) {
        for (var j = 1; i < columnDetail.length; i++) {
            if (j != i) {
                if (!(columnDetail[j] in ingredients[columnDetail[i]].match)) {
                    ingredients[columnDetail[i]].match[columnDetail[j]]=0;
                } else {
                  ingredients[columnDetail[i]].match[columnDetail[j]]++;

                }
            }
        }
    }
}

var input = fs.createReadStream('all_recipes.txt');
parseRecipe(input, func);
