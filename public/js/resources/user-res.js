'use strict';

angular.module('CityEventHub')
.factory('User', function($resource) {
	return $resource('/auth/user/:userid', {eventid: '@_id'});
});