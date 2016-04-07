'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['APIService', 'ServiceService', '$scope', '$location', '$uibModal', function(APIService, ServiceService, $scope, $location, $uibModal) {
	$scope.goToServicePage = function(service) {
		ServiceService.currentService.serviceName = service;
		$location.path('service');
	};

	$scope.goToPricing = function() {
		$location.path('price');
	};

	$scope.createService = function() {
		$scope.items = ['item1', 'item2', 'item3'];

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'createServiceModal.html',
			controller: 'createServiceModalController',
			size: "lg",
			resolve: {
			    items: function () {
			      	return $scope.items;
			    }
		  	}
		});

		modalInstance.result.then(function (selectedItem) {
			updateServiceList();
	    }, function () {
	      	console.log("Create service modal cancelled")
	    });
	};
}]); 