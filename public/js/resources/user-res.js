'use strict';

angular.module('CityEventHub')
.factory('Users', function($resource) {
	return $resource('/api/user/:userid', {eventid: '@_id'});
});