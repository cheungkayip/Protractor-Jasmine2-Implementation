const BasicPanel = require('./../../objects/basic.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const basicPanel = new BasicPanel();

	it('Should select a driver Iemand anders', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.driverSelect.el);
		basicPanel.driverSelect.button.click();
		basicPanel.driverSelect.option(1).click();
	});

	it('Should clear driverInitials and driverSurname', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.driverInitials.el);
		basicPanel.driverInitials.input.clear();
		basicPanel.driverSurname.input.clear();
	});

	it('Should input name', () => {
		basicPanel.driverInitials.input.sendKeys(TestData.car.extraCar.initials);
		basicPanel.driverSurname.input.sendKeys(TestData.car.extraCar.surname);
	});

	it('Should fill in a birthdate', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.driverBirthDate.dayField);
		basicPanel.driverBirthDate.dayField.sendKeys('02');
		basicPanel.driverBirthDate.monthField.sendKeys('06');
		basicPanel.driverBirthDate.yearField.sendKeys('1999');
		basicPanel.driverBirthDate.yearField.sendKeys(protractor.Key.TAB);
	});

	it('Should fill in Gender', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.genderRadioButton.el);
		basicPanel.genderRadioButton.option(1).click();
	});

	it('Should fill in driverRelation', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.driverRelation.el);
		basicPanel.driverRelation.button.click();
		expect(basicPanel.driverRelation.isOpened()).toBeTruthy();
		basicPanel.driverRelation.option(1).click();
	});

	it('Should click claimfreeyears in the modify flow', () => {
		Aiepe2etools.general.scrollIntoView(basicPanel.claimFreeYears.el);
		Aiepe2etools.general.visibleOnPage(basicPanel.claimFreeYears.el);
			basicPanel.claimFreeYears.button.click();
		basicPanel.claimFreeYears.option(0).click();
	});

	it('shows a notification if use of car business is selected', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.useOfCar.el);
		basicPanel.useOfCar.button.click();
		expect(basicPanel.useOfCar.isOpened()).toBeTruthy();
		expect(basicPanel.useOfCarList.get(0).getText()).toBe(TestData.text.basicData.PassengerCarInsuranceVehicleUsePrivate);
		expect(basicPanel.useOfCarList.get(1).getText()).toBe(TestData.text.basicData.PassengerCarInsuranceVehicleUseBusiness);
		basicPanel.useOfCar.option(1).click();

		expect(basicPanel.useOfCarError.heading.isDisplayed()).toBeTruthy();
		expect(basicPanel.useOfCarError.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.useOfCarError.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.useOfCarError.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.useOfCarError.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('does not show a notification if use of car prive is selected', () => {
		basicPanel.useOfCar.button.click();
		expect(basicPanel.useOfCar.isOpened()).toBeTruthy();
		basicPanel.useOfCar.option(0).click();
		expect(basicPanel.driverSelect.messages.isDisplayed()).toBeFalsy();
	});

	it('accepts a start date a year minus one day in the future', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.startInputDate.dayField);
		basicPanel.startInputDate.dayField.sendKeys(Aiepe2etools.date.yearMinusOneDay().day);
		basicPanel.startInputDate.monthField.sendKeys(Aiepe2etools.date.yearMinusOneDay().month);
		basicPanel.startInputDate.yearField.sendKeys(Aiepe2etools.date.yearMinusOneDay().year);
		expect(basicPanel.startInputDate.messages.isDisplayed()).toBeFalsy();
	});

	it('should click through the screen', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.basicNextButton);
		basicPanel.basicNextButton.click(); // Go To Next Lamella
	});
}