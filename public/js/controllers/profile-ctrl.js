'use strict';

//this is the controller that handles profiles, it will contain a :id routeparam to get the profile
angular.module('CityEventHub')
.controller('ProfileCtrl',['$scope','Names','Events',function($scope,  Names, Events) {

	// $scope.myEvents2 = Events.Query();
	// $scope.myUpcomingEvents2 = Events.Query();
	// console.log($scope.myEvents2);


	$scope.myEvents = [{
		"id":"1001",
		"title":"Party!",
		"location":"My place",
		"time":"You know when",
		"description":"Party till we're purple!",
		"rank":100
	},
	{
		"id":"1002",
		"title":"My Other Party!",
		"location":"My secret spot",
		"time":"six freckles past four hairs",
		"description":"VIP party whilst my other party takes place",
		"rank":1
	}];

	$scope.myUpcomingEvents = [{
		"id":"1003",
		"title":"cool yard sale",
		"location":"123 s 456 e",
		"time":"all day yo, Saturday",
		"description":"Buy all my stuff! I need to go to college",
		"rank":35
	},
	{
		"id":"1004",
		"title":"pizza party",
		"location":"pizza hut",
		"time":"6:30, on the dot",
		"description":"Eazza pizza!",
		"rank":6
	},
	{
		"id":"1005",
		"title":"Parade on 9th",
		"location":"9th ave",
		"time":"6:00am-10:00am",
		"description":"scary clowns on unicycles, hard candy projectiles, crazy loud bands, scary balloons that look vaguely like childhood memories, crowds and the hot sun, what else could you want on a Saturday?",
		"rank":90
	}];

	$scope.sendToEventPage = function(event){
		window.location.href = 'event/' + event.id;
	};


	//get profile

	//get person's events

	//get person's upcoming events


}]);