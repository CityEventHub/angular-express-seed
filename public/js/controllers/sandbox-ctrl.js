'use strict';


angular.module('CityEventHub')
.controller('SandboxCtrl',['$scope','Names'
				  ,function($scope,  Names) {

	$scope.names = Names.query();
	$scope.newName = {name: ""};

	$scope.addName  = function() {
		Names.save($scope.newName,function(success) {
			$scope.names.push(success);
			$scope.newName.name = "";
		});
	}

	$scope.updateName = function(name) {
		name.$update();
	}

	$scope.deleteName = function(name) {
		name.$delete();
		$scope.names.splice($scope.names.indexOf(name),1);
	}
	
}]);