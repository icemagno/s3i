var usersSource = null;
var userLayer = null;

function usersStyleFunction( feature, resolution ) {
	var props = feature.getProperties();
	var resultStyles = [];
	var image = 'admin.png';
	
	if ( props.roleName === 'ROLE_FIREMAN') {
		image = 'fireman.png';
	}
	
	if ( props.roleName === 'ROLE_DRONE') {
		image = 'drone.png';
	}
	
	var adminStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			scale : 1,
			anchor: [0.5, 0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'fraction',
			opacity: 1.0,
			src: '/resources/img/' + image,
		})),
	    text: new ol.style.Text({
			font: '10px Consolas',
			textAlign: 'center',
			offsetX: 0,
			offsetY: 20,
			scale : 1,
			textBaseline: 'middle',
			fill: new ol.style.Fill({ color: '#f90404' }),
			stroke: new ol.style.Stroke({
				color: '#FFFFFF', width: 1
			}),
			text: props.fullName,
	    })    			
	});

	resultStyles.push( adminStyle );
	return resultStyles;	
	
}

function addUserToMap( user ) {
	if( globalUser.name == user.user.name ) {
		return;
	}
	
	var projection = theView.getProjection();
	var center = ol.proj.transform( [ user.position[1], user.position[0] ], 'EPSG:4326', projection)
	
	var thing = new ol.geom.Point( center );
	var featurething = new ol.Feature({
	    name: user.name,
	    geometry: thing,
	});
	
	var roleName = user.user.roleName;
	var fullName = user.user.fullName;
	
	featurething.set("email", user.user.email );
	featurething.set("fullName", fullName );
	featurething.set("name", user.user.name );
	featurething.set("roleName", roleName );
	usersSource.addFeature( featurething );
	
	if( roleName === 'ROLE_ADMIN' ) {
		// http://bootstrap-growl.remabledesigns.com
		$.notify({
			// options
			title : '',
			message: 'Administrador ' + fullName + ' está online.' 
		},{
			// settings
			type: 'success',
			delay : 3000,
			animate: {
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutUp'
			}			
		});
	}
	
	if( roleName === 'ROLE_FIREMAN' ) {
		// http://bootstrap-growl.remabledesigns.com
		$.notify({
			// options
			title : '',
			message: 'Unidade ' + fullName + ' está online.' 
		},{
			// settings
			type: 'warning',
			delay : 3000,
			animate: {
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutRight'
			}			
		});
	}

	if( roleName === 'ROLE_DRONE' ) {
		// http://bootstrap-growl.remabledesigns.com
		$.notify({
			// options
			title : '',
			message: 'Drone ' + fullName + ' está online.' 
		},{
			// settings
			type: 'danger',
			delay : 3000,
			animate: {
				enter: 'animated fadeInRight',
				exit: 'animated fadeOutRight'
			}			
		});
	}
	
	return featurething;
}

function deleteUser( userName ) {
	var features = usersSource.getFeatures();
	for ( x=0; x < features.length; x++ ) {
		var feature = features[x];
		usersSource.removeFeature( feature );
	}
}	

function initUserLayer() {
	usersSource = new ol.source.Vector({
		projection: theView.getProjection(),
	});
	
	userLayer = new ol.layer.Vector({
		source: usersSource,
		style: usersStyleFunction
	});	
	userLayer.set('layerName', 'userLayer');
	theMap.addLayer( userLayer );
	
}

