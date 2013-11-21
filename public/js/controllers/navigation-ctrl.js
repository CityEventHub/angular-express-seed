'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope','$route'
			  ,function($scope,  $route) {

	var links = [];

	angular.forEach($route.routes, function(route,routeName) {
		if(route.tabName)
			links.push({text:route.tabName, url: routeName});
	});

	// expose models and functions to the scope
	$scope['links'] = links;
	
}]);