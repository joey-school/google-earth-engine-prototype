// The client ID from the Google Developers Console.
var CLIENT_ID = '309326416919-13rm9igoc842ukq7d4afgd3380rbt7lg.apps.googleusercontent.com';

var map;

var runAnalysis = function() {
  ee.initialize();

  var image = ee.Image('COPERNICUS/S2/20150706T105016_20150706T105351_T31UFT').getMap({bands: ['B6', 'B4', 'B3'], max: 4000});
  var overlay = new ee.MapLayerOverlay('https://earthengine.googleapis.com/map', image.mapid, image.token, {});

  map.overlayMapTypes.push(overlay);
};

$(document).ready(function() {
  // Create the base Google Map.
  map = new google.maps.Map($('.map').get(0), {
        center: { lat: 51.921803, lng: 4.495839},
        zoom: 8
      });

  // Shows a button prompting the user to log in.
  var onImmediateFailed = function() {

console.log(8888);


    $('.g-sign-in').removeClass('hidden');
    $('.output').text('(Log in to see the result.)');
    $('.g-sign-in .button').click(function() {
      ee.data.authenticateViaPopup(function() {
        // If the login succeeds, hide the login button and run the analysis.
        // $('.g-sign-in').addClass('hidden');
        runAnalysis();
      });
    });
  };

  // Attempt to authenticate using existing credentials.
  ee.data.authenticate(CLIENT_ID, runAnalysis, null, null, onImmediateFailed);
});