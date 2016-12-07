'use strict';

const LoginPage = require('aiep-e2e-tools/helpers/login.js');
const GeneralHelper = require('aiep-e2e-tools/helpers/general.js');
const PrefillPage = require('./../nonAngularObjects/car.prefill.page.js');
const AfterPage = require('./../nonAngularObjects/car.after.page.js');
const PrefillFields = require('./../shared/data').prefillFields;
// Test Data
const TestData = require('./../shared').data;

// Specs
const CarSpecs = require('./../shared').specs;
const CheckcodeSpecs = require('configure-checkcode-insurance/e2e').specs;

// aiep-e2e-tools
const helpers = require('aiep-e2e-tools').helpers;
const yearMinusOneDay = helpers.date.yearMinusOneDay();

describe('Car BM new flow', () => {
    describe('Prefill', () => {
        var prefillPage = new PrefillPage();
        it('Should login', () => {
            const loginPage = new LoginPage();
            loginPage.loginBm(TestData.login);
        });

        it('Should prefill Car in State fields with document.querySelector', () => {
            const data = PrefillFields.new.carInState;
            GeneralHelper.prefillTheFields(data);
        });

        it('Should click the save update button', () => {
            prefillPage.saveUpdate.click();
        });

        it('Should prefill userInState fields with document.querySelector', () => {
            const data = PrefillFields.new.saveUserCredentials;
            GeneralHelper.prefillTheFields(data);
        });

        it('Should save the user credentials in the state', () => {
            browser.driver.isElementPresent(By.id('saveUser')).then(function () {
                prefillPage.saveUser.click();
            });
        });

        it('Should enter the flow', () => {
            browser.driver.isElementPresent(By.xpath('//*[@value="new"]')).then(function () {
                prefillPage.Nieuw.click();
            });
        });

        it('Should set ignore browser.Synchronization on false', () => {
            isAngularSite(true); // set this back to AngularSite
        });
    });
    
    describe('License panel', function() {
        CarSpecs.license.new(TestData)
    });
    describe('Basic panel', function() {
        CarSpecs.basic.new(TestData)
    });
    describe('Coverage panel', function() {
        CarSpecs.coverages.new(TestData)
    });
    describe('Additional panel', function() {
        CarSpecs.additional.new(TestData)
    });
    describe('Checkcode panel', function() {
        CheckcodeSpecs.new(TestData)
    });

    describe('After Page', () => {
        const afterPage = new AfterPage();
        it('Should set ignore browser.Synchronization on true because of AfterPage', () => {
            isAngularSite(false); // set this back to false (Afterpage is not Angular)
        });

        it('Should have correct car data', () => {
            browser.driver.isElementPresent(By.id('licensePlate')).then(function () {
                expect(afterPage.licensePlate.getText()).toBe(TestData.car.newCar.licensePlate, 'unexpected licensePlate on afterPage');
                expect(afterPage.yearOfManufacture.getText()).toBe(TestData.car.newCar.yearOfConstruction2, 'unexpected yearOfManufacture on afterPage');
                expect(afterPage.bodyShape.getText()).toBe(TestData.car.newCar.bodyshape, 'unexpected bodyShape on afterPage');
                expect(afterPage.brand.getText()).toBe(TestData.car.newCar.brand, 'unexpected brand on afterPage');
                expect(afterPage.model.getText()).toBe(TestData.car.newCar.vehicleModel, 'unexpected model on afterPage');
                expect(afterPage.type.getText()).toBe(TestData.car.newCar.type, 'unexpected type on afterPage');
                expect(afterPage.yearOfConstruction.getText()).toBe(TestData.car.newCar.yearOfConstruction2, 'unexpected yearOfConstruction on afterPage');
                expect(afterPage.gear.getText()).toBe(TestData.car.newCar.gear, 'unexpected gear on afterPage');
                expect(afterPage.fuelDescription.getText()).toBe(TestData.car.newCar.fuel, 'unexpected fuelDescription on afterPage');
                expect(afterPage.weight.getText()).toBe(TestData.car.newCar.weight, 'unexpected weight on afterPage');
                expect(afterPage.catalogValue.getText()).toBe(TestData.car.newCar.catalogValue, 'unexpected catalogValue on afterPage');
            });

        });

        it('Should have correct basic data', () => {
            expect(afterPage.startDate.getText()).toBe(yearMinusOneDay.value, 'unexpected startDate on afterPage');
            expect(afterPage.relationToDriver.getText()).toBe(TestData.car.newCar.relationToDriver, 'unexpected relationToDriver on afterPage');
            expect(afterPage.genderCode.getText()).toBe(TestData.car.newCar.userGenderCode, 'unexpected genderCode on afterPage');
            expect(afterPage.surname.getText()).toBe(TestData.car.newCar.userSurname, 'unexpected surname on afterPage');
            expect(afterPage.initials.getText()).toBe(TestData.car.newCar.userInitials, 'unexpected initials on afterPage');
            expect(afterPage.birthDate.getText()).toBe(TestData.car.newCar.userBirthDate, 'unexpected birthDate on afterPage');
            expect(afterPage.claimFreeYears.getText()).toBe(TestData.car.newCar.claimFreeYearsDescription, 'unexpected claimFreeYears on afterPage');
            expect(afterPage.useOfCar.getText()).toBe(TestData.car.newCar.useOfCarDescription, 'unexpected useOfCar on afterPage');
        });

        it('Should have correct coverages', () => {
            expect(afterPage.ownRisk.getText()).toBe(TestData.car.newCar.ownRisk, 'unexpected ownRisk on afterPage');
            expect(afterPage.coverage.getText()).toBe(TestData.car.newCar.basicCoverage, 'unexpected coverage on afterPage');
        });

        it('Should have correct additional coverages', () => {
            expect(afterPage.additionalCoverages.getText()).toBe(TestData.car.newCar.additionalCoverages, 'unexpected additionalCoverages on afterPage');
        });

        it('Should have a correct checkcode', () => {
            expect(afterPage.checkCode.getText()).toBe(TestData.car.newCar.checkCode, 'unexpected additionalCoverages on afterPage');
            afterPage.Reset.click();
        });
    });
});

