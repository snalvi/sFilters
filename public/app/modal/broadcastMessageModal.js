angular.module('myApp').controller('broadcastMessageModalController', ['$scope', '$uibModalInstance', 'APIService', 'ServiceService', function ($scope, $uibModalInstance, APIService, ServiceService) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.broadcastMessage = {
    timestamp: Date.now()
  };

  APIService.getLocations().then(function(data) {
    var locations = [];
    _.each(data.data, function(loc){
      locations.push({
        "id": loc,
        "label": _.capitalize(loc)
      })
    });
    $scope.locations = locations;
  });


  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $scope.broadcastMessage.service = ServiceService.currentService.serviceName;

    console.log($scope.broadcastMessage);
    APIService.broadcastMessage($scope.broadcastMessage)

    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);