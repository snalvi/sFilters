'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['APIService', '$scope', function(APIService, $scope) {
	APIService.getServices().then(function(data) {
		$scope.services = data;
	});

	console.log('services are: ', $scope.services);
	console.log('main control');
}]);