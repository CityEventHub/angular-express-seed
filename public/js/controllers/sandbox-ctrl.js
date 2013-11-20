'use strict';


angular.module('CityEventHub')
.controller('SandboxCtrl',['$scope','Names'
				  ,function($scope,  Names) {

	var names = {initializing: true, enabled: false};
	names.savedNames = Names.query(function success(savedNames) {
		names.initializing = false;
		names.enabled = true;
		for (var i = savedNames.length - 1; i >= 0; i--)
			savedNames[i].enabled = true;

	}, errorFn(names));

	names.newName = "";
	names.decoration = function decorations(name) {
		return {
			deleting: name.deleting,
			creating: name.creating,
			updating: name.updating,
			error: name.error
		};
	};
	
	function addName() {

		var name = {name: names.newName};
		names.savedNames.push(name);
		name.creating = true;
		name.enabled = false;
		Names.save(name, function success(result) {
			names.newName = "";
			angular.copy(result, name);
			name.enabled = true;
			name.creating = false;
		}, errorFn(name));
	}

	function updateName(name) {
		name.updating = true;
		name.enabled = false;
		name.$update(function success() {
			name.enabled = true;
			name.updating = false;
		}, errorFn(name));
	}

	function deleteName(name) {
		name.deleting = true;
		name.enabled = false;
		name.$delete(function success() {
			names.savedNames.splice(names.savedNames.indexOf(name),1);	
		
		}, errorFn(name));
	}

	function updateAll() {
		names.enabled = false;
		Names.update(names.savedNames, function success() {
			names.enabled = true;
		
		}, errorFn(names));
	}

	function deleteAll() {
		names.enabled = false;
		Names.delete(function success() {
			names.enabled = true;
			names.savedNames = [];
		
		}, errorFn(names));
	}

	function errorFn(obj) {
		return function error(err) {
			delete obj.initializing;
			delete obj.creating;
			delete obj.updating;
			delete obj.deleting;
			obj.error = err.data;
		}
	}

	// expose models and functions to the scope
	$scope['names'] = names;
	$scope['addName'] = addName;
	$scope['updateName'] = updateName;
	$scope['deleteName'] = deleteName;
	$scope['updateAll'] = updateAll;
	$scope['deleteAll'] = deleteAll;
	
}]);