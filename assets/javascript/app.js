$(document).ready(function() {
    var topics = ["Dog", "Cat", "Bird", "Mouse"];
    //var queryURL = "http://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&limit=1";
    var query = "&q=" + userInput;
    var userInput;
    //This is the code that makes button adding dynamic
    function buttonShow(){
        $("#display-btns").empty();
        for (var i = 0; i < topics.length; i ++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-animal", topics[i]);
            a.text(topics[i]);
            $("#display-btns").append(a);
        }
    }
    
    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        buttonShow();
        $("#add-a-btn")[0].reset();
    });
    buttonShow();

    $("#display-btns").on("click", function() {
        var animal = $(this).attr("data-animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response) {
           var results = response.data;
           for (var i = 0; i < results.length; i++) {
               if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                   var gifDiv = $("<div class='item'>");
                   var rating = results[i].rating;
                   var p = $("<p>").text("Rating: ") + rating;
                   var animalImage = $("<img>");
                   animalImage.attr("src", results[i].images.fixed_height.url);
                   gifDiv.append(p);
                   gifDiv.append(animalImage);
                   $(".display-gifs").prepend(gifDiv);
               }
           }
          });
       });

});