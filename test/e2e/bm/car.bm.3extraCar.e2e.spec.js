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
const yearMinusOneDay = require('aiep-e2e-tools').helpers.date.yearMinusOneDay();

describe('Car BM extra car flow', () => {
    describe('Prefill screen', () => {
        const prefillPage = new PrefillPage();

        it('Should login', () => {
            const loginPage = new LoginPage();
            loginPage.loginBm(TestData.login);
        });

        it('Should prefill Skoda Octavia EXCA01 in State fields with document.querySelector', () => {
            const data = PrefillFields.extraCar.carInState;
            GeneralHelper.prefillTheFields(data);
        });

        it('Should click saveUpdate Button for Skoda', () => {
            browser.driver.isElementPresent(By.id('saveUpdate')).then(function () {
                prefillPage.saveUpdate.click();
            });
        });

        it('Should prefill EXCA01 saveUserCredentials with Mark Geel document.querySelector', () => {
            const data = PrefillFields.extraCar.saveUserCredentials;
            GeneralHelper.prefillTheFields(data);
        });

        it('Should click the saveUserButton', () => {
            browser.driver.isElementPresent(By.id('saveUser')).then(function () {
                prefillPage.saveUser.click();
            });
        });

        it('Should prefill Peugeot 308 BLUE HDI CR2222 in State fields with document.querySelector', () => {
            const data = PrefillFields.modify.carInState;
            GeneralHelper.prefillTheFields(data);
        });

        it('Should click the Save Update button for Peugeot', () => {
            browser.driver.isElementPresent(By.id('saveUpdate')).then(function () {
                prefillPage.saveUpdate.click();
            });
        });

        it('Should prefill the updateState fields with document.querySelector', () => {
            const data = PrefillFields.extraCar.updateTheState;
            GeneralHelper.prefillTheFields(data);
        });

        it('should update state', () => {
            browser.driver.isElementPresent(By.id('updateState')).then(function () {
                prefillPage.updateState.click();
            });
        });
        it('should click the nieuw button', () => {
            browser.driver.isElementPresent(By.xpath('//*[@value="new"]')).then(function () {
                prefillPage.Nieuw.click();
            });
        });

        it('Should set ignore browser.Synchronization on false', () => {
            isAngularSite(true); // set this back to AngularSite
        });
    });

    describe('Replace Vehicle panel', function() {
        CarSpecs.replaceVehicle.extraCar(TestData)
    });
    describe('License panel', function() {
        CarSpecs.license.extraCar(TestData)
    });
    describe('Basic panel', function() {
        CarSpecs.basic.extraCar(TestData)
    });
    describe('Coverages panel', function() {
        CarSpecs.coverages.extraCar(TestData)
    });
    describe('Additional panel', function() {
        CarSpecs.additional.extraCar(TestData)
    });
    describe('Checkcode panel', function() {
        CheckcodeSpecs.modify(TestData)
    });

    describe('After Page', () => {
        const  afterPage = new AfterPage();
        it('Should set ignore browser.Synchronization on true because of AfterPage', () => {
            isAngularSite(false); // set this back to false (Afterpage is not Angular)
        });

        it('Should have correct car data', () => {
            browser.driver.isElementPresent(By.id('licensePlate')).then(function () {
                expect(afterPage.licensePlate.getText()).toBe(TestData.car.extraCar.licensePlate, 'unexpected licensePlate on afterPage');
                expect(afterPage.yearOfManufacture.getText()).toBe(TestData.car.extraCar.yearOfConstruction2, 'unexpected yearOfManufacture on afterPage');
                expect(afterPage.bodyShape.getText()).toBe(TestData.car.extraCar.bodyshape, 'unexpected bodyShape on afterPage');
                expect(afterPage.brand.getText()).toBe(TestData.car.extraCar.brand, 'unexpected brand on afterPage');
                expect(afterPage.model.getText()).toBe(TestData.car.extraCar.vehicleModel, 'unexpected model on afterPage');
                expect(afterPage.type.getText()).toBe(TestData.car.extraCar.type, 'unexpected type on afterPage');
                expect(afterPage.yearOfConstruction.getText()).toBe(TestData.car.extraCar.yearOfConstruction, 'unexpected yearOfConstruction on afterPage');
                expect(afterPage.gear.getText()).toBe(TestData.car.extraCar.gear, 'unexpected gear on afterPage');
                expect(afterPage.fuelDescription.getText()).toBe(TestData.car.extraCar.fuel, 'unexpected fuelDescription on afterPage');
                expect(afterPage.weight.getText()).toBe(TestData.car.extraCar.weight, 'unexpected weight on afterPage');
                expect(afterPage.catalogValue.getText()).toBe(TestData.car.extraCar.catalogValue, 'unexpected catalogValue on afterPage');
                expect(afterPage.startDate.getText()).toBe(yearMinusOneDay.value, 'unexpected startDate on afterPage');
            });
        });

        it('Should have correct basic data', () => {
            //expect(afterPage.relationToDriver.getText()).toBe(TestData.car.extraCar.relationToDriver);
            expect(afterPage.genderCode.getText()).toBe(TestData.car.extraCar.userGenderCode, 'unexpected genderCode on afterPage');
            expect(afterPage.surname.getText()).toBe(TestData.car.extraCar.surname, 'unexpected surname on afterPage');
            expect(afterPage.initials.getText()).toBe(TestData.car.extraCar.initials, 'unexpected initials on afterPage');
            expect(afterPage.birthDate.getText()).toBe(TestData.car.extraCar.birthdate, 'unexpected birthDate on afterPage');
            expect(afterPage.claimFreeYears.getText()).toBe(TestData.car.extraCar.claimFreeYearsDescription, 'unexpected claimFreeYears on afterPage');
            expect(afterPage.useOfCar.getText()).toBe(TestData.car.extraCar.useOfCarDescription, 'unexpected useOfCar on afterPage');
        });

        it('Should have correct coverages', () => {
            expect(afterPage.ownRisk.getText()).toBe(TestData.car.extraCar.ownRisk, 'unexpected ownRisk on afterPage');
            expect(afterPage.coverage.getText()).toBe(TestData.car.extraCar.basicCoverage, 'unexpected coverage on afterPage');
        });

        it('Should have correct additional coverages', () => {
            expect(afterPage.additionalCoverages.getText()).toBe(TestData.car.extraCar.additionalCoverages, 'unexpected additionalCoverages on afterPage');
        });

        it('Should have a correct checkcode', () => {
            expect(afterPage.checkCode.getText()).toBe(TestData.car.extraCar.checkCode, 'unexpected checkCode on afterPage');
            afterPage.Reset.click();
        });
    });
});
