
////////
// RESTful CRUD functions.
// wikipedia: http://en.wikipedia.org/wiki/Representational_state_transfer
// http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
////////

////////
// Error checking helper functions
////////

function modelErr() {
	return function(req, res, next) {
		return res && res.status(500).json({
			error: "Unknown Error",
			details: "Model not given"
		});
	}
}

function errorHandler(Model, res, action) {
	return function error(status, details) {
		if(status == 500) {
			console.error("CRUD error when "+action);
			console.error("  details: "+details);
		}
		return res && res.status(status).json({
			error: "Error " + action + " " + Model.modelName,
			details: details
		});
	}
}


////////
// Documents
////////

// POST on document: Not generally used. Treat the document as a collection and create a new document in it.
// Because this is an odd one, we'll leave it unimplemented.  Use postCollection instead.
exports.postDocument = function(Model, goNext) {
	return function(req, res, next) {
		var error = errorHandler(Model, res, "creating");
		return error(501, "Posting on document not implemented");
	}
}

// GET on document: Retrieve a document by id
exports.getDocument = function(Model, goNext) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, "getting");

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
			if (!goNext)
				return res.json(result);

			req.resource = result;
			if (next)
				next();
		});
	}
}

// PUT on document: Updates the document of the collection, or if it doesn't exist, create it.
exports.putDocument = function(Model, goNext) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, "updating");

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
			if (!goNext)
				return res.json(result);
			
			req.resource = result;
			if (next)
				next();
		});
	}
}

// DELETE on document: Deletes the object from the collection.
exports.deleteDocument = function(Model, goNext) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, "deleting");

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
			if (!goNext)
				return res.json(result);
			
			req.resource = result;
			if (next)
				next();
		});
	}
}

////////
// Collections
////////

// POST on collection: Create a new document in the collection.
exports.postCollection = function(Model, goNext) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, "creating");

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
			if (!goNext)
				return res.json(result);

			req.resource = result;
			if (next)
				next();
		});

	}
}

// GET on collection: Lists the documents in the entire collection.
exports.getCollection = function(Model, goNext) {
	if (!Model || !Model.modelName)
		return modelErr();
	
	return function(req, res, next) {
		var error = errorHandler(Model,res,"getting all");

		Model.find(function(err, result) {
			if (err)
				return error(500, err);
			if (!result)
				return error(404, "No result returned");
			if (!goNext)
				return res.json(result);

			req.resource = result;
			if (next)
				next();
		});
	}
}

// PUT on collection: Replaces the entire collection with another collection.
// Warning: bypasses _id and __v checks, use with caution
exports.putCollection = function(Model, goNext) {
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
				if (!goNext)
					return res.json(result);

				req.resource = result;
				if (next)
					next();
			});
		});
	}
}

// DELETE on Collection: Deletes the entire collection.
exports.deleteCollection = function(Model, goNext) {
	if (!Model || !Model.modelName)
		return modelErr();

	return function(req, res, next) {
		var error = errorHandler(Model, res, "deleting all");

		// get the collection (to return)
		exports.getCollection(Model, true)(req, res, function() {
		
			// remove the collection (at this point the collection is saved to req.resource)
			Model.remove(function(err) {
				if (err)
					return error(500, err);
				if (!goNext)
					return res.json(req.resource);

				if (next)
					next();
			});
		});
	}
}
