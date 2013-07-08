'use strict';

var api = 'http://api.dronestre.am/data?callback=JSON_CALLBACK';
$app.controller('HomeCrtl', function ($scope, $http, plus) {
  // defaulting the time on Angular's model variable.
  $scope.years = [];
  $http.jsonp(api).then(function(rtn){
  	//console.log(data);

  	// create a map in the "map" div, set the view to a given place and zoom
  	var map = L.map('leaflet').setView([0,0], 2);

  	// add an OpenStreetMap tile layer

  	L.tileLayer('http://b.tiles.mapbox.com/v3/cgallarno.map-w9y9v7ju/{z}/{x}/{y}.png', {
  		retina : true
  	}).addTo(map);

  	_.each(rtn.data.strike, function(val, key){
  		//console.log(val.date);

  		//year = val.date.split('-');
  		var year = val.date.split('-')[0];
  		$scope.years.push(year);
  		_.uniq($scope.years);
  		
  		var marker = L.circleMarker([val.lat, val.lon], {
  			stroke : false,
  			fillOpacity : 0.6,
  			fillColor : (val.children)?'#D24858':'#EAB05E',
  		}).setRadius(3 + ((_.isUndefined(val.deaths_max)?1:val.deaths_max) * 0.5)).bindPopup(val.bij_summary_short).addTo(map);


  		//L.CircleMarker( [val.lat, val.lon] ).setRadius(5).addTo(map);
  	});

  	console.log($scope.years);


  	// add a marker in the given location, attach some popup content to it and open the popup
  	// L.marker([51.5, -0.09]).addTo(map)
  	//     .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
  	//     .openPopup();

  	$scope.strikes = rtn.data.strike;
  });

   $scope.leaflet = {
    defaults: {
      retina : true
    },
    center: {lat :0, lng:0},
    markers : {}
  };
  
});
