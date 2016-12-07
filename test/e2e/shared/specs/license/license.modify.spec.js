const LicensePanel = require('./../../objects/license.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const licensePanel = new LicensePanel();

    it('Should wait until the page is loaded', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.nextButton);
    });

    it('Should retrieve car brand', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.vehicleBrandElement);
        expect(licensePanel.vehicleBrand.getText()).toBe(TestData.car.modifyCar.brand);
    });

    it('Should retrieve car model', () => {
        expect(licensePanel.vehicleModel.getText()).toBe(TestData.car.modifyCar.vehicleModel);
    });

    it('Should have car type', () => {
        expect(licensePanel.vehicleType.getText()).toBe(TestData.car.modifyCar.type);
    });

    it('Should have car gear', () => {
        expect(licensePanel.vehicleGear.getText()).toBe(TestData.car.modifyCar.gear);
    });

    it('Should have car year of construction', () => {
        expect(licensePanel.vehicleYearOfConstruct.getText()).toBe(TestData.car.modifyCar.yearOfConstruction);
    });

    it('Should have car catalog value', () => {
        expect(licensePanel.vehicleCatalogueValue.getText()).toBe(TestData.car.modifyCar.catalogValueFormatted);
    });

    it('Should click on Next button', () => {
        Aiepe2etools.general.visibleOnPage(licensePanel.nextButton);
        licensePanel.nextButton.click();
    });
}