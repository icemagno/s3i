var weatherEnabled = false;

var wKmImages = [];
var wKmImageIndex = 0;

var wVisualImages = [];
var wVisualImageIndex = 0;

var ano = "2018";
var mes = "08";
var dia = "06";

function initWeatherVisual() {
	// 
	for(x=0; x < 25; x++  ){
		var hora = ("0" + x).slice(-2);
		var url = "http://meteocentre.com/satellite/europe/europe_vis."+hora+".gif?t=" + Date.now();
		var dateHuman = dia + "/" + mes + "/" + ano + " " + hora + ":00";

		var obj2 = {};
		//obj2.url = "https://en.sat24.com/image?type=visual&region=eu&timestamp="+timestampM;
		obj2.url = url;
		obj2.dateTime = dateHuman;
		obj2.ok = false;
		wVisualImages.push( obj2 );			
		
	}
}


function initWeatherKm() {
	for( var hora = 0; hora < 24; hora++ ) {
		var fHora = ("0" + hora).slice(-2);
		var timestamp = ano+mes+dia+fHora;
		
		for( var minuto = 0; minuto < 60; minuto = minuto + 15 ) {
			var minutoTrail = ("0" + minuto).slice(-2);
			var timestampM = timestamp + minutoTrail;
			var dateHuman = dia + "/" + mes + "/" + ano + " " + fHora + ":" + minutoTrail;
			
			var obj = {};
			obj.url = "https://en.sat24.com/image?type=km&region=sp&timestamp="+timestampM;
			obj.dateTime = dateHuman;
			obj.ok = false;
			wKmImages.push( obj );
		}
		
	}
	
	
	
}

function preload( arrayOfImages ) {
	
	for( var x = 0; x < arrayOfImages.length; x++ ) {
		var obj = arrayOfImages[x];
		
    	var url = obj.url;
    	var img = new Image();
	    img.onload = function() {
	    	obj.ok = true;
	    }
	    img.onerror = function() {
	    	obj.ok = false;
	    }
	    img.src = url;
	}
	
    weatherEnabled = true;
}

function updateWeatherKm() {
	if( !weatherEnabled ) return; 
	
	var imageKmUrl = wKmImages[ wKmImageIndex ].url;
	var imageKmDate = wKmImages[ wKmImageIndex ].dateTime;

	wKmImageIndex++;
	if( wKmImageIndex == wKmImages.length ) wKmImageIndex = 0;
	
	//if( wKmImages[ wKmImageIndex ].ok ) {
		$( "#wKmImage" ).attr("src", imageKmUrl );
		$( "#titleKm" ).text( imageKmDate );
	//}
	
}


function updateWeatherVisual() {
	if( !weatherEnabled ) return; 
	
	var imageVisUrl = wVisualImages[ wVisualImageIndex ].url;
	var imageVisDate = wVisualImages[ wVisualImageIndex ].dateTime;

	wVisualImageIndex++;
	if( wVisualImageIndex == wVisualImages.length ) wVisualImageIndex = 0;
	
	console.log( wVisualImages[ wVisualImageIndex ].ok );
	
	//if( wVisualImages[ wVisualImageIndex ].ok ) {
		$( "#wVisImage" ).attr("src", imageVisUrl );
		$( "#titleVisual" ).text( imageVisDate );
	//}
	
}



initWeatherKm();
initWeatherVisual()

preload( wKmImages );
preload( wVisualImages );

setInterval( function() { 
	updateWeatherKm();
}, 1000);	

setInterval( function() { 
	updateWeatherVisual();
}, 1000);	


