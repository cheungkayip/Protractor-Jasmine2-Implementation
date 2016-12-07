import angular from 'angular';
import carReplaceVehicleLamellaComponent from './replaceVehicle.component';
import carReplaceVehicleLamellaFactory from './replaceVehicle.factory';
import carReplaceVehicleLamellaService from './replaceVehicle.service';

/**
 * @name aiep.configure-car-insurance.replaceVehicle
 */

const carReplaceVehicleLamellaModule = angular
	.module('aiep.configure-car-insurance.replaceVehicle', []);

carReplaceVehicleLamellaModule
	.component('carReplaceVehicle', carReplaceVehicleLamellaComponent)
	.factory('CarReplaceVehicleViewModel', carReplaceVehicleLamellaFactory)
	.service('CarReplaceVehicleService', carReplaceVehicleLamellaService);

export default carReplaceVehicleLamellaModule;
