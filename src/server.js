const http = require('http');
const router = require('./router');
const fs = require('fs');
const path = require('path');


const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 5001;
const server = http.createServer(router);

server.listen(port, () => {
  console.log(`Server running at port http://${hostname}:${port}`)
});
