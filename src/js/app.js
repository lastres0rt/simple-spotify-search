// wait for DOM to load before running JS
$(function() {

  // form to search spotify API
  var $spotifySearch = $('#spotify-search');

  // input field for track (song)
  var $track = $('#track');

  // element to hold results from spotify API
  var $results = $('#results');

  // loading gif
  var $loading = $('#loading');

  var $token;

  // compile handlebars template
  var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);

  // Get the goddamn token
  $.ajax({
    type: "POST",
    url: 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token',
    data: '{"grant_type":"client_credentials"}',
    // ContentType: "application/x-www-form-urlencoded; charset=UTF-8",
    beforeSend: function(xhr){
      xhr.setRequestHeader("Authorization", "Basic " + "0fec0d795e4f4f2d9d2543eac5adee3d"+ ":" + "bdfdf66d292e422c8914e445b6593a57");
    }, success: function(data){
      token = data.access_token;
    }
  });

  // submit form to search spotify API
  $spotifySearch.on('submit', function (event) {
    event.preventDefault();

    // empty previous results and show loading gif
    $results.empty();
    $loading.show();

    // save form data to variable
    var searchTrack = $track.val();

    // spotify search URL
    var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack + '&type=album,artist,track'

    // use AJAX to call spotify API

    // CURL sample:
    // curl -X GET "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist"
    // -H "Authorization: BearerBQBb5vFIM_0jEkGvxjUED6ul4V0y4ieDoWpFP1CejXqe348vFgZxcz1yi_cYZ04zjoMu8oepN6ZQZhRrDRx9XLfS48834L7eyTTDxymc6p537UykQvC98sofji5Cm20k6pyF4knEpSE3RA"
    $.ajax({
      type: "GET",
      url: searchUrl,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }, success: function(data){
        var trackResults = data.tracks.items;
        console.log(trackResults);

        // hide loading gif
        $loading.hide();

        // pass in data to render in the template
        var trackHtml = template({ tracks: trackResults });

        // append html to the view
        $results.append(trackHtml);
      }
    });
/*
    $.get(searchUrl, function (data) {

      // track results are in an array called `items`
      // which is nested in the `tracks` object
      var trackResults = data.tracks.items;
      console.log(trackResults);

      // hide loading gif
      $loading.hide();

      // pass in data to render in the template
      var trackHtml = template({ tracks: trackResults });

      // append html to the view
      $results.append(trackHtml);
    });*/

    // reset the form
    $spotifySearch[0].reset();
    $track.focus();
  });

});