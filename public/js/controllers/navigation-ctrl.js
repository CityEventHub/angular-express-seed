'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope','$route'
			  ,function($scope,  $route) {

	$scope.home = {"url":"/"}
	$scope.changeActiveTab = function(num){
		$scope.linknumber = num;
	}

	$scope.user = {"id":1}
	$scope.linknumber = 0;
	$scope.links = [{"text":"Find Events","url":"events/","number":1},
	{"text":"Create an Event","url":"event/","number":2}]
	
}]);