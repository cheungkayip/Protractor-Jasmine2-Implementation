'use strict';

describe('Coverage Controller', function () {
	var element,
		scope,
		coverageController,
		coverageMock = readJSON('mocks/aiep/coverage/GET.json'),
		calculationMock = readJSON('mocks/aiep/calculate/POST.json');

	beforeEach(angular.mock.module('aiepModule'));

	beforeEach(angular.mock.inject(function ($rootScope, $httpBackend, ViewModelFactory) {
		scope = $rootScope.$new();
		scope.vm = {
			panel: {name: 'coverage'}
		};

		$httpBackend.when('GET', '/aiep/coverage').respond(coverageMock);
		$httpBackend.when('POST', '/aiep/calculate').respond(calculationMock);
		spyOn(ViewModelFactory, 'init').and.callThrough();
	}));

	beforeEach(angular.mock.inject(function ($compile) {
		element = angular.element('<car-coverage panel="vm.panel"></car-coverage>');
		$compile(element)(scope); // Compile the directive
		scope.$digest(); // Update the HTML

		coverageController = element.isolateScope().vm;
	}));

	afterEach(function () {
		scope.$destroy();
	});

	it('Should have a valid controller', inject(function () {
		expect(coverageController).toBeDefined();
	}));

	it('Calls ViewModelFactory to get its own data', inject(function (ViewModelFactory, $httpBackend) {
		expect(ViewModelFactory.init).toHaveBeenCalled();
		// Backend flush triggers ViewModelFactory Promise
		$httpBackend.flush();

		expect(coverageController.model.coverages).toBeDefined();
		expect(coverageController.model.messages).toBeDefined();
		expect(coverageController.model.usps).toBeDefined();
	}));

	it('Calls setWatchers, setPremiums and setDefault function after creating ViewModelFactory', inject(function ($httpBackend) {
		spyOn(coverageController, 'setPremiums').and.callThrough();

		// Backend flush triggers ViewModelFactory Promise
		$httpBackend.flush();
		expect(coverageController.setPremiums).toHaveBeenCalled();
	}));

	/*
	 **  set Premiums Function
	 */
	it('setPremiums sets ownRisk data from CarPremiumModel to scope.model', inject(function ($q, $httpBackend, CarPremiumModel, CarCoverageService) {
		spyOn(CarCoverageService, 'calculatePremiums').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(calculationMock);
			return deferred.promise;
		});

		// Backend flush triggers CarCoverageService Promise
		$httpBackend.flush();

		// Set data to CarPremiumModel
		coverageController.model.ownRisks.value = coverageController.model.ownRisks.options[0].key;
		CarPremiumModel.coverages[coverageController.model.ownRisks.options[0].key] = calculationMock.premiums[coverageController.model.ownRisks.options[0].key];

		expect(coverageController.model.coverages[0].ownRisk).toBeUndefined();
		expect(coverageController.model.coverages[1].ownRisk).toBeUndefined();
		expect(coverageController.model.coverages[2].ownRisk).toBeUndefined();

		coverageController.setPremiums();
		scope.$digest();

		expect(coverageController.model.coverages[0].ownRisk).not.toBeUndefined();
		expect(coverageController.model.coverages[1].ownRisk).not.toBeUndefined();
		expect(coverageController.model.coverages[2].ownRisk).not.toBeUndefined();
	}));

	/*
	 ** Contains Coverage function tests
	 */
	it('Returns true if usp contains coverage', inject(function ($httpBackend) {
		var containsCoverage;
		// Backend flush triggers CarCoverageService Promise
		$httpBackend.flush();

		containsCoverage = coverageController.containsCoverage(['WA_casco', 'WA_beperkt'], 'WA_casco');
		expect(containsCoverage).toBe(true);

		containsCoverage = coverageController.containsCoverage(['WA_casco', 'WA_beperkt'], 'WA_beperkt');
		expect(containsCoverage).toBe(true);
	}));

	it('Returns false if usp contains coverage', inject(function ($httpBackend) {
		var containsCoverage;
		// Backend flush triggers CarCoverageService Promise
		$httpBackend.flush();

		containsCoverage = coverageController.containsCoverage(['WA_casco', 'WA_beperkt'], 'WA');
		expect(containsCoverage).toBe(false);
	}));

	/*
	 ** Save Function
	 */
	it('Calls the Coverage Service to save model when validation is called and a coverage is selected', inject(function ($q, $httpBackend, CarCoverageService) {
		spyOn(CarCoverageService, 'save').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		});
		coverageController.model.coverage = 'some coverage';
		coverageController.panel.onValid();
		expect(CarCoverageService.save).toHaveBeenCalled();
	}));

	it('Controller Validate function returns Promise when a coverage is selected', inject(function ($q, $httpBackend, CarCoverageService) {
		var saveModelPromise;
		spyOn(CarCoverageService, 'save').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		});

		coverageController.model.coverage = 'some coverage';
		saveModelPromise = coverageController.panel.onValid();

		expect(saveModelPromise.then).toBeDefined();
		expect(saveModelPromise.catch).toBeDefined();
		expect(saveModelPromise.finally).toBeDefined();
	}));

	it('Controller Validate function returns false and set an error on the model when no coverage is selected', function () {
		var response;
		coverageController.model.messages = coverageMock.messages;
		response = coverageController.panel.onValid();
		expect(response).toBe(false);
	});

	it('Returns true after saving model when a coverage is selected', inject(function ($q, $httpBackend, CarCoverageService) {
		var valid;

		spyOn(CarCoverageService, 'save').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		});

		coverageController.model.coverage = 'some coverage';
		coverageController.panel.onValid()
			.then(function (response) {
				valid = response;
			});

		scope.$digest();

		expect(valid).toBe(true);
	}));
});
