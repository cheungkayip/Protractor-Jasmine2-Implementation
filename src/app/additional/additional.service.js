carAdditionalService.$inject = ['CarPremiumService', 'CarAdditionalViewModel', 'urls', '$http'];

function carAdditionalService(CarPremiumService, CarAdditionalViewModel, urls, $http) {
	var service = {
		getAdditionalCoverages: getAdditionalCoverages,
		save: save
	};

	function getAdditionalCoverages() {
		return CarPremiumService.getAdditionalCoverages();
	}

	function save() {
		return $http({
			data: {
				additionalCoverages: CarAdditionalViewModel.coverages
			},
			method: 'POST',
			url: urls.aiepBusinessModuleSelectedAdditionalCoveragesUrl
		}).then(function (response) {
			return response.data;
		});
	}

	return service;
}

export default carAdditionalService;
