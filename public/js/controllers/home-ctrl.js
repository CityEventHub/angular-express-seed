'use strict';


angular.module('CityEventHub')
.controller('HomeCtrl',['$scope','$route','$location'
			  ,function($scope,  $route,$location) {

	$scope.goToEvents = function(){
		$location.path('/events/' + $scope.searchBox);
	}
	
}]);