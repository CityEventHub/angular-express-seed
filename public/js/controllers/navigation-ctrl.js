'use strict';


angular.module('CityEventHub')
.controller('NavCtrl',['$scope','$route','$rootScope','User'
			  ,function($scope,  $route,  $rootScope,  User) {

	$scope.home = {"url":"/"}
	$scope.changeActiveTab = function(num){
		$rootScope.activeTab = num;
	}
	$rootScope.activeTab = 0;
	$scope.links = [{"text":"Find Events","url":"events/","number":1},
	{"text":"Create an Event","url":"event/","number":2}]

	if($rootScope.loggedIn == null) {
		$rootScope.loggedIn = -1;
		User.get(function success(user) {
			$rootScope.loggedIn = 1;
			$rootScope.user = user;
		}, function fail() {
			$rootScope.loggedIn = 0;
			$rootScope.user = null;
		});
	}
}]);