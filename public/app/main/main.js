'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['APIService', 'ServiceService', '$scope', '$location', '$uibModal', function(APIService, ServiceService, $scope, $location, $uibModal) {
	APIService.getServices().then(function(data) {
		$scope.services = data.data;
	});

	$scope.goToServicePage = function(service) {
		ServiceService.currentService.serviceName = service;
		console.log('service name: ', service);
		$location.path('service');
	};

	$scope.createService = function() {
		$scope.items = ['item1', 'item2', 'item3'];

		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: 'createServiceModal.html',
			controller: 'ModalInstanceCtrl',
			size: "sm",
			resolve: {
			    items: function () {
			      	return $scope.items;
			    }
		  	}
		});
	};
}]);