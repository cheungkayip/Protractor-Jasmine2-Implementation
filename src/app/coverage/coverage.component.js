import carCoverageController from './coverage.controller';
import carCoverageTemplate from './coverage.html';

const carCoverageComponent = {
	bindings: {
		panel: '='
	},
	controller: carCoverageController,
	controllerAs: 'vm',
	template: carCoverageTemplate
};

export default carCoverageComponent;
