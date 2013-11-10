
/**
 * Routes - Serve routes to our AngularJS client
 * To setup routes, make a function that serves the file
 * Afterwards, set up the route in the main "exports" function.
 */

exports.load = function(app) {
	app.get('/', exports.index);
	app.get('/header.html', exports.header);
	app.get('/partials/:name', exports.partials);
};

exports.index = function(req, res){
	res.sendfile('views/index.html');
};

exports.header = function(req, res){
	res.sendfile('views/header.html');
};

exports.partials = function (req, res) {
	var name = req.params.name;
	res.sendfile('views/partials/' + name + '.html');
};
