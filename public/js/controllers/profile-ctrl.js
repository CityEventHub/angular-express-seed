'use strict';

//this is the controller that handles profiles, it will contain a :id routeparam to get the profile
angular.module('CityEventHub')
.controller('ProfileCtrl',['$scope','User','Events','$rootScope',function($scope,  User, Events,$rootScope) {

	console.log($scope.user);
	$rootScope.activeTab = 3;
	$scope.updateProfile = function(){
		$scope.user.update();
	};

	$scope.futureEvent = function(eventDate){
		if(new Date(eventDate) >= new Date())
			return true;
		return false;
	};

	$scope.sendToEventPage = function(event){
		window.location.href = 'event/' + event.id;
	};

}]);