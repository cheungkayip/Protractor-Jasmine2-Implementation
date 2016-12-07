import angular from 'angular';
import carBasicLamellaComponent from './basic.component';
import carBasicLamellaFactory from './basic.factory';
import carBasicLamellaService from './basic.service';

/**
 * @name aiep.configure-car-insurance.basic
 */

const carBasicLamellaModule = angular
	.module('aiep.configure-car-insurance.basic', []);

carBasicLamellaModule
	.component('carBasic', carBasicLamellaComponent)
	.factory('CarBasicViewModel', carBasicLamellaFactory)
	.service('CarBasicService', carBasicLamellaService);

export default carBasicLamellaModule;
