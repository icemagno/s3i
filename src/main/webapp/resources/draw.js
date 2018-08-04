var drawSource = null;
var drawLayer = null;
var drawInteraction = null;
var drawing = false;
var editing = false;
var selectArea = null;

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
	theMap.updateSize();
	
	drawSource = new ol.source.Vector({
		projection: theView.getProjection()
	});

	var polygonStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: makePattern( [217, 83, 79, 1], 10, 10, 10, 1, 1 ),
		}),
	});	
	
	
	var fullBackStyle = new ol.style.Style({
		fill: new ol.style.Fill({
			color: '#f90404',
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

	drawLayer.set('layerName', 'drawLayer');
	theMap.addLayer( drawLayer );

}


function startDrawing() {
	
	drawInteraction = new ol.interaction.Draw({
		source: drawSource,
		type: 'Polygon'
	});
	
	drawInteraction.on('drawstart', function( evt ){
		//
	});
	
	drawInteraction.on('drawend', function( evt ){
		//
	});	
	theMap.addInteraction( drawInteraction );
	drawing = true;
	
}


function dispose() {
	theMap.removeInteraction( drawInteraction );
	drawing = false;
}


