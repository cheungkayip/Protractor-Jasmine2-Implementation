'use strict';
var RadioButton = require('skav/artifacts/radio-button.component.object.js');
var RadioGroup = require('skav/artifacts/radio-group.component.object');

function ReplaceVehiclePanel() {

}

ReplaceVehiclePanel.prototype = Object.create({}, {
    radioSituation1: {
        get: function () {
            return new RadioButton('situation-modifyVehicle');
        }
    },
    radioSituation2: {
        get: function () {
            return new RadioButton('situation-replaceVehicle');
        }
    },
     newCarAssuranceButton: {
         get: function () {
             return element(by.id('replaceVehicle-next'));
         }
     },
    cancelButton: {
        get: function () {
            return element(by.id('replaceVehicle-prev'));
        }
    },
    previousButton: {
        get: function () {
            return element(by.id('replaceVehicle-prev'));
        }
    },
    nextButton: {
        get: function () {
            return element(by.id('replaceVehicle-next'));
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
    replaceForm: {
        get: function () {
            return element(by.id('replaceVehicle-header'));
        }
    }
});

module.exports = ReplaceVehiclePanel;
