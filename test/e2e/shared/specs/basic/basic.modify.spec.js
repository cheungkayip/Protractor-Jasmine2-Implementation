const BasicPanel = require('./../../objects/basic.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const basicPanel = new BasicPanel();
	var yearMinusOneDay = Aiepe2etools.date.yearMinusOneDay();
	it('should be displaying basic Panel', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.startInputDate.label);
	});

	it('Should select driverSelect', () => {
		basicPanel.driverSelect.button.click();
		expect(basicPanel.driverSelect.isOpened()).toBeTruthy();
		basicPanel.driverSelect.option(0).click();
		expect(basicPanel.driverSelect.messages.isDisplayed()).toBeFalsy();
	});

	it('claimFreeYears is disabled', () => {
		expect(basicPanel.claimFreeYears.isDisabled()).toBeTruthy();
	});

	it('use of car can be changed', () => {
		basicPanel.useOfCar.button.click();
		expect(basicPanel.useOfCar.isOpened()).toBeTruthy();
		basicPanel.useOfCar.option(1).click();

		expect(basicPanel.useOfCarError.heading.isDisplayed()).toBeTruthy();
		basicPanel.useOfCar.button.click();
		expect(basicPanel.useOfCar.isOpened()).toBeTruthy();
		basicPanel.useOfCar.option(0).click();
		expect(basicPanel.driverSelect.messages.isDisplayed()).toBeFalsy();
	});

	it(`should fill in a start date ${yearMinusOneDay.day}-${yearMinusOneDay.month}-${yearMinusOneDay.year}`, () => {
		basicPanel.startInputDate.dayField.sendKeys(yearMinusOneDay.day);
		basicPanel.startInputDate.monthField.sendKeys(yearMinusOneDay.month);
		basicPanel.startInputDate.yearField.sendKeys(yearMinusOneDay.year);
		expect(basicPanel.startInputDate.messages.isDisplayed()).toBeFalsy();
	});

	it('goes to the next screen', () => {
		basicPanel.basicNextButton.click(); // Go To Next Lamella
	});
}