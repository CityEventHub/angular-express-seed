'use strict';


angular.module('CityEventHub')
.factory('Events', function($resource) {
	return $resource('/api/events/:eventid', {eventid: '@_id'});
});