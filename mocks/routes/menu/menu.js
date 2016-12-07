const menu = { 
	'title': 'Autoverzekering', 
	'subTitle': 'De Alles In 1 Polis',
	'productTypeCode': '0801',
	'productType': 'car',
	'steps': [
		{'title': 'Invullen', 'panels': []}, 
		{'title': 'Samenstellen', 'panels': []}, 
		{'title': 'Aanvullen', 'panels': []}
	],
	"businessModules": [
		{
			"name": "configure-car-insurance"
		},
		{
			"name": "configure-driver-insurance"
		},
		{
			"name": "configure-checkcode-insurance"
		},
		{
			"name": "configure-payment-method"
		},
		{
			"name": "configure-closing-questions-insurance"
		}
	],
};

const panels = {
	replaceVehicle: {'name': 'replaceVehicle', 'title': 'Voertuig vervangen'},
	license: {'name': 'license', 'title': 'Uw Aanhangwagen'},
	basic: {'name': 'basic', 'title': 'Basisgegevens'},
	coverage: {'name': 'coverage', 'title': 'Uw basisdekking'},
	additional: {'name': 'additional', 'title': 'Aanvullende dekkingen'},
	checkcode: {'name': 'checkcode', 'title': 'Checkcode'}
};

const standard = [
	['license', 'basic'],
	['coverage', 'additional'],
	['checkcode']
];

function menuFactory(panel) {
	let dynamicMenu = menu;
	if (panel === undefined || panels[panel] === undefined) {
		for (let i = dynamicMenu.steps.length - 1; i >= 0; i--) {
			let step = dynamicMenu.steps[i];
			step.panels = [];
			for (let j = 0; j < standard[i].length; j++) {
				step.panels.push(panels[standard[i][j]]);
			}
		}
	} else {
		dynamicMenu.steps[0].panels = [panels[panel]];
	}
	return dynamicMenu;
}

module.exports = menuFactory;