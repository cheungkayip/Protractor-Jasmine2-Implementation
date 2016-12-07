'use strict';

var AdditionalTableRow = require('common-bm-frontend/artifacts/additional-table-row.component.object.js');

function AdditionalPanel() {}

AdditionalPanel.prototype = Object.create({}, {
	nextButton: {
		get: function () {
			return element(by.id('additional-next'));
		}
	},
	prevButton: {
		get: function () {
			return element(by.id('additional-prev'));
		}
	},
	cancelButton: {
		get: function() {
			return element(by.id('additional-cancel'));
		}
	},
	lamelTitle: {
		get: function () {
			return element(by.id('additional-header'));
		}
	},
	passengerInjuries: {
		get: function() {
			return new AdditionalTableRow('PassengerInjuries');
		}
	},
	roadAssistanceNetherlands: {
		get: function() {
			return new AdditionalTableRow('RoadAssistanceNetherlands');
		}
	},
	roadAssistanceAbroad: {
		get: function() {
			return new AdditionalTableRow('RoadAssistanceAbroad');
		}
	},
	noClaim: {
		get: function() {
			return new AdditionalTableRow('NoClaimProtection');
		}
	}
});

module.exports = AdditionalPanel;
