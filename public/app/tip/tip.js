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
    updateTipList();


    console.log('tip control');

    $scope.createTip = function(tip) {
        $scope.items = ['item1', 'item2', 'item3'];


        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'tipModal.html',
            controller: 'tipModalController',
            size: "sm",
            resolve: {
                items: function () {
                    return $scope.items;
                },
                tip: tip
            }
        });
    };

    function updateTipList() {
        var serviceToFilter = ServiceService.currentService.serviceName;
        APIService.getTips().then(function(data) {
            var list = [];
            _.each(data.data, function(v,k) { 
                v.key = k; 
                list.push(v) 
            });

            $scope.tips = _.filter(list, function(s){
                return s.service.toLowerCase() == serviceToFilter.toLowerCase();
            });

        });
    }
}]);