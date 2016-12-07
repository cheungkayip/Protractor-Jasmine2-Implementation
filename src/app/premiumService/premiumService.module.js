import angular from 'angular';
import premiumFactory from './premiumService.factory';
import premiumService from './premiumService.service';

/**
 * @name aiep.configure-car-insurance.premium-service
 */

const serviceModule = angular
	.module('aiep.configure-car-insurance.premium-service', []);

serviceModule
	.factory('CarPremiumModel', premiumFactory)
	.service('CarPremiumService', premiumService);

export default serviceModule;
