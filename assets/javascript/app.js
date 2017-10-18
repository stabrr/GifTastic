//Initial variables for the hotdudes

var hotDudes = ["Richard Gere", "David Duchovny", "Martin Freeman", "Rick Moranis"];

//function to get the photos from the api and display
function displayTopicPhoto() {
  //grabs the topic name to get photos
	var topic = $(this).attr("data-name");
  //string to query api
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC&limit=10";

  //calls the api
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    //this will set the img with attributes for photo state and url for each state
    .done(function(response){
      	//initializes variables  
        var imageStill = "" 
      	var imageAnimate = ""
        //set the default variables to still and the src url
        var state = "still"
        imageUrl = imageStill;
        //this will assign clear the element images and then update with 10 new images
        $("#images").empty();
        for (var i=0; i<response.data.length;i++)
        {
          imageStill=response.data[i].images.original_still.url;
          imageAnimate = response.data[i].images.original.url;
          topicImage = $("<img>");          //
          topicImage.attr("src", imageStill);
          topicImage.attr("data-still", imageStill);
          topicImage.attr("data-animate", imageAnimate);
          topicImage.attr("data-state", state);
          topicImage.addClass("gifs");
          topicImage.attr("alt", topic);
          $("#images").prepend(topicImage);
          

        }

        //
        

    })
}      
//function to have buttons show up at the top
function renderButtons() {
  // Deleting the hotdues prior to adding new hotdudes
  $("#buttons-view").empty();
    // Looping through the array of hotdudes
    for (var i = 0; i < hotDudes.length; i++) {

      // create new buttons for each item in hot dudes
      var a = $("<button>");
      a.addClass("topics btn btn-default btn-success btn-group");
      a.attr("data-name", hotDudes[i]);
      a.text(hotDudes[i]);
      $("#buttons-view").append(a);

    };
    
}

// This function handles events when a hot dude button is clicked
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var topics = $("#topic-input").val().trim();
    var alreadyUsed = $.inArray(topics,hotDudes);
    //checks to see if there is a blank or if it was already used
    if (topics && alreadyUsed<0){
      // Adding hotdude from the textbox to our array
      hotDudes.push(topics);
      $("#topic-input").val(" ");
      // Calling renderButtons which handles the processing of our hotdudes array
      renderButtons();
    }

});
//function to check stat of photo and change to other state
function changePhotoState()   {
        var state = $(this).attr("data-state");
        //checks state and then swtich src to other state and update state
        if (state =="still"){
          $(this).attr("data-state", "animate");
          $(this).attr("src",$(this).attr("data-animate"));
        } 
        else {
          $(this).attr("data-state", "still");
          $(this).attr("src",$(this).attr("data-still"));
        }
        
}



// Adding a click event listener to all elements with a class of "topics" and ".gifs"
$(document).on("click", ".topics", displayTopicPhoto);
$(document).on("click", ".gifs", changePhotoState);
// Calling the renderButtons function to display the intial buttons
renderButtons();
