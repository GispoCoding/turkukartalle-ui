

var IFRAME_DOMAIN = 'http://karttatehdas.fi:8080';
var markerCounter = 0;

$(function() {

  var iFrame = document.getElementById('publishedMap');

  console.log(OskariRPC);

  var channel = OskariRPC.connect(
      iFrame,
      IFRAME_DOMAIN
  );

  channel.onReady(function() {
      //channel is now ready and listening.
      channel.log('Map is now listening');
      var expectedOskariVersion = '1.50.0';
      channel.isSupported(expectedOskariVersion, function(blnSupported) {
        if(blnSupported) {
          channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
        } else {
          channel.log('Oskari-instance is not the one we expect (' + expectedOskariVersion + ') or client not supported');
          // getInfo can be used to get the current Oskari version
          channel.getInfo(function(oskariInfo) {
            channel.log('Current Oskari-instance reports version as: ', oskariInfo);
          });
        }
      });
      channel.isSupported(function(blnSupported) {
        if(!blnSupported) {
          channel.log('Oskari reported client version (' + OskariRPC.VERSION + ') is not supported.' +
          'The client might work, but some features are not compatible.');
        } else {
          channel.log('Client is supported by Oskari.');
        }

      channel.getSupportedEvents(function(supported) {
        channel.log('Supported events', supported);
      });
  
      channel.getSupportedRequests(function(supported) {
        channel.log('Supported requests', supported);
      });
  
      channel.getSupportedFunctions(function(supported) {
        channel.log('Supported functions', supported);
      });
    });

    // supported functions can also be detected by
    if (typeof channel.getAllLayers === 'function') {
      channel.getAllLayers(function(layers) {
        channel.log('Available layers', layers);
      });
    }


    // channel.getFeatures([true], function(data) {
    //   channel.log('GetFeatures: ', data);
    // });
    channel.getFeatures([true], function(data) {
      channel.log('GetFeatures: ', data);
    });

  });


  //spinning action on the map
  //channel.postRequest('ShowProgressSpinnerRequest',[true]);
  //listening to events and notifying user
  // channel.handleEvent('MapClickedEvent', function(data) {
  //   alert('Map clicked!');
  // });
  //calling functions and doing things with the result

 

  channel.handleEvent(
    'MapClickedEvent',
    function(data) {
      console.log('MapClickedEvent', data);

        if(markerCounter === 0) {
            channel.postRequest(
                'MapModulePlugin.AddMarkerRequest', [{
                        x: data.lon,
                        y: data.lat
                    },
                    'RPCMarker' + markerCounter
                ]
            );
            markerCounter++;
            //setCoords(data.lon, data.lat);
        } else {
            channel.postRequest(
                'MapModulePlugin.RemoveMarkersRequest', []
            );
            markerCounter = 0;
            channel.postRequest(
                'MapModulePlugin.AddMarkerRequest', [{
                        x: data.lon,
                        y: data.lat
                    },
                    'RPCMarker' + markerCounter
                ]
            );
            markerCounter++;
            //setCoords(data.lon, data.lat);
        }

        // var lonlat = [data.lon, data.lat];
        // channel.postRequest('MapModulePlugin.GetFeatureInfoRequest', lonlat);

        // channel.postRequest('InfoBox.HideInfoBoxRequest', []);

        // var url = "http://localhost:8080/action?action_route=GetFeatureInfoWMS";

        // var params = {
        //   layerIds: 6,
        //   projection: "EPSG:4326",
        //   x: 588,
        //   y: 266,
        //   lon: 24.31715809160541,
        //   lat: 60.66718983217681,
        //   width: 1061,
        //   height: 416,
        //   bbox: "21.08717762285541,59.8432152228018,26.91542469316791,62.1283714728018",
        //   zoom: 6,
        //   srs: "EPSG:4326"
        // }

        // $.ajax({
        //   type: "POST",
        //   dataType: "json",
        //   url: url,
        //   data: params,
        //   success: function (data, status, jqXHR) {
        //     console.log(data);
        //   }
        // });

    },
  );



  channel.handleEvent('InfoBox.InfoBoxEvent', function(data) {
    console.log('InfoBox.InfoBoxEvent', data);
  });

  channel.handleEvent('FeatureEvent', function(data) {
    console.log('FeatureEvent', data);
  });


});


