angular.module('myApp').controller('createServiceModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.model = {};

  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    console.log($scope.model);
    APIService.createService($scope.model)

    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);


// angular.module('myApp').controller('broadcastMessageModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
//   $scope.items = ['item1', 'item2', 'item3'];
//   $scope.broadcastMessage = {
//     timestamp: Date.now()
//   };

//   $scope.selected = {
//     item: $scope.items[0]
//   };

//   $scope.ok = function () {
//     $scope.broadcastMessage.service = ServiceService.currentService.serviceName;

//     console.log($scope.broadcastMessage);
//     APIService.broadcastMessage($scope.broadcastMessage)

//     $uibModalInstance.close($scope.selected.item);
//   };

//   $scope.cancel = function () {
//     $uibModalInstance.dismiss('cancel');
//   };
// }]);