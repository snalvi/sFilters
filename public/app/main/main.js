'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['APIService', 'ServiceService', '$scope', '$location', function(APIService, ServiceService, $scope, $location) {
	APIService.getServices().then(function(data) {
		$scope.services = data.data;
	});

	$scope.goToServicePage = function(service) {
		ServiceService.currentService.serviceName = service;
		$location.path('push');
	};

	console.log('main control');
}]);