'use strict';

describe('Premium service', function () {
	var calculationMock = readJSON('mocks/aiep/calculate/POST.json'),
		coverageMock = readJSON('mocks/aiep/coverage/GET.json'),
		additionalMock = readJSON('mocks/aiep/additional/POST.json'),
		secondAdditionalMock = readJSON('mocks/aiep/additional/GET.json');

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('CarCoverageViewModel', coverageMock);
	}));

	it('Should be a valid service', inject(function (CarPremiumService) {
		expect(CarPremiumService).toBeDefined();
		expect(CarPremiumService.calculate).toBeDefined();
		expect(CarPremiumService.getAdditionalCoverages).toBeDefined();
	}));

	it('Calculate should return a valid promise', inject(function (CarPremiumService, $httpBackend) {
		var calculate = CarPremiumService.calculate();
		$httpBackend.when('POST', '/aiep/calculate').respond();

		expect(calculate.then).toBeDefined();
		expect(calculate.catch).toBeDefined();
		expect(calculate.finally).toBeDefined();
	}));

	it('Inits CarPremiumModel', inject(function (CarPremiumModel) {
		expect(CarPremiumModel.coverages).toBeDefined();
	}));

	it('Gets calculation and sets it to the CarPremiumModel', inject(function (CarPremiumService, $httpBackend, CarPremiumModel) {
		$httpBackend.when('POST', '/aiep/calculate').respond(calculationMock);
		CarPremiumService.calculate().then();
		$httpBackend.flush();

		expect(CarPremiumModel.coverages['0'].LiabilityCascoLimited.value).toBe(calculationMock.premiums['0'].LiabilityCascoLimited.value);
		expect(CarPremiumModel.coverages['0'].LiabilityCasco.value).toBe(calculationMock.premiums['0'].LiabilityCasco.value);
		expect(CarPremiumModel.coverages['0'].Liability.value).toBe(calculationMock.premiums['0'].Liability.value);
	}));

	it('Sends with ownrisk', inject(function (CarPremiumService, $httpBackend, CarCoverageViewModel, CarPremiumModel) {
		CarCoverageViewModel.ownRisks = {
			value: 'fake'
		};
		$httpBackend.when('POST', '/aiep/calculate').respond(calculationMock);
		CarPremiumService.calculate().then();
		$httpBackend.flush();

		expect(CarPremiumModel.coverages['0'].LiabilityCascoLimited.value).toBe(calculationMock.premiums['0'].LiabilityCascoLimited.value);
		expect(CarPremiumModel.coverages['0'].LiabilityCasco.value).toBe(calculationMock.premiums['0'].LiabilityCasco.value);
		expect(CarPremiumModel.coverages['0'].Liability.value).toBe(calculationMock.premiums['0'].Liability.value);
	}));

	it('AdditionalCoverages should return promise if there are no additionalCoverages yet', inject(function (CarPremiumService, $httpBackend, CarAdditionalViewModel) {
		var additionalCoverages;

		expect(CarAdditionalViewModel.additionalCoverages).toBeUndefined();

		additionalCoverages = CarPremiumService.getAdditionalCoverages();
		$httpBackend.when('POST', '/aiep/additional').respond(calculationMock);

		expect(additionalCoverages.then).toBeDefined();
		expect(additionalCoverages.catch).toBeDefined();
		expect(additionalCoverages.finally).toBeDefined();
	}));

	it('Gets additional coverages and sets them to the CarAdditionalViewModel', inject(function (CarPremiumService, $httpBackend, CarAdditionalViewModel) {
		expect(CarAdditionalViewModel.additionalCoverages).toBeUndefined();

		expect(CarAdditionalViewModel.additionalCoverages).toBeUndefined();
		expect(CarAdditionalViewModel.legalAid).toBeUndefined();

		$httpBackend.when('POST', '/aiep/additional').respond(additionalMock);
		CarPremiumService.getAdditionalCoverages().then();

		$httpBackend.flush();
		expect(CarAdditionalViewModel.additionalCoverages).toBeDefined();
	}));

	it('Only sets premiums to CarAdditionalViewModel, when additionalCoverages are already present', inject(function (CarPremiumService, $httpBackend, CarAdditionalViewModel) {
		CarAdditionalViewModel.additionalCoverages = additionalMock.additionalCoverages;
		secondAdditionalMock.additionalCoverages[0].label = 'changed label 1';
		secondAdditionalMock.additionalCoverages[1].label = 'changed label 2';
		secondAdditionalMock.additionalCoverages[2].label = 'changed label 3';
		$httpBackend.when('POST', '/aiep/additional').respond(secondAdditionalMock);

		CarPremiumService.getAdditionalCoverages().then();
		$httpBackend.flush();

		expect(CarAdditionalViewModel.additionalCoverages[0].premium.amount).toBe(secondAdditionalMock.additionalCoverages[0].premium.amount);
		expect(CarAdditionalViewModel.additionalCoverages[1].premium.amount).toBe(secondAdditionalMock.additionalCoverages[1].premium.amount);
		expect(CarAdditionalViewModel.additionalCoverages[2].premium.amount).toBe(secondAdditionalMock.additionalCoverages[2].premium.amount);

		expect(CarAdditionalViewModel.additionalCoverages[0].label).not.toBe(secondAdditionalMock.additionalCoverages[0].label);
		expect(CarAdditionalViewModel.additionalCoverages[1].label).not.toBe(secondAdditionalMock.additionalCoverages[1].label);
		expect(CarAdditionalViewModel.additionalCoverages[2].label).not.toBe(secondAdditionalMock.additionalCoverages[2].label);
	}));
});
