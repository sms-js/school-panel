// Create and configure server

const express = require('express'),
	app = express(),
	path = require('path'),
	http = require('http');

const server = http.createServer(app);

app.use(express.static('build'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(process.env.PORT || 3000, function() {
	const address = server.address().address;
	const host = address && address !== '::' ? address : 'localhost',
		port = server.address().port;
	console.info('[app] Listening at http://%s:%s', host, port);
});

module.exports = app;
