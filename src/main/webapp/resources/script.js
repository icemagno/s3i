var stompClient = null;
var textChanged = false;
var myModule = null;
var theMap = null;
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
		
		
	});    
    
}

function toggleFireToolbar() {
	$("#fireToolbar").toggle();
}

function processData( data ) {
	console.log( data );
}

function processFireman( data ) {
	console.log( "New Fireman !! "); 
	console.log( data );
}

function processAdmin( data ) {
	console.log( "New admin !! "); 
	console.log( data );
	
	/*
	var thing = new ol.geom.Point([0,0]);
	var featurething = new ol.Feature({
	    name: "Thing",
	    geometry: thing
	});
	this.vectorSource.addFeature( featurething ); 	
	*/	
	
	
}


function onTextChange() {
	textChanged = true;
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

function updateScale() {
	//
}

function startMap() {
	
	var theView = new ol.View({
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
	
	epic = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WmsServer',
			params: {'LAYERS': '1', 'TILED': true, 'FORMAT': 'image/png8','tiled': true,},
		})
	});	
	epic.setVisible( true );
	
	/* ------------ */	
	
	/* MapServer */
	// https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/
	var mapserver = new ol.layer.Tile({
		source: new ol.source.XYZ({
			url: 'https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_time/MapServer/tile/{z}/{y}/{x}'
		})
	});	
	/* ------------ */	
	
	
	theMap = new ol.Map({
		layers: [ sateliteLayer, osmLayer, mapserver, apaLayer, hidranteLayer ],
		target: 'world-map',
		renderer: 'canvas',
		controls : [],
		view: theView
	});	
	
	
}

function initSystem() {
	
    $.ajax({
        url: '/userdetails',
        dataType: 'json',
        success: function (user, textstatus) {
        	globalUser = user;
        	connect();
        	getLocation();
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

startMap();
initSystem();
initAirTraffic();

