/**
 * Establish our API to serve to the customer
 *
 * app.VERB(path, [callback...], callback) is used to establish routing functionality
 * where VERB is one of the HTTP verbs. We will probably only use get, put, post, delete.
 * http://expressjs.com/api.html#app.VERB
 *
 * the path will be '/api/MODELs' for collections
 * the path will be '/api/MODELs/:_id' for documents
 * make sure each model is pluralized in the path to follow convention
 *
 * If defined in the schema, paths can be models deep.  For example:
 *   '/api/users'						for the collection of users
 *   '/api/users/:_id'					for the document of a specific user
 *   '/api/users/:_id/comments'			for the collection of comments for that specific user
 *   '/api/users/:_id/comments/:_id'	for the document of the specific comment for a specific user
 *
 * After the paths we have callbacks.  Each callback has access to the request, response, and
 * can either return a response or call the next function.
 * For example, lets say we have the following route that attempts to modify a name:
 *   app.put('/api/names/:_id', permissions, crud.putDocument(Name), doMore);
 *
 * The first argument is the path as we explained above
 * The second, third, and fourth arguments are callbacks:
 *   permissions
 *   crud.putDocument(Name)
 *   doMore
 *
 * The first callback "permissions" will run, doing some sort of permissions requirement for the user
 * If the user does not have permissions, this function will need to return a response. For example:
 *   return res && res.status(401).json({error: "Unauthorized", details: "Unauthorized"});
 * This immediately finishes the route, meaning that "crud" and "doMore" will not execute
 * If permissions were fine, then permissions need to call "next();"  By calling next we excute the next callback
 *
 * The second callback "crud.putDocument(Name)" will run, attempting to add to the database
 * Depending on parameters, crud will either pass the result, or the error to the next callback or the client.
 * see crud.js for more details.
 *
 * Finally the last callback "doMore" will run, iff crud pass the result/error. In case we need some sort of post
 * processing after adding an item to the database.  This can be useful if we need to do something special,
 * like some sort of errorHandling or an internal update (such as increasing a global comment number after
 * saving a user's comment, etc.)
 */

// setup schemas for the api
require('./schemas.js');

// load crud functions
// see crud.js for more information
var crud = require('./crud.js');

var passport = require('passport');

// Load the routes. we may want to break this up into subfunctions later.
exports.load = function(app) {

	// Name Collections:
	app.get('/api/names', crud.getCollection(Name, true));
	app.post('/api/names', permissions, crud.postCollection(Name), doMore);
	// these are rare. Normally we don't use put or delete on a collection.
	app.put('/api/names', permissions, crud.putCollection(Name), doMore);
	app.delete('/api/names', permissions, crud.deleteCollection(Name), doMore);

	// Name Documents:
	app.get('/api/names/:_id', crud.getDocument(Name), doMore);
	app.put('/api/names/:_id', permissions, crud.putDocument(Name), doMore);
	app.delete('/api/names/:_id', permissions, crud.deleteDocument(Name), doMore);

        // Auth:
        // QUESTION - HOW DO I GET THE PASSPORT VAR INTO HERE FROM nodeapp.js??????
        app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                             failureRedirect: '/login',
                                                             failureFlash: true})
        );

	// Events:
	app.get('/api/events', crud.getCollection(Event, true));
	app.post('/api/events', initEventConsts, crud.postCollection(Event, true));

	app.get('/api/events/:_id', crud.getDocument(Event, true));
	app.put('/api/events/:_id', permissions, crud.putDocument(Event, true));
	app.delete('/api/events/:_id', permissions, crud.deleteDocument(Event, true));

	app.get('/api/users', crud.getCollection(User, true));
	app.post('/api/users', permissions, crud.postCollection(User, true));

	app.get('/api/users/:_id', crud.getDocument(User, true));
	app.put('/api/users/:_id', permissions, crud.putDocument(User, true));
	app.delete('/api/users/:_id', permissions, crud.deleteDocument(User, true));

};

function initEventConsts(req, res, next) {
	if (req && req.body) {
		// we'll need to set this to the user. Perhaps discover the user in permissions?
		req.body.creator = "529d09bb554a5a3369000002";
		req.body.rank = 0;
		req.body.rsvp = 0;
	}

	next && next();
}

function permissions(req, res, next) {
	// do some sort of authentication checking here
	// if not authenticated yet, do this:
	// return res && res.status(401).json({error: "Unauthorized", details: "Unauthorized"});

	// do some sort of permission checking here
	// if user does not have permissions:
	// return res && res.status(403).json({error: "Forbidden", details: "Forbidden"});

	// otherwise continue with the action
	next && next();
}

function doMore(req, res, next) {
	// if more processing need to be done after the crud operation do it here

	// finish with:
	res.json(req.resource);
}


////
// Bad functions
// Used for testing possible errors that the serve can encounter
// NEVER use this when pushing to production
////

// adding a delay to see slow connections
function delay(delay) {
	return function delayRoute(req, res, next) {
		if(next != null && delay != null)
			setTimeout(next, delay);
	}
}

// a function to emulate errors
function error(status, err) {
	// defaults
	if(isNaN(status))
		status = 500;
	if(isNaN(err))
		err = {error: "Internal Server Error", details: "Intentional Error"};

	return function errorRoute(req, res, next) {
		return res && res.status(status).json(err);
	}
}

// a function to emulate infinite loops/never returning a response
function nonResponse(req, res, next) {}
