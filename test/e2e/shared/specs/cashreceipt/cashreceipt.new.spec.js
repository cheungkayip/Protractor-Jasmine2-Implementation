const CoveragesPanel = require('./../../objects/coverages.panel.object.js');
const AdditionalPanel = require('./../../objects/additional.panel.object.js');
const CashReceiptPanel = require('aiep-e2e-tools/e2e/objects/cashreceipt.panel.object.js');
// Aiep-e2e-tools
var helpers = require('aiep-e2e-tools').helpers;
const GeneralHelper = helpers.general;


module.exports = function(TestData) {
	const coveragesPanel = new CoveragesPanel();
    const cashReceiptPanel = new CashReceiptPanel();
    const additionalPanel = new AdditionalPanel();

    it('should wait until the page is loaded', () => {
		GeneralHelper.visibleOnPage(coveragesPanel.nextButton);
	});

    it('expands when CashReceipt is clicked', () => {
    	GeneralHelper.visibleOnPage(cashReceiptPanel.cashReceipt);
    	cashReceiptPanel.cashReceipt.click();
    });

    it('should select a coverage and update CashReceipt', () => {
    	GeneralHelper.scrollIntoView(coveragesPanel.liabilityCasco.input);
    	coveragesPanel.liabilityCasco.input.click();
    	expect(cashReceiptPanel.basicCoverageAmount.getText()).toBe(coveragesPanel.liabilityCascoAmount);
    });

    it('should go to the additional panel', () => {
    	GeneralHelper.scrollIntoView(coveragesPanel.nextButton);
    	coveragesPanel.nextButton.click();
    });

    it('selects passengerInuries coverage', () => {
        browser.sleep(3000);
        expect(additionalPanel.passengerInuriesHeader.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
        expect(additionalPanel.passengerInuries.isDisabled()).toBeFalsy();
        additionalPanel.passengerInuries.input.click();
        expect(additionalPanel.passengerInuries.isSelected()).toBe(true);
        expect(cashReceiptPanel.basicCoveragesCount).toBe(1);
        expect(cashReceiptPanel.insuranceCoverageNames).toEqual([ 'Inzittendenverzekering' ]);
    });

    it('selects noClaim coverage', () => {
        expect(additionalPanel.noClaimHeader.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
        expect(additionalPanel.noClaim.isDisabled()).toBeFalsy();
        additionalPanel.noClaim.input.click();
        expect(additionalPanel.noClaim.isSelected()).toBe(true);
        expect(cashReceiptPanel.basicCoveragesCount).toBe(2);
        expect(cashReceiptPanel.insuranceCoverageNames).toEqual([ 'Inzittendenverzekering', 'Interpolis No-Claim Garantie®' ]);
    });

    it('selects roadAssistanceNetherlands coverage', () => {
        GeneralHelper.scrollIntoView(additionalPanel.roadAssistanceNetherlandsHeader);
        expect(additionalPanel.roadAssistanceNetherlandsHeader.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
        expect(additionalPanel.roadAssistanceNetherlands.isDisabled()).toBeFalsy();
        additionalPanel.roadAssistanceNetherlands.input.click();
        expect(additionalPanel.roadAssistanceNetherlands.isSelected()).toBe(true);
        expect(cashReceiptPanel.basicCoveragesCount).toBe(3);
    });

    it('selects roadAssistanceAbroad coverage', () => {
        GeneralHelper.scrollIntoView(additionalPanel.roadAssistanceAbroadHeader);
        expect(additionalPanel.roadAssistanceAbroadHeader.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
        expect(additionalPanel.roadAssistanceAbroad.isDisabled()).toBeFalsy();
        additionalPanel.roadAssistanceAbroad.input.click();
        expect(additionalPanel.roadAssistanceAbroad.isSelected()).toBe(true);
        expect(cashReceiptPanel.basicCoveragesCount).toBe(4);
    });

	it('should go to the next screen', () => {
        GeneralHelper.visibleOnPage(additionalPanel.additionalNextButton);
        GeneralHelper.scrollIntoView(additionalPanel.additionalNextButton);
        additionalPanel.additionalNextButton.click();
    });

}