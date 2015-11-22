angular.module('myApp').controller('tipModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', 'tip', function ($scope, $uibModalInstance, APIService, ServiceService, tip) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.tip = tip || {};
  $scope.tip.service = ServiceService.currentService.serviceName;

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    console.log($scope.tip);
    APIService.createTip($scope.tip)

    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);