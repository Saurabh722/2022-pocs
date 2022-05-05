#!/bin/bash node

var http = require('http');
var fileList = require('./dependent-files');

http.createServer(function (req, res) {
  fileList(req, res);
}).listen(8090);