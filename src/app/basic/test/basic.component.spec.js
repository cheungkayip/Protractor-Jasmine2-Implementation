'use strict';


describe('Basic Controller', function () {
	var scope,
		element,
		basicController,
		compile,
		basicMock = readJSON('mocks/aiep/basic/GET.json');

	beforeEach(angular.mock.module('aiepModule'));

	beforeEach(angular.mock.inject(function ($httpBackend, ViewModelFactory) {
		$httpBackend.when('GET', '/aiep/basic').respond(basicMock);
		spyOn(ViewModelFactory, 'init').and.callThrough();
	}));

	beforeEach(angular.mock.inject(function ($compile, $rootScope) {
		compile = $compile;
		scope = $rootScope.$new();
		scope.vm = {
			panel: {
				name: 'basic',
				buttons: {
					next: 'Bereken'
				}
			}
		};
	}));

	function createController() {
		element = angular.element('<car-basic panel="vm.panel"></car-basic>');
		compile(element)(scope); // Compile the directive
		scope.$digest(); // Update the HTML

		basicController = element.isolateScope().vm;
	}

	afterEach(function () {
		scope.$destroy();
	});

	it('Should have a valid controller', function () {
		createController();

		expect(basicController).toBeDefined();
	});

	it('Calls ViewModelFactory to get its own data when panel is opened', inject(function (ViewModelFactory, $httpBackend) {
		createController();
		basicController.panel.open = true;
		$httpBackend.flush();

		expect(ViewModelFactory.init).toHaveBeenCalled();

		expect(basicController.model.driverView.regularDriverCode).toBeDefined();
		expect(basicController.model.driverView.relationToDriver).toBeDefined();
		expect(basicController.model.startDate).toBeDefined();
		expect(basicController.model.messages).toBeDefined();
	}));

	it('Does call ViewModelFactory again every time the panel is opened', inject(function ($q, ViewModelFactory, $httpBackend) {
		createController();
		basicController.panel.open = true;
		$httpBackend.flush();

		expect(ViewModelFactory.init).toHaveBeenCalled();

		ViewModelFactory.init.calls.reset();

		element = angular.element('<car-basic panel="vm.panel"></car-basic>');
		compile(element)(scope); // Compile the directive
		basicController.panel.open = true;
		scope.$digest(); // Update the HTML

		expect(ViewModelFactory.init).toHaveBeenCalled();
	}));

	/*
	** Use of car watcher
	*/
	it('Calls setWatchers after getting data', inject(function ($httpBackend) {
		createController();
		basicController.panel.open = true;

		spyOn(basicController, 'setWatchers').and.callThrough();
		expect(basicController.setWatchers).not.toHaveBeenCalled();

		// Triggers ViewModelFactory promise
		$httpBackend.flush();

		expect(basicController.setWatchers).toHaveBeenCalled();
	}));

	it('Calls changes panel button text if useofcar value changes', inject(function ($httpBackend) {
		createController();
		basicController.panel.open = true;
		$httpBackend.flush();

		expect(basicController.panel.buttons.next).toBe('Bereken');

		basicController.model.useOfCar.value = 'Zakelijk';
		scope.$apply();
		expect(basicController.panel.buttons.nextDisabled).toBe(true);

		basicController.model.useOfCar.value = 'prive';
		scope.$apply();
		expect(basicController.panel.buttons.next).toBe('Bereken');
	}));

	it('Controller Validate function returns Promise', inject(function ($q, $httpBackend, CarBasicService) {
		var saveModelPromise,
			deferred = $q.defer();

		createController();

		// Fake the InsuranceService
		spyOn(CarBasicService, 'save').and.callFake(function () {
			deferred.resolve();
			return deferred.promise;
		});

		saveModelPromise = basicController.panel.onValid();
		expect(saveModelPromise.then).toBeDefined();
		expect(saveModelPromise.catch).toBeDefined();
		expect(saveModelPromise.finally).toBeDefined();
	}));

	it('Returns true after saving model', inject(function ($q, $httpBackend, CarBasicService) {
		var valid,
			deferred = $q.defer();

		createController();

		spyOn(CarBasicService, 'save').and.callFake(function () {
			deferred.resolve({});
			return deferred.promise;
		});

		basicController.panel.onValid()
			.then(function (response) {
				valid = response;
			});

		scope.$digest();

		expect(valid).toBe(true);
	}));
});
