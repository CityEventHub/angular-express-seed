
/**
 * RESTful CRUD (REpresentational State Transfer - Create Read Update Delete)
 * wikipedia: http://en.wikipedia.org/wiki/Representational_state_transfer
 * http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
 *
 * We use crud when we establish a route for the frontend to use.
 * crud has 8 functions:
 * getCollection, putCollection, postCollection, deleteCollection
 * getDocument, putDocument, postDocument, deleteDocument
 *
 * each function can take 3 parameters: (Model [,finished [,passError]])
 * We always need to pass in the Model that we are going to use. The models are defined in schemas.js.
 *
 * Finished is an optional parameter.  If you want the route to finish with the crud operation and
 * return the result to the client, set finished to true. If you want addition middleware afterwards, omit it.
 *
 * passError is also an optional parameter.  Normally crud will directly return the error to the client
 * then we can use angular to handle that error on the client side.  In case we would rather handle that
 * error on the server side, we can set passError to true.  Instead of sending a response to the client,
 * the error is saved on request.error, and then we call next()
 * Two important things to remember:
 *   passError takes presidence over finished.  passError must be the third argument, so finished should be
 *     explcitly set to either true or false.  If there were no errors, crud follows the finished behavior.
 *   The next callback function must be able to handle the error.  Especially if finished is false, the next
 *     callback will need to examine the req.error and req.response to determine if the crud worked.
 */


////
// Error checking helper functions
////

function modelErr() {
	return function(req, res, next) {
		return res && res.status(500).json({
			error: "Unknown Error",
			details: "Model not given"
		});
	}
}

function errorHandler(Model, res, next, passError, action) {
	return function error(status, details) {
		if(status == 500) {
			console.error("CRUD server error when "+action);
			console.error("  details: "+details);
		}
		var error = {
			error: "Error " + action + " " + Model.modelName,
			status: status,
			details: details
		};
		if(passError) {
			req.error = error;
			if(next)
				next();

		} else {
			return res && res.status(status).json();
		}
	}
}


////
// Documents
////

// POST on document: Not generally used. Treat the document as a collection and create a new document in it.
// Because this is an odd one, we'll leave it unimplemented.  Use postCollection instead.
exports.postDocument = function(Model, finished, passError) {
	return function(req, res, next) {
		var error = errorHandler(Model, res, next, passError, "creating");
		return error(501, "Posting on document not implemented");
	}
}

// GET on document: Retrieve a document by id
exports.getDocument = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, next, passError, "getting");

		if (!req)
			return error(500, "No request found");
		if (!req.params)
			return error(400, "No request parameters found");
		if (!req.params._id)
			return error(400, "Missing id from parameters");

		Model.findById(req.params._id, function(err, result) {
			if (err)
				return error(500, err);
			if (!result)
				return error(404, "No result returned");
			if (finished)
				return res.json(result);

			req.resource = result;
			if (next)
				next();
		});
	}
}

// PUT on document: Updates the document of the collection, or if it doesn't exist, create it.
exports.putDocument = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, next, passError, "updating");

		if (!req)
			return error(500, "No request found");
		if (!req.params)
			return error(400, "No request parameters found");
		if (!req.body)
			return error(400, "No request body found");
		if (!req.params._id)
			return error(400, "Missing _id from parameters");
		if (!req.body._id)
			return error(400, "Missing _id from body");
		if (req.params._id != req.body._id)
			return error(400, "_id from parameters and body do not match ("+req.params._id+" != "+req.body._id+")");

		// Remove the _id because we aren't going to modify that
		delete req.body._id;

		Model.findByIdAndUpdate(req.params._id, req.body, {upsert: true}, function(err, result) {
			if (err)
				return error(500, err);
			if (!result)
				return error(404, "No result returned");
			if (finished)
				return res.json(result);
			
			req.resource = result;
			if (next)
				next();
		});
	}
}

// DELETE on document: Deletes the object from the collection.
exports.deleteDocument = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, next, passError, "deleting");

		if (!req)
			return error(500, "No request found");
		if (!req.params)
			return error(400, "No request parameters found");
		if (!req.params._id)
			return error(400, "Missing id from parameters");
		
		Model.findByIdAndRemove(req.params._id, function(err, result) {
			if (err)
				return error(500, err);
			if (!result)
				return error(404, "No result returned");
			if (finished)
				return res.json(result);
			
			req.resource = result;
			if (next)
				next();
		});
	}
}

////
// Collections
////

// POST on collection: Create a new document in the collection.
exports.postCollection = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, next, passError, "creating");

		if (!req)
			return error(500, "No request found");
		if (!req.body)
			return error(400, "No request body found");
		if (req.body._id)
			return error(400, "New document must not have _id");
		if (req.body.__v)
			return error(400, "New document must not have __v (versioning number)");

		var doc = new Model(req.body);
		doc.save(function(err, result) {
			if (err)
				return error(500, err);
			if (!result)
				return error(404, "No result returned");
			if (finished)
				return res.json(result);

			req.resource = result;
			if (next)
				next();
		});

	}
}

// GET on collection: Lists the documents in the entire collection.
exports.getCollection = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();
	
	return function(req, res, next) {
		var error = errorHandler(Model,res,"getting all");

		Model.find(function(err, result) {
			if (err)
				return error(500, err);
			if (!result)
				return error(404, "No result returned");
			if (finished)
				return res.json(result);

			req.resource = result;
			if (next)
				next();
		});
	}
}

// PUT on collection: Replaces the entire collection with another collection.
// Warning: bypasses _id and __v checks, use with caution
exports.putCollection = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model,res,"replacing all");

		if (!req)
			return error(500, "No request found");
		if (!req.body)
			return error(400, "No request body found");

		// delete everything
		exports.deleteCollection(Model, true)(req, res, function() {

			// then replace it with the new collection
			Model.create(req.body, function(err) {
				if (err)
					return error(500, err);
				// result is comma seperated parameters, convert to array
				result = [];
				for (var i = arguments.length - 1; i > 0; i--) {
					result.push(arguments[i]);
				}
				if (finished)
					return res.json(result);

				req.resource = result;
				if (next)
					next();
			});
		});
	}
}

// DELETE on Collection: Deletes the entire collection.
exports.deleteCollection = function(Model, finished, passError) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, next, passError, "deleting all");

		// get the collection (to return)
		exports.getCollection(Model, true)(req, res, function() {
		
			// remove the collection (at this point the collection is saved to req.resource)
			Model.remove(function(err) {
				if (err)
					return error(500, err);
				if (finished)
					return res.json(req.resource);

				if (next)
					next();
			});
		});
	}
}
