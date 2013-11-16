
// This monkeypatch forces mongoose to require all paths by default.
// However it does allow overriding with "pathName: {type: SomeType, required: false}""
mongoose.Schema = (function monkeyPatch(original) {
	return function Schema(obj,options) {
		for(var path in obj) {
			if(obj.hasOwnProperty(path)) {
				if(typeof obj[path] != 'object') {
					obj[path] = {
						type: obj[path],
						required: true 
					}
				} else if(obj[path].required == null) {
					obj[path].required = true;
				}
			}
		}
		return original.apply(this, arguments);
	}
})(mongoose.Schema);

