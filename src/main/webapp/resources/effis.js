var effisLayer = null;
var effisSource = null;

function removeEffis() {
	theMap.removeLayer( effisLayer );
	effisLayer = null;
	effisSource = null;
}

function effisStyleFunction( feature, resolution ) {
	var resultStyles = [];
	var props = feature.getProperties();
	var labelText = props.Place;
	
	var effisStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			scale : 1,
			opacity: 1.0,
			src: '/resources/img/fire.png',
		})),
	      text: new ol.style.Text({
	          font: '10px Consolas',
	          textAlign: 'center',
	          offsetX: 0,
	          offsetY: 20,
	          scale : 1,
	          textBaseline: 'middle',
	          fill: new ol.style.Fill({ color: '#e81919' }),
	          stroke: new ol.style.Stroke({
	            color: '#FFFFFF', width: 1
	          }),
	          text: labelText,
	        })   			
	});
	
	resultStyles.push( effisStyle );
	return resultStyles;		
}

function startEffis( fromDate, toDate ) {
	
	if( effisLayer ) removeEffis();
	
	effisSource = new ol.source.Vector({
        url: '/geteffis?fromdate='+fromDate+'&todate='+toDate,
        format: new ol.format.KML({
            extractStyles: false
        }),
        extractStyles: false,
	});
	
	effisLayer = new ol.layer.Vector({
		source: effisSource,
        style : effisStyleFunction
	});	
	
	effisLayer.set('layerName', 'effisLayer');
	theMap.addLayer( effisLayer );
	
	
}