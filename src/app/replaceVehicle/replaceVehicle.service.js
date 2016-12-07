carReplaceVehicleService.$inject = ['urls', '$http', 'CarReplaceVehicleViewModel'];

function carReplaceVehicleService(urls, $http, CarReplaceVehicleViewModel) {
	var service = {
		cancel: cancel,
		extra: extra
	};

	function cancel() {
		return $http({
			method: 'POST',
			url: urls.aiepBusinessModuleExitFlowUrl
		}).then(function (response) {
			return response.data;
		});
	}

	function extra() {
		return $http({
			method: 'POST',
			url: urls.aiepBusinessModuleReplaceVehicleAnswersUrl,
			data: {
				situation: CarReplaceVehicleViewModel.situation.value
			}
		}).then(function (response) {
			return response.data;
		});
	}

	return service;
}

export default carReplaceVehicleService;
