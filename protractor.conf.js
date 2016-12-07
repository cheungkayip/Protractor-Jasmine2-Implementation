var config = require('aiep-e2e-tools/protractor.shared.conf.js').config;

config.suites = {
	mobile: ['./**/e2e/bm/*.e2e.spec.js'],
	regression: ['./**/e2e/bm/*.e2e.spec.js'],
	smoke: ['./**/e2e/bm/*.e2e.spec.js']
}

exports.config = config;