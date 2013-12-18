

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
	app.get('/api/logout', function(req, res, next) {
		req.logout();
		res.redirect('/');
	});
	app.post('/api/signup', checkSignup, crud.postCollection(User, true), function(req, res, next) {
		// signup worked and adding it to the collection worked
		// login, and redirect to home.
		req.login(req.resource, function(err) {
			if(err) {
				return res.status(500).json({
					error: "Unable to login",
					details: "Created account, but unable to login"
				});
			}
			res.redirect('/');
		});
	});


	function checkSignup(req, res, next) {
		
		var error = crud.errorHandler(User, req, res, next, false, "signing up");

		if (!req)
			return error(500, "No request found");
		if (!req.body)
			return error(400, "No request body found");
		if (!req.body.email)
			return error(400, "Missing email from request");

		// first ensure the email isnt already in user
		User.findOne({email: req.body.email}, function(err, user) {
			if (user)
				return error(400, "Email already in use");

			// encrypt the password
			req.body.password = bcrypt.hashSync(req.body.password);
			
			// set default user data if it is not on the request
			if (req.body.settingDisplayInfo == null)
				req.body.settingDisplayInfo = true;
			if (req.body.settingShowRsvp == null)
				req.body.settingShowRsvp = true;
			if (req.body.settingEmailMe == null)
				req.body.settingEmailMe = true;
			if (req.body.blacklisted == null)
				req.body.blacklisted = false;

			// save the data to a new user
			next();
		});
	}
}