'use strict';

angular.module('aiepModule', [
	'aiep.dev',
	'aiep.common',
	'aiep.configure-car-insurance',
	'aiep.configure-driver-insurance',
	'aiep.configure-checkcode-insurance',
	'aiep.urls'
]);

angular.bootstrap(document, ['aiepModule']);
