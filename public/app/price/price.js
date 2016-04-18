'use strict';

angular.module('myApp.price', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/price', {
    templateUrl: 'app/price/price.html',
    controller: 'PriceCtrl'
  });
}])

.controller('PriceCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.goToContact = function() {
		$location.path('contact');
	};
}]); 