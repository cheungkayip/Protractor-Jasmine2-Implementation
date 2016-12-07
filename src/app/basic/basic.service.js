carBasicService.$inject = ['CarBasicViewModel', 'urls', '$http'];

function carBasicService(CarBasicViewModel, urls, $http) {
	var service = {
		save: save
	};

	function save() {
		return $http({
			data: {
				driverAnswers: {
					regularDriverCode: CarBasicViewModel.driverView.regularDriverCode.value,
					birthDate: CarBasicViewModel.driverView.birthDate.value ? `${CarBasicViewModel.driverView.birthDate.value.substring(0, 2)}-${CarBasicViewModel.driverView.birthDate.value.substring(2, 4)}-${CarBasicViewModel.driverView.birthDate.value.substring(4, 8)}` : null,
					initials: CarBasicViewModel.driverView.initials.value ? CarBasicViewModel.driverView.initials.value : null,
					genderCode: CarBasicViewModel.driverView.genderCode.value ? CarBasicViewModel.driverView.genderCode.value : null,
					surname: CarBasicViewModel.driverView.surname.value ? CarBasicViewModel.driverView.surname.value : null,
					relationToDriver: CarBasicViewModel.driverView.relationToDriver.value ? CarBasicViewModel.driverView.relationToDriver.value : null
				},
				useOfCar: CarBasicViewModel.useOfCar.value,
				claimFreeYears: CarBasicViewModel.claimFreeYears.value,
				startDate: `${CarBasicViewModel.startDate.value.substring(0, 2)}-${CarBasicViewModel.startDate.value.substring(2, 4)}-${CarBasicViewModel.startDate.value.substring(4, 8)}`
			},
			method: 'POST',
			url: urls.aiepBusinessModuleBasicAnswersUrl
		}).then(function (response) {
			return response.data;
		});
	}

	return service;
}

export default carBasicService;
