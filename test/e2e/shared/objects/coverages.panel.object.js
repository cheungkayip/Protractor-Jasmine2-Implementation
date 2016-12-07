'use strict';

const Coverage = require('common-bm-frontend/artifacts/coverage.component.object.js');
const CoverageTable = require('common-bm-frontend/artifacts/coverage-table.component.object.js');

function CoveragesPanel() {}

CoveragesPanel.prototype = Object.create({}, {
    liability: {
        get: function () {
            return new Coverage('Liability');
        }
    },
    liabilityCascoLimited: {
        get: function () {
            return new Coverage('LiabilityCascoLimited');
        }
    },
    liabilityCasco: {
        get: function () {
            return new Coverage('LiabilityCasco');
        }
    },
    nextButton: {
        get: function () {
            return element(by.id('coverage-next'));
        }
    },
    previousButton: {
        get: function () {
            return element(by.id('coverage-prev'));
        }
    },
    table: {
        get: function () {
            return new CoverageTable();
        }
    }
});
module.exports = CoveragesPanel;
