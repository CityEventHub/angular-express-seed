

exports.load = function(crud, gm) {
	// Auth:
	// QUESTION - HOW DO I GET THE PASSPORT VAR INTO HERE FROM nodeapp.js??????
	// If you use the keyword "var" in front of the variable declaration, this indicates it is a
	//     local variable.  I removed "var" from nodeapp.js, making it a global variable
	var config = { successRedirect: '/',
					failureRedirect: '/login',
					failureFlash: true}

	
	app.get('/login', function(req, res) {
		// send to a login page
	});

	app.post('/api/login', passport.authenticate('local', config));
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
}
