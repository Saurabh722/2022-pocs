const fs = require('fs');

const fse = require('fs-extra');

var relativePath = './src/components/hello-world/module.js';
var testPath = './src/components/hello-world/testModule.js';

//console.log(relativePath);


function generateFiles(filepath, content) {

	fse.outputFile(filepath, content, err => {
		if(err) {
		  console.log(err);
		} else {
		  console.log(filepath + ' generated!');
		}
	});
}



function readFiles(filepath) {

	fs.readFile(filepath, function(err, data) {
		if(err) {
		  console.log(err);
		} else {
			importModule(data.toString());
		}
	});
}

readFiles(relativePath);

function importModule(data) {
	//console.log(data);
	var imports = data.split(']');
	//console.log('-------------------------------');
	//console.log(imports);
	var modulesUrls = imports[0];
	var modulesUrls = modulesUrls.split('\t');
	//console.log('-------------------------------');
	//console.log(modulesUrls);
	var tempVal =  modulesUrls.pop();
	//console.log('-------------------------------');
	modulesUrls.push('"components/hello-world/module",\n');
	//console.log(modulesUrls);
	//console.log('-------------------------------');
	modulesUrls.push(tempVal);
	//console.log(modulesUrls);
	imports[0] = modulesUrls.join('\t');
	//console.log('-------------------------------');
	//console.log(imports[0]);

	var paramStr = imports[1].split(')');

	console.log('-------------------------------');
	var params = paramStr[0].split(',');

	var tempParam = params.pop();

	params.push(' helloWorldModule');
	params.push(tempParam);
	//console.log(params.join());

	paramStr[0] = params.join();

	imports[1] = paramStr.join(')');
	console.log('-------------------------------');

	generateFiles(testPath, imports.join(']'));
}