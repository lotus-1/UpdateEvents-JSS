const fs = require('fs');
const path = require('path');
const handler = require('./handler');

const router = (request, response) => {
  const url = request.url;
  if(url === '/') {
    handler.handleHome(request, response);

  } else if (url.indexOf('/public/') !== -1) {
      handler.handlePublic(request, response, url);

  } else if (url.indexOf('/show/') !== -1) {
    handler.apiInfo(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>404 not found</h1>');
  }
};


module.exports = router;
