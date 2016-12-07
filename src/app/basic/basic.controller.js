carBasicController.$inject = ['$scope', 'CarBasicService', 'CarBasicViewModel', 'ViewModelFactory'];

function carBasicController($scope, CarBasicService, CarBasicViewModel, ViewModelFactory) {
	var vm = this;
	vm.model = CarBasicViewModel;
	vm.oneYearFromNow = oneYearFromNow;
	vm.setWatchers = setWatchers;
	vm.panel.onValid = onValid;

	$scope.$watch('vm.panel.open', function (open) {
		if (open) {
			getData();
		}
	});

	function getData() {
		ViewModelFactory.init(CarBasicViewModel, 'Basic').then(init);
	}

	function init() {
		vm.panel.loaded = true;
		vm.setWatchers();
	}

	function dateString(date) {
		return date.substring(8, 10) + date.substring(5, 7) + date.substring(0, 4);
	}

	function oneYearFromNow() {
		var yearFromNow = new Date(new Date().setYear(new Date().getFullYear() + 1)),
			yearMinusOneDay = new Date(yearFromNow.setDate(new Date().getDate() - 1));
		return dateString(yearMinusOneDay.toISOString());
	}

	function setWatchers() {
		$scope.$watch('vm.model.useOfCar.value', function (key) {
			if (key) {
				vm.panel.buttons.nextDisabled = key === 'Zakelijk';
			}
		}, true);
	}

	function onValid() {
		return CarBasicService.save().then(function () {
			return true;
		});
	}
}

export default carBasicController;
