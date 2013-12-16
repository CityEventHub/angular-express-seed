'use strict';

//this is the controller that handles a single event, it will contain a :id routeparam to get the event
angular.module('CityEventHub')
.controller('EventCtrl',['$scope','Events','$routeParams','$rootScope',
				 function($scope,  Events,  $routeParams,$rootScope) {

	// init vars
	$rootScope.activeTab = 2;
	var event = {};
	var mode = {type: "View"};

	// is there an event in the route params?
	if($routeParams['eventid']) {

		// define success/fail functions
		var successFn = function success(data) {};
		var failFn = function fail(error) {
			alert("unable to get event!\n" + error.error);
		};

		// get the event
		event = Events.get(
			{eventid: $routeParams['eventid']},
			successFn,
			failFn
		);

	} else {
		mode.type = "Create";
	}

	function isView(){
		if (mode.type == "View")
			return true;
		else
			return false;
	}

	function toggleEdit(editBool) {
		if (mode.type == "View")
			mode.type = "Edit";
		else if (mode.type == "Edit")
			mode.type = "View";
	}

	function submitChanges() {
		if(mode.type == "Edit")
			event.$update();
		else if(mode.type == "Create")
			Events.save(event, function() {

				alert("Successfully created event!");
				$scope['event'] = {};
			});
	}

	// export vars to $scope
	$scope['event'] = event;
	$scope['mode'] = mode;

	// export functions to $scope
	$scope['toggleEdit'] = toggleEdit;
	$scope['submitChanges'] = submitChanges;
	$scope['isView'] = isView;

}]);