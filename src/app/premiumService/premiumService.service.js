carPremiumService.$inject = ['$http', 'urls', 'CarPremiumModel', 'CarCoverageViewModel', 'CarAdditionalViewModel'];

function carPremiumService($http, urls, CarPremiumModel, CarCoverageViewModel, CarAdditionalViewModel) { // eslint-disable-line max-params
	var service = {
		calculate: calculate,
		getAdditionalCoverages: getAdditionalCoverages
	};

	function calculate() {
		return $http({
			method: 'POST',
			data: {
				ownRiskType: CarCoverageViewModel.ownRisks !== undefined ? CarCoverageViewModel.ownRisks.value : undefined
			},
			url: urls.aiepBusinessModuleCalculateUrl,
			cache: false
		})
		.then(function (response) {
			var ownRisk = Object.keys(response.data.premiums)[0];
			CarPremiumModel.coverages[ownRisk] = response.data.premiums[ownRisk];
			return response;
		});
	}

	function getAdditionalCoverages() {
		return $http({
			method: 'POST',
			data: {},
			url: urls.aiepBusinessModuleAdditionalUrl,
			cache: false
		})
		.then(function (response) {
			if (CarAdditionalViewModel.additionalCoverages === undefined) {
				for (const prop in response.data) {
					/* istanbul ignore else */
					if (response.data.hasOwnProperty(prop)) {
						CarAdditionalViewModel[prop] = response.data[prop];
					}
				}
			} else {
				// Only set premiums
				setPremiums(response);
			}
		});

		function setPremiums(response) {
			let i = CarAdditionalViewModel.additionalCoverages.length;

			while (i--) {
				let j = response.data.additionalCoverages.length;
				const additionalCoverage = CarAdditionalViewModel.additionalCoverages[i];
				while (j--) {
					if (additionalCoverage.type === response.data.additionalCoverages[j].type) {
						additionalCoverage.premium = response.data.additionalCoverages[j].premium;
						break;
					}
				}
			}
		}
	}

	return service;
}

export default carPremiumService;
