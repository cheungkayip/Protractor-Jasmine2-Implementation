'use strict';

const CustomModal = require('skav/artifacts/custom-dialog.component.object.js');
const Notification = require('skav/artifacts/notification.component.object.js');
const RadioButton = require('skav/artifacts/radio-button.component.object.js');
const SelectBoxDropdown = require('skav/artifacts/select-box-dropdown.component.object.js');
const InputDate = require('skav/artifacts/input-date.component.object.js');
const RadioGroup = require('skav/artifacts/radio-group.component.object');
const InputTextSingleLine = require('skav/artifacts/input-text-single-line.component.object.js');
const ToolTip = require('skav/artifacts/tooltip.component.object.js');

function BasicPanel() {

}

BasicPanel.prototype = Object.create({}, {
    basicLamelTitle: {
        get: function () {
            return element(by.id('basic-header'));
        }
    },
    basicNextButton: {
        get: function () {
            return element(by.id('basic-form')).element(by.id('basic-next'));
        }
    },
    basicPreviousButton: {
        get: function () {
            return element(by.id('basic-form')).element(by.id('basic-prev'));
        }
    },
    dialogTitle: {
        get: function () {
            return element.all(by.id('application')).all(by.className('skav-header__title'));
        }
    },
    subTitle: {
        get: function () {
            return element.all(by.id('application')).all(by.className('skav-header__under-title'));
        }
    },
    driverSelect: {
        get: function () {
            return new SelectBoxDropdown('driverSelect');
        }
    },
    driverSelectList: {
        get: function () {
            return element.all(by.id('driverSelect')).all(by.repeater('option in options track by option.key'));
        }
    },
    driverSelectError: {
        get: function () {
            return new Notification('regularDriverCode');
        }
    },
    driverInitials: {
        get: function () {
            return new InputTextSingleLine('driverInitials');
        }
    },
    driverSurname: {
        get: function () {
            return new InputTextSingleLine('driverLastName');
        }
    },
    driverBirthDate: {
        get: function () {
            return new InputDate('driverBirthDate');
        }
    },
    driverRelation: {
        get: function () {
            return new SelectBoxDropdown('relationToDriver');
        }
    },
    driverRelationError: {
        get: function () {
            return new Notification('relationToDriverCode');
        }
    },
    genderLabel: {
        get: function () {
            return new RadioGroup('driverGender');
        }
    },
    genderRadioButton: {
        get: function () {
            return new RadioGroup('driverGender-options');
        }
    },
    genderRadioButton1: {
        get: function () {
            return new RadioButton('driverGender-options');
        }
    },
    genderRadioButton2: {
        get: function () {
            return new RadioButton('driverGender-options');
        }
    },
    claimFreeYears: {
        get: function () {
            return new SelectBoxDropdown('claimFreeYears');
        }
    },
    claimFreeYearsModal: {
        get: function () {
            return new CustomModal('claimFreeYears-dialog');
        }
    },
    claimFreeYearsToolTip: {
        get: function () {
            return new ToolTip('claimFreeYearsToolTip');
        }
    },
    useOfCar: {
        get: function () {
            return new SelectBoxDropdown('useOfCar');
        }
    },
    useOfCarModal: {
        get: function () {
            return new CustomModal('useOfCar-dialog');
        }
    },
    useOfCarToolTip: {
        get: function () {
            return new ToolTip('useOfCarToolTip');
        }
    },
    useOfCarList: {
        get: function () {
            return element.all(by.id('useOfCar')).all(by.repeater('option in options track by option.key'));
        }
    },
    useOfCarError: {
        get: function () {
            return new Notification('useOfCar-business');
        }
    },
    startInputDate: {
        get: function () {
            return new InputDate('startDate');
        }
    }
});

module.exports = BasicPanel;
