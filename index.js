

var IFRAME_DOMAIN = 'https://kartta.paikkatietoikkuna.fi';
//var IFRAME_DOMAIN = 'http://karttatehdas.fi:8080';

var TurkuKartalle = {
    features: null,
    lastClickedFeatureIndex: -1
}

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
	var expectedOskariVersion = '1.49.0';
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

	channel.getFeatures([true], function(data) {
	    channel.log('GetFeatures: ', data);
	});

	$.getJSON('https://turkukartalle.karttatehdas.fi/features', function(data) {
	    console.log(data);
	    TurkuKartalle.features = data.features;

	    var params = [data, {
		centerTo: true,
		featureStyle: {
		    fill: {
			color: '#ff0000'
		    },
		    stroke : {
			color: '#ff0000',
			width: 5
		    },
		    text : {
			scale : 1.3,
			fill : {
			    color : 'rgba(0,0,0,1)'
			},
			stroke : {
			    color : 'rgba(255,255,255,1)',
			    width : 2
			},
			labelProperty: 'test_property'
		    }
		},
		cursor: '',
		prio: 1
	    }];

	    channel.postRequest(
		'MapModulePlugin.AddFeaturesToMapRequest',
		params
	    );
	});
    });

    channel.handleEvent(
	'MapClickedEvent',
	function(data) {
	    console.log('MapClickedEvent', data);
	    console.log(TurkuKartalle.lastClickedFeatureIndex);

	    if (TurkuKartalle.lastClickedFeatureIndex != -1) {
		const feature = TurkuKartalle.features[TurkuKartalle.lastClickedFeatureIndex];
		var html = '<p><b>' + feature.properties.nimi + '</b></p>' +
		    '<p><img src="' + feature.properties.kuva_url + '"></p>' +
		    '<p>' + feature.properties.kuva_license_text + '</p>' +
		    '<p><a href="' + feature.properties.kuva_info_url + '" target="_blank">kuva Filckrissä</a></p>' +
		    '<p><a href="' + feature.properties.license_info_url + '" target="_blank">lisenssi</a></p>';
		$('#featurePopup').html(html);
		$('#featurePopup').css('top', data.y);
		$('#featurePopup').css('left', data.x);
		$('#featurePopup').show();
		TurkuKartalle.lastClickedFeatureIndex = -1;
	    }
	    else {
		$('#featurePopup').hide();
	    }
        }
    );

    // channel.handleEvent('InfoBox.InfoBoxEvent', function(data) {
    // console.log('InfoBox.InfoBoxEvent', data);
    // });

    channel.handleEvent('FeatureEvent', function(data) {
	console.log('FeatureEvent', data);
	TurkuKartalle.lastClickedFeatureIndex = parseInt(data.features[0].id.substr(1, 1));
    });

});


