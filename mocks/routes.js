'use strict';

import fs from 'fs';
import path from 'path';
import routes from './routes/routes';

module.exports = function(app) {
	app.get('/:panel', (req, res) => {
		res.format({
			'text/html': () => {
				res.send(fs.readFileSync(path.join(__dirname, '../', 'index.html')));
			}
		});
	});

	app.get('/aiep/menu', (req, res) => {
		let referer = req.headers.referer ? req.headers.referer : '';
		let baseUrl = referer.slice(referer.indexOf(req.headers.host));
		res.send(routes.menuFactory(baseUrl.split('/')[1]));
	});

	app.post('/aiep/car', routes.car);

	app.get('/aiep/*', (req, res) => {
	    res.send(require(path.join(__dirname, req.url, 'GET.json')));
	});

	app.post('/aiep/*', (req, res) => {
	    res.send(require(path.join(__dirname, req.url, 'POST.json')));
	});
}
