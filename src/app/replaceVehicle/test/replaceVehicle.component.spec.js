'use strict';

var replaceVehicleMock = readJSON('mocks/aiep/replacevehicle/GET.json'),
	extraOption = {
		key: '1',
		value: 'Een extra auto verzekeren'
	};

describe('Replace Vehicle Controller', function () {
	var element,
		scope,
		replaceVehicleController,
		windowMock = {
			location: {
				href: '',
				reload: function () {
					return true;
				}
			}
		};

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('$window', windowMock);
	}));

	beforeEach(angular.mock.inject(function ($rootScope, $httpBackend, ViewModelFactory) {
		scope = $rootScope.$new();
		scope.vm = {
			panel: {
				name: 'replaceVehicle',
				buttons: {}
			}
		};

		$httpBackend.when('GET', '/aiep/replaceVehicle').respond(replaceVehicleMock);

		spyOn(ViewModelFactory, 'init').and.callThrough();
		spyOn(scope, '$watch').and.callThrough();
	}));

	beforeEach(angular.mock.inject(function ($compile) {
		element = angular.element('<car-replace-vehicle panel="vm.panel"></car-replace-vehicle>');
		$compile(element)(scope); // Compile the directive
		scope.$digest(); // Update the HTML

		replaceVehicleController = element.isolateScope().vm;
	}));

	afterEach(function () {
		scope.$destroy();
	});

	it('Should have a valid controller', inject(function ($httpBackend) {
		$httpBackend.flush();
		expect(replaceVehicleController).toBeDefined();
	}));

	it('Calls ViewModelFactory to get its own data', inject(function (ViewModelFactory, $httpBackend) {
		expect(ViewModelFactory.init).toHaveBeenCalled();
		$httpBackend.flush();
		expect(replaceVehicleController.model.situation).toBeDefined();
	}));

	it('Does not call ViewModelFactory if already init once', inject(function (ViewModelFactory, $httpBackend, $compile, CarReplaceVehicleViewModel) {
		expect(ViewModelFactory.init).toHaveBeenCalled();
		$httpBackend.flush();
		expect(CarReplaceVehicleViewModel.initialized).toBe(true);

		ViewModelFactory.init.calls.reset();

		element = angular.element('<car-replace-vehicle panel="vm.panel"></car-replace-vehicle>');
		$compile(element)(scope); // Compile the directive
		scope.$digest(); // Update the HTML

		expect(ViewModelFactory.init).not.toHaveBeenCalled();
	}));

	describe('form submit', function () {
		it('Does not set error if form is submitted valid', inject(function (pubSub, $httpBackend) {
			$httpBackend.flush();
			pubSub.publish('skav.form.replaceVehicleForm.submitting', true);

			expect(replaceVehicleController.model.error).toBe(false);
		}));

		it('Sets error if form is submitted invalid', inject(function (pubSub, $httpBackend) {
			$httpBackend.flush();
			pubSub.publish('skav.form.replaceVehicleForm.submitting', false);

			expect(replaceVehicleController.model.error).toBe(true);
		}));
	});

	describe('onValid', function () {
		it('Returns true after saving model', inject(function ($q, $httpBackend, CarReplaceVehicleService) {
			var saveModelPromise,
				valid,
				deferred = $q.defer();
			$httpBackend.flush();

			// Fake the InsuranceService
			spyOn(CarReplaceVehicleService, 'extra').and.callFake(function () {
				deferred.resolve({url: 'fake'});
				return deferred.promise;
			});

			saveModelPromise = replaceVehicleController.panel.onValid();

			expect(saveModelPromise.then).toBeDefined();
			expect(saveModelPromise.catch).toBeDefined();
			expect(saveModelPromise.finally).toBeDefined();

			saveModelPromise.then(function (data) {
				valid = data;
			});

			scope.$digest();

			expect(CarReplaceVehicleService.extra).toHaveBeenCalled();
			expect(valid).toBe(true);
		}));

		it('Controller extra function if selected value is \'1\'', inject(function ($q, $window, $httpBackend, CarReplaceVehicleService) {
			var saveModelPromise,
				deferred = $q.defer();

			replaceVehicleMock.situation.options.push(extraOption);
			$httpBackend.flush();

			// Fake the InsuranceService
			spyOn(CarReplaceVehicleService, 'extra').and.callFake(function () {
				deferred.resolve({url: 'fake'});
				return deferred.promise;
			});

			spyOn($window.location, 'reload');

			replaceVehicleController.model.situation.value = replaceVehicleMock.situation.options[3].key;

			saveModelPromise = replaceVehicleController.panel.onValid();
			expect(saveModelPromise.then).toBeDefined();
			expect(saveModelPromise.catch).toBeDefined();
			expect(saveModelPromise.finally).toBeDefined();

			saveModelPromise.then();
			scope.$digest();
			expect(CarReplaceVehicleService.extra).toHaveBeenCalled();
			expect($window.location.reload).toHaveBeenCalled();
		}));
	});
});
