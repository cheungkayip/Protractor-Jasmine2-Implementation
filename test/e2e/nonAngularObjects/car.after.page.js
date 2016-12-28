
'use strict';
function AfterPage() {
}

var findById = function(name) {
    return browser.driver.findElement(by.id(name));
};

var findByXpath = function(value) {
    return browser.driver.findElement(by.xpath(value));
};

AfterPage.prototype = Object.create({}, {
    //Verzekerd object
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
    bodyShape: {
        get: function () {
            return findById('bodyShape');
        }
    },
    brand: {
        get: function () {
            return findById('brand');
        }
    },
    model: {
        get: function () {
            return findById('model');
        }
    },
    type: {
        get: function () {
            return findById('type');
        }
    },
    yearOfConstruction: {
        get: function () {
            return findById('yearOfConstruction');
        }
    },
    gear: {
        get: function () {
            return findById('gear');
        }
    },
    fuelDescription: {
        get: function () {
            return findById('fuelDescription');
        }
    },
    weight: {
        get: function () {
            return findById('weight');
        }
    },
    catalogValue: {
        get: function () {
            return findById('catalogueValue');
        }
    },

    //Basic data
    startDate: {
        get: function () {
            return findById('startDate');
        }
    },
    modifyDate: {
        get: function () {
            return findById('changeDate');
        }
    },
    relationToDriver: {
        get: function () {
            return findById('relationToDriver');
        }
    },
    genderCode: {
        get: function () {
            return findById('userGenderCode');
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
    birthDate: {
        get: function () {
            return findById('birthDate');
        }
    },
    claimFreeYears: {
        get: function () {
            return findById('claimFreeYears');
        }
    },
    useOfCar: {
        get: function () {
            return findById('useOfCar');
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
    additionalCoverages: {
        get: function () {
            return findById('additionalCoverages');
        }
    },
    checkCode: {
        get: function () {
            return findById('checkCode');
        }
    },
    discontinueDate: {
        get: function () {
            return findById('discontinueDate');
        }
    },
    Reset: {
        get: function () {
            return findByXpath('//*[@id="ph_wizard"]/form/button[2]');
        }
    }
});

module.exports = AfterPage;
