'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope','$route'
			  ,function($scope,  $route) {

	$scope.home = {"url":"/"}
	$scope.changeActiveTab = function(num){
		$scope.linknumber = num;
	}
	$scope.linknumber = 0;
	$scope.links = [{"text":"Find Events","url":"events/","number":1},
	{"text":"Create an Event","url":"event/","number":2},
	{"text":"Contact Us","url":"/","number":3},
	{"text":"Sign Up","url":"/","number":4},]
	
}]);