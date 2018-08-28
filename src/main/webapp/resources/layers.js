var hidrantesVisible = false;
var osmVisible = true;
var apaVisible = false;
var sateliteVisible = false;
var effisVisible = false;
var gwisVisible = false;

function toggleGwis() {
	gwisVisible = !gwisVisible;
	gwisLayer.getSource().updateParams( {'TIME': todayDateSQL() } );
	gwisLayer.setVisible( gwisVisible );	
	$("#gwisMenuCheck").toggle();
}

function toggleHidrantes() {
	hidrantesVisible = !hidrantesVisible;
	hidranteLayer.setVisible( hidrantesVisible );	
	$("#hidranteMenuCheck").toggle();
}

function toggleEffis(){
	$("#effisForm").toggle();
	$("#effisMenuCheck").toggle();
	$("#effisDate").text( mesPassadoDate() + " até " + todayDate() );

	
	effisVisible = !effisVisible;
	if( effisVisible) 
		startEffis( mesPassadoDate(), todayDate() ) 
	else
		removeEffis();
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
	/*
	transitEnabled = !transitEnabled;
	if( transitEnabled ) {
		updateTransit();
	}
	$("#transitMenuCheck").toggle();
	*/
}

