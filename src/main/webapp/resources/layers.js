var hidrantesVisible = false;
var osmVisible = false;
var apaVisible = false;
var sateliteVisible = true;

function toggleHidrantes() {
	hidrantesVisible = !hidrantesVisible;
	hidranteLayer.setVisible( hidrantesVisible );	
}

function toggleOsm() {
	osmVisible = !osmVisible;
	osmLayer.setVisible( osmVisible );	
}

function toggleApa() {
	apaVisible = !apaVisible;
	apaLayer.setVisible( apaVisible );	
}