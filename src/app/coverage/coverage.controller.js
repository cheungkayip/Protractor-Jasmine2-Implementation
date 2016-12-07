carCoverageController.$inject = ['$scope', 'CarCoverageService', 'CarCoverageViewModel', 'ViewModelFactory', 'CarPremiumModel'];

function carCoverageController($scope, CarCoverageService, CarCoverageViewModel, ViewModelFactory, CarPremiumModel) { // eslint-disable-line max-params
	var vm = this,
		unsubscribeSetSelectedCoverage;

	vm.containsCoverage = containsCoverage;
	vm.model = CarCoverageViewModel;
	vm.setPremiums = setPremiums;
	vm.panel.onValid = onValid;

	unsubscribeSetSelectedCoverage = $scope.$watch('vm.model.coverage', onSetSelectedCoverage);
	$scope.$on('$destroy', onDestroy);

	ViewModelFactory.init(CarCoverageViewModel, 'Coverage').then(function () {
		vm.panel.loaded = true;
		CarCoverageService.calculatePremiums().then(function () {
			vm.setPremiums();
		});
	});

	function onSetSelectedCoverage(value) {
		if (angular.isDefined(value)) {
			vm.model.error = null;

			unsubscribeSetSelectedCoverage();
		}
	}

	function containsCoverage(coverageNames, coverage) {
		return coverageNames.indexOf(coverage) > -1;
	}

	function setPremiums() {
		var selectedOwnRiskCoverage = CarPremiumModel.coverages[vm.model.ownRisks.value],
			modelCoverages = vm.model.coverages;

		for (const prop in selectedOwnRiskCoverage) {
			/* istanbul ignore else */
			if (selectedOwnRiskCoverage.hasOwnProperty(prop)) {
				let j = modelCoverages.length;
				while (j--) {
					if (modelCoverages[j].name === prop) {
						modelCoverages[j].ownRisk = selectedOwnRiskCoverage[prop];
						break;
					}
				}
			}
		}
	}

	function onValid() {
		if (!vm.model.coverage) {
			vm.model.error = vm.model.messages['ftm.error.general.0006'];
			return false;
		} else {
			vm.model.error = null;
		}

		return CarCoverageService.save().then(function () {
			return true;
		});
	}

	function onDestroy() {
		unsubscribeSetSelectedCoverage();
	}
}

export default carCoverageController;
