import additionalLamellaModule from './additional/additional.module';
import angular from 'angular';
import basicLamellaModule from './basic/basic.module';
import coverageLamellaModule from './coverage/coverage.module';
import licenseLamellaModule from './license/license.module';
import premiumServiceModule from './premiumService/premiumService.module';
import replaceVehicleLamellaModule from './replaceVehicle/replaceVehicle.module';

/**
 * @name aiep.configure-car-insurance
 */

const carModule = angular.module('aiep.configure-car-insurance', [
	additionalLamellaModule.name,
	basicLamellaModule.name,
	coverageLamellaModule.name,
	licenseLamellaModule.name,
	premiumServiceModule.name,
	replaceVehicleLamellaModule.name
]);

export default carModule;
