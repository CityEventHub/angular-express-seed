'use strict';


// Declare app level module which depends on filters, and services
angular.module('CEH', ['ngRoute','ngResource','CEH.controllers', 'CEH.filters', 'CEH.services', 'CEH.directives'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {templateUrl: '/page/homepage'});
	$routeProvider.when('/sandbox', {templateUrl: '/page/sandbox'});
	$routeProvider.otherwise({templateUrl: '/partials/404'});
	$locationProvider.html5Mode(true);
}]);