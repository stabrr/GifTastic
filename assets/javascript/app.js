var topic = ["Paul Rudd", "David Duchovny", "Topher Grace", "Rick Moranic"];


function displayTopicPhoto() {
	var topic = $(this).attr("topic-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
      	method: "GET"
    })

    //
    .done(function(response){
      	console.log(response);
      	var imageUrl = response.data[0].images.original.webp;
      	console.log(imageUrl);

        //
        var topicImage = $("<img>");

        //
        topicImage.attr("src", imageUrl);
        topicImage.attr("alt", "cat image");

        //
        $("#images").prepend(topicImage);

    })
}      

function renderButtons() {
    // Deleting the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        console.log("topic.length"+ topic.length);

        // Looping through the array of topics
        for (var i = 0; i < topic.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of topics to our button
          a.addClass("topics");
          // Adding a data-attribute
          a.attr("data-name", topic[i]);
          // Providing the initial button text
          a.text(topic[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);

        };
        console.log(a);
      }

// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topics = $("#topic-input").val().trim();

    // Adding movie from the textbox to our array
    topic.push(topics);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    });

    // Adding a click event listener to all elements with a class of "movie"
 	$(document).on("click", ".topics", displayTopicPhoto);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
