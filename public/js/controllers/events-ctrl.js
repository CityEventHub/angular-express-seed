'use strict';

//this is the controller that handles events, it may contain a :search routeparam to have a query already
angular.module('CityEventHub')
.controller('EventsCtrl',['$scope','Users','Events','$routeParams','$rootScope',function($scope, Users, Events, $routeParams,$rootScope) {
	
	Events.query(function success(data) {
		$scope.events = data;
		$scope.putEventsOnMap();
	});

	$rootScope.activeTab = 1;
	if($routeParams['search']){
		$scope.searchString = $routeParams['search'];
	}

	$scope.saveProfile = function(){
		//$scope.users.$update();
	};

	$scope.futureEvent = function(eventDate){
		console.log(new Date(eventDate), new Date());
		if(new Date(eventDate) >= new Date())
			return true;
		return false;
	}


	// $rootScopeope.tags = [{
	// 	"name": "Party",
	// 	"isChecked": false
	// },
	// {
	// 	"name": "Garage Sale",
	// 	"isChecked": false
	// },
	// {
	// 	"name": "City",
	// 	"isChecked": false
	// },
	// {
	// 	"name": "Community",
	// 	"isChecked": false
	// }];

	$scope.sendToEventPage = function(event){
		window.location.href = 'event/' + event._id;
	};

	var map;
	var geocoder;
	var geocodeMap = [];

	$scope.putEventsOnMap = function() {
		for(var i = 0;i<$scope.events.length;i++){
			(function(index) {
				geocoder.geocode( { 'address': $scope.events[index].location}, function(results, status) {
			      if (status == google.maps.GeocoderStatus.OK) {

			      	var contentString = 
			      	'<div id="content">'+
					      '<h4 id="firstHeading" class="firstHeading">'+$scope.events[index].title+'</h4>'+
					      '<div id="bodyContent">'+
					      	'<p>'+$scope.events[index].description+'</p>'+
					      '</div>'+
				      '</div>';
			        var infowindow = new google.maps.InfoWindow({
					      content: contentString
					  });
			        if(index==0)
			        	map.setCenter(results[0].geometry.location);
			        var marker = new google.maps.Marker({
			            map: map,
			            position: results[0].geometry.location,
			            title:$scope.events[index].title
			        });
			        google.maps.event.addListener(marker, 'click', function() {
					    infowindow.open(map,marker);
					});
			      }
			    },function(status){
			    	console.log("Error",status);
			    });
			})(i);
        }
	}

	$scope.initMaps  = function() {

	    geocoder = new google.maps.Geocoder();
	    var mapOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 13
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
		geocoder.geocode( { 'address': "Provo,Ut"}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	      	map.setCenter(results[0].geometry.location);
	      } 
	      else {
	        alert("Geocode was not successful for the following reason: " + status);
	      }
	    });
    }

    $scope.initMaps();

}]);