replaceVehicleController.$inject = ['$scope', '$window', 'CarReplaceVehicleService', 'CarReplaceVehicleViewModel', 'ViewModelFactory', 'pubSub'];

function replaceVehicleController($scope, $window, CarReplaceVehicleService, CarReplaceVehicleViewModel, ViewModelFactory, pubSub) { // eslint-disable-line max-params
	var vm = this,
		EXTRA_CAR_INSURANCE_KEY = '1';

	vm.setWatchers = setWatchers;
	vm.panel.onValid = onValid;

	function getData() {
		ViewModelFactory.init(CarReplaceVehicleViewModel, 'ReplaceVehicle').then(init);
	}

	function init() {
		vm.panel.loaded = true;
		vm.model = CarReplaceVehicleViewModel;
		pubSub.subscribe('skav.form.replaceVehicleForm.submitting', setError, vm);
		vm.setWatchers();
	}

	function setError(valid) {
		if (!valid) {
			vm.model.error = true;
		}
	}

	function setWatchers() {
		$scope.$watch('vm.model.situation.value', function (value) {
			vm.model.error = false;

			if (value && value.toString() === EXTRA_CAR_INSURANCE_KEY) {
				delete vm.panel.buttons.prev;
				vm.panel.buttons.next = 'Extra autoverzekering aanvragen';
			} else {
				vm.panel.buttons.prev = 'Annuleren';
				vm.panel.buttons.next = 'Volgende';
			}
		});
	}

	function onValid() {
		if (vm.model.situation.value === EXTRA_CAR_INSURANCE_KEY) {
			return CarReplaceVehicleService.extra().then(function () {
				$window.location.reload();
			});
		} else {
			return CarReplaceVehicleService.extra().then(function () {
				return true;
			});
		}
	}

	if (!CarReplaceVehicleViewModel.initialized) {
		getData();
	} else {
		init();
	}
}

export default replaceVehicleController;
