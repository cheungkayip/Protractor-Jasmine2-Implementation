'use strict';

describe('License Service', function () {
	var licenseMock = {
			licensePlateNumber: {
				label: 'Wat is het kenteken van uw auto?',
				value: 'AAAAAA'
			},
			oldTimerInsurance: {
				label: 'Wilt u gebruik maken van de klassiekerverzekering?',
				value: false
			},
			vehicle: {
				selected: 1
			}
		},
		carMock = {
			licensePlate: 'DU-MM-YY',
			brand: 'honda',
			yearOfConstruction: '2012',
			model: 'Solex',
			type: '1.6'
		};

	beforeEach(angular.mock.module('aiepModule', function ($provide) {
		$provide.value('CarLicenseViewModel', licenseMock);
	}));

	it('Should be a valid service', inject(function (CarLicenseService) {
		expect(CarLicenseService).toBeDefined();
		expect(CarLicenseService.getVehicleData).toBeDefined();
		expect(CarLicenseService.save).toBeDefined();
	}));

	it('getVehicleData should return a valid promise', inject(function (CarLicenseService) {
		var carData = CarLicenseService.getVehicleData();
		expect(carData.then).toBeDefined();
		expect(carData.catch).toBeDefined();
		expect(carData.finally).toBeDefined();
	}));

	it('Does a http call to get Car Data, and returns valid data', inject(function (CarLicenseService, $httpBackend, urls) {
		var carResponse;

		$httpBackend.when('POST', urls.aiepBusinessModuleCarUrl).respond(carMock);

		CarLicenseService.getVehicleData(carMock.licensePlate).then(function (response) {
			carResponse = response;
		});

		$httpBackend.flush();
		expect(carResponse.licensePlate).toBe(carMock.licensePlate);
		expect(carResponse.brand).toBe(carMock.brand);
		expect(carResponse.yearOfConstruction).toBe(carMock.yearOfConstruction);
		expect(carResponse.model).toBe(carMock.model);
		expect(carResponse.type).toBe(carMock.type);
	}));

	/*
	** Save License Function
	*/
	it('save function should return a valid promise', inject(function (CarLicenseService, $httpBackend, urls) {
		var save;

		$httpBackend.when('POST', urls.aiepBusinessModuleLicenseAnswersUrl).respond(true);

		save = CarLicenseService.save();
		expect(save.then).toBeDefined();
		expect(save.catch).toBeDefined();
		expect(save.finally).toBeDefined();
	}));

	it('save function promise returns data', inject(function (CarLicenseService, $httpBackend, urls) {
		var data;
		$httpBackend.when('POST', urls.aiepBusinessModuleLicenseAnswersUrl).respond(true);

		CarLicenseService.save().then(function (returnedData) {
			data = returnedData;
		});

		$httpBackend.flush();
		expect(data).not.toBeUndefined();
	}));
});
