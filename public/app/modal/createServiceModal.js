angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  console.log("muhuhahaha");
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});