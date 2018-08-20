$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyAKSxnbH1ZRtO3Lb1yOnc6JRqa7VIdExQ8",
        authDomain: "setlist-213420.firebaseapp.com",
        databaseURL: "https://setlist-213420.firebaseio.com",
        projectId: "setlist-213420",
        storageBucket: "setlist-213420.appspot.com",
        messagingSenderId: "505195451119"
      };
      firebase.initializeApp(config);

      database = firebase.database;
  // artist click
  function artistClick() {
    // empty div
    $("#search").empty();
    // artist and city button
    var searchHead = "<h2>Search</h2>";
    var artButton = "<button type='button' name='button' id='artist'>Artist Name</button>";
    var cityButton = "<button type='button' name='button' id='city'>City</button>";
    $("#search").append(searchHead);
    $("#search").append(artButton);
    $("#search").append(cityButton);
    // artist input
    var artistInput = "<input type='text' value='' placeholder='Artist' name='artist' class='input' id='artist-input'>"
    $("#search").append(artistInput);
    // submit button
    var submitButton = "<input type='submit' id='submit' value='Submit'>";
    $("#search").append(submitButton);
  }
  // city click
  function cityClick() {
    // empty div
    $("#search").empty();
    // artist and city button
    var searchHead = "<h2>Search</h2>";
    var artButton = "<input type='button' name='button' id='artist' value='Artist Name'>";
    var cityButton = "<input type='button' name='button' id='city' value='City'>";
    $("#search").append(searchHead);
    $("#search").append(artButton);
    $("#search").append(cityButton);
    // search inputs
    var cityInput = "<input type='text' value='' placeholder='City' name='city' class='input' id='city-input'>"
    $("#search").append(cityInput);
    var startInput = "<input type='date' value='' placeholder='Start Date' name='start-date' class='input' id='start-input'>"
    $("#search").append(startInput);
    var endInput = "<input type='date' value='' placeholder='End Date' name='end-date' class='input' id='end-input'>"
    $("#search").append(endInput);
    var genreInput = "<input type='text' value='' placeholder='Venue' name='venue' class='input' id='venue-input'>"
    $("#search").append(genreInput);
    var venueInput = "<input type='text' value='' placeholder='Genre' name='venue' class='input' id='genre-input'>"
    $("#search").append(venueInput);
    // submit button
    var submitButton = "<input type='submit' id='submit' value='Submit'>";
    $("#search").append(submitButton);
  }
  function submitClick() {
    // var queryUrl = queryUrlGen();
    // console.log(queryUrl);
    ajaxSearch(queryUrlGen());
  }
  function appendEvents(evtArray) {
    $("#results").empty();
    var resultHead = "<h2>Events</h2>";
    $("#results").append(resultHead);

    for (var i = 0; i < evtArray.length; i++) {
      var name = evtArray[i].name;
      var venue = evtArray[i]._embedded.venues[0].name;
      var venueAddr = evtArray[i]._embedded.venues[0].address.line1;
      var city = evtArray[i]._embedded.venues[0].city.name;
      var state = evtArray[i]._embedded.venues[0].state.stateCode;
      var date = moment(evtArray[i].dates.start.dateTime).format("dddd, MMMM Do YYYY, h:mm a");
      var url = evtArray[i].url;

      var addFavorite = "<input type='button' name='button' id='" + i + "' class='addFavorite' value='Add Favorite'>";

      var newDiv = $("<div class='row result-item' id='result-item-" + i + "'>");
      var imgDiv = $("<div class='col-md-6 artist-info'>");
      var infoDiv = $("<div class='col-md-6 event-info'>");
      // $(".result-item").attr("data-resultid", i);
      $("#results").append(newDiv);
      newDiv.append(imgDiv);
      newDiv.append(infoDiv);

      imgDiv.append($("<h2>").text(name));
      imgDiv.append("<img src='" + evtArray[i].images[0].url + "'>");
      if (!$("#artist-input").val()) {imgDiv.append(addFavorite);}

      infoDiv.append($("<h3>").text(venue));
      infoDiv.append($("<p>").text(venueAddr));
      infoDiv.append($("<p>").text(city + ", " + state));
      infoDiv.append($("<p>").text(date));
      infoDiv.append("<a href='" + url + "' target='_blank'>Buy tickets</a>");
    }
  }
  function queryUrlGen(){
    var baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=WFgrGCqmfhwpYbGIw5y87YrAwawoL8tv&segmentName=music&sort=date,asc";
    if ($("#artist-input").val()) {
      console.log($("#artist-input").val());
      var artistInput = "&keyword=" + $("#artist-input").val().trim();
      var artist = artistInput.split(" ").join("+");
      var city = "&city=";
      var startDate = "&startDateTime=";
      var endDate = "&endDateTime=";
      var venue = "&";
      var genre = "&classificationName=";
    }
    else {
      var artist = "&keyword=";
      var city = "&city=" + $("#city-input").val().trim();
      var startDate = "&startDateTime=" + $("#start-input").val().trim() + "T00:00:00Z";
      var endDate = "&endDateTime=" + $("#end-input").val().trim() + "T23:59:59Z";
      var venue = "&";
      var genre = "&classificationName=" + $("#genre-input").val().trim();
    }
    var queryUrl = baseUrl + artist + city + startDate + endDate + genre;
    return queryUrl;
  }
  function ajaxSearch(queryUrl) {
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function(eventObject) {
      console.log(eventObject);
      evtArray = eventObject._embedded.events;
      appendEvents(evtArray);
    })
  }
  function addFavorite(id){
    var searchItem = evtArray[id].name;
    for (var i = 0; i < favArray.length; i++) {
      if (favArray[i].name.indexOf(searchItem, 0) === -1) {
        favArray.push(evtArray[id]);
        console.log(favArray);
      }
    }
  $("#favorites").append("<li>" + evtArray[id].name + "</li>");
}

$(document).on("click", "#googleLogin", function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    console.log(provider);

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(token);
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
})
  // object arrays
  var evtArray = [];
  var favArray = [];

  //onClick Events
  $(document).on("click", "#artist", artistClick);
  $(document).on("click", "#city", cityClick);
  $(document).on("click", "#submit", submitClick);
  $(document).on("click", ".addFavorite", function() {
    addFavorite($(this).attr('id'));
  })
})
