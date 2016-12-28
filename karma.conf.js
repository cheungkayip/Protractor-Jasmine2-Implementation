var sharedConf = require('./node_modules/aiep-build-tools/karma.shared.conf')

module.exports = function (config) {
    config.set({
        files: [

        ]
    });
    
    sharedConf(config);
};