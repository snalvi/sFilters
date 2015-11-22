'use strict';

angular.module('myApp.tip', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tip', {
    templateUrl: 'app/tip/tip.html',
    controller: 'TipCtrl'
  });
}])

.controller('TipCtrl', ['APIService', 'ServiceService', '$scope', '$location', '$uibModal', function(APIService, ServiceService, $scope, $location, $uibModal) {
    $scope.service = ServiceService.currentService;
    updateServiceList();


    console.log('tip control');

    $scope.createTip = function() {
        $scope.items = ['item1', 'item2', 'item3'];

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'tipModal.html',
            controller: 'tipModalController',
            size: "sm",
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

    function updateServiceList() {
        APIService.getTips().then(function(data) {
            $scope.tips = data.data;
        });
    }
}]);