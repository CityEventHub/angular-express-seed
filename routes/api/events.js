
exports.load = function(crud, gm) {
	app.get('/api/events', crud.getCollection(Event));
	app.post('/api/events', initEventConsts, crud.postCollection(Event));

	app.get('/api/events/:_id', crud.getDocument(Event));
	app.put('/api/events/:_id', gm.permissions, crud.putDocument(Event));
	app.delete('/api/events/:_id', gm.permissions, crud.deleteDocument(Event));

}

function initEventConsts(req, res, next) {
	if (req && req.body) {
		// we'll need to set this to the user. Perhaps discover the user in permissions?
		req.body.creator = "529d09bb554a5a3369000002";
		req.body.rank = 0;
		req.body.rsvp = 0;
	}

	next && next();
}