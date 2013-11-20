'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope'
			  ,function($scope) {

	var links = [
		{text:"Home Page", loc: "/"},
		{text:"Sandbox", loc: "/sandbox"},
		{text:"Error Page", loc: "/404"},
	];

	// expose models and functions to the scope
	$scope['links'] = links;
	
}]);