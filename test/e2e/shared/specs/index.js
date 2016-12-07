const additional = require('./additional/additional.spec');
const basic = require('./basic/basic.spec');
const coverages = require('./coverages/coverages.spec');
const cashreceipt = require('./cashreceipt/cashreceipt.spec');
const license = require('./license/license.spec');
const replaceVehicle = require('./replaceVehicle/replaceVehicle.spec');

module.exports = {
	cashreceipt: cashreceipt,
	additional: additional,
	basic: basic,
	coverages: coverages,
	license: license,
	replaceVehicle: replaceVehicle
}