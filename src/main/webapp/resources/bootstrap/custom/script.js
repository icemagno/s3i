var REST_SOURCE_URL = 'http://localhost:8080/geoportal';


function getConfig() {
	
    $.ajax({
        url: '/v1/getconfig',
        dataType: 'json',
        success: function (obj, textstatus) {
        	
    		console.log( obj );
        	
        	
        }
    
    });
	
}

function initMap() {
	
    var osm = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://osm.casnav.mb/osmope/wms',
          params: {
        	  'LAYERS': 'osm:paises,osm:RelevoCN',
        	  'tiled' : true,
        	  
          },
        })
	});	
	


 
    var openSeaMapLayer = new ol.layer.Tile({
        source: new ol.source.OSM({
          opaque: false,
          url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'
        })
	});    

    
    var map = new ol.Map({
        layers: [ 
			new ol.layer.Tile({
				source: new ol.source.OSM()
			}),
			openSeaMapLayer
        ],
        target: 'world-map',
        view: new ol.View({
    		center: [-43.187945, -22.916423],
    		projection: 'EPSG:4326',
    		zoom: 5,
    		
        })    
    });	
    
    
    //var ol3d = new olcs.OLCesium({map: map});
    //var scene = ol3d.getCesiumScene();
    // ol3d.setEnabled(true);

    
    /*
    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/world',
	    requestWaterMask : false, 
	    requestVertexNormals : false	
    });
    scene.terrainProvider = terrainProvider;
    */
    //scene.globe.depthTestAgainstTerrain = true;  
    
    
  
    
}

/*
function addRow() {
	$('#layerManager tr:last').after('<tr><td><span class="pointer glyphicon glyphicon-move"></span></td><td layer="dddd" class="tdData">55 Antony</td></tr>');
}
*/

function initManager() {
	$('.table-sortable tbody').sortable({
		handle: 'span'
	}).on('sortupdate', function( e, ui ) {
		console.log( ui.item.index() + " --> " + ui.item.children('td.tdData').attr('layer') );
	});
	
	$('#layerManager td').css('color','white');
	$('.tdData').css('width','95%');
}

function initSystem() {
	
	$.ajaxSetup({
	    timeout: 2000 
	});	
	
	$(document).ajaxStart(function () {
		Pace.restart();
	});
}


initSystem();
getConfig();
initMap();
initManager();

