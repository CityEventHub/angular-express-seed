'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope'
			  ,function($scope) {

	$scope.links = [
					{text:"Home Page", loc: "/"},
					{text:"Sandbox", loc: "/sandbox"},
					{text:"Error Page", loc: "/404"},
				];
	
}]);