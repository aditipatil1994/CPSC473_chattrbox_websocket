/*eslint-env node*/
/* eslint-disable no-unused-vars */
var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require("./websockets-server");
var mime = require("mime-types");

var handleError = function(err, res) {
  if (err.errno == -4058) {
    fs.readFile("app/error.html", function(err, data) {
      res.end(data);
    });
  }
};



var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      console.log("Handling error");
      handleError(err, res);
      return;
    } else {
      var contentType = mime.lookup(filePath);
      res.setHeader("Content-Type", contentType);
      res.end(data);
    }
    res.end(data);
  });
});
server.listen(3000);
