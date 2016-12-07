'use strict';

const LoginPage = require('aiep-e2e-tools/helpers/login.js'); // Generic Login Page Object from Aiep-common
const PrefillPage = require('./../nonAngularObjects/car.prefill.page.js');
const AfterPage = require('./../nonAngularObjects/car.after.page.js');
const GeneralHelper = require('aiep-e2e-tools/helpers/general.js');
const PrefillFields = require('./../shared/data').prefillFields;
// Test Data
const TestData = require('./../shared').data;

// Specs
const CarSpecs = require('./../shared').specs;
const CheckcodeSpecs = require('configure-checkcode-insurance/e2e').specs;

// aiep-e2e-tools
const helpers = require('aiep-e2e-tools').helpers;
const yearMinusOneDay = helpers.date.yearMinusOneDay();

describe('Car BM modify flow', () => {

	describe('Prefill screen', () => {
		const prefillPage = new PrefillPage();

		it('Should login', () => {
			const loginPage = new LoginPage();
			loginPage.loginBm(TestData.login);
		});

		it('Should prefill CR2222 in State fields with document.querySelector', () => {
			const data = PrefillFields.modify.carInState;
			GeneralHelper.prefillTheFields(data);
		});
        it('Should click the save update button', () => {
            prefillPage.saveUpdate.click();
        });

		it('Should prefill saveUserCredentials in the state with document.querySelector', () => {
			const data = PrefillFields.modify.saveUserCredentials;
			GeneralHelper.prefillTheFields(data);
		});
		it('Should click the saveUser button', () => {
			browser.driver.isElementPresent(By.id('saveUser')).then(function () {
				prefillPage.saveUser.click();
			});
		});

		it('Should prefill the updateState fields with document.querySelector', () => {
			const data = PrefillFields.modify.updateTheState;
			GeneralHelper.prefillTheFields(data);
			//prefillPage.additionalCoverage3.click();
		});

		it('Should click the update state button', () => {
			browser.driver.isElementPresent(By.id('updateState')).then(function () {
				prefillPage.updateState.click();
			});
		});

		it('Should click the Wijzigen button to start the modify flow', () => {
			browser.driver.isElementPresent(By.xpath('//*[@value="modify"]')).then(function () {
				prefillPage.Wijzigen.click();
			});
		});
	});

	describe('Replace Vehicle panel', function() {
		CarSpecs.replaceVehicle.modify(TestData)
	});

    describe('License panel', function() {
        CarSpecs.license.modify(TestData)
    });

	describe('Basic panel', function() {
		CarSpecs.basic.modify(TestData)
	});
	describe('Coverages panel', function() {
		CarSpecs.coverages.modify(TestData)
	});
	describe('Additional panel', function() {
		CarSpecs.additional.modify(TestData)
	});
	describe('Checkcode panel', function() {
		CheckcodeSpecs.modify(TestData)
	});

	describe('After Page', () => {
		const afterPage = new AfterPage();
		it('Should set ignore browser.Synchronization on true because of AfterPage', () => {
			isAngularSite(false); // set this back to false (Afterpage is not Angular)
		});

		 it('Should have correct car data', () => {
		// 	browser.driver.isElementPresent(By.id('licensePlate')).then(function () {
				expect(afterPage.licensePlate.getText()).toBe(TestData.car.modifyCar.licensePlate, 'unexpected licensePlate on afterPage');
				expect(afterPage.yearOfManufacture.getText()).toBe(TestData.car.modifyCar.yearOfConstruction2, 'unexpected yearOfManufacture on afterPage');
				expect(afterPage.bodyShape.getText()).toBe(TestData.car.modifyCar.bodyshape, 'unexpected bodyShape on afterPage');
				expect(afterPage.brand.getText()).toBe(TestData.car.modifyCar.brand, 'unexpected brand on afterPage');
				expect(afterPage.model.getText()).toBe(TestData.car.modifyCar.vehicleModel, 'unexpected model on afterPage');
				expect(afterPage.type.getText()).toBe(TestData.car.modifyCar.type, 'unexpected type on afterPage');
				//expect(afterPage.yearOfConstruction.getText()).toBe(TestData.car.modifyCar.yearOfConstruction, 'unexpected yearOfConstruction on afterPage');
				expect(afterPage.gear.getText()).toBe(TestData.car.modifyCar.gear, 'unexpected gear on afterPage');
				expect(afterPage.fuelDescription.getText()).toBe(TestData.car.modifyCar.fuel, 'unexpected fuelDescription on afterPage');
				expect(afterPage.weight.getText()).toBe(TestData.car.modifyCar.weight, 'unexpected weight on afterPage');
				expect(afterPage.catalogValue.getText()).toBe(TestData.car.modifyCar.catalogValue, 'unexpected catalogValue on afterPage');
			// });
		});

		it('Should have correct basic data', () => {
			expect(afterPage.relationToDriver.getText()).toBe(TestData.car.modifyCar.relationToDriverModified, 'unexpected  on afterPage');
			expect(afterPage.genderCode.getText()).toBe(TestData.car.modifyCar.userGenderCode, 'unexpected genderCode on afterPage');
			expect(afterPage.surname.getText()).toBe(TestData.car.modifyCar.userSurname, 'unexpected surname on afterPage');
			expect(afterPage.initials.getText()).toBe(TestData.car.modifyCar.userInitials, 'unexpected initials on afterPage');
			expect(afterPage.birthDate.getText()).toBe(TestData.car.modifyCar.userBirthDate, 'unexpected birthDate on afterPage');
			expect(afterPage.claimFreeYears.getText()).toBe(TestData.car.modifyCar.claimFreeYearsDescriptionModified, 'unexpected claimFreeYears on afterPage');
			expect(afterPage.useOfCar.getText()).toBe(TestData.car.modifyCar.useOfCarDescription, 'unexpected useOfCar on afterPage');
			expect(afterPage.ownRisk.getText()).toBe(TestData.car.modifyCar.ownRisk, 'unexpected ownRisk on afterPage');
		});

		it('Should have correct coverages', () => {
			expect(afterPage.ownRisk.getText()).toBe(TestData.car.modifyCar.ownRisk, 'unexpected ownRisk on afterPage');
			expect(afterPage.coverage.getText()).toBe(TestData.car.modifyCar.basicCoverageDescriptionModified, 'unexpected coverage on afterPage');
		});

		it('Should have correct additional coverages', () => {
			expect(afterPage.additionalCoverages.getText()).toBe(TestData.car.modifyCar.additionalDescriptionModified, 'unexpected additionalCoverages on afterPage');
		});

		it('Should have a correct checkcode', () => {
			expect(afterPage.checkCode.getText()).toBe(TestData.car.modifyCar.checkCode, 'unexpected checkCode on afterPage');
			afterPage.Reset.click();
		});
	});
});
