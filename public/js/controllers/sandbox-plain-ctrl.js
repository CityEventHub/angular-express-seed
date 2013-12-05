'use strict';

angular.module('CityEventHub')
.controller('SandboxPlainCtrl',['$scope','Names',
				  		function($scope,  Names) {

	// initlize variables
	var names = {};
	names.savedNames = Names.query(); // get all names
	names.newName = "";

	function addName() {
		// put the text into a name object
		var name = {name: names.newName};

		// save the new name
		Names.save(name, function success(result) {
			
			// If saving worked, reset the name field, copy the result back to the obj and add it to our array
			names.newName = "";
			angular.copy(result, name);
			names.savedNames.push(name);
			
		});
	}

	function updateName(name) {
		// update the name. this automagically works, and copies the server result back
		name.$update();
	}

	function deleteName(name) {
		// delete the name.
		name.$delete(function success() {
			// if deleting worked, remove it from our array via slicing
			names.savedNames.splice(names.savedNames.indexOf(name),1);	
		
		});
	}

	function updateAll() {
		// update all names.
		Names.update(names.savedNames);
	}

	function deleteAll() {
		// delete all names
		Names.delete();
	}

	// export models to the scope
	$scope['names'] = names;

	// export functions to the scope
	$scope['addName'] = addName;
	$scope['updateName'] = updateName;
	$scope['deleteName'] = deleteName;
	$scope['updateAll'] = updateAll;
	$scope['deleteAll'] = deleteAll;
	
}]);