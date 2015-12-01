// get the things we need
var express = require('express');
var app     = express();
var path = require('path');

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));

// set up our one route to the index.html file
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

// start the server on port 8080 (http://localhost:8080)
var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});