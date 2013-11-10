'use strict';


angular.module('CityEventHub')
.factory('Names', function($resource) {
	return $resource('/api/names/:name', {name: '@name'});
});