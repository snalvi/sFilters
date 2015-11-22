angular.module('myApp').controller('unicastMessageModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.unicastMessage = {
    timestamp: Date.now()
  };

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $scope.unicastMessage.service = ServiceService.currentService.serviceName;

    console.log($scope.unicastMessage);
    APIService.unicastMessage($scope.unicastMessage)

    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);