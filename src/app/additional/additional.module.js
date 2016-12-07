import angular from 'angular';
import carAdditionalLamellaComponent from './additional.component';
import carAdditionalLamellaFactory from './additional.factory';
import carAdditionalLamellaService from './additional.service';

/**
 * @name aiep.configure-car-insurance.additional
 */

const carAdditionalLamellaModule = angular
	.module('aiep.configure-car-insurance.additional', []);

carAdditionalLamellaModule
	.component('carAdditional', carAdditionalLamellaComponent)
	.factory('CarAdditionalViewModel', carAdditionalLamellaFactory)
	.service('CarAdditionalService', carAdditionalLamellaService);

export default carAdditionalLamellaModule;
