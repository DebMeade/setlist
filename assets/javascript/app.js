$(document).ready(function () {

  var config = {
        apiKey: "AIzaSyAKSxnbH1ZRtO3Lb1yOnc6JRqa7VIdExQ8",
        authDomain: "setlist-213420.firebaseapp.com",
        databaseURL: "https://setlist-213420.firebaseio.com",
        projectId: "setlist-213420",
        storageBucket: "setlist-213420.appspot.com",
        messagingSenderId: "505195451119"
      };
      firebase.initializeApp(config);


  var database = firebase.database();
//   var query;
//   function callThis() {
//     query.on('child_added', function(snapshot) {
//         snapshot.ref("/users").update({ favArray: ["testing"] });
//     });
// }
  // var users = database.child("users");

  $("#loginEmail").hide();
  $("#loginPsswd").hide();
  // artist click
  function artistClick() {
    // empty div
    $("#search").empty();
    // artist and city button
    var searchHead = "<h2>Search</h2>";
    var artButton = "<input type='button' name='button' class='btn btn-secondary buttonSpace' id='artist' value='Artist'>";
    var cityButton = "<input type='button' name='button' class='btn btn-secondary buttonSpace' id='city' value='City'>";
    var venueButton = "<input type='button' name='button' class='btn btn-secondary buttonSpace' id='venue' value='Venue'>";

    $("#search").append(searchHead);
    $("#search").append(artButton);
    $("#search").append(cityButton);

    // artist input
    var artistInput = "<input type='text' value='' placeholder='Artist' name='artist' class='btn btn-secondary, input, searchSpace' id='artist-input'>"
    $("#search").append(artistInput);
    // submit button
    var submitButton = "<input type='submit' class='btn btn-secondary searchSpace' id='submit' value='Submit'>";
    $("#search").append(submitButton);
  }
  
  // city click
  function cityClick() {
    // empty div
    $("#search").empty();
    // artist and city button
    var searchHead = "<h2>Search</h2>";
    var artButton = "<input type='button' name='button' class='btn btn-secondary buttonSpace' id='artist' value='Artist'>";
    var cityButton = "<input type='button' name='button' class='btn btn-secondary buttonSpace' id='city' value='City'>";
    var venueButton = "<input type='button' name='button' class='btn btn-secondary buttonSpace' id='venue' value='Venue'>";
    $("#search").append(searchHead);
    $("#search").append(artButton);
    $("#search").append(cityButton);
    // search inputs
    var cityInput = "<input type='text' value='" + localCity + "' placeholder='City' name='city' class='btn btn-secondary, input, searchSpace' id='city-input'>"
    $("#search").append(cityInput);
    var startInput = "<input type='date' value='' placeholder='Start Date' name='start-date' class='btn btn-secondary, input, searchSpace' id='start-input'>"
    $("#search").append(startInput);
    var endInput = "<input type='date' value='' placeholder='End Date' name='end-date' class='btn btn-secondary, input, searchSpace' id='end-input'>"
    $("#search").append(endInput);
    var genreInput = "<input type='text' value='' placeholder='Genre' name='genre' class='btn btn-secondary, input, searchSpace' id='genre-input'>"
    $("#search").append(genreInput);
    // submit button
    var submitButton = "<input type='submit' class='btn btn-secondary searchSpace' id='submit' value='Submit'>";
    $("#search").append(submitButton);
  }

  function submitClick() {
    // var queryUrl = queryUrlGen();
    // console.log(queryUrl);
    ajaxSearch(queryUrlGen());
  }

  function queryUrlGen() {
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
      var queryUrl = baseUrl + artist + city + startDate + endDate + genre;
      return queryUrl;
    } else {
      var artist = "&keyword=";
      var city = "&city=" + $("#city-input").val().trim();
      var startDate = "&startDateTime=" + $("#start-input").val().trim() + "T00:00:00Z";
      var endDate = "&endDateTime=" + $("#end-input").val().trim() + "T23:59:59Z";
      var venue = "&";
      var genre = "&classificationName=" + $("#genre-input").val().trim();
      var queryUrl = baseUrl + artist + city + startDate + endDate + genre;
      return queryUrl;
    }
    
    
  }
  function ajaxSearch(queryUrl) {
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (eventObject) {
      console.log(eventObject);
      evtArray = eventObject._embedded.events;
      appendEvents(evtArray);
    })
  }
 
  function addFavorite(id) {
    var searchItem = evtArray[id].name;
    for (var i = 0; i < favArray.length; i++) {
      if (favArray[i].name.indexOf(searchItem, 0) === -1) {
        favArray.push(evtArray[id]);
        console.log(favArray);
      }
    }
    $("#favorites").append("<li>" + evtArray[id].name + "</li>");
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
      var mapButton = $("<input class='viewMap btn btn-secondary btn-sm' type='button' value='View Map' id='" + i + "'>");
      var tktButton = $("<a href='" + url + "' target='_blank'><input class='btn btn-secondary btn-sm' type='button' value='Buy Tickets'></a>");

      // var mapDivCol = $("<div class='col-md-offset-3 col-md-6'>");
      // $(".result-item").attr("data-resultid", i);
      $("#results").append(newDiv);
      newDiv.append(imgDiv);
      newDiv.append(infoDiv);

      imgDiv.append($("<h3>").text(name));
      imgDiv.append("<img src='" + evtArray[i].images[0].url + "'>");
      if (!$("#artist-input").val()) { imgDiv.append(addFavorite); }

      infoDiv.append($("<h4>").text(venue));
      infoDiv.append($("<p>").text(venueAddr));
      infoDiv.append($("<p>").text(city + ", " + state));
      infoDiv.append(mapButton);
      infoDiv.append($("<p>").text(date));

      infoDiv.append(tktButton);

    }
  }
  function getFavorites(user) {
    console.log(user);
    var userid = user.uid;
    console.log(userid);
    database.ref('/users').once('value', function(snapshot) {
      if (!snapshot.hasChild(userid)) {
        database.ref('/users').push({
          email: user.email,
          uid: user.uid,
          favArray: [42],
        }) 
        console.log(database.ref('/users/' + userid));
        // query = database.ref('/users').orderByChild('uid').equalTo(firebase.auth().currentUser.uid);
        console.log(database.ref('/users').orderByChild('uid').equalTo(firebase.auth().currentUser.uid))
      } else {
        for (var i = 0; i < user.favArray; i++) {

        }
        }
    })
  }

    $(document).on("click", "#googleLogin", function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      console.log(provider);

      firebase.auth().signInWithRedirect(provider).then(function () {
        $("#googleLogin").hide();
        $("#emailLogin").hide();
        $("#newAcct").hide();
        $("#login").append('<p id="welcome" class="logins">Welcome ' + firebase.auth().currentUser.email + '</p>');
        $("#login").append('<p id="logout" class="logins">LOGOUT</p>');
        getFavorites(firebase.auth());
      });

      firebase.auth().getRedirectResult().then(function (result) {
        console.log(result);
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(token);
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      }).catch(function (error) {
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

    $(document).on("click", "#newAcct", function () {
      console.log($("#loginEmail").is(':hidden'));
      if ($("#loginEmail").is(':hidden')) {

        $("#loginEmail").show();
        $("#loginPsswd").show();
        $("#googleLogin").hide();
        $("#emailLogin").hide();
        $("#newAcct").text("LOGIN");
      } else {
        var email = $("#loginEmail").val();
        var password = $("#loginPsswd").val();
        console.log(email, password);
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });
        $("#loginEmail").empty();
        $("#loginPsswd").empty();
        $("#loginEmail").hide();
        $("#loginPsswd").hide();
        $("#googleLogin").hide();
        $("#emailLogin").hide();
        $("#newAcct").hide();
        $("#login").append('<p id="welcome" class="logins">Welcome ' + email + '</p>');
        $("#login").append('<p id="logout" class="logins">LOGOUT</p>');
        getFavorites(firebase.auth());
      }
    })

    $(document).on("click", "#emailLogin", function () {
      console.log($("#loginEmail").is(':hidden'));
      if ($("#loginEmail").is(':hidden')) {

        $("#loginEmail").show();
        $("#loginPsswd").show();
        $("#googleLogin").hide();
        $("#newAcct").hide();
        $("#emailLogin").text("LOGIN");
      } else {

        var email = $("#loginEmail").val();
        var password = $("#loginPsswd").val();
        console.log(email, password);
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
          $("#loginEmail").empty();
          $("#loginPsswd").empty();
          $("#loginEmail").hide();
          $("#loginPsswd").hide();
          console.log(email);
          $("#emailLogin").hide();
          $("#login").append('<p id="welcome" class="logins">Welcome ' + email + '</p>');
          $("#login").append('<p id="logout" class="logins">LOGOUT</p>');
          console.log(firebase.auth().currentUser);
          getFavorites(firebase.auth().currentUser);
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          var errorMessage = error.message;
          console.log('login error', errorMessage);
          // ...
        });
        
      }
    })

    $(document).on("click", "#logout", function() {
      firebase.auth().signOut();
      $("#googleLogin").show();
      $("#emailLogin").text("LOGIN WITH Email");
      $("#emailLogin").show();
      $("#newAcct").show();
      $("#favorites").empty();
      $("#logout").hide();
      $("#welcome").hide();
    })

    firebase.auth().onAuthStateChanged(function(user) {
      user = user;
      console.log('user', user);
    })

    // object arrays
    var evtArray = [];
    var favArray = [];

    //onClick Events
    $(document).on("click", "#artist", artistClick);
    $(document).on("click", "#city", cityClick);

    $(document).on("click", "#submit", submitClick);
    $(document).on("click", ".addFavorite", function () {
      addFavorite($(this).attr('id'));
    })
    $(document).on("click", ".viewMap", function () {

      var id = $(this).attr('id');
      var mapDiv = $("<div class='col-md-12' id='map-item-" + id + "'>");
      if (!$("#map-item-" + id).attr('id')) {
        $("#result-item-" + id).append(mapDiv);

        var buttonId = $(this).attr("id");

        console.log(buttonId, $(this));
        console.log("========: ", document.getElementById(buttonId).parentElement.childNodes[0].textContent);
        venueAddr = document.getElementById(buttonId).parentElement.childNodes[0].textContent;
        console.log(venueAddr);
        city = document.getElementById(buttonId).parentElement.childNodes[1].textContent;
        state = document.getElementById(buttonId).parentElement.childNodes[2].textContent.split(",").join("");
        // Space+Needle,Seattle+WA"
        mapBroodle = venueAddr.split(' ').join('+') + "," + state.split(' ').join('+');
        console.log(state);
        console.log(city);
        console.log(mapBroodle);
        // mapBroodle = "venueAddr.val().split(' ').join('+') + city.val().split(' ').join('+') + state.val().split(' ').join('+')";
        // mapDiv.append("<img src='https://via.placeholder.com/350x150'>");
        mapDiv.append("<iframe width='100%' height='250' class='mt-3' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAtuxyQe-XsjbN0QhkLtXda8nW6M1hQsw4&q=" + mapBroodle + "' allowfullscreen></iframe>");
      //  console.log(mapBroodle);
      }
      else {
        $("#map-item-" + id).remove();
      }

    })

  })
