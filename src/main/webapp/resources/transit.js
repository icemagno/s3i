var transitSource = null;
var transitLayer = null; 
var transitEnabled = false;


function updateTransit() {
	if (!transitEnabled) return;
	if ( theMap.getView().getZoom() < 10 ) return;
	var mapSize = theMap.getSize();
	
	var extent = theMap.getView().calculateExtent( mapSize );
	
	var countyLimits= ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
	
	
	var bottomLeft = ol.extent.getBottomLeft( countyLimits );
	var topRight = ol.extent.getTopRight( countyLimits );
	var bbox = bottomLeft + "," + topRight;

	var width = mapSize[0];
	var height = mapSize[1];
	var size = width + "," + height;
	var whatToShow = '10,11,12,14';	
	
	var srid = osmLayer.getSource().getProjection().getCode();
	
	console.log( srid );
	
	// Falta converter o SRID do link...
	
	var imageUrl = "https://utility.arcgis.com/usrsvcs/servers/9209d928f76e4a979adfe04438f21eb4/rest/services/World/Traffic/MapServer/export?dpi=96&transparent=true&layers=show:" + whatToShow + "&bbox=" + bbox + "&bboxSR=4326&imageSR=4326&f=image&size=" + size;
	
	transitSource = new ol.source.ImageStatic({
		url: imageUrl,
		projection: 'EPSG:4326',
		imageExtent: extent
	});

	transitLayer = new ol.layer.Image({
		source: transitSource
	});
	transitLayer.set('layerName', 'transitLayer');
	
}


