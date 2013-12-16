'use strict';

//this is the controller that handles events, it may contain a :search routeparam to have a query already
angular.module('CityEventHub')
.controller('EventsCtrl',['$scope','Users','Events','$routeParams','$rootScope',function($scope, Users, Events, $routeParams,$rootScope) {
	
	$scope.events = Events.query();
	$rootScope.activeTab = 1;
	if($routeParams['search']){
		$scope.searchString = $routeParams['search'];
	}

	$scope.saveProfile = function(){
		//$scope.users.$update();
	};


	$scope.tags = [{
		"name": "Party",
		"isChecked": false
	},
	{
		"name": "Garage Sale",
		"isChecked": false
	},
	{
		"name": "City",
		"isChecked": false
	},
	{
		"name": "Community",
		"isChecked": false
	}];

	$scope.sendToEventPage = function(event){
		window.location.href = 'event/' + event._id;
	};

}]);