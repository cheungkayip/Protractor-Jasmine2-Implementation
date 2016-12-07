const LicensePanel = require('./../../objects/license.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const licensePanel = new LicensePanel();

	it('Should wait until the page is loaded', () => {
		Aiepe2etools.general.visibleOnPage(licensePanel.nextButton);
	});

	it('Should click the license next button and display error message', () => {
		//licensePanel.licensePlate.input.sendKeys('');
		//licensePanel.licensePlate.input.sendKeys(protractor.Key.TAB);
		licensePanel.nextButton.click();
		expect(licensePanel.licensePlate.messages.isDisplayed()).toBe(true);
	});

	it(`fills in ${TestData.car.newCar.licensePlate} in the licenseplate field`, () => {
	    licensePanel.licensePlate.input.sendKeys(TestData.car.newCar.licensePlate);
	});

	it('gets data from audascan service', () => {
		Aiepe2etools.general.visibleOnPage(licensePanel.vehicleBrandElement);
		expect(licensePanel.vehicleBrand).toBe(TestData.car.newCar.brand);
		//expect(licensePanel.vehicleModel).toBe(TestData.car.newCar.vehicleModel);
		expect(licensePanel.vehicleType).toBe(TestData.car.newCar.type);
		expect(licensePanel.vehicleGear).toBe(TestData.car.newCar.gear);
		//expect(licensePanel.vehicleYearOfConstruct).toBe(TestData.car.newCar.yearOfConstruction);
		expect(licensePanel.vehicleFuelDescription).toBe(TestData.car.newCar.fuel);
		expect(licensePanel.vehicleCatalogueValue).toBe(TestData.car.newCar.catalogValueFormatted);
	});

	it('audascan returns correct filled in labels', () => {
		Aiepe2etools.general.visibleOnPage(licensePanel.vehicleBrandLabelElement);
		expect(licensePanel.vehicleBrandLabel).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.vehicleModelLabel).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.vehicleTypeLabel).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.vehicleGearLabel).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.vehicleYearOfConstructLabel).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.vehicleFuelDescriptionLabel).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.vehicleCatalogueValueLabel).not.toContain(TestData.text.Generic.KeyNotFound);
	});

    it('clicks through the license screen', () => {
		Aiepe2etools.general.visibleOnPage(licensePanel.oldtimerQuestion.el);
		licensePanel.oldtimerQuestion.option(1).click();
		expect(licensePanel.oldtimerLabel.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(licensePanel.oldtimerMessage.heading.isDisplayed()).toBeTruthy();
		expect(licensePanel.oldtimerMessage.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('goes to the next screen', () => {
		licensePanel.nextButton.click();
	});
}