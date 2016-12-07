import carReplaceVehicleController from './replaceVehicle.controller';
import carReplaceVehicleTemplate from './replaceVehicle.html';

const carReplaceVehicleComponent = {
	bindings: {
		panel: '='
	},
	controller: carReplaceVehicleController,
	controllerAs: 'vm',
	template: carReplaceVehicleTemplate
};

export default carReplaceVehicleComponent;
