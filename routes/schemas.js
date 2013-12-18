
NamesSchema = mongoose.Schema({
    name: String
});

Name = mongoose.model('Name', NamesSchema);

EventSchema = mongoose.Schema({ 
  title: String,
  location: String,
  time: String,
  date: Date,
  description: String,
  rank: Number,
  rsvp: Number,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} 
});

Event = mongoose.model('Event', EventSchema);


var findOrCreate = require('mongoose-findorcreate');
UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  myEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  upcomingEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  settingDisplayInfo: Boolean,
  settingShowRsvp: Boolean,
  settingEmailMe: Boolean,
  blacklisted: Boolean,
  twitterId: {type: String, required: false}
});
UserSchema.plugin(findOrCreate);

User = mongoose.model('User', UserSchema);
