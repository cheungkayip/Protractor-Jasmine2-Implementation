const BasicPanel = require('./../../objects/basic.panel.object.js');
const Aiepe2etools = require('aiep-e2e-tools/helpers');

module.exports = function(TestData) {
	const basicPanel = new BasicPanel();
	it('Should mandatory field error messages', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.basicNextButton);
		basicPanel.basicNextButton.click();
		Aiepe2etools.general.visibleOnPage(basicPanel.driverSelect.messages);
		expect(basicPanel.driverSelect.messages.isDisplayed()).toBe(true);
		expect(basicPanel.claimFreeYears.messages.isDisplayed()).toBe(true);
		expect(basicPanel.useOfCar.messages.isDisplayed()).toBe(true);
		expect(basicPanel.startInputDate.messages.isDisplayed()).toBe(true);
	});

	it('should not have empty labels', () => {
		expect(basicPanel.basicLamelTitle.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.driverSelect.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.claimFreeYears.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.useOfCar.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.startInputDate.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.basicNextButton.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.basicPreviousButton.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('shows driver fields if second driver option is selected', () => {
		basicPanel.driverSelect.button.click();
		expect(basicPanel.driverSelect.isOpened()).toBeTruthy();
		expect(basicPanel.driverSelectList.get(0).getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		basicPanel.driverSelect.option(1).click();
		Aiepe2etools.general.visibleOnPage(basicPanel.driverSelectError.heading);
		expect(basicPanel.driverSelectError.heading.isDisplayed()).toBe(true);
	});

	it('driver labels are filled in', () => {
		expect(basicPanel.driverSelectError.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.driverInitials.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.driverSurname.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.driverBirthDate.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.genderLabel.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.genderRadioButton.option(0).getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.genderRadioButton.option(1).getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.driverRelation.label.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('should select driverSelect dropdown', () => {
		basicPanel.driverSelect.button.click();
		expect(basicPanel.driverSelect.isOpened()).toBeTruthy();
		basicPanel.driverSelect.option(0).click();
		expect(basicPanel.driverSelect.messages.isDisplayed()).toBeFalsy();
	});

	it('Should select dropdown claimFreeYears', () => {
		basicPanel.claimFreeYears.button.click();
		expect(basicPanel.claimFreeYears.isOpened()).toBeTruthy();
		basicPanel.claimFreeYears.option(0).click();
	});

	it('Should click the dropdown and check the first 2 items', () => {
		basicPanel.useOfCar.button.click();
		expect(basicPanel.useOfCar.isOpened()).toBeTruthy();
		//expect(basicPanel.useOfCarList.get(0).getText()).toBe(TestData.text.basicData.PassengerCarInsuranceVehicleUsePrivate);
		//expect(basicPanel.useOfCarList.get(1).getText()).toBe(TestData.text.basicData.PassengerCarInsuranceVehicleUseBusiness);
		expect(basicPanel.useOfCarList.get(0).getText()).not.toContain(TestData.text.Generic.KeyNotFound);
		expect(basicPanel.useOfCarList.get(1).getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('Should select useOfCar Zakelijk and check for error', () => {
		basicPanel.useOfCar.option(1).click();
		expect(basicPanel.useOfCarError.heading.isDisplayed()).toBeTruthy();
		//expect(basicPanel.useOfCarError.heading.getText()).toContain(TestData.text.basicData.ftmAlertVehicleUsePassengerCar01);
		//expect(basicPanel.useOfCarError.heading.getText()).toContain(TestData.text.basicData.ftmAlertVehicleUsePassengerCar02);
		//expect(basicPanel.useOfCarError.heading.getText()).toContain(TestData.text.basicData.ftmAlertVehicleUsePassengerCar03);
		//expect(basicPanel.useOfCarError.heading.getText()).toContain(TestData.text.basicData.ftmAlertVehicleUsePassengerCar04);
		expect(basicPanel.useOfCarError.heading.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('Should select prive and continue the flow', () => {
		basicPanel.useOfCar.button.click();
		expect(basicPanel.useOfCar.isOpened()).toBeTruthy();
		basicPanel.useOfCar.option(0).click();
		expect(basicPanel.driverSelect.messages.isDisplayed()).toBeFalsy();
	});

	it('should open a pop up for claim free years', () => {
		basicPanel.claimFreeYearsToolTip.informationalIcon.click();
		Aiepe2etools.general.visibleOnPage(basicPanel.claimFreeYearsModal.dialog);
		expect(basicPanel.claimFreeYearsModal.isOpened()).toBeTruthy();
		expect(basicPanel.claimFreeYearsModal.dialog.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('should close a pop up for claim free years', () => {
		basicPanel.claimFreeYearsModal.closeButton.click();
		Aiepe2etools.general.notVisibleOnPage(basicPanel.claimFreeYearsModal.dialog);
		expect(basicPanel.claimFreeYearsModal.isOpened()).toBe(false);
	});

	it('should open a pop up for use of car', () => {
		basicPanel.useOfCarToolTip.informationalIcon.click();
		Aiepe2etools.general.visibleOnPage(basicPanel.useOfCarModal.dialog);
		expect(basicPanel.useOfCarModal.isOpened()).toBeTruthy();
		expect(basicPanel.useOfCarModal.dialog.getText()).not.toContain(TestData.text.Generic.KeyNotFound);
	});

	it('should close a pop up for use of car', () => {
		basicPanel.useOfCarModal.closeButton.click();
		Aiepe2etools.general.notVisibleOnPage(basicPanel.useOfCarModal.dialog);
		expect(basicPanel.useOfCarModal.isOpened()).toBe(false);
	});

	it('should fill in a valid start date', () => {
		Aiepe2etools.general.visibleOnPage(basicPanel.startInputDate.dayField);
		basicPanel.startInputDate.dayField.sendKeys(Aiepe2etools.date.yearMinusOneDay().day);
		basicPanel.startInputDate.monthField.sendKeys(Aiepe2etools.date.yearMinusOneDay().month);
		basicPanel.startInputDate.yearField.sendKeys(Aiepe2etools.date.yearMinusOneDay().year);
		// Check errors are not visible
		expect(basicPanel.startInputDate.messages.isDisplayed()).toBeFalsy();
	});

	it('should go to the next panel', () => {
		basicPanel.basicNextButton.click(); // Go To Next Lamella
	});
}