'use strict';

var additionalMock = readJSON('mocks/aiep/additional/POST.json');

describe('Additional Controller', function () {
	var element,
		scope,
		additionalController;

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('AdditionalViewModel', additionalMock);
	}));

	beforeEach(angular.mock.inject(function ($q, CarAdditionalService) {
		spyOn(CarAdditionalService, 'getAdditionalCoverages').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		});
	}));

	beforeEach(angular.mock.inject(function ($compile, $rootScope) {
		scope = $rootScope.$new();
		scope.vm = {
			panel: {
				name: 'additional',
				open: false
			}
		};

		spyOn(scope, '$watch').and.callThrough();

		// Create an instance of the directive
		element = angular.element('<car-additional panel="vm.panel"></car-additional>');
		$compile(element)(scope); // Compile the directive
		scope.$digest(); // Update the HTML

		additionalController = element.isolateScope().vm;
	}));

	afterEach(function () {
		scope.$destroy();
	});

	it('Should have a valid controller', inject(function () {
		expect(additionalController).toBeDefined();
	}));

	it('Calls additionalService when panel is opened', inject(function (CarAdditionalService) {
		CarAdditionalService.getAdditionalCoverages.calls.reset();
		additionalController.panel.open = true;
		scope.$digest();

		expect(CarAdditionalService.getAdditionalCoverages).toHaveBeenCalled();
	}));

	it('Does not call additionalService when panel is closed', inject(function (CarAdditionalService) {
		CarAdditionalService.getAdditionalCoverages.calls.reset();
		additionalController.panel.open = false;
		scope.$broadcast('changeModule', 'other');
		scope.$digest();
		expect(CarAdditionalService.getAdditionalCoverages).not.toHaveBeenCalled();
	}));

	/*
	 **  Validation tests
	 */
	it('Calls the Additional Service to save model when validation is called', inject(function ($q, CarAdditionalService) {
		var deferred = $q.defer();

		spyOn(CarAdditionalService, 'save').and.callFake(function () {
			deferred.resolve();
			return deferred.promise;
		});

		additionalController.panel.onValid();
		expect(CarAdditionalService.save).toHaveBeenCalled();
	}));

	it('Controller Validate function returns Promise', inject(function ($q, CarAdditionalService) {
		var deferred = $q.defer(),
			savePromise;

		// Fake the InsuranceService
		spyOn(CarAdditionalService, 'save').and.callFake(function () {
			deferred.resolve();
			return deferred.promise;
		});

		savePromise = additionalController.panel.onValid();
		expect(savePromise.then).toBeDefined();
		expect(savePromise.catch).toBeDefined();
		expect(savePromise.finally).toBeDefined();
	}));

	it('Returns true after saving model', inject(function ($q, CarAdditionalService) {
		var valid,
			deferred = $q.defer();

		spyOn(CarAdditionalService, 'save').and.callFake(function () {
			deferred.resolve();
			return deferred.promise;
		});

		additionalController.panel.onValid()
			.then(function (response) {
				valid = response;
			});

		scope.$digest();

		expect(valid).toBe(true);
	}));
});
