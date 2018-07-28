var stompClient = null;
var textChanged = false;
var myModule = null;
var theMap = null;

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
	
	var osmLayer = new ol.layer.Tile({
		source: new ol.source.OSM()
	});
	
	theMap = new ol.Map({
		layers: [ osmLayer ],
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
addTeste();




