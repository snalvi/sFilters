'use strict';

angular.module('myApp').factory('ConnectionConfigurationService',
	function() {
		return {
			BASE_NAME: 'http://localhost:9000'
		};
	}
);