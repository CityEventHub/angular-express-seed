
/**
 * Module dependencies.
 */

express = require('express');
mongoose = require('mongoose');
require("./routes/monkey-patches.js");

mongoose.connection.on('open', function (ref) {
	console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
	console.log('Could not connect to mongo server!');
	console.log(err);
});

mongoose.connect(process.env.MONGOLAB_URI);

var app = module.exports = express();

// passport
passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy;

// serve JSON API
require('./routes/api').load(app);

// make this query the database to find by user id
function findById(id, fn) {
    User.findById(id, function(err, result) {
        if (result) {
            fn(null, result);
        }
        else {
            fn(new Error('User ' + id + ' does not exist'));
        }
    });
}

// look up a user when logging in
function findByUsername(username, fn) {
    User.findOne({ email: username }, function(err, result) {
        if (result) {
            return fn(null, result);
        }
        else {
            return fn(null, null);
        }
    });
}

// allow for persistent sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function(err, user) {
        done(err, user);
    });
});

// will change error messages once done to simply say incorrect creds, not specific to user or password
passport.use(new LocalStrategy(
    {usernameField: 'email'},
    function(username, password, done) {
        findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user: ' + username }); }
            // take received password and hash it with the user's salt here
            if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
            return done(null, user);
        })
    }
));


// Configuration
app.set('port', process.env.PORT || 5000);
app.use(express.compress());
app.use(express.urlencoded())
app.use(express.json())
// Depreciated until Connect 3.0
//app.use(express.bodyParser());
app.use(express.methodOverride());
// app.use(express.static('public'));
app.use(express.errorHandler());
app.use(express.cookieParser());
app.use(express.session({secret: 'some secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);


// redirect all others to HTML5 history
app.get('*', function(req, res) {
	return res.status(404).sendfile('public/index.html');
});

// Start server
app.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

