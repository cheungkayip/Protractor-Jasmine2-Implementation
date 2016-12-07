'use strict';

describe('Additional Service', function () {
	var AdditionalMock = {
		coverages: []
	};

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('CarAdditionalViewModel', AdditionalMock);
	}));

	it('Should be a valid service', inject(function (CarAdditionalService) {
		expect(CarAdditionalService).toBeDefined();
		expect(CarAdditionalService.save).toBeDefined();
	}));

	it('Save Model should return a valid promise', inject(function (CarAdditionalService) {
		var save = CarAdditionalService.save();
		expect(save.then).toBeDefined();
		expect(save.catch).toBeDefined();
		expect(save.finally).toBeDefined();
	}));

	it('AdditionalCoverages Model should return a valid promise', inject(function (CarAdditionalService) {
		var additionalCoverages = CarAdditionalService.getAdditionalCoverages();
		expect(additionalCoverages.then).toBeDefined();
		expect(additionalCoverages.catch).toBeDefined();
		expect(additionalCoverages.finally).toBeDefined();
	}));

	it('save function promise returns data', inject(function ($httpBackend, CarAdditionalService, urls) {
		var data;
		$httpBackend.when('POST', urls.aiepBusinessModuleSelectedAdditionalCoveragesUrl).respond(true);

		CarAdditionalService.save().then(function (returnedData) {
			data = returnedData;
		});

		$httpBackend.flush();
		expect(data).toBe(true);
	}));

	it('Calls the PremiumService to Get AddtionalCoverages', inject(function ($q, CarPremiumService, CarAdditionalService) {
		spyOn(CarPremiumService, 'getAdditionalCoverages').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		});

		expect(CarPremiumService.getAdditionalCoverages).not.toHaveBeenCalled();
		CarAdditionalService.getAdditionalCoverages();
		expect(CarPremiumService.getAdditionalCoverages).toHaveBeenCalled();
	}));
});
