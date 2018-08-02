var stompClient = null;
var textChanged = false;
var myModule = null;
var theMap = null;
var theView = null;
var globalUser = null;

/* --------  Camadas ----------- */
var hidranteLayer = null;
var osmLayer = null;
var apaLayer = null;
var sateliteLayer = null;
/* ------------------------------*/


function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    
    stompClient.debug = null;
	stompClient.connect({}, function(frame) {
		
		stompClient.subscribe('/queue/notify', function(notification) {
			processData( JSON.parse( notification.body ) );
		});
		
		stompClient.subscribe('/queue/fireman', function(notification) {
			processFireman( JSON.parse( notification.body ) );
		});
		
		stompClient.subscribe('/queue/admin', function(notification) {
			processAdmin( JSON.parse( notification.body ) );
		});
		
		initSystem();
		
	});    
    
}

function toggleFireToolbar() {
	$("#fireToolbar").toggle();
}

function processData( data ) {
	console.log( data );
}

function processFireman( data ) {
	addUserToMap( data );
}

function processAdmin( data ) {
	addUserToMap( data );
}


function onTextChange() {
	textChanged = true;
}

function updateScale() {
	//
}

function startMap() {
	
	theView = new ol.View({
		center: ol.proj.fromLonLat([-6.954,39.614]),
		zoom: 7,
	    minZoom: 2,
	    maxZoom: 19,
	});	

	
	theView.on('change:resolution', function( evt ) {
		updateScale();
	});	
	
	/*  OpenStreetMap   */
	osmLayer = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	osmLayer.setVisible( true );
	/* ------------ */

	
	/*  Satélite   */
	sateliteLayer = new ol.layer.Tile({
		source: new ol.source.XYZ({
			url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
		})
	});	 
	sateliteLayer.setVisible( false );
	/* ------------ */
	
	
	/*  Hidrantes   */ 
	hidranteLayer = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'https://www.cmabreu.com.br/geoserver/wms',
			params: {'LAYERS': 'osm:hidrantes', 'TILED': true, 'FORMAT': 'image/png8','tiled': true,},
		})
	});	
	hidranteLayer.setVisible( false );
	/* ------------ */
	
	/*  APA   */ 
	apaLayer = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'https://www.cmabreu.com.br/geoserver/wms',
			params: {'LAYERS': 'osm:apa', 'TILED': true, 'FORMAT': 'image/png8','tiled': true,},
		})
	});	
	apaLayer.setVisible( false );
	/* ------------ */

	/*  TESTE   */ 
	//http://epic-webgis-portugal.isa.ulisboa.pt/wms/epic?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
	//https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WMSServer
	/*
	epic = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WmsServer',
			params: {'LAYERS': '1', 'TILED': true, 'FORMAT': 'image/png8','tiled': true,},
		})
	});	
	epic.setVisible( true );
	*/
	/* ------------ */	
	
	/* MapServer */
	// https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/
	/*
	var mapserver = new ol.layer.Tile({
		source: new ol.source.XYZ({
			url: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_time/MapServer/tile/{z}/{y}/{x}'
		})
	})
	*/;	
	/* ------------ */	
	
	
	theMap = new ol.Map({
		layers: [ osmLayer, sateliteLayer, apaLayer, hidranteLayer ],
		target: 'world-map',
		renderer: 'canvas',
		controls : [],
		view: theView
	});	
	
	theMap.on('singleclick', function(evt) {
	    var feature = theMap.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
	        console.log( "Hit a layer" );
	        return feature;
	    });
	    if (feature) {
	    	var props = feature.getProperties();
	    	
	    	if( props.roleName === 'ROLE_DRONE' ) {
	    		console.log('hit');
	    		
	    		$("#droneCam").show(100);
	    	}	
	        
	    }
	});	
	

	
	theMap.on('pointermove', function (evt) {
		if (evt.dragging) {
			return;
		}
		var hit = theMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
			return true;
		});
		theMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
	});	


	
	
}

function initSystem() {
	
    $.ajax({
        url: '/userdetails',
        dataType: 'json',
        success: function (user, textstatus) {
        	globalUser = user;
        	
        	getLocation();
        	
        	startMap();
        	initAirTraffic();
        	initUserLayer();

        	setTimeout(function(){
        		fakeDrone(); 
        	}, 10000);        	
        	
        	
        }
    });
	
    
    
}

function drawFireArea() {
	initDraw();
}

//var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
	initCheck( [position.coords.latitude, position.coords.longitude] );
}

function initCheck( position ) {
	var consumer = {};
	consumer.position = position; 
	consumer.user = globalUser;
	if( globalUser.roleName === 'ROLE_ADMIN' ) {
		stompClient.send( "/notify.admin", {}, JSON.stringify( consumer ) );
	}
	if( globalUser.roleName === 'ROLE_FIREMAN' ) {
		stompClient.send( "/notify.fireman", {}, JSON.stringify( consumer ) );	
	}
	
}

$( document ).ready(function() {
	$("#contentWraper").append('<div id="world-map" style="position:absolute; top:0px;left:0px;width:100%;height:100%;"></div>');
	connect();
});

// ------------------------ TESTE -------------------------------------------------------------------------

function fakeDrone() {
	var data = {};
	data.position = [39.614,-6.954];
	data.user = {name: "ASD-786G", email: "drone", fullName: "ASD-786G", roleName: "ROLE_DRONE"};
	addUserToMap( data );
}









