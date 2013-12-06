'use strict';

angular.module('CityEventHub')
.factory('Users', function($resource) {
	return $resource('/api/users/:userid', {eventid: '@_id'});
});