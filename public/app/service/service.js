'use strict';

angular.module('myApp.service', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/service', {
    templateUrl: 'app/service/service.html',
    controller: 'ServiceCtrl'
  });
}])

.controller('ServiceCtrl', ['APIService', 'ServiceService', '$scope', '$location', function(APIService, ServiceService, $scope, $location) {

	$scope.service = ServiceService.currentService;

	console.log('service control');
}]);