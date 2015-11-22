'use strict';

angular.module('myApp.service', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/service', {
    templateUrl: 'app/service/service.html',
    controller: 'ServiceCtrl'
  });
}])

.controller('ServiceCtrl', ['APIService', 'ServiceService', '$scope', '$location', '$uibModal', function(APIService, ServiceService, $scope, $location, $uibModal) {
	$scope.service = ServiceService.currentService;

	console.log('service control');

    $scope.broadcastMessage = function() {
        $scope.items = ['item1', 'item2', 'item3'];

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'broadcastModal.html',
            controller: 'broadcastMessageModalController',
            size: "sm",
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

    $scope.unicastMessage = function() {
        $scope.items = ['item1', 'item2', 'item3'];

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'unicastModal.html',
            controller: 'unicastMessageModalController',
            size: "sm",
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

    // $scope.unicastMessage = function() {
    //     $scope.items = ['item1', 'item2', 'item3'];

    //     var modalInstance = $uibModal.open({
    //         animation: false,
    //         templateUrl: 'createServiceModal.html',
    //         controller: 'ModalInstanceCtrl',
    //         size: "sm",
    //         resolve: {
    //             items: function () {
    //                 return $scope.items;
    //             }
    //         }
    //     });
    // };

    // $scope.manageTips = function() {
    //     $scope.items = ['item1', 'item2', 'item3'];

    //     var modalInstance = $uibModal.open({
    //         animation: false,
    //         templateUrl: 'createServiceModal.html',
    //         controller: 'ModalInstanceCtrl',
    //         size: "sm",
    //         resolve: {
    //             items: function () {
    //                 return $scope.items;
    //             }
    //         }
    //     });
    // };
}]);