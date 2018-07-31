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