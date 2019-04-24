const fs = require("fs");
const path = require("path");

const handleHome = function(request, response) {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, function(error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("<h1>Sorry, there was an error on our site...</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const handlePublic = function(request, response, url) {
  const extention = url.split("/")[1];
  const extentionTypes = {
    html: "text/html",
    js: "application/javascript",
    css: "text/css"
  };
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, function(error, file) {
    if (error) {
      console.log(error);
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("<h1>Soooo sorry... I can't find this file...</h1>");
    } else {
      response.writeHead(200, { "Content-Type": extentionTypes[extention] });
      response.end(file);
    }
  });
};
module.exports = {
  handleHome,
  handlePublic
};
