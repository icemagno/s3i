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


function connect() {
    var socket = new SockJS('/phoenix/ws');
    stompClient = Stomp.over(socket);
    
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
		source: new ol.source.OSM()
	});
	osmLayer.setVisible( true );
	/* ------------ */

	osmLayer.set('layerName', 'osmLayer');

	theMap = new ol.Map({
		layers: [ osmLayer ],
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
		    		$("#droneCam").show(100);
		    		$("#droneCamTitle").text( '[Drone] ' + props.fullName );
		    	}
		    	
	    		// Um usuário comum ?
		    	if( props.roleName === 'ROLE_USER' ) {
		    		console.log( "Camera no IP " + props.remoteAddress );
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
	
	startEffis( mesPassadoDate(), todayDate() ) 
	
}


function initSystem() {
	console.log("initSystem");
	
	$.getJSON('http://ipinfo.io', function(data){
		
			if( data ) {
		
				console.log(" > IP : " + data.ip );
			
			    $.ajax({
			        url: '/phoenix/userdetails?ip=' + data.ip,
			        dataType: 'json',
			        success: function (user, textstatus) {
			        	globalUser = user;
			        	globalUser.data = data;
			        	
			        	getLocation( data );
			        	
			        	startMap();
			        	//initAirTraffic();
			        	initUserLayer();
			        	//initDraw();
		
			        	/*
			        	setInterval(function(){
			        		updateTransit();
			        	}, 5000);
			        	*/
			        	
			        }
			    });
		
			} else {
				
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
				
			}		
	});
	
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
        		
        		var location = theData.loc.split(",");
        	
        		initCheck( [parseFloat( location[0] ), parseFloat( location[1] )] );
        	
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
	
	stompClient.send( "/phoenix/notify.user", {}, JSON.stringify( consumer ) );	
	
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










