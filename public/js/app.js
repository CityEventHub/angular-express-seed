'use strict';


// Declare app level module which depends on filters, and services
angular.module('CityEventHub', ['ngRoute','ngResource'])
.config(['$routeProvider','$locationProvider','$provide'
,function($routeProvider,  $locationProvider,  $provide) {

	$routeProvider.when('/', {
		templateUrl: '/page/homepage'
	});

	$routeProvider.when('/sandbox', {
		templateUrl: '/page/sandbox',
		controller: 'SandboxCtrl'
	});
	
	$routeProvider.otherwise( {
		templateUrl: '/partials/404'
	});
	
	$locationProvider.html5Mode(true);


	/////
	// modify the $resource factory to return instances that have PUT defined as update,
	// also fix POST so that it doesn't use the paramDefaults
	var count = 0;
	$provide.decorator('$resource',['$delegate',function($delegate) {
		return function addUpdateMethod(url, paramDefaults, actions) {
			// add update PUT method to $resource
			actions = angular.extend({}, {update: {method: "PUT"}}, actions);
			return $delegate(url, paramDefaults, actions);
		};
	}]);
}]);