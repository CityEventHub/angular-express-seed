
/**
 * API - Serve JSON to our AngularJS client
 * To setup API, make a function that serves the JSON
 * Afterwards, set up the route in the main "exports" function.
 */

exports.load = function(app) {
	app.get('/api/names', exports.names.collection.get);
	app.post('/api/names', exports.names.collection.post);
	
	app.get('/api/names/:name', exports.names.document.get);
	app.put('/api/names/:name', exports.names.document.put);
	app.delete('/api/names/:name', exports.names.document.delete);

};

exports.names = {
	collection: {
		get: function (request, response) {
			Name.find({}, function(err, names) {
				if (err) return response.status(500).json({error: err.name + ": " + err.message});
				if (!names) return response.status(404).json({error: "Names not found."});
				response.send(names);
			});
		},
		post: function (request, response) {
			if(!request.body.name) return response.status(400).json({error: "Missing Name."});
			
			Name.findOne({name: request.body.name}, function(err, name) {
				if (err) return response.status(500).json({error: err.name + ": " + err.message});
				if (name) return response.status(400).json({error: "Name already exists."});
				
				var name = new Name(request.body);
				name.save(function(err, name) {
					if (err) return response.status(500).json({error: err.name + ": " + err.message});
					response.json(name);
				});
			});
		}
	},
	document: {
		get: function (request, response) {
			Name.findOne({name: request.params.name}, function(err, name) {
				if (err) return response.status(500).json({error: err.name + ": " + err.message});
				if (!name) return response.status(404).json({error: "Name not found."});
				response.send(name);
			});
		},
		put: function (request, response) {
			if(!request.body.name || !request.params.name)
				if (name) return response.status(400).json({error: "Missing Name."});
			
			Name.findByIdAndUpdate(request.body._id, request.body, function (err, name) {
				if (err) return response.status(500).json({error: err.name + ": " + err.message});
				if (!name) return response.status(404).json({error: "Name not found."});
				response.send(name);
			});
		},
		delete: function (request, response) {
			Name.findOneAndRemove({name: request.params.name}, function(err, name) {
				if (err) return response.status(500).json({error: err.name + ": " + err.message});
				if (!name) return response.status(404).json({error: "Name not found."});
				response.send(name);
			});
		}
	}
};
