var path = require('path');
var process = require('process');
var webpack = require('webpack');

/**
 * @param options The build configuration.
 * @param options.istanbul Build with instanbul instrumentation.
 * @param options.min Build minified version.
 * @param options.prod Build production version (with accurate sourcemaps).
 */
function createConfig(options) {
	options = options || {};
	/*
	 * SHARED
	 */
	var config = {
		devtool: options.prod ? 'hidden-source-map' : 'cheap-module-source-map',
		context: path.join(process.cwd(), './src'),
		entry: {
			js: path.join(process.cwd(), './src/app/module.js')
		},
		output: {
			filename: options.name + '.js',
			path: path.join(process.cwd(), './dist/')
		},
		externals: {
			angular: 'angular'
		},
		eslint: {
			configFile: path.resolve(__dirname, '.eslintrc')
		},
		module: {
			loaders: [
				{
					test: /\.html$/,
					loader: 'raw'
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel',
					query: {
						babelrc: true,
						cacheDirectory: true
					}
				}
			]
		},
		plugins: [
			new webpack.LoaderOptionsPlugin({
	        	minimize: options.min,
	        	debug: !options.min
	      	}),
	      	new webpack.DefinePlugin({
	        	'process.env': {
	          		NODE_ENV: options.prod ? '"production"' : '"development"'
	        	}
	      	})
	    ]
	};

	/*
	 * ISTANBUL
	 */
	if (options.istanbul) {
		config.output.filename = config.output.filename.replace('.js', '-istanbul.js');
		config.module.preLoaders = [{
			test: /\.js$/, loader: 'babel', exclude: /node_modules/,
			query: {
				plugins: [
					[
						'istanbul', {
							'exclude': [
								'./node_modules/karma-read-json/karma-read-json.js',
								'./node_modules/skav/js/skav-lib.js',
								'./node_modules/aiep-common/javascript/aiep-common.js',
								'./node_modules/angular-mocks/angular-mocks.js',
								'./src/**/*spec.js'
							]
						}
					]
				]
			}
		}];
	}

	/*
	 * MINIFICATION
	 */
	if (options.min) {
		config.output.filename = config.output.filename.replace('.js', '.min.js');
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
				output: {
					comments: false
				}
			})
		);
	}

	return config;
};

module.exports = createConfig;
