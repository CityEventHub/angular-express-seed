

exports.load = function(crud, gm) {
	// Auth:
	// QUESTION - HOW DO I GET THE PASSPORT VAR INTO HERE FROM nodeapp.js??????
	// If you use the keyword "var" in front of the variable declaration, this indicates it is a
	//     local variable.  I removed "var" from nodeapp.js, making it a global variable
	var config = { successRedirect: '/',
					// failureRedirect: '/login',
					failureFlash: 'Invalid username or password'}

	
	// app.get('/login', function(req, res) {
	// 	// send to a login page
	// });

	app.post('/api/login', passport.authenticate('local', config));
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.post('/api/signup', function(req, res) {
            if (!req.body.name){}
                // error
            if (!req.body.email){}
                //error
            if (!req.body.password){}
                // error
            // first ensure the email isnt already in user
            User.findOne({ email: req.body.email }, function(err, user) {
                if (user) {
                    // email in use
                }
            });
            // save the data to a new user
            console.log(req.body);
            var user_data = {
                name: req.body.name ,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                settingDisplayInfo: true,
                settingShowRsvp: true,
                settingEmailMe: true,
                blacklisted: false
            }
            // User.insert(user_data);
            var new_user = new User(user_data);
            new_user.save( function(err, data) {
                if (err)
                    res.json(err);
                else {
                    res.redirect('/');
                }
            });
        });
}
