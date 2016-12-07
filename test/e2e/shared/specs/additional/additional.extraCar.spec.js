const AdditionalPanel = require('./../../objects/additional.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const additionalPanel = new AdditionalPanel();

	it('Should wait until the page is loaded', () => {
		Aiepe2etools.general.visibleOnPage(additionalPanel.nextButton);
	});

	it('selects passengerInuries coverage', () => {
		expect(additionalPanel.passengerInjuries.header.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(additionalPanel.passengerInjuries.checkbox.isSelected()).toBe(false);
		additionalPanel.passengerInjuries.checkbox.input.click();
		expect(additionalPanel.passengerInjuries.checkbox.isSelected()).toBe(true);
	});

	it('selects noClaim coverage', () => {
		Aiepe2etools.general.scrollIntoView(additionalPanel.noClaim.header);
		Aiepe2etools.general.visibleOnPage(additionalPanel.noClaim.header);
		expect(additionalPanel.noClaim.header.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		additionalPanel.noClaim.checkbox.input.click();
		expect(additionalPanel.noClaim.checkbox.isSelected()).toBe(true);
	});

	it('selects roadAssistanceNetherlands coverage', () => {
		Aiepe2etools.general.visibleOnPage(additionalPanel.roadAssistanceNetherlands.checkbox.el);
		Aiepe2etools.general.scrollIntoView(additionalPanel.roadAssistanceNetherlands.checkbox.input);
		expect(additionalPanel.roadAssistanceNetherlands.header.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(additionalPanel.roadAssistanceNetherlands.checkbox.isDisabled()).toBeFalsy();
		additionalPanel.roadAssistanceNetherlands.checkbox.input.click();
		expect(additionalPanel.roadAssistanceNetherlands.checkbox.isSelected()).toBe(true);
	});

	it('selects roadAssistanceAbroad coverage', () => {
		Aiepe2etools.general.scrollIntoView(additionalPanel.roadAssistanceAbroad.checkbox.input);
		Aiepe2etools.general.visibleOnPage(additionalPanel.roadAssistanceAbroad.checkbox.el);
		expect(additionalPanel.roadAssistanceAbroad.header.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(additionalPanel.roadAssistanceAbroad.checkbox.isDisabled()).toBeFalsy();
		additionalPanel.roadAssistanceAbroad.checkbox.input.click();
		expect(additionalPanel.roadAssistanceAbroad.checkbox.isSelected()).toBe(true);
	});

	it('should scroll to the next button', () => {
		Aiepe2etools.general.scrollIntoView(additionalPanel.cancelButton);
	});

	it('should click through the additional screen', () => {
		additionalPanel.nextButton.click();
	});
}
