'use strict';

var windowMock = { // eslint-disable-line no-unused-vars
	location: {
		href: ''
	},
	navigator: {
		userAgent: ''
	}
};

angular.module('aiepModule', [
	'aiep.common',
	'aiep.configure-car-insurance',
	'aiep.configure-driver-insurance',
	'aiep.configure-checkcode-insurance',
	'aiep.dev'
]);
