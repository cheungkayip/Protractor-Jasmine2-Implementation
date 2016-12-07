const extraCarFlow = require('./license.extraCar.spec');
const newFlow = require('./license.new.spec');
const modify = require('./license.modify.spec');

module.exports = {
	extraCar: extraCarFlow,
	modify: modify,
	new: newFlow
}