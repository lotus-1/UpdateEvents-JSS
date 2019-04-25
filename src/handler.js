const fs = require("fs");
const path = require("path");
const url = require('url');
const querystring = require('querystring');
const rqst = require('request');


const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, function(error, file) {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, there was an error on our site...</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const handlePublic = (request, response, url) => {
  const extention = url.split(".")[1];
  const extentionTypes = {
    html: "text/html",
    js: "application/javascript",
    css: "text/css"
  };
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, function(error, file) {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>Soooo sorry... I can't find this file...</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extentionTypes[extention] });
      response.end(file);
    }
  });
};

  const apiInfo = (request, response) =>  {
  const userUrl = url.parse(request.url);
  const userParse = userUrl.query;

  const userValue = querystring.parse(userParse)['q'];
  const  myUrl = `http://aviation-edge.com/v2/public/timetable?key=fc62d6-1ee67f&iataCode=JFK&type=arrival`;
  rqst(myUrl, (err,res,body)=>{
    if (err) {
      response.writeHead(500, {'content-type': 'text/html'})
      response.end('server error')
    } else {
      const parsedBody = JSON.parse(body)
      const filteredData = parsedBody.filter(el => el.airline.name === userValue);
      console.log('filteredData ', filteredData);
      response.writeHead(200)
      response.end(JSON.stringify(filteredData));
    }
  })
}
module.exports = {
  handleHome,
  handlePublic,
  apiInfo
};
