const LicensePanel = require('./../../objects/license.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const licensePanel = new LicensePanel();

    it('Should wait until the page is loaded', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.nextButton);
    });

    it(`Should clear the licensePlate field`, () => {
        licensePanel.licensePlate.input.clear();
    });

	it(`Should fill in the licensePlate field with ${TestData.car.extraCar.licensePlate}`, () => {
        licensePanel.licensePlate.input.sendKeys(TestData.car.extraCar.licensePlate);
    });

    it('Should retrieve car brand', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.vehicleBrandElement);
        expect(licensePanel.vehicleBrand.getText()).toBe(TestData.car.extraCar.brand);
    });

    it('Should retrieve car model', () => {
        expect(licensePanel.vehicleModel.getText()).toBe(TestData.car.extraCar.vehicleModel);
    });

    it('Should have car type', () => {
        expect(licensePanel.vehicleType.getText()).toBe(TestData.car.extraCar.type);
    });

    it('Should have car gear', () => {
        expect(licensePanel.vehicleGear.getText()).toBe(TestData.car.extraCar.gear);
    });

    it('Should have car year of construction', () => {
        expect(licensePanel.vehicleYearOfConstruct.getText()).toBe(TestData.car.extraCar.yearOfConstruction);
    });

    it('Should have car catalog value', () => {
        expect(licensePanel.vehicleCatalogueValue.getText()).toBe(TestData.car.extraCar.catalogValueFormatted);
    });

    it('Should click on Oldtimer question No', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.oldtimerLabel);
        expect(licensePanel.oldtimerLabel.getText()).toBe(TestData.text.licenseText.labelPassengerCarToOldtimer);
        expect(licensePanel.oldtimerMessage.heading.isDisplayed()).toBeTruthy();
        expect(licensePanel.oldtimerMessage.heading.getText()).toBe(TestData.text.licenseText.ftmAlertYearOfManufacturePassengerCar);
        licensePanel.oldtimerQuestion.option(1).click();
    });

    it('goes to the next screen', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.nextButton);
        licensePanel.nextButton.click();
    });
}