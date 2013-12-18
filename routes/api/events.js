
exports.load = function(crud, gm) {
	app.get('/api/events', crud.getCollection(Event));
	app.post('/api/events', gm.permissions, initEventConsts, crud.postCollection(Event, true), addEventToUser);

	app.get('/api/events/:_id', crud.getDocument(Event));
	app.put('/api/events/:_id', gm.permissions, isCreator, crud.putDocument(Event));
	app.delete('/api/events/:_id', gm.permissions, isCreator, crud.deleteDocument(Event));

	function initEventConsts(req, res, next) {
		if (req && req.body) {
			req.body.creator = req.user._id;
			req.body.rank = 0;
			req.body.rsvp = 0;
		}

		next();
	}

	function addEventToUser(req, res, next) {
		req.user.myEvents.push(req.resource);
		req.user.save(function(err) {
			if (err) {
				return res.status(500).json({
					error: "Unable to save event to user",
					details: "Created the event, but unable to save it to the user's list of events"
				});
			}
			res.json(req.resource);
		})
	}

	function isCreator(req, res, next) {
		crud.getDocument(Event, true)(req, res, function() {
			if(req.user._id != req.resource.creator)
				return res.status(403).json({error: "Forbidden", details: "You cannot edit an event you did not create"});
			next();
		})
	}
}