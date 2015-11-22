angular.module('myApp').controller('unicastMessageModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  var currDate = Date.now();
  $scope.unicastMessage = {
    now: currDate,
    time: 0
  };

  $scope.ok = function () {
    $scope.unicastMessage.service = ServiceService.currentService.serviceName;

    console.log($scope.unicastMessage);
    $scope.unicastMessage.timestamp = $scope.unicastMessage.now + $scope.unicastMessage.time * 60000;
    APIService.unicastMessage($scope.unicastMessage)

    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);