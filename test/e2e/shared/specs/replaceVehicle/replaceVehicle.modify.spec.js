const ReplaceVehiclePanel = require('./../../objects/replaceVehicle.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const replaceVehiclePanel = new ReplaceVehiclePanel();

    it('Should wait until the page is loaded', () => {
        Aiepe2etools.general.visibleOnPage(replaceVehiclePanel.cancelButton);
    });

	it('has filled in radio button labels', () => {
        Aiepe2etools.general.visibleOnPage(replaceVehiclePanel.radioSituation1.el);
        expect(replaceVehiclePanel.radioSituation1.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
        expect(replaceVehiclePanel.radioSituation2.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
    });

    it('selects second radio button', () => {
        Aiepe2etools.general.visibleOnPage(replaceVehiclePanel.radioSituation2.el);
        replaceVehiclePanel.radioSituation2.input.click();
        replaceVehiclePanel.radioSituation2.input.click();
        expect(replaceVehiclePanel.cancelButton.isPresent()).toBe(true);
    });

    it('selects first radio button', () => {
        replaceVehiclePanel.radioSituation1.input.click();
    });
    
    it('goes to the next screen', () => {
        replaceVehiclePanel.nextButton.click();
    });
}