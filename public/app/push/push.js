'use strict';

angular.module('myApp.push', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/push', {
    templateUrl: 'app/push/push.html',
    controller: 'PushCtrl'
  });
}])

.controller('PushCtrl', [function() {
	console.log('push control');
}]);