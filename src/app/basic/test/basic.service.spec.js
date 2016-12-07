'use strict';

describe('Basic Service', function () {
	var BasicMock = readJSON('mocks/aiep/basic/modify.json');

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('CarBasicViewModel', BasicMock);
	}));

	it('Should be a valid service', inject(function (CarBasicService) {
		expect(CarBasicService).toBeDefined();
		expect(CarBasicService.save).toBeDefined();
	}));

	it('save function should return a valid promise', inject(function (CarBasicService) {
		var save = CarBasicService.save();
		expect(save.then).toBeDefined();
		expect(save.catch).toBeDefined();
		expect(save.finally).toBeDefined();
	}));

	it('save function promise returns data', inject(function ($httpBackend, CarBasicService, urls) {
		var data;
		$httpBackend.when('POST', urls.aiepBusinessModuleBasicAnswersUrl).respond(true);

		CarBasicService.save().then(function (returnedData) {
			data = returnedData;
		});

		$httpBackend.flush();
		expect(data).toBe(true);
	}));

	it('save function fills defaults', inject(function (CarBasicService) {
		var save;

		BasicMock.driverView.initials.value = null;
		BasicMock.driverView.surname.value = null;
		BasicMock.driverView.genderCode.value = null;
		BasicMock.driverView.birthDate.value = null;
		BasicMock.driverView.relationToDriver.value = null;

		save = CarBasicService.save();
		expect(save.then).toBeDefined();
		expect(save.catch).toBeDefined();
		expect(save.finally).toBeDefined();
	}));
});
