var stompClient = null;
var theMap = null;
var theView = null;
var globalUser = null;

/* --------  Camadas ----------- */
var osmLayer = null;
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

		stompClient.subscribe('/phoenix/queue/citizen', function(notification) {
			processCitizen( JSON.parse( notification.body ) );
		});
		
		
		initSystem();
		
	});    
    
}

function processCitizen( data ) {
	console.log( data );
}


function processFireman( data ) {
	//addUserToMap( data );
}

function processAdmin( data ) {
	//addUserToMap( data );
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
	
	startEffis( mesPassadoDate(), todayDate() ) 
	
}


function initSystem() {
	
    $.ajax({
        url: '/phoenix/userdetails',
        dataType: 'json',
        success: function (user, textstatus) {
        	globalUser = user;
        	getLocation();
        	startMap();
        }
    });
    
}

function getLocation() {
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};	
	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, 
    		function() {
    	
	    		$.notify({
	    			title : '',
	    			message: 'Erro ao descobrir sua localização' 
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
	stompClient.send( "/phoenix/notify.citizen", {}, JSON.stringify( consumer ) );	
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