carCoverageService.$inject = ['$http', 'urls', 'CarPremiumService', 'CarCoverageViewModel'];

function carCoverageService($http, urls, CarPremiumService, CarCoverageViewModel) {
	var service = {
		calculatePremiums: calculatePremiums,
		save: save
	};

	/*
	 * @function calculatePremiums
	 * @public
	 * Calls CarPremiumService.calculate to get premiums
	 * @returns {promise} - Promise that sets discount and calls setTextToFirstColumnLabels
	 */
	function calculatePremiums() {
		return CarPremiumService.calculate()
			.then(function (response) {
				CarCoverageViewModel.discount = response.data.discount;
				setTextToFirstColumnLabels(response.data.firstColumnLabel);
			});
	}

	/*
	 * @function save
	 * @public
	 * Sends ownRiskType and coverage to backend
	 * @returns {promise} - Promise that returns data from http call
	 */
	function save() {
		return $http({
			method: 'POST',
			url: urls.aiepBusinessModuleSelectedCoverageUrl,
			data: {
				ownRiskType: CarCoverageViewModel.ownRisks !== undefined ? CarCoverageViewModel.ownRisks.value : undefined,
				coverage: CarCoverageViewModel.coverage
			}
		})
		.then(function (response) {
			return response.data;
		});
	}

	/*
	 * @function setTextToFirstColumnLabels
	 * @private
	 * Sets passed firstColumnLabels to corresponding CarCoverageViewModel.firstColumnLabels.body
	 * @param {object} firstColumnLabels - object with keys mapping to the CarCoverageViewModel.firstColumnLabels
	 */
	function setTextToFirstColumnLabels(firstColumnLabels) {
		var modelFirstColumLabels = CarCoverageViewModel.firstColumnLabels;

		for (let i = modelFirstColumLabels.length - 1; i >= 0; i--) {
			modelFirstColumLabels[i].body = firstColumnLabels[modelFirstColumLabels[i].value] || null;
		}
	}

	return service;
}

export default carCoverageService;
