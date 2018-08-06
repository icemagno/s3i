var hidrantesVisible = false;
var osmVisible = true;
var apaVisible = false;
var sateliteVisible = false;

function toggleHidrantes() {
	hidrantesVisible = !hidrantesVisible;
	hidranteLayer.setVisible( hidrantesVisible );	
	$("#hidranteMenuCheck").toggle();
}

function toggleOsm() {
	osmVisible = !osmVisible;
	osmLayer.setVisible( osmVisible );
	$("#osmMenuCheck").toggle();
}

function toggleApa() {
	apaVisible = !apaVisible;
	apaLayer.setVisible( apaVisible );
	$("#apaMenuCheck").toggle();
}

function toggleSatelite() {
	sateliteVisible = !sateliteVisible;
	sateliteLayer.setVisible( sateliteVisible );
	$("#sateliteMenuCheck").toggle();
}


function toggleTransit() {
	
	niy();
	return;
	
	transitEnabled = !transitEnabled;
	if( transitEnabled ) {
		updateTransit();
	}
	$("#transitMenuCheck").toggle();
	
}

