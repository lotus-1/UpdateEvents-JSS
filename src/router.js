const fs = require('fs');
const path = require('path');
const handler = require('./handler');

const router = (request, response) => {
  const url = request.url;
  console.log('I\'m inside router');
  if(url === '/') {
    handler.handleHome(request, response);

  } else if (url.indexOf('/public/') !== -1) {
      handler.handlePublic(request, response, url);

  } else if (url.indexOf('/search') !== -1) {
    console.log('Inside the search endpoint');
    handler.apiInfo(request, response);

  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>404 not found</h1>');
  }
};


module.exports = router;
