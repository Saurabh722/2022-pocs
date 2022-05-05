const fse = require('fs-extra');

const files = require('./required-files');
const jsonFiles = require('./fabric');
const reducerFiles = require('./reducer');
const moduleFiles = require('./module');
const scssFiles = require('./style');
const hbrFiles = require('./partial');

const hbsFiles = require('./hbs');
const indexFiles = require('./index');
const appFiles = require('./application');
const endpointsFiles = require('./endpoints');
const variantsFiles = require('./variants');

const fixturesFiles = require('./fixtures');
const mocksFiles = require('./mocks');
const buildFile = require('./build');


const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";

function generateFiles(filepath, content) {

	fse.outputFile(filepath, content, err => {
		if(err) {
		  console.log(red, err);
		  console.log(reset,'');
		} else {
		  console.log(green, filepath + ' generated!');
		  console.log(reset,'');
		}
	});
}

module.exports = function (config) {
	const name = config.name;
	const loc = './src/' + config.dir +'/';
	const fileArr = files(config);

	fileArr.js.forEach(f => {
		var dirArr = f.split('/');
		var fileName = dirArr.pop();
		var filepath = loc + name + '/'+ f + '.js';
		if ( dirArr[0] === "build" || (dirArr[0] === "demo" && dirArr[1] === "build")) {
			generateFiles(filepath, buildFile(config));
		} else if ( fileName === 'reducer') {
			generateFiles(filepath, reducerFiles(config));
		} else if ( fileName === 'module') {
			generateFiles(filepath, moduleFiles(config, dirArr));
		}  else if ( fileName === 'application') {
			generateFiles(filepath, appFiles(config, dirArr));
		} else if ( fileName === 'index') {
			generateFiles(filepath, indexFiles(config, dirArr));
		} else if ( fileName === 'endpoints') {
			generateFiles(filepath, endpointsFiles(config));
		}
	});
	
	
	fileArr.json.forEach(f => {
		var dirArr = f.split('/');
		var fileName = dirArr.pop();
		var filepath = loc + name + '/'+ f + '.json';
		
		if (fileName === 'variants') {
			generateFiles(filepath, variantsFiles(name));
		} else if (fileName === 'fabric') {
			generateFiles(filepath, jsonFiles(config));
		} else if (fileName === 'fixtures') {
			generateFiles(filepath, fixturesFiles(config));
		} else if (fileName === 'mocks') {
			generateFiles(filepath, mocksFiles(config));
		}
	});

	fileArr.hbr.forEach(f => {
		var dirArr = f.split('/');
		var fileName = f.split('/').pop();
		var filepath = loc + name + '/'+ f + '.hbr';
		generateFiles(filepath, hbrFiles(config, (dirArr.indexOf('demo') !== -1)));
	});

	fileArr.hbs.forEach(f => {
		var dirArr = f.split('/');
		var fileName = dirArr.pop();
		var filepath = loc + name + '/'+ f + '.hbs';
		generateFiles(filepath, hbsFiles(config, dirArr));
	});

	fileArr.scss.forEach(f => {
		var fileName = f.split('/').pop();
		var filepath = loc + name + '/'+ f + '.scss';
		generateFiles(filepath, scssFiles(config));
	});
};