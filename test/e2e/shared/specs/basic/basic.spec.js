const extraCarFlow = require('./basic.extraCar.spec');
const modifyFlow = require('./basic.modify.spec');
const newFlow = require('./basic.new.spec');

module.exports = {
	extraCar: extraCarFlow,
	modify: modifyFlow,
	new: newFlow
}