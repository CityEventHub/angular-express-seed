
/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose');

mongoose.connection.on('open', function (ref) {
	console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
	console.log('Could not connect to mongo server!');
	console.log(err);
});

mongoose.connect(process.env.MONGOLAB_URI);

var app = module.exports = express();

// Configuration
app.set('port', process.env.PORT || 3000);
app.use(express.compress());
app.use(express.urlencoded())
app.use(express.json())
// Depreciated until Connect 3.0
//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static('public'));
app.use(app.router);

/**
 * Routes
 */

// serve index and view partials
require('./routes').load(app);

// serve JSON API
require('./routes/api').load(app);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res) {
	res.status(404).sendfile('views/');
});

// Start server
app.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
