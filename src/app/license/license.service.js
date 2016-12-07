carLicenseService.$inject = ['$http', '$q', 'urls', 'CarLicenseViewModel'];

function carLicenseService($http, $q, urls, CarLicenseViewModel) {
	var service = {
		getVehicleData: getVehicleData,
		save: save
	};

	function getVehicleData(licensePlate) {
		return $http({
			method: 'POST',
			url: urls.aiepBusinessModuleCarUrl,
			cache: false,
			data: {
				licensePlate: licensePlate
			}
		}).then(function (response) {
			return response.data;
		});
	}

	function save() {
		return $http({
			method: 'POST',
			url: urls.aiepBusinessModuleLicenseAnswersUrl,
			data: {
				licensePlate: CarLicenseViewModel.licensePlateNumber.value,
				oldTimerInsurance: CarLicenseViewModel.oldTimerInsurance.value,
				carId: CarLicenseViewModel.vehicle.selected.id
			}
		}).then(function (response) {
			return response.data;
		});
	}

	return service;
}

export default carLicenseService;
