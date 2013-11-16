
/**
 * API - Serve JSON to our AngularJS client
 */

// setup schemas for the api
require('./schemas.js');
// get RESTful CRUD
var crud = require('./crud.js');


exports.load = function(app) {
	app.get('/api/names', crud.getCollection(Name));
	app.put('/api/names', crud.putCollection(Name));
	app.post('/api/names', crud.postCollection(Name));
	app.delete('/api/names', crud.deleteCollection(Name));

	app.get('/api/names/:_id', crud.getDocument(Name));
	app.put('/api/names/:_id', crud.putDocument(Name));
	// app.post('/api/names/:_id', crud.postDocument(Name));
	app.delete('/api/names/:_id', crud.deleteDocument(Name));

};
