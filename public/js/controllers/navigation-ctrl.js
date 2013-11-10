
angular.module('CEH.controllers', [])
.controller('NavCtrl',['$scope','$location'
			  ,function($scope,  $location) {

	$scope.links = [
					{text:"Home Page", loc: "/"},
					{text:"Sandbox", loc: "/sandbox"},
					{text:"Error Page", loc: "/404"},
				];

	$scope.navigate = function navigatePage(location) {
		$location.path(location);
	};
	
}]);