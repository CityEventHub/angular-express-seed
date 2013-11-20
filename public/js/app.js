'use strict';


// Declare app level module which depends on filters, and services
angular.module('CityEventHub', ['ngRoute','ngResource'])
.config(['$routeProvider','$locationProvider','$provide'
,function($routeProvider,  $locationProvider,  $provide) {

	$routeProvider.when('/', {
		templateUrl: '/views/pages/homepage.html'
	});

	$routeProvider.when('/sandbox', {
		templateUrl: '/views/pages/sandbox.html',
		controller: 'SandboxCtrl'
	});
	
	$routeProvider.otherwise( {
		templateUrl: '/views/partials/404.html'
	});
	
	$locationProvider.html5Mode(true);


	/////
	// modify the $resource factory to return instances that have PUT defined as update,
	// also fix PUT for a collection on an array (so that it doesn't throw "Object #b has no method 'push'")
	$provide.decorator('$resource',['$delegate',function($delegate) {
		return function addUpdateMethod(url, paramDefaults, actions) {

			var update = {update: {method: "PUT"},
						  updateCollection: {method: "PUT", isArray: true},
						  deleteCollection: {method: "DELETE", isArray: true}};

			// add update PUT method to $resource
			actions = angular.extend({}, update, actions);
			var resource = $delegate(url, paramDefaults, actions);

			// monkey patch update to automagically change to isArray if passed an array
			var arrayPatcher = function monkeyPatch(documentRequest, collectionRequest) {
				return function wrappedCall(a1,a2,a3,a4) {
					if(!angular.isObject(a1) && !angular.isObject(a2) || angular.isArray(a1) || angular.isArray(a2))
						return collectionRequest(a1,a2,a3,a4);
					return documentRequest(a1,a2,a3,a4);
				};
			};
			resource['update'] = arrayPatcher(resource['update'], resource['updateCollection']);
			resource['remove'] = resource['delete'] = arrayPatcher(resource['delete'], resource['deleteCollection']);

			return resource;
		};
	}]);
}]);