import angular from 'angular';
import carLicenseLamellaComponent from './license.component';
import carLicenseLamellaFactory from './license.factory';
import carLicenseLamellaService from './license.service';

/**
 * @name aiep.configure-car-insurance.license
 */

const carLicenseLamellaModule = angular
	.module('aiep.configure-car-insurance.license', []);

carLicenseLamellaModule
	.component('carLicense', carLicenseLamellaComponent)
	.factory('CarLicenseViewModel', carLicenseLamellaFactory)
	.service('CarLicenseService', carLicenseLamellaService);

export default carLicenseLamellaModule;
