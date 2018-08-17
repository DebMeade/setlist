$(document).ready(function () {

    // artist click
    $(document).on("click", "#artist", function () {
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
    $(document).on("click", "#city", function () {
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
    $(document).on("click", "#submit", function () {
        var baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=WFgrGCqmfhwpYbGIw5y87YrAwawoL8tv&segmentName=music&sort=date,asc";
        $("#results").empty();
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
            console.log($("#city-input").val());
            console.log($("#start-input").val());
            console.log($("#end-input").val());
            console.log($("#venue-input").val());
            console.log($("#genre-input").val());

            var artist = "&keyword=";
            var city = "&city=" + $("#city-input").val().trim();
            var startDate = "&startDateTime=" + $("#start-input").val().trim() + "T00:00:00Z";
            var endDate = "&endDateTime=" + $("#end-input").val().trim() + "T23:59:59Z";
            var venue = "&";
            var genre = "&classificationName=" + $("#genre-input").val().trim();
        }

        var queryUrl = baseUrl + artist + city + startDate + endDate + genre;
        console.log(queryUrl);

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (eventObject) {
            console.log(eventObject);
            var evtArray = eventObject._embedded.events;
            for (var i = 0; i < evtArray.length; i++) {
                var name = evtArray[i].name;
                var venue = evtArray[i]._embedded.venues[0].name;
                var venueAddr = evtArray[i]._embedded.venues[0].address.line1;
                var city = evtArray[i]._embedded.venues[0].city.name;
                var state = evtArray[i]._embedded.venues[0].state.stateCode;
                var date = evtArray[i].dates.start.localDate;
                var url = evtArray[i].url;

                $("#results").append($("<h2>").text(name));
                $("#results").append($("<h3>").text(venue));
                $("#results").append($("<p>").text(venueAddr));
                $("#results").append($("<p>").text(city));
                $("#results").append($("<p>").text(state));
                $("#results").append($("<p>").text(date));
                $("#results").append("<a href='" + url + "' target='_blank'>Buy tickets</a>");
            }
        })
    })






})