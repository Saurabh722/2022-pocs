#!/bin/bash node

const fs = require('fs');
var http = require('http');

var config = require('./../config');

var isRelativepath = true;

function getPath(path) {
	var filepath = path.split("?");
	var relativepath = filepath[1].split("=")[1];

	if(!isRelativepath) {
		return config.FLAGSHIP_SRC + filepath[0] + relativepath + '.scss';
	} else {
		return config.FLAGSHIP_SRC + filepath[0] + '.scss';
	}
}

function getFileData(req, res) {
	var filepath = getPath(req.url);

	console.log("filepath", filepath);

	fs.readFile(filepath, function (err, data) {
		if (err) {
			console.log(err);
			if(isRelativepath) {
				isRelativepath = false;
				readFiles(req, res, config.FLAGSHIP_SRC);
			}

		} else {
			res.setHeader('Access-Control-Allow-Origin', config.ACCESS_CONTROL_ALLOW_ORIGIN);
			res.setHeader('Access-Control-Allow-Methods', config.ACCESS_CONTROL_ALLOW_METHODS);

			res.writeHead(200, {
				'Content-Type': 'text/html'
			});

			res.write(JSON.stringify(data.toString(), null, '\t'));
			res.end();
		}
	});
}

http.createServer(function (req, res) {
	getFileData(req, res);
}).listen(config.PORT);