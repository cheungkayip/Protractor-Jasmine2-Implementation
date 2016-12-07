'use strict';

var InputCarNumberPlate = require('skav/artifacts/input-car-number-plate.component.object.js');
var Notification = require('skav/artifacts/notification.component.object.js');
var RadioGroup = require('skav/artifacts/radio-group.component.object');
var ToolTip = require('skav/artifacts/tooltip.component.object.js');

function LicensePanel() {

}

LicensePanel.prototype = Object.create({}, {
    nextButton: {
        get: function () {
            return element(by.id('license-form')).element(by.id('license-next'));
        }
    },
    previousButton: {
        get: function () {
            return element(by.id('license-form')).element(by.id('license-prev'));
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
    licenseLamelTitle: {
        get: function () {
            return element(by.id('license-header'));
        }
    },
    licenseText: {
        get: function () {
            return element.all(by.id('licensePlateNumber')).all(by.className('skav-input-car-number-plate__label'));
        }
    },
    licensePlate: {
        get: function () {
            return new InputCarNumberPlate('licensePlateNumber');
        }
    },
    vehicleBrand: {
        get: function () {
            return this.vehicleBrandElement.getAttribute('value').getText();
        }
    },
    vehicleBrandElement: {
        get: function () {
            return element(by.id('fld_brand'));
        }
    },
    vehicleBrandLabel: {
        get: function () {
            return this.vehicleBrandLabelElement.getAttribute('value').getText();
        }
    },
    vehicleBrandLabelElement: {
        get: function () {
            return element(by.id('lbl_brand'));
        }
    },
    vehicleModel: {
        get: function () {
            return element(by.id('fld_model')).getAttribute('value').getText();
        }
    },
    vehicleModelLabel: {
        get: function () {
            return element(by.id('lbl_model')).getAttribute('value').getText();
        }
    },
    vehicleType: {
        get: function () {
            return element(by.id('fld_type')).getAttribute('value').getText();
        }
    },
    vehicleTypeLabel: {
        get: function () {
            return element(by.id('lbl_type')).getAttribute('value').getText();
        }
    },
    vehicleGear: {
        get: function () {
            return element(by.id('fld_gear')).getAttribute('value').getText();
        }
    },
    vehicleGearLabel: {
        get: function () {
            return element(by.id('lbl_gear')).getAttribute('value').getText();
        }
    },
    vehicleYearOfConstruct: {
        get: function () {
            return element(by.id('fld_yearOfConstruct')).getAttribute('value').getText();
        }
    },
    vehicleYearOfConstructLabel: {
        get: function () {
            return element(by.id('lbl_yearOfConstruct')).getAttribute('value').getText();
        }
    },
    vehicleFuelDescription: {
        get: function () {
            return element(by.id('fld_fuelDescription')).getAttribute('value').getText();
        }
    },
    vehicleFuelDescriptionLabel: {
        get: function () {
            return element(by.id('lbl_fuelDescription')).getAttribute('value').getText();
        }
    },
    vehicleCatalogueValue: {
        get: function () {
            return element(by.id('fld_catalogueValue')).getAttribute('value').getText();
        }
    },
    vehicleCatalogueValueLabel: {
        get: function () {
            return element(by.id('lbl_catalogueValue')).getAttribute('value').getText();
        }
    },
    oldtimerQuestion: {
        get: function () {
            return new RadioGroup("oldTimerInsurance-options");
        }
    },
    oldtimerMessage: {
        get: function () {
            return new Notification('oldtimer-alert');
        }
    },
    oldtimerLabel: {
        get: function () {
            return element(by.id('oldTimerInsurance-lbl'));
        }
    }
});

module.exports = LicensePanel;
