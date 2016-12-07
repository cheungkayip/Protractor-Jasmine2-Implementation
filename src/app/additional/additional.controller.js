carAdditionalController.$inject = ['$scope', 'CarAdditionalService', 'CarAdditionalViewModel'];

function carAdditionalController($scope, CarAdditionalService, CarAdditionalViewModel) {
	var vm = this;
	vm.model = CarAdditionalViewModel;
	vm.panel.onValid = onValid;

	$scope.$watch('vm.panel.open', function (open) {
		if (open) {
			CarAdditionalService.getAdditionalCoverages().then(function () {
				vm.panel.loaded = true;
			});
		}
	}, true);

	function onValid() {
		return CarAdditionalService.save().then(function () {
			return true;
		});
	}
}

export default carAdditionalController;
