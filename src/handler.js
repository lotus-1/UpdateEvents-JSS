const fs = require("fs");
const path = require("path");
// const url = require('url');
// const querystring = require('querystring');
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
  const extention = url.split("/")[1];
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
const  myUrl = 'http://aviation-edge.com/v2/public/timetable?key=fc62d6-1ee67f&iataCode=JFK&type=arrival';
  rqst(myUrl, (err,res,body)=>{
    if (err) {
      response.writeHead(500, {'content-type': 'text/html'})
      response.end('server error')
    } else {
      // response.writeHead(200, {'content-type': 'text/html'})
      const parsedBody = JSON.parse(body)
      console.log('This is the parsed body: ', parsedBody);
      const airline = parsedBody.airline["name"];
      console.log("This is the airline: ", airline);
      const numFlight = parsedBody.flight["number"];
      console.log('This is the numFlight: ', numFlight);
      const arrival = parsedBody.arrival["scheduledTime"];
      console.log('This is the arrival: ', arrival);
      const departure = parsedBody.departure["scheduledTime"];
      console.log('This is the deperture: ', departure);
      response.writeHead(200, {'content-type': 'text/html'})
      response.end();
    }
  })
}
module.exports = {
  handleHome,
  handlePublic,
  apiInfo
};
