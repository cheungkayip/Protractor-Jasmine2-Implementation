'use strict';

describe('License Controller', function () {
	var scope,
		licenseController,
		element,
		licenseMock = readJSON('mocks/aiep/license/GET.json'),
		newcar = readJSON('mocks/aiep/car/new.json'),
		oldTimercar = readJSON('mocks/aiep/car/oldtimer.json'),
		errorCar = readJSON('mocks/aiep/car/error.json');

	beforeEach(angular.mock.module('aiepModule'));

	beforeEach(angular.mock.inject(function ($rootScope, $httpBackend, ViewModelFactory) {
		scope = $rootScope.$new();
		scope.vm = {
			panel: {
				name: 'license',
				buttons: {}
			}
		};
		$httpBackend.when('GET', '/aiep/license').respond(licenseMock);

		spyOn(ViewModelFactory, 'init').and.callThrough();
	}));

	beforeEach(angular.mock.inject(function ($compile) {
		element = angular.element('<car-license panel="vm.panel"></car-license>');
		$compile(element)(scope); // Compile the directive
		scope.$digest(); // Update the HTML

		licenseController = element.isolateScope().vm;
	}));

	afterEach(function () {
		scope.$destroy();
	});

	it('Should have a valid controller', function () {
		expect(licenseController).toBeDefined();
	});

	it('Calls ViewModelFactory to get its own data when panel is opened', inject(function ($q, ViewModelFactory, $httpBackend) {
		licenseController.panel.open = true;
		$httpBackend.flush();

		expect(ViewModelFactory.init).toHaveBeenCalled();

		expect(licenseController.model.licensePlateNumber).toBeDefined();
		expect(licenseController.model.oldTimerInsurance).toBeDefined();
		expect(licenseController.model.messages).toBeDefined();
	}));

	it('Does call ViewModelFactory again every time the panel is opened', inject(function (ViewModelFactory, $httpBackend, $compile) {
		licenseController.panel.open = true;
		$httpBackend.flush();

		expect(ViewModelFactory.init).toHaveBeenCalled();

		ViewModelFactory.init.calls.reset();

		element = angular.element('<car-license panel="vm.panel"></car-license>');
		$compile(element)(scope); // Compile the directive
		licenseController.panel.open = true;
		scope.$digest(); // Update the HTML

		expect(ViewModelFactory.init).toHaveBeenCalled();
	}));

	it('Controller Validate function returns Promise', inject(function ($q, $httpBackend, CarLicenseService) {
		var saveModelPromise,
			deferred = $q.defer();

		// Fake the InsuranceService
		spyOn(CarLicenseService, 'save').and.callFake(function () {
			deferred.resolve();
			return deferred.promise;
		});

		saveModelPromise = licenseController.panel.onValid();
		expect(saveModelPromise.then).toBeDefined();
		expect(saveModelPromise.catch).toBeDefined();
		expect(saveModelPromise.finally).toBeDefined();
	}));

	it('Returns true after saving model', inject(function ($q, $httpBackend, CarLicenseService) {
		var valid,
			deferred = $q.defer();

		licenseController.panel.open = true;
		$httpBackend.flush();

		spyOn(CarLicenseService, 'save').and.callFake(function () {
			deferred.resolve({});
			return deferred.promise;
		});

		licenseController.panel.onValid()
			.then(function (response) {
				valid = response;
			});

		scope.$digest();

		expect(valid).toBe(true);
	}));

	it('Reloads app if old timer switch is selected', inject(function ($q, $httpBackend, $window, CarLicenseService) {
		var valid,
			deferred = $q.defer();

		licenseController.panel.open = true;
		$httpBackend.flush();

		licenseController.model.oldTimerInsurance.value = 'value.boolean.true';

		spyOn($window.location, 'reload');

		spyOn(CarLicenseService, 'save').and.callFake(function () {
			deferred.resolve();
			return deferred.promise;
		});

		licenseController.panel.onValid()
			.then(function (response) {
				valid = response;
			});

		scope.$digest();

		expect($window.location.reload).toHaveBeenCalled();
		expect(valid).toBe(false);
	}));

	/*
	**  getVehicleData tests
	*/
	it('getVehicleData calls CarLicenseService with current licensePlate', inject(function ($q, $httpBackend, CarLicenseService) {
		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();

		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});

		licenseController.model.licensePlateNumber.value = newcar.licensePlate;
		licenseController.getVehicleData();
		expect(CarLicenseService.getVehicleData).toHaveBeenCalledWith(newcar.licensePlate);

		licenseController.model.licensePlateNumber.value = oldTimercar.licensePlate;
		licenseController.getVehicleData();
		expect(CarLicenseService.getVehicleData).toHaveBeenCalledWith(oldTimercar.licensePlate);
	}));

	it('getVehicleData sets vehicle data on licenseController.model.vehicle after data returns', inject(function ($q, $httpBackend, CarLicenseService) {
		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();

		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});
		licenseController.model.licensePlateNumber.value = 'AA-AA-AA';

		licenseController.model.vehicle = undefined;
		expect(licenseController.model.vehicle).toBeUndefined();

		licenseController.getVehicleData();
		expect(licenseController.model.vehicle).toBeUndefined();
		scope.$digest();

		expect(licenseController.model.vehicle).toBeDefined();
	}));

	it('getVehicleData disables and enables buttons', inject(function ($q, $httpBackend, CarLicenseService) {
		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();

		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});
		licenseController.model.licensePlateNumber.value = 'AA-AA-AA';

		licenseController.model.vehicle = undefined;

		licenseController.getVehicleData();
		expect(licenseController.panel.buttons.nextDisabled).toBe(true);
		expect(licenseController.panel.buttons.prevDisabled).toBe(true);

		scope.$digest();
		expect(licenseController.panel.buttons.nextDisabled).toBe(false);
		expect(licenseController.panel.buttons.prevDisabled).toBe(false);
	}));

	it('getVehicleData sets vehicle data to false after data returns', inject(function ($q, $httpBackend, CarLicenseService) {
		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});

		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();
		licenseController.model.licensePlateNumber.value = 'AA-AA-AA';
		licenseController.model.licensePlateNumber.disabled =true;

		licenseController.getVehicleData();
		scope.$digest();

		expect(licenseController.model.licensePlateNumber.disabled).toBe(false);
	}));

	it('getVehicleData sets License from returned data', inject(function ($q, $httpBackend, CarLicenseService) {
		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});

		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();
		licenseController.model.licensePlateNumber.value = 'AA-AA-AA';

		expect(licenseController.model.licensePlateNumber.value).toBe('AA-AA-AA');

		licenseController.getVehicleData();
		scope.$digest();

		expect(licenseController.model.licensePlateNumber.value).toBe(newcar.licensePlate);
	}));

	it('getVehicleData sets Messages if present', inject(function ($q, $httpBackend, CarLicenseService) {
		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});
		newcar.messages = {
			'0064': 'TEST MESSAGE'
		};

		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();

		licenseController.getVehicleData();
		scope.$digest();
		expect(licenseController.model.vehicle.messages['0064']).toBe('TEST MESSAGE');
	}));

	it('getVehicleData does not change license if error', inject(function ($q, $httpBackend, $timeout, CarLicenseService) {
		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(errorCar);
			return deferred.promise;
		});

		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();
		licenseController.model.licensePlateNumber.value = 'AA-AA-AA';

		licenseController.getVehicleData();
		scope.$digest();
		$timeout.flush();

		expect(licenseController.model.licensePlateNumber.value).toBe('AA-AA-AA');
	}));

	it('getVehicleData sets isOldtimer', inject(function ($q, $httpBackend, CarLicenseService) {
		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});

		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();

		// Check that it is not previously set
		expect(licenseController.model.isOldtimer).toBeUndefined();

		licenseController.getVehicleData();
		scope.$digest();
		expect(licenseController.model.isOldtimer).toBe(newcar.isOldTimer);
	}));

	it('Gets car data by default if licenseplate is already defined', inject(function ($q, $httpBackend, CarLicenseService) {
		spyOn(CarLicenseService, 'getVehicleData').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(newcar);
			return deferred.promise;
		});
		spyOn(licenseController, 'getVehicleData').and.callThrough();
		licenseMock.licensePlateNumber.value = 'AA-AA-AA';

		// Triggers ViewModelFactory promise
		licenseController.panel.open = true;
		$httpBackend.flush();

		expect(licenseController.getVehicleData).toHaveBeenCalled();
	}));
});
