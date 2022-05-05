const fs = require('fs');
const fse = require('fs-extra');

const util = require('./util')();

const green = "\x1b[32m";
const white = "\x1b[37m";

function getType (type) {
	switch(type) {
		case "c":
			return "components";
		case "e":
			return "elements";
		case "u":
			return "utilities";
		case "t":
			return "templates";
		default:
			return "components";
	}
}

module.exports = function (config) {
	var camelCased = util.camelCased(config.src);
	config.dir = getType(config.type);
	config.distDir = getType(config.destType);
	var fileIndex = 0;
	var fileTypeIndex = 0;
	var fileContent = [];
	var filesAndType = [];

	console.log(config);

	function getFilesAndType(responsive) {
		if(responsive) {
			return [{type: 'module', device: false}, {type: 'partial', device: false}];
		} else {
			return [{type: 'module', device: 'desktop'}, {type: 'partial', device: 'desktop'},
					{type: 'module', device: 'mobile'}, {type: 'partial', device: 'mobile'},
					{type: 'module', device: 'tablet'}, {type: 'partial', device: 'tablet'}];
		}
	}

	function generateFiles(file) {
		if(fileContent.length >fileIndex) {
			fse.outputFile(file.path, file.content, err => {
				if(err) {
					console.log(err);
				} else {
					console.log(file.filepath + ' imported!');
					fileIndex++;
					generateFiles(fileContent[fileIndex]);
				}
			});
		}
	}

	var importFiles = {
		module: importModule,
		partial: importScope
	}

	function readFiles(fileTypes) {
		if(filesAndType.length > fileTypeIndex) {
			var relativePath = `./src/${config.distDir}/${config.dest}/`;

			if (fileTypes.type === 'module') {
				filepath = relativePath + 'module.js';
				if(config.isSrcResponsive && config.isDestResponsive) {
					filepath = relativePath + (fileTypes.device ? fileTypes.device + '/' : '') + 'module.js';
				}
			} else if (fileTypes.type === 'partial') {
				filepath = relativePath + (fileTypes.device ? fileTypes.device + '/' : '') + 'partial.hbr';
			}
			fs.readFile(filepath, function(err, data) {
				if(err) {
					console.log(err);
				} else {
					importFiles[fileTypes.type](data.toString(), filepath, fileTypes.device);
					fileTypeIndex++;
					readFiles(filesAndType[fileTypeIndex]);
				}
			});
		} else {
			generateFiles(fileContent[fileIndex]);
		}
	}

	function templateType () {
		const fabricSrcPath = `./src/${config.dir}/${config.src}/fabric.json`;
		const fabricDestPath = `./src/${config.distDir}/${config.dest}/fabric.json`;

		fs.readFile(fabricSrcPath, function(err, data) {
			if(err) {
				console.log(err);
			} else {
				config.isSrcResponsive = JSON.parse(data.toString()).responsive;
				fs.readFile(fabricDestPath, function(err, data) {
					if(err) {
						console.log(err);
					} else {
						config.isDestResponsive = JSON.parse(data.toString()).responsive;
						filesAndType = getFilesAndType(config.isDestResponsive);
						readFiles(filesAndType[fileTypeIndex]);
					}
				});
			}
		});
	}

	function importModule(data, filepath, device) {
		var srcModule = `${config.dir}/${config.src}/module`;
		var moduleName = `${camelCased}Module`;

		if(data.indexOf(srcModule) !== -1) {
			console.log(green, "Module Already imported!");
			console.log(white,'');
			return;
		}

		var importModule = data.split('require(');
		var importModule1 = importModule[importModule.length - 1];
		var importModule2 = importModule1.split(";");

		importModule2[0] = importModule2[0] +`;\nimport ${moduleName} from "@vsdp/flagship-src/${config.dir}/${config.src}/module"`;
		importModule[importModule.length - 1] = importModule2.join(";")
		importModule = importModule.join("require(");

		var modules = importModule.split('modules:');
		if(modules.length > 1) {
			var modules1 = modules[1].split(']');
			modules1[0] = modules1[0].trim() + `,
		${moduleName}
	`;
			modules[1] = modules1.join(']');
			modules = modules.join('modules:');
		} else {
			modules = importModule.split('scope:');
			var modules1 = modules[1].split(',');
			modules1[0] = modules1[0] + `,
	modules: [
		${moduleName}
	]`;
			modules[1] = modules1.join();
			modules = modules.join("scope:");
		}

		fileContent.push({path: filepath, content: modules.replace(/	/g, '	') });
	}

	function importScope(data, filepath) {
		console.log('importScope');
		var partialDom = data.split('</div>');
		partialDom.pop();
		partialDom[partialDom.length - 1] = `${partialDom[partialDom.length - 1]}	<div class="fabric-${config.src}-component"></div>
</div>`;

		fileContent.push({ path: filepath, content: partialDom.join('') });
	}

	templateType();
};

