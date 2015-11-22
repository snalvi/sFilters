angular.module('myApp').controller('unicastMessageModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  var currDate = Date.now();
  $scope.unicastMessage = {
    now: currDate,
    receiver: 0,
    time: 0
  };

  $scope.ok = function () {
    $scope.unicastMessage.service = ServiceService.currentService.serviceName;

    console.log($scope.unicastMessage);
    $scope.unicastMessage.timestamp = $scope.unicastMessage.now + $scope.unicastMessage.time * 60000;
    if ($scope.unicastMessage.receiver == 0) {
      $scope.unicastMessage.phoneNumber = ""; //default it to empty if set to group
    }
    
    APIService.unicastMessage($scope.unicastMessage)

    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);