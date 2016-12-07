var sharedConf = require('./node_modules/aiep-build-tools/karma.shared.conf')

module.exports = function (config) {
    config.set({
        files: [
            'node_modules/configure-driver-insurance/configure-driver-insurance.js',
            'node_modules/configure-checkcode-insurance/configure-checkcode-insurance.js',
            'node_modules/configure-discontinue-insurance/configure-discontinue-insurance.js'
        ]
    });
    
    sharedConf(config);
};