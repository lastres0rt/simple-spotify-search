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

  // compile handlebars template
  var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);

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
    });

    // reset the form
    $spotifySearch[0].reset();
    $track.focus();
  });

});