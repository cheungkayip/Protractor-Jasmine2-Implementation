'use strict';

describe('Coverage Service', function () {
	var coverageMock = readJSON('mocks/aiep/coverage/GET.json'),
		calculationMock = readJSON('mocks/aiep/calculate/POST.json');

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('CarCoverageViewModel', coverageMock);
	}));

	beforeEach(angular.mock.inject(function ($q, CarPremiumService) {
		spyOn(CarPremiumService, 'calculate').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(calculationMock);
			return deferred.promise;
		});
	}));

	it('Should be a valid service', inject(function (CarCoverageService) {
		expect(CarCoverageService).toBeDefined();
		expect(CarCoverageService.calculatePremiums).toBeDefined();
		expect(CarCoverageService.save).toBeDefined();
	}));

	it('Calculate Should return a valid promise', inject(function (CarCoverageService) {
		var calculate = CarCoverageService.calculatePremiums();
		expect(calculate.then).toBeDefined();
		expect(calculate.catch).toBeDefined();
		expect(calculate.finally).toBeDefined();
	}));

	it('Should return data after executing promise', inject(function (CarCoverageService, CarPremiumService) {
		CarCoverageService.calculatePremiums().then();
		expect(CarPremiumService.calculate).toHaveBeenCalled();
	}));

	it('Calculate Should return a valid promise', inject(function (CarCoverageService) {
		var save = CarCoverageService.save();
		expect(save.then).toBeDefined();
		expect(save.catch).toBeDefined();
		expect(save.finally).toBeDefined();
	}));


	it('Should return data after executing promise', inject(function (CarCoverageService, $httpBackend, urls) {
		var calculation;
		$httpBackend.when('POST', urls.aiepBusinessModuleSelectedCoverageUrl).respond(true);

		CarCoverageService.save().then(function (response) {
			calculation = response;
		});
		$httpBackend.flush();

		expect(calculation).toBe(true);
	}));

	it('Works with no ownrisk set', inject(function ($httpBackend, urls, CarCoverageService) {
		var calculation;
		$httpBackend.when('POST', urls.aiepBusinessModuleSelectedCoverageUrl).respond(true);

		coverageMock.ownRisks = undefined;
		CarCoverageService.save().then(function (response) {
			calculation = response;
		});
		$httpBackend.flush();

		expect(calculation).toBe(true);
	}));
});
