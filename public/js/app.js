'use strict';


// Declare app level module which depends on filters, and services
angular.module('CityEventHub', ['ngRoute','ngResource'])
.config(['$routeProvider','$locationProvider','$provide'
,function($routeProvider,  $locationProvider,  $provide) {

	$routeProvider.when('/', {
		templateUrl: '/views/pages/homepage.html',
		controller: 'HomeCtrl',
		tabName: "Homepage"

	}).when('/sandbox-plain', {
		templateUrl: '/views/pages/sandbox-plain.html',
		controller: 'SandboxPlainCtrl',
		tabName: "Sandbox Plain"

	}).when('/sandbox', {
		templateUrl: '/views/pages/sandbox.html',
		controller: 'SandboxCtrl',
		tabName: "Sandbox Pretty"

	}).when('/event/:eventid?',{
		templateUrl:'/views/pages/event.html',
		controller: 'EventCtrl',
		tabName: "New Event"

	}).when('/events/:search?',{
		templateUrl:'/views/pages/events.html',
		controller: 'EventsCtrl',
		tabName: "Events"

	}).when('/profile',{
		templateUrl:'/views/pages/profile.html',
		controller: 'ProfileCtrl',
		tabName: "Profile"

	}).otherwise( {
		templateUrl: '/views/partials/404.html',
		tabName: "404"
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
					if(angular.isArray(a1) || angular.isArray(a2))
						return collectionRequest.apply(this,arguments);
					return documentRequest.apply(this,arguments);
				};
			};
			resource['update'] = arrayPatcher(resource['update'], resource['updateCollection']);
			resource['remove'] = resource['delete'] = arrayPatcher(resource['delete'], resource['deleteCollection']);

			return resource;
		};
	}]);
}]);
