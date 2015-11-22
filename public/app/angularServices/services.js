'use strict';

angular.module('myApp').factory('APIService', [ '$http', '$q',
	function($http, $q) {
		return {
			timeout: 10000,
			getServices: function () {
				var request = {
					method: 'GET',
					url: '/services',
					timeout: this.timeout,
					data: {}
				};

				return $http(request);
			},
			createService: function (data) {
				var request = {
					method: 'POST',
					url: '/services',
					timeout: this.timeout,
					data: data
				};

				return $http(request);
			},
			broadcastMessage: function (data) {
				var request = {
					method: 'POST',
					url: '/sendMsg',
					timeout: this.timeout,
					data: data
				};

				return $http(request);
			},
			unicastMessage: function (data) {
				var request = {
					method: 'POST',
					url: '/sendMsgToUser',
					timeout: this.timeout,
					data: data
				};

				return $http(request);
			},
		};
	}
]);

angular.module('myApp').factory('ServiceService',
	function() {
		var serviceObj = {
			serviceName: 'health'
		};

		return {
			currentService: serviceObj
		};
	}
);