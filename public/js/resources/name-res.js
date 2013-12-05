'use strict';


angular.module('CityEventHub')
.factory('Names', function($resource) {
	return $resource('/api/names/:name', {name: '@_id'});
})

.factory('Events', function($resource) {
	return $resource('/api/events/:event', {event: '@_id'});
});