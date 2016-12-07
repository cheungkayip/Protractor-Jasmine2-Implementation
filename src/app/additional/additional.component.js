import carAdditionalController from './additional.controller';
import carAdditionalTemplate from './additional.html';

const carAdditionalComponent = {
	bindings: {
		panel: '='
	},
	controller: carAdditionalController,
	controllerAs: 'vm',
	template: carAdditionalTemplate
};

export default carAdditionalComponent;
