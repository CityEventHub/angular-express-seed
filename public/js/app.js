'use strict';


// Declare app level module which depends on filters, and services
angular.module('CEH', ['ngRoute','ngResource','CEH.controllers', 'CEH.filters', 'CEH.services', 'CEH.directives'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {templateUrl: 'partials/homepage', controller: 'AppCtrl'});
	$routeProvider.when('/404', {templateUrl: 'partials/404'});
	$routeProvider.otherwise({redirectTo: '/404'});
	$locationProvider.html5Mode(true);
}]);