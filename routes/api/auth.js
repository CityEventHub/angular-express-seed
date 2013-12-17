

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
            if (!req.body.Name){}
                // error
            if (!req.body.Email){}
                //error
            if (!req.body.Password){}
                // error
            // first ensure the email isnt already in user
            User.findOne({ email: req.body.Email }, function(err, user) {
                if (user) {
                    // email in use
                }
            });
            // save the data to a new user
            var user_data = {
                name: req.body.Name,
                email: req.body.Email,
                password: bcrypt.hashSync(req.body.Password)
            }
            User.insert(user_data);
            // var new_user = new User(user_data);
            // new_user.save( function(err, data) {
            //     if (error)
            //         res.json(error);
            //     else
            //         res.json(data);
            // });
        });
}
