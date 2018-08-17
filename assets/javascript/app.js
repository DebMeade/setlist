// artist click
$(document).on("click", "#artist", function(){
  // empty div
  $("#search").empty();
  // artist and city button
  var artButton = "<button type='button' name='button' id='artist'>Artist Name</button>";
  var cityButton = "<button type='button' name='button' id='city'>City</button>";
  $("#search").append(artButton);
  $("#search").append(cityButton);
  // artist input
  var artistInput = "<input type='text' value='' placeholder='Artist' name='artist' class='input' id='artist-input'>"
  $("#search").append(artistInput);
  // submit button
  var submitButton = "<button type='submit' id='submit'>Submit</button>";
  $("#search").append(submitButton);

});
// city click
$(document).on("click", "#city", function(){
  // empty div
  $("#search").empty();
  // artist and city button
  var artButton = "<button type='button' name='button' id='artist'>Artist Name</button>";
  var cityButton = "<button type='button' name='button' id='city'>City</button>";
  $("#search").append(artButton);
  $("#search").append(cityButton);
  // search inputs
  var cityInput = "<input type='text' value='' placeholder='City' name='city' class='input' id='city-input'>"
  $("#search").append(cityInput);
  var startInput = "<input type='date' value='' placeholder='Start Date' name='end-date' class='input' id='start-input'>"
  $("#search").append(startInput);
  var endInput = "<input type='date' value='' placeholder='End Date' name='start-date' class='input' id='end-input'>"
  $("#search").append(endInput);
  var genreInput = "<input type='text' value='' placeholder='Venue' name='venue' class='input' id='venue-input'>"
  $("#search").append(genreInput);
  var venueInput = "<input type='text' value='' placeholder='Genre' name='venue' class='input' id='genre-input'>"
  $("#search").append(venueInput);
  // submit button
  var submitButton = "<button type='submit' id='submit'>Submit</button>";
  $("#search").append(submitButton);
});
// submit click
$(document).on("click", "#submit", function(){
      if($("#artist-input").val()){
        console.log($("#artist-input").val());
      }
      else{
        console.log($("#city-input").val());
        console.log($("#start-input").val());
        console.log($("#end-input").val());
        console.log($("#venue-input").val());
        console.log($("#genre-input").val());
      }
})
