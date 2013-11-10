
/**
 * Routes - Serve routes to our AngularJS client
 * To setup routes, make a function that serves the file
 * Afterwards, set up the route in the main "exports" function.
 */

exports.load = function(app) {
	app.get('/', exports.index);
	app.get('/page/:page', exports.pages);
	app.get('/partials/:partial', exports.partials);
};

exports.index = function(req, res) {
	res.sendfile('views/index.html');
};

exports.pages = function(req, res) {
	res.sendfile('views/pages/' + req.params.page + '.html');
};

exports.partials = function (req, res) {
	res.sendfile('views/partials/' + req.params.partial + '.html');
};
