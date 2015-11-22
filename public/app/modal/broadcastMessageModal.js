angular.module('myApp').controller('broadcastMessageModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.broadastMessage = {
    timestamp: Date.now()
  };

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $scope.broadastMessage.service = ServiceService.currentService.serviceName;

    console.log($scope.broadastMessage);
    APIService.broadcastMessage($scope.broadastMessage)

    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);