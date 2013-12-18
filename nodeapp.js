
/**
 * Module dependencies.
 */

express = require('express');
mongoose = require('mongoose');
passport = require('passport');
bcrypt = require('bcrypt-nodejs');
flash = require('connect-flash');
LocalStrategy = require('passport-local').Strategy;
TwitterStrategy = require('passport-twitter').Strategy;

TWITTER_CONSUMER_KEY = 'la1xewMtcHGit2PROCdSuA';
TWITTER_CONSUMER_SECRET = 'EwuC9cEOeIqQBdxKswcNueCuy7qUjsd5oxNgGzyw';

require("./routes/monkey-patches.js");

mongoose.connection.on('open', function (ref) {
	console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
	console.log('Could not connect to mongo server!');
	console.log(err);
});

mongoose.connect(process.env.MONGOLAB_URI);

app = module.exports = express();

// Configuration
app.set('port', process.env.PORT || 5000);
app.use(express.compress());
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use(flash());
// passport
app.use(express.session({secret: 'some secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);


// allow for persistent sessions
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		if(err || !user)
			return done(null, null);
		done(null, user);
	});
});

// will change error messages once done to simply say incorrect creds, not specific to user or password
passport.use(new LocalStrategy(
	{usernameField: 'email'},
	function(username, password, done) {
		User.findOne({ email: username }, function(err, user) {
			if (err) 
				return done(err);
			if (!user) 
				return done(null, false, { message: 'Unknown user: ' + username });
			// take received password and hash it with the user's salt here
                        bcrypt.compare(password, user.password, function(err, res) {
                            if (res)
                                return done(null, user);
                            else
                                return  done(null, false, { message: 'Invalid password' });
                        });
			// if (user.password != password) 
			// 	return done(null, false, { message: 'Invalid password' });

			// return done(null, user);
		})
	}
));

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        // console.log(profile);
        // console.log('about to call findOrCreate');
        User.findOne({ twitterId: profile.id }, function(err, user) {
            // console.log('in the findOrCreate function');
            if (err) { return done(err); }
            if (!user) {
                // console.log('user doesnt exist');
                // create a new user
                var user_data = {
                    name: profile.displayName,
                    email: '@' + profile.screen_name,
                    password: "",
                    settingDisplayInfo: true,
                    settingShowRsvp: true,
                    settingEmailMe: true,
                    blacklisted: false,
                    twitterId: profile.id
                }
                // console.log('created user data');
                var new_user = new User(user_data);
                new_user.save( function(err, data) {
                    if (err)
                        return done(null, false);
                });
                // console.log('saved user and returning now');
                return done(null, new_user);
            }
            // console.log('about to return the existing user');
            return done(null, user);
        });
    }
));

// serve JSON API
require('./routes/api');

// redirect all others to HTML5 history
app.get('*', function(req, res) {
	return res.status(404).sendfile('public/index.html');
});

// Start server
app.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

