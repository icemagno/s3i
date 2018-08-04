var activeAircraftLayer = null;
var aircraftSource = null;
var aeroTrafficEnabled = false;
var active = false;

function toggleAeroTraffic() {
	aeroTrafficEnabled = !aeroTrafficEnabled;
	if( !aeroTrafficEnabled ) {
		deleteAircrafts();
	}
	$("#aeroMenuCheck").toggle();
}

function activateAeroTrafficMonitor() {
	
	setInterval( function(){ 
		if( aeroTrafficEnabled ) getAircraftsBbox();
	}, 3000 );
	
}

function airCraftStyleFunction( feature, resolution ) {
	var props = feature.getProperties();
	var bearing = props.bearing * 0.01745329251;
	var callSign = props.callSign;
	var flightNumber = props.flightNumber;
	var tailPrefix = props.tailPrefix;
	var altitudemt = props.altitudemt;
	var resultStyles = [];
	
	var aircraftStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			scale : 0.6,
			anchor: [0.5, 0.5],
			rotation : bearing,
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			opacity: 1.0,
			src: '/resources/img/aero_yellow.png',
			rotateWithView: true,
		})),
	      text: new ol.style.Text({
	          font: '10px Consolas',
	          textAlign: 'center',
	          offsetX: 0,
	          offsetY: 20,
	          scale : 0.8,
	          textBaseline: 'middle',
	          fill: new ol.style.Fill({ color: '#000' }),
	          stroke: new ol.style.Stroke({
	            color: '#FFFFFF', width: 1
	          }),
	          text: tailPrefix,
	        })    			
	});
	
	resultStyles.push( aircraftStyle );
	return resultStyles;	
	
}

function getMapCurrentBbox () {
	var extent = theMap.getView().calculateExtent( theMap.getSize() );
	var countyLimits= ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
	extent = countyLimits;
    var bottomLeft = ol.extent.getBottomLeft( extent );
    var topRight = ol.extent.getTopRight( extent );
    return bottomLeft + "," + topRight;
}

function deleteAircrafts() {
	var features = aircraftSource.getFeatures();
	for ( x=0; x < features.length; x++ ) {
		var feature = features[x];
		aircraftSource.removeFeature( feature );
	}
}	

function getAircraftsBbox() {
	
	if ( active ) return;
	active = true;
	
	var bbox = getMapCurrentBbox();
	var coord = bbox.split(",");
	var maxlon = coord[3];
	var minlon = coord[1];
	var minlat = coord[2];
	var maxlat = coord[0];
	
	$.get( '/getairtraffic', {
            'minlon': minlon,
            'minlat': minlat,
            'maxlon': maxlon,
            'maxlat': maxlat,
    }).done( function ( respObj ) {
        	deleteAircrafts();
        
        	if ( !aeroTrafficEnabled ) {
        		return true;
        	}  
        	
        	var feicao = {};
        	feicao["type"] = "FeatureCollection";
        	var features = [];
        	
        	for( var key in respObj ) {
        		var properties = {};
        		var feature = {};
        		var coordinates = [];
        		var obj = respObj[key];
        		
        		if ( Array.isArray( obj ) ) {
        			properties["code"] = obj[0];
        			coordinates[1] = obj[ 1 ]; 
        			coordinates[0] = obj[ 2 ];
        			properties["bearing"] = obj[3];
        			properties["altitudeft"] = obj[4]; // ft
        			properties["altitudemt"] = obj[4] * 0.3048; // mt
        			properties["model"] = obj[8];
        			properties["tailPrefix"] = obj[9];
        			properties["airportSource"] = obj[11];
        			properties["airportDestination"] = obj[12];
        			properties["flightNumber"] = obj[13];
        			properties["callSign"] = obj[16];      			
        			
            		var geometry = {};
            		geometry["type"] = "Point";
            		geometry["coordinates"] = coordinates;
            		
            		feature["geometry"] = geometry;
            		feature["type"] = "Feature";
            		feature["properties"] = properties;            			
        			
        			features.push( feature );        			
        			
        		}
        		
        	}
        	feicao["features"] = features;
			var features = new ol.format.GeoJSON().readFeatures( feicao , {
				featureProjection: 'EPSG:3857'
			});
			for (var i = 0; i < features.length; i++) {
				aircraftSource.addFeature( features[i] );
			}			
			active = false;    
    }).fail(function() {
    	deleteAircrafts();
    	active = false;
    });
	
    
} 

function initAirTraffic() {
	aircraftSource = new ol.source.Vector();
	activeAircraftLayer = new ol.layer.Vector({
		source: aircraftSource,
		style: airCraftStyleFunction
	});	
	activeAircraftLayer.set('layerName', 'activeAircraftLayer');
	theMap.addLayer( activeAircraftLayer );
	activateAeroTrafficMonitor();
}

