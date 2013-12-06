
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
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'} 
});

Event = mongoose.model('Event', EventSchema);


ProfileSchema = mongoose.Schema({
  name: String,
  email: String,
  myEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  upcomingEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
  settingDisplayInfo: Boolean,
  settingShowRsvp: Boolean,
  settingEmailMe: Boolean,
  blacklisted: Boolean
});

Profile = mongoose.model('Profile', ProfileSchema);