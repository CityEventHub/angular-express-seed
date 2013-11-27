'use strict';

//this is the controller that handles events, it may contain a :search routeparam to have a query already
angular.module('CityEventHub')
.controller('EventsCtrl',['$scope','Names',function($scope,  Names) {


	$scope.events = [{
		"title":"Party!",
		"location":"My place",
		"time":"You know when",
		"description":"Party till we're purple!",
		"rank":100
	},
	{
		"title":"My Other Party!",
		"location":"My secret spot",
		"time":"six freckles past four hairs",
		"description":"VIP party whilst my other party takes place",
		"rank":1
	},
	{
		"title":"cool yard sale",
		"location":"123 s 456 e",
		"time":"all day yo, Saturday",
		"description":"Buy all my stuff! I need to go to college",
		"rank":35
	},
	{
		"title":"pizza party",
		"location":"pizza hut",
		"time":"6:30, on the dot",
		"description":"Eazza pizza!",
		"rank":6
	},
	{
		"title":"Parade on 9th",
		"location":"9th ave",
		"time":"6:00am-10:00am",
		"description":"scary clowns on unicycles, hard candy projectiles, crazy loud bands, scary balloons that look vaguely like childhood memories, crowds and the hot sun, what else could you want on a Saturday?",
		"rank":90
	}];

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


}]);