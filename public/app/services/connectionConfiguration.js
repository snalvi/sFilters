'use strict';

angular.module('myApp').factory('ConnectionConfigurationService',
	function() {
		return {
			BASE_NAME: 'https://localhost:9000'
		};
	}
);