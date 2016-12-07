const extraCarFlow = require('./coverages.extraCar.spec');
const modifyFlow = require('./coverages.modify.spec');
const newFlow = require('./coverages.new.spec');

module.exports = {
	extraCar: extraCarFlow,
	modify: modifyFlow,
	new: newFlow
}