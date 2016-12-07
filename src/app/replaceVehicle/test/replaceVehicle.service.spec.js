'use strict';

describe('ReplaceVehicle Service', function () {
	var mock = readJSON('mocks/aiep/replacevehicle/GET.json');

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('CarReplaceVehicleViewModel', mock);
	}));

	it('Should be a valid service', inject(function (CarReplaceVehicleService) {
		expect(CarReplaceVehicleService).toBeDefined();
		expect(CarReplaceVehicleService.cancel).toBeDefined();
		expect(CarReplaceVehicleService.extra).toBeDefined();
	}));

	it('cancel function should return a valid promise', inject(function (CarReplaceVehicleService) {
		var cancel = CarReplaceVehicleService.cancel();
		expect(cancel.then).toBeDefined();
		expect(cancel.catch).toBeDefined();
		expect(cancel.finally).toBeDefined();
	}));

	it('extra function should return a valid promise', inject(function (CarReplaceVehicleService) {
		var extra = CarReplaceVehicleService.extra();
		expect(extra.then).toBeDefined();
		expect(extra.catch).toBeDefined();
		expect(extra.finally).toBeDefined();
	}));

	it('cancel function promise returns data', inject(function ($httpBackend, CarReplaceVehicleService, urls) {
		var data;
		$httpBackend.when('POST', urls.aiepBusinessModuleExitFlowUrl).respond(true);

		CarReplaceVehicleService.cancel().then(function (returnedData) {
			data = returnedData;
		});

		$httpBackend.flush();
		expect(data).toBe(true);
	}));

	it('extra function promise returns data', inject(function ($httpBackend, CarReplaceVehicleService, urls) {
		var data;
		$httpBackend.when('POST', urls.aiepBusinessModuleReplaceVehicleAnswersUrl).respond(true);

		CarReplaceVehicleService.extra().then(function (returnedData) {
			data = returnedData;
		});

		$httpBackend.flush();
		expect(data).toBe(true);
	}));
});
