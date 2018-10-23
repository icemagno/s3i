var stompClient = null;
var textChanged = false;
var myModule = null;
var theMap = null;
var theView = null;
var globalUser = null;
var selectedFeature = null;
var modifyInteraction = null;

/* --------  Camadas ----------- */
var hidranteLayer = null;
var osmLayer = null;
var apaLayer = null;
var sateliteLayer = null;
var gwisLayer = null;
/* ------------------------------*/

var userCamTimer = null;
var userCamIpSource = "";

function connect() {
    var socket = new SockJS('/phoenix/ws');
    stompClient = Stomp.over(socket);
    stompClient.heartbeat.outgoing = 2000;
    stompClient.heartbeat.incoming = 2000;
    
    stompClient.debug = null;
	stompClient.connect({}, function(frame) {
		
		stompClient.subscribe('/phoenix/queue/fireman', function(notification) {
			processFireman( JSON.parse( notification.body ) );
		});
		
		stompClient.subscribe('/phoenix/queue/admin', function(notification) {
			processAdmin( JSON.parse( notification.body ) );
		});
		

		stompClient.subscribe('/phoenix/queue/user', function(notification) {
			processUser( JSON.parse( notification.body ) );
		});
		
		initSystem();
		
	}, function( theMessage ) {
	    
		$.notify({
			title : '',
			message: theMessage 
		},{
			type: 'danger',
			delay : 3000,
			animate: {
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutUp'
			}			
		});   		
		
		
	});    
    
}

function toggleFireToolbar() {
	$("#fireToolbar").toggle();
}

function processFireman( data ) {
	addUserToMap( data );
}

function processAdmin( data ) {
	addUserToMap( data );
}

function processUser( data ) {
	addUserToMap( data );
}

function onTextChange() {
	textChanged = true;
}

function updateScale() {
	//
}

function mapMoveEnd() {
	
	//updateTransit();
	
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
		source: new ol.source.OSM(),
		preload: 5,
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

	gwisLayer = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: 'http://ies-ows.jrc.ec.europa.eu/gwis',
			params: {'TIME': todayDateSQL(), 'LAYERS': 'ecmwf.fwi', 'TRANSPARENT':true, 'TILED': true, 'FORMAT': 'image/png','tiled': true},
		}),
		opacity: 0.5
	});	
	gwisLayer.setVisible( false );
	
	
	osmLayer.set('layerName', 'osmLayer');
	sateliteLayer.set('layerName', 'sateliteLayer');
	apaLayer.set('layerName', 'apaLayer');
	hidranteLayer.set('layerName', 'hidranteLayer');

	theMap = new ol.Map({
		layers: [ osmLayer, sateliteLayer, apaLayer, hidranteLayer, gwisLayer ],
		target: 'world-map',
		renderer: 'canvas',
		controls : [],
		view: theView
	});	
	
	// Responde a um clique no mapa em algum elemento
	theMap.on('singleclick', function(evt) {
		var layerName = null;
		selectedFeature = null;
		
	    var feature = theMap.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
	        if( layer )	layerName = layer.get('layerName');
	        return feature;
	    });
	    
	    if (feature) {
	    	var props = feature.getProperties();

	    	// Um elemento EFFIS?
	    	if( layerName === 'effisLayer' ) {
	    		  var win = window.open(props.URL, '_blank');
	    		  win.focus();	    		
	    	}
	    	
	    	// Uma área de incendio?
	    	if ( layerName === 'drawLayer' ) {
	    		//
	    	}
	    	
	    	if ( layerName === 'userLayer' ) {

	    		// Um drone ?
		    	if( props.roleName === 'ROLE_DRONE' ) {
		    		$("#droneCam").show(1000);
		    		$("#droneCamTitle").text( '[Drone] ' + props.fullName );
		    	}
		    	
	    		// Um usuário comum ?
		    	if( props.roleName === 'ROLE_USER' ) {
		    		$("#userCam").show(1000);
		    		$("#userCamTitle").text( '[Usuário] ' + props.remoteAddress );	
		    		
		    		userCamIpSource = props.remoteAddress;
		    		
		    		if(userCamTimer) clearInterval(userCamTimer);
		    		userCamTimer = setInterval(function(){
		    			updateUserCam( );
		        	}, 500);		    		
		    		
		    	}
	    	}
	    }
	    
	});	
	
	theMap.on('moveend', mapMoveEnd );
	
	theMap.on('pointermove', function (evt) {
		if (evt.dragging) {
			return;
		}
		var hit = theMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
			
			return true;
		});
		theMap.getTargetElement().style.cursor = hit ? 'pointer' : '';
	});	

	$( "#sidebarButton" ).click(function() {
		console.log('xzcxz');
		setTimeout( function() { 
			theMap.updateSize();
		}, 200);
	});	
	
}

function updateUserCam( ) {
	// http://191.25.68.237:8080/shot.jpg?rnd=259399
	// http://191.25.68.237:8080/gps.json
	// http://191.25.68.237:8080/status.json
	// http://191.25.68.237:8080/sensors.json
	// {"gps":{},"network":{"latitude":-22.8972118,"longitude":-43.1740812,"accuracy":34.4}}
	
	if( userCamIpSource.indexOf(':') > -1 ) {
		userCamIpSource = '[' + userCamIpSource + ']';
	}
	
	var rand = Math.floor(Math.random() * 400000) + 100000 ;
	var url = "http://"+userCamIpSource+":8080/shot.jpg?rnd=" + rand;
	
	
	var img = new Image();
    img.onload = function() {
    	$("#userCamImage").attr('src', url );
    }
    img.onerror = function() {
		$( "#userCamImage" ).attr("src", "/phoenix/resources/img/static.gif" );
    }
    img.src = url;	
}

function closeDroneCam() {
	$("#droneCam").hide(1000);
}

function closeUserCam() {
	$("#userCam").hide(1000);
}

function editFireArea() {
	var features = drawSource.getFeatures();
	
	if( features.length == 0 ) return;
	
	if( editing ) {
		theMap.removeInteraction( modifyInteraction );
	    theMap.removeInteraction( selectArea );		
		modifyInteraction = null;
		selectArea = null;
		editing = false;
		return;
	} 
	
	editing = true;
	
    selectArea = new ol.interaction.Select({
    	layers: [drawLayer],
	});	
	
    modifyInteraction = new ol.interaction.Modify({
        features: selectArea.getFeatures(),
        //style: overlayStyle,
	});    

    theMap.addInteraction( selectArea );		
    theMap.addInteraction( modifyInteraction );	    
	
}


function initSystem() {
	console.log("initSystem");

	
	function metodo1( data ) {
		console.log('Metodo 1');
		console.log( data );
		
		// Modo https://ipapi.co/json/  ---------------------
		var location = data.loc.split(",");
		var latitude = parseFloat( location[0] );
		var longitude = parseFloat( location[1] )
		data.latitude = latitude;
		data.longitude = longitude;
		// --------------------------------------------
		
		continua( data );
	}
	
	
	function continua( data ) {
		
	    $.ajax({
	        url: '/phoenix/userdetails?ip=' + data.ip,
	        dataType: 'json',
	        success: function (user, textstatus) {
	        	globalUser = user;
	        	globalUser.data = data;
	        	
	        	getLocation( data );
	        	
	        	startMap();
	        	initAirTraffic();
	        	initUserLayer();
	        	initDraw();

	        	// TESTE
	        	setTimeout(function(){
	        		fakeDrone(); 
	        	}, 10000);        	
	        	// -----------------
	        	
	        	/*
	        	setInterval(function(){
	        		updateTransit();
	        	}, 5000);
	        	*/
	        	
	        }
	    });
		
	};
	
	function falhouIp() {
		
		$.notify({
			title : '',
			message: 'Algo deu errado ao determinar seu IP.' 
		},{
			type: 'danger',
			delay : 3000,
			animate: {
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutUp'
			}			
		}); 
		
	};
	
	function metodo2( data ) {
		console.log('Metodo 2');
		console.log( data );
		
		// Modo http://ipinfo.io  ---------------------
		var location = data.loc.split(",");
		var latitude = parseFloat( location[0] );
		var longitude = parseFloat( location[1] )
		data.latitude = latitude;
		data.longitude = longitude;
		// --------------------------------------------
		
		continua( data );		
		
		
	}
	
	/*
	$.getJSON('https://ipapi.co/json/', function(data) {
		  console.log(JSON.stringify(data, null, 2));
	});
	
	{
	  "ip": "116.12.250.1",
	  "city": "Singapore",
	  "region": "Central Singapore Community Development Council",
	  "country": "SG",
	  "country_name": "Singapore",
	  "postal": null,
	  "latitude": 1.2855,
	  "longitude": 103.8565,
	  "timezone": "Asia/Singapore"
	}		
		
	*/
	
	
	
	/*
	 
	$.getJSON('http://ipinfo.io', function(data){
	
	}  
	  
	{
	  "ip": "116.12.250.1",
	  "hostname": "No Hostname",
	  "city": "Singapore",
	  "region": "Central Singapore Community Development Council",
	  "country": "SG",
	  "loc": "1.2931,103.8558",
	  "org": "AS3758 SingNet"
	}	
	
	*/
	
	
	
	$.getJSON('http://ipinfo.io', function(data){
		
		if( data ) {
			metodo2( data );
		} else {
			metodo1( data );
		}
		
	}).fail( function(jqXHR, textStatus, errorThrown) { 
		
		$.getJSON('https://ipapi.co/json/', function(data){
			if( data ) {
				metodo2( data );
			} else {
				falhouIp();
			}
		}).fail( function(jqXHR, textStatus, errorThrown) { 
			falhouIp();
		});
		
	});
	
}

function drawFireArea() {
	if( drawing ) {
		dispose();
	} else {
		startDrawing();
	}
}


function niy() {
	
	$.notify({
		title : '',
		message: 'Não Implementado Ainda' 
	},{
		type: 'success',
		delay : 3000,
		animate: {
			enter: 'animated fadeInRight',
			exit: 'animated fadeOutUp'
		}			
	});    	
	
}


//var x = document.getElementById("demo");
function getLocation( theData ) {
	
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};	
	
	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( showPosition , 
    		function() {
        		
        		
        		initCheck( [theData.latitude, theData.longitude] );
        	
	    		$.notify({
	    			title : '',
	    			message: 'Erro ao descobrir sua localização. Usando Posição de teste.' 
	    		},{
	    			type: 'danger',
	    			delay : 3000,
	    			animate: {
	    				enter: 'animated fadeInRight',
	    				exit: 'animated fadeOutUp'
	    			}			
	    		});        	
        	
    		}, options 
        );
    } else {
    	//
    }
}

function showPosition(position) {
	initCheck( [position.coords.latitude, position.coords.longitude] );
}

function initCheck( position ) {
	
	$.notify({
		title : '',
		message: 'Avisando sua presença ao sistema.' 
	},{
		type: 'success',
		delay : 3000,
		animate: {
			enter: 'animated fadeInRight',
			exit: 'animated fadeOutUp'
		}			
	});        	
	
	
	
	// Envia sua presença para a rede
	var consumer = {};
	consumer.position = position; 
	consumer.user = globalUser;
	
	if( globalUser.roleName === 'ROLE_ADMIN' ) {
		stompClient.send( "/phoenix/notify.admin", {}, JSON.stringify( consumer ) );
	}
	if( globalUser.roleName === 'ROLE_FIREMAN' ) {
		stompClient.send( "/phoenix/notify.fireman", {}, JSON.stringify( consumer ) );	
	}
	if( globalUser.roleName === 'ROLE_USER' ) {
		stompClient.send( "/phoenix/notify.user", {}, JSON.stringify( consumer ) );	
	}
	
}

$( document ).ready(function() {
	//$("#contentWraper").append('<div id="world-map" style="position:absolute; top:0px;left:0px;width:100%;height:100%;"></div>');
	connect();
});

function todayDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = dd + '/' + mm + '/' + yyyy;
	return today;
}

function todayDateSQL() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = yyyy + '-' + mm + '-' + dd;
	return today;
}


function mesPassadoDate() {
	var today = new Date();
	today.setMonth(today.getMonth() - 1);
	
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 

	today = dd + '/' + mm + '/' + yyyy;
	return today;
}

// ------------------------ TESTE -------------------------------------------------------------------------

function fakeDrone() {
	var data = {};
	data.position = [39.614,-6.954];
	data.user = {name: "ASD-786G", email: "drone", fullName: "ASD-786G", roleName: "ROLE_DRONE"};
	
	var item = addUserToMap( data );
	
	setInterval(function(){ 
		var modifiedCoordinate = item.getGeometry().getCoordinates();
		modifiedCoordinate[1] = modifiedCoordinate[1] + 200;
		item.getGeometry().setCoordinates( modifiedCoordinate );
	}, 500);
	
	
}











