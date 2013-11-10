
/**
 * API - Serve JSON to our AngularJS client
 * To setup API, make a function that serves the JSON
 * Afterwards, set up the route in the main "exports" function.
 */

exports.load = function(app) {
	app.get('/api/name', exports.name);
};

exports.name = function (req, res) {
	res.json({
		name: 'Bob'
	});
};