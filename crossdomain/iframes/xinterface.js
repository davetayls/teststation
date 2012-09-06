	// use a strict regular expression for security
	var query = /key=([A-Z]*)(&value=([a-z|A-Z]*))?/.exec(location.search),
		key   = query[1],
		value = escape(query[3]);

	// check if the url is valid
	if (query && key) {
		if (key === 'LOG') {
			console.log(value);
		}
	}