'use strict';

angular.module('myApp').factory('APIService', [ '$http', 'ConnectionConfigurationService', '$q',
	function($http, ConnectionConfigurationService, $q) {
		return {
			timeout: 10000,
			getServices: function () {
				var request = {
					method: 'GET',
					url: ConnectionConfigurationService.BASE_NAME + '/services',
					// headers: {'Access-Control-Allow-Origin': '*'},
					timeout: this.timeout,
					data: {}
				};

				return $http(request);
				// var services = ['Health', 'Agriculture'];
				// var deferred = $q.defer();
				// deferred.resolve(services);
				// return deferred.promise;
			},
		};
	}
]);

angular.module('myApp').factory('ServiceService',
	function() {
		var serviceObj = {
			serviceName: ''
		};

		return {
			currentService: serviceObj
		};
	}
);