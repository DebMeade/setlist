//  var location, var pos, var localState, var localCity have the data
     var localCity;
     var localState;
     navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
          
        };
        console.log(pos);
    
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + "," + position.coords.longitude + '&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        var location = ("Current location: " + address.address_components[3].short_name + ", " + address.address_components[5].short_name);
        localCity = address.address_components[3].short_name;
        localState = address.address_components[5].short_name
        console.log(location);
        $("#myCity").text(location);
        $("#city-input").text("<input type='text' value='' placeholder=" + localCity + "name='city' class='input' id='city-input'>");
    }
    };
    
    request.send();
  

  var successCallback = function(position){
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    displayLocation(x,y);
  };

  var errorCallback = function(error){
    var errorMessage = 'Unknown error';
    switch(error.code) {
      case 1:
        errorMessage = 'Permission denied';
        break;
      case 2:
        errorMessage = 'Position unavailable';
        break;
      case 3:
        errorMessage = 'Timeout';
        break;
    }
    document.write(errorMessage);
  };
});

  

