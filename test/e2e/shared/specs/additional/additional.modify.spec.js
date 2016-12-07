const AdditionalPanel = require('./../../objects/additional.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const additionalPanel = new AdditionalPanel();

	it('Should wait until the page is loaded', () => {
		Aiepe2etools.general.visibleOnPage(additionalPanel.nextButton);
	});

	it('should select passenger injuries', () => {
		expect(additionalPanel.passengerInjuries.checkbox.isSelected()).toBe(false);
		additionalPanel.passengerInjuries.checkbox.input.click();
		expect(additionalPanel.passengerInjuries.checkbox.isSelected()).toBe(true);
	});

	it('should already be selected no claim', () => {
		Aiepe2etools.general.scrollIntoView(additionalPanel.noClaim.checkbox.el);
		Aiepe2etools.general.visibleOnPage(additionalPanel.noClaim.checkbox.el);
		expect(additionalPanel.noClaim.checkbox.isSelected()).toBe(true);
	});

	it('should scroll to the next button', () => {
		Aiepe2etools.general.scrollIntoView(additionalPanel.cancelButton);
	});

	it('should click through the additional screen', () => {
		additionalPanel.nextButton.click();
	});
}