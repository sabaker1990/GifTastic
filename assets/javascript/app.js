$(document).ready(function() {
    
    var topics = ["Dog", "Cat", "Bird", "Mouse"];

    function buttonShow(){
        $("#display-btns").empty();
        for (var i = 0; i < topics.length; i ++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#display-btns").append(a);
        }
    }

    function displayGif() {
       var animal = $(this).attr("data-name");
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
           animal + "&api_key=dc6zaTOxFJmzC&limit=10";

       $.ajax({
           url: queryURL,
           method: "GET"
       })

       .done(function(response) {
           var results = response.data;
           for (var i=0; i < results.length; i++) {
               if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                   var gifDiv = $("<div class='item'>");
                   var rating = results[i].rating;
                   var p = $("<p>").text("Rating: " + rating);
                   var animalImage = $("<img>");
                       animalImage.attr("src", results[i].images.fixed_height_still.url);
                       animalImage.attr("data-loop", results[i].images.looping.mp4);
                   gifDiv.append(p);
                   gifDiv.append(animalImage);

                   $("#display-gifs").prepend(gifDiv);
               }
           }
       })
   }

    buttonShow();


    //Event handlers
    
    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        buttonShow();
        $("#add-a-btn")[0].reset();
    });

    $(document).on("click", ".gif", displayGif);

});