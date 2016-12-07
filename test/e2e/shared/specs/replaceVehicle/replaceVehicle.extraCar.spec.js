const ReplaceVehiclePanel = require('./../../objects/replaceVehicle.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
    const replaceVehiclePanel = new ReplaceVehiclePanel();

    it('Should wait until the page is loaded', () => {
        Aiepe2etools.general.visibleOnPage(replaceVehiclePanel.cancelButton);
    });

    it('Should fill in the Autoverzekering wijzigen screen', () => {
        // replaceVehiclePanel.radioSituation1.input.click();
        replaceVehiclePanel.radioSituation2.input.click();
    });

    it('goes to the next screen', () => {
        replaceVehiclePanel.nextButton.click();
    });
}