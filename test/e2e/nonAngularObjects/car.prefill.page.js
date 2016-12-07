/**
 * Created by brinkwj on 14-04-2016.
 */
'use strict';
function PrefillPage() {
}

var findById = function(name) {
    return browser.driver.findElement(by.id(name));
};

var findByXpath = function(value) {
    return browser.driver.findElement(by.xpath(value));
};

PrefillPage.prototype = Object.create({}, {
    //Car in State
    CarsInState: {
        get: function () {
            return findByXpath('//*[@id="ph_wizard"]/form[3]/table/tbody/tr[1]/td[2]');
        }
    },
    retrievedLicensePlate: {
        get: function () {
            return findById('retrievedLicensePlate');
        }
    },
    retrievedBrand: {
        get: function () {
            return findById('brand');
        }
    },
    retrievedType: {
        get: function () {
            return findById('type');
        }
    },
    retrievedModel: {
        get: function () {
            return findById('model');
        }
    },
    retrievedWeight: {
        get: function () {
            return findById('weight');
        }
    },
    retrievedGear: {
        get: function () {
            return findById('gear');
        }
    },
    retrievedFuel: {
        get: function () {
            return findById('fuelDescription');
        }
    },
    retrievedCatalogueValue: {
        get: function () {
            return findById('catalogueValue');
        }
    },
    retrievedBodyShape: {
        get: function () {
            return findById('bodyShape');
        }
    },
    retrievedYearOfConstruction: {
        get: function () {
            return findById('YearOfConstruction');
        }
    },

    //set user
    userGenderCode: {
        get: function () {
            return findById('userGenderCode');
        }
    },
    userSurname: {
        get: function () {
            return findById('userSurname');
        }
    },
    userInitials: {
        get: function () {
            return findById('userInitials');
        }
    },
    userDateOfBirth: {
        get: function () {
            return findById('userDateOfBirth');
        }
    },

    //set changeflow data
    prefillMeldcode: {
        get: function () {
            return findById('checkCode');
        }
    },
    licensePlate: {
        get: function () {
            return findById('licensePlate');
        }
    },
    yearOfManufacture: {
        get: function () {
            return findById('yearOfManufacture');
        }
    },
    policyStartDate: {
        get: function () {
            return findById('policyStartDate');
        }
    },
    startDate: {
        get: function () {
            return findById('startDate');
        }
    },
    relationToDriver: {
        get: function () {
            return findById('relationToDriver');
        }
    },
    genderCode: {
        get: function () {
            return findById('genderCode');
        }
    },
    surname: {
        get: function () {
            return findById('surname');
        }
    },
    initials: {
        get: function () {
            return findById('initials');
        }
    },
    dateOfBirth: {
        get: function () {
            return findById('dateOfBirth');
        }
    },
    useOfCar: {
        get: function () {
            return findById('useOfCar');
        }
    },
    claimFreeYears: {
        get: function () {
            return findById('claimFreeYears');
        }
    },
    ownRisk: {
        get: function () {
            return findById('ownRisk');
        }
    },
    coverage: {
        get: function () {
            return findById('coverage');
        }
    },
    additionalCoverage3: {
        get: function () {
            return findByXpath('//*[@id="additionalCoverages"]/option[3]');
        }
    },
    coverage1: {
        get: function () {
            return findByXpath('//*[@id="coverage"]/option[1]');
        }
    },
    coverage3: {
        get: function () {
            return findByXpath('//*[@id="coverage"]/option[3]');
        }
    },
    additionalCoverages: {
        get: function () {
            return findById('additionalCoverages');
        }
    },
    shouldShowLegalNotification: {
        get: function () {
            return findById('shouldShowLegalNotification');
        }
    },
    //buttons
    updateState: {
        get: function () {
            return findById('updateState');
        }
    },
    saveUpdate: {
        get: function () {
            return findById('saveUpdate');
        }
    },
    saveUser: {
        get: function () {
            return findById('saveUser');
        }
    },
    Nieuw: {
        get: function () {
            return findByXpath('//*[@value="new"]');
        }
    },
    Wijzigen: {
        get: function () {
            return findByXpath('//*[@value="modify"]');
        }
    },
    Opzeggen: {
        get: function () {
            return findByXpath('//*[@value="discontinue"]');
        }
    }
});

module.exports = PrefillPage;
