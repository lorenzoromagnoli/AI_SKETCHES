var lastText;

var keywords=[];

var addKeywords = function(keyword){
  if(keywords.indexOf(keyword)==-1){
    keywords.push(keyword)
    console.log (keywords);
  }
}

var getTextEntities = function() {

    var textToAnalyze = $('#pad').val();

    if (textToAnalyze != lastText) {

        var jqxhr = $.post("/understand?sentence=" + textToAnalyze, function(data) {
          //  console.log(data);

            var categories = Object.keys(data.entities);
          //  console.log(categories);

            //parse the output and fill in the box with new info
            $("#output").empty();
            for (i = 0; i < categories.length; i++) {
                $("#output").append("<h3>" + categories[i] + "</h3>");
                $("#output").append("<ul>");
                for (j = 0; j < data.entities[categories[i]].length; j++) {
                    var keyword=data.entities[categories[i]][j]
                    $("#output").append("<li>" + keyword + "</li>");
                    addKeywords(keyword);
                }
                $("#output").append("</ul>");
            }

            $("#log").html(JSON.stringify(data));

        });

    } else {
      //  console.log("nothing new");
    }

    lastText=textToAnalyze;

}
