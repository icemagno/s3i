var drawSource = null;
var drawVector = null;
var drawInteraction = null;

function makePattern (color, ptrHDist, ptrVDist, ptrLength, ptrHeight, ptrWidth) {
	var newColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
	var cnv = document.createElement('canvas');
	var ctx = cnv.getContext('2d');
	cnv.width = ptrHDist;
	cnv.height = ptrVDist;
	ctx.globalAlpha = color[3];
	ctx.fillStyle = newColor;
	for (var i = 0; i < ptrLength; ++i) {
		ctx.fillRect(i, i, ptrWidth, ptrHeight);
	}
	return ctx.createPattern(cnv, 'repeat');
}


function initDraw() {
	drawSource = new ol.source.Vector();

	var polygonStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: makePattern( [217, 83, 79, 1], 10, 10, 10, 1, 1 ),
		}),
	});	
	
	
	var lightStroke = new ol.style.Style({
		  stroke: new ol.style.Stroke({
		    color: '#f0ad4e',
		    width: 2,
		    lineDash: [4,8],
		    lineDashOffset: 6
		  })
	});

	var darkStroke = new ol.style.Style({
		  stroke: new ol.style.Stroke({
		    color: '#dd4b39',
		    width: 2,
		    lineDash: [4,8]
		  })
	});	
	
	drawLayer = new ol.layer.Vector({
		source: drawSource,
		style: [lightStroke, darkStroke, polygonStyle]
	});
	
	
	drawSource.on('addfeature', function(evt){
		//
	});		

	theMap.addLayer( drawLayer );

	drawInteraction = new ol.interaction.Draw({
		source: drawSource,
		type: 'Polygon'
	});
	
	drawInteraction.on('drawstart', function( evt ){
		//
	});
	
	drawInteraction.on('drawend', function( evt ){
	    var drawedFeature =  evt.feature;
	    console.log( drawedFeature );
	    dispose();
	});	
	
	theMap.addInteraction( drawInteraction );

}

function dispose() {
	theMap.removeInteraction( drawInteraction );
}


