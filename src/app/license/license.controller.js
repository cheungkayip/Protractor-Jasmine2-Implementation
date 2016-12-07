carLicenseController.$inject = ['$scope', '$window', 'CarLicenseService', 'CarLicenseViewModel', 'ViewModelFactory', '$timeout'];

function carLicenseController($scope, $window, CarLicenseService, CarLicenseViewModel, ViewModelFactory, $timeout) { // eslint-disable-line max-params
	var vm = this;

	vm.getVehicleData = getVehicleData;
	vm.model = CarLicenseViewModel;
	vm.setWatchers = setWatchers;
	vm.panel.onValid = onValid;

	function getData() {
		delete CarLicenseViewModel.currentVehicle;
		ViewModelFactory.init(CarLicenseViewModel, 'License').then(init);
	}

	$scope.$watch('vm.panel.open', function (open) {
		if (open) {
			getData();
		}
	});

	function init() {
		vm.panel.loaded = true;
		vm.setWatchers();
		if (vm.model.licensePlateNumber.value && vm.model.vehicle === undefined) {
			vm.getVehicleData();
		}
	}

	function getVehicleData() {
		disableButtons(true);
		CarLicenseService.getVehicleData(vm.model.licensePlateNumber.value).then(function (data) {
			disableButtons(false);
			vm.model.licensePlateNumber.disabled = false;
			vm.model.vehicle = data;

			if (!data.error) {
				vm.model.licensePlateNumber.value = data.licensePlate;

				if (data.messages !== null) {
					vm.model.vehicle.messages = data.messages;
				}
			} else {
				vm.panel.buttons.nextDisabled = true;
			}
		});
	}

	function disableButtons(disable) {
		vm.panel.buttons.nextDisabled = disable;
		vm.panel.buttons.prevDisabled = disable;
		vm.model.loading = disable;
	}

	function setWatchers() {
		var timer;

		$scope.$watch('vm.model.licensePlateNumber.value', function (value, oldValue) {
			$timeout.cancel(timer);
			disableButtons(false);

			if (value && value !== oldValue && (!vm.model.vehicle || value !== vm.model.vehicle.licensePlate)) {
				disableButtons(true);
				timer = $timeout(function () {
					vm.model.vehicle = null; // Empty the car data
					vm.model.licensePlateNumber.disabled = true; // Prevent typing until data is present
					vm.getVehicleData();
				}, 1000);
			}
		});
	}

	function onValid() {
		return CarLicenseService.save().then(function () {
			if (vm.model.oldTimerInsurance.value === 'value.boolean.true') {
				$window.location.reload();
				return false;
			} else {
				return true;
			}
		});
	}
}

export default carLicenseController;
