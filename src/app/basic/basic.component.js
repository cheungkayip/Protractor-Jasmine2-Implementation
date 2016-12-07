import carBasicController from './basic.controller';
import carBasicTemplate from './basic.html';

const carBasicComponent = {
	bindings: {
		panel: '='
	},
	controller: carBasicController,
	controllerAs: 'vm',
	template: carBasicTemplate
};

export default carBasicComponent;
