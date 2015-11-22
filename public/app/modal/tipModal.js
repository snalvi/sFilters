angular.module('myApp').controller('tipModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.model = {};

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    console.log($scope.model);
    APIService.createTip($scope.model)

    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);