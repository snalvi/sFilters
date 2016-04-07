'use strict';

angular.module('myApp.price', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/price', {
    templateUrl: 'app/price/price.html',
    controller: 'PriceCtrl'
  });
}])

.controller('PriceCtrl', ['APIService', 'ServiceService', '$scope', '$location', '$uibModal', function(APIService, ServiceService, $scope, $location, $uibModal) {

}]); 