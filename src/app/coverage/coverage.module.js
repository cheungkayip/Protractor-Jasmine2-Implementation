import angular from 'angular';
import carCoverageLamellaComponent from './coverage.component';
import carCoverageLamellaFactory from './coverage.factory';
import carCoverageLamellaService from './coverage.service';

/**
 * @name aiep.configure-car-insurance.coverage
 */

const carCoverageLamellaModule = angular
	.module('aiep.configure-car-insurance.coverage', []);

carCoverageLamellaModule
	.component('carCoverage', carCoverageLamellaComponent)
	.factory('CarCoverageViewModel', carCoverageLamellaFactory)
	.service('CarCoverageService', carCoverageLamellaService);

export default carCoverageLamellaModule;
