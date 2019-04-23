var http = require('http');
var router = require('./router');

var port = 4000;
var server = http.createServer(router);

server.listen(port);
console.log("Server is up runnig on port " + port);
