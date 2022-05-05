
var updateFileHierarchy = require('./view');

function validatePath($file) {
	var path = $file.data("path");

	if (path.split('/').length < 3) {
		var pathArray = $file.closest('ul').siblings('.import-file-btn').data('path').split('/');
		pathArray.pop();
		path = pathArray.join("/") + "/"+ path;
	}

	return path;
}

function getImportsFiles($file, data, isRender) {
	var importFiles = [];
	var fileContent = data.toString();
	var json = fileContent.trim().replace(/"| /g, '').replace(/\n|\t/g, '').split("@import");

	if(json.length) {
		json.shift();

		json.forEach( file => { 
			importFiles.push(file.split(";")[0]);
		});
	}

	updateFileHierarchy($file, {
		fileContent: fileContent,
		importFiles: importFiles,
	}, isRender);
}

module.exports = {
	validatePath: validatePath,
	getImportsFiles: getImportsFiles
};