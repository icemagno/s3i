var stompClient = null;
var textChanged = false;
var myModule = null;
var theMap = null;

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
	});    
    
}

function processData( data ) {
	// Object { modules: Array[2], header: Object, footer: Object }
	// modules[x].content /// header.content /// footer.content
	// CKEDITOR.instances.editor1.setData('<p font color="red">All ok here!!</p>');
	var docContent = "<div style='margin-bottom:5px;width:100%;border-bottom: 1px dotted black'>" + data.header.content + "</div>";
	
	for( x=0; x < data.modules.length; x++ ) {
		docContent = docContent + '<h4>' + data.modules[x].title + '</h4>';
		docContent = docContent + data.modules[x].content;
	}
	
	docContent = docContent + "<div style='margin-top:5px;width:100%;border-top: 1px dotted black'>" + data.footer.content + "</div>";
	
	var div = $("#documentPreview");
	div.fadeOut('fast', function() {
		div.html( docContent );
		div.fadeIn('fast');
	});	
	
}

function onTextChange() {
	textChanged = true;
}

function initCheck() {
	setInterval(function(){ 
		if( !textChanged ) return;
		var text = CKEDITOR.instances.editor1.getData();
		myModule.content = text;
		stompClient.send( "/document.update", {}, JSON.stringify( myModule ) );
		textChanged = false;
	}, 5000);
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
		layers: [ /* sateliteLayer, */ osmLayer, mapserver, apaLayer, hidranteLayer ],
		target: 'world-map',
		renderer: 'canvas',
		controls : [],
		view: theView
	});	
	
	
}

function initSystem() {
	
	// Desabilitado por enquanto
	return true;
	
    $.ajax({
        url: '/module',
        dataType: 'json',
        success: function (obj, textstatus) {
        	myModule = obj;
        	connect();
        	initCheck();
        }
    });
}


initSystem();
startMap();
initAirTraffic();

