'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope','$route','$rootScope'
			  ,function($scope,  $route,$rootScope) {

	$scope.home = {"url":"/"}
	$scope.changeActiveTab = function(num){
		$rootScope.activeTab = num;
	}
	$rootScope.activeTab = 0;
	$scope.user = {"id":1}
	$scope.links = [{"text":"Find Events","url":"events/","number":1},
	{"text":"Create an Event","url":"event/","number":2}]
	
}]);