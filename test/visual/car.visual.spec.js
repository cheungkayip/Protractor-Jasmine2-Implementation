'use strict';

import assert from 'assert';
import {visual} from 'aiep-build-tools';

const port = process.env.E2E_PORT || process.env.PORT || 9000;
const client = require('webdriverio').remote( {
	host: '10.239.24.204',
	desiredCapabilities:{browserName: visual.broswer}
})

require('webdrivercss').init(client, visual.config);

function check(err, res) {
	const testName = Object.keys(res);
	const data = res[testName][0];
	assert.ifError(err);
	assert.ok(data.isWithinMisMatchTolerance, 'Car ' + testName + ' ' + data.message);
	console.log('Car ' + testName + ' is ok');
}

client
	.init()
	.url(visual.baseurl)
	// .scroll('#situation-1')
	// .click('#situation-1')
	// .pause(100)
	// .webdrivercss('extraHome',[{name: 'newHouse', elem: '#application'}], check)
	// .scroll('#extraHome-next')
	// .click('#extraHome-next')
	// .pause(1000)
	// .webdrivercss('inventoryUse',[{name: 'ownUse', elem: '#application'}], check)
	// .scroll('#inventoryUse-next')
	// .click('#inventoryUse-next')
	// .pause(1000)
	// .scroll('#houseHold')
	// .click('#houseHold-field-wrapper')
	// .click('#houseHold_02')
	// .pause(500)
	// .scroll('#ownerRenterCode-1')
	// .click('#ownerRenterCode-1')
	// .scroll('#studentFlag-true')
	// .click('#studentFlag-true')
	// .pause(100)
	// .scroll('#lodger-true')
	// .click('#lodger-true')
	// .scroll('#inventoryValue')
	// .click('#inventoryValue-field-wrapper')
	// .click('#inventoryValue_01')
	// .scroll('#startDate')
	// .click('#startDate-lbl')
	// .keys('12')
	// .pause(100)
	// .click('#startDate-month')
	// .keys('12')
	// .pause(100)
	// .click('#startDate-year')
	// .keys('2016')
	// .pause(100)
	// .webdrivercss('inventoryBasic',[{name: 'basicHappyFlow', elem: '#basic'}], check)
	// .scroll('#basic-next')
	// .click('#basic-next')
	// .pause(1000)
	// .webdrivercss('inventoryCoverage',[{name: 'coverageHappyFlow', elem: '#application'}], check)
	.end();