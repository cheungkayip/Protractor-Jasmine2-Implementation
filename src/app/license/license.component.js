import carLicenseController from './license.controller';
import carLicenseTemplate from './license.html';

const carLicenseComponent = {
	bindings: {
		panel: '='
	},
	controller: carLicenseController,
	controllerAs: 'vm',
	template: carLicenseTemplate
};

export default carLicenseComponent;
