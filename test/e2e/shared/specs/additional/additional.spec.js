const extraCarFlow = require('./additional.extraCar.spec');
const modifyFlow = require('./additional.modify.spec');
const newFlow = require('./additional.new.spec');

module.exports = {
	extraCar: extraCarFlow,
	modify: modifyFlow,
	new: newFlow
}