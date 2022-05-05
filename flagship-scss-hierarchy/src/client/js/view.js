var { randomRGBA, refactoring } = require('./util');

function updateFileHierarchyObject(data, isRender) {
	var files = data.importFiles;

	if(files && files.length && isRender) {
		hierarchyObj.push(files);
	}

	hierarchyObj = hierarchyObj.map(fileArr => getHighLevels(fileArr));
}

function updateFileHierarchy($file, data, isRender) {
	var files = data.importFiles;

	updateFileHierarchyObject(data, isRender);

	if(files && files.length && isRender) {
		var $container = $('<ul></ul>');
		var bgStyle = `style="background: ${randomRGBA()}"`;

		files.forEach(file => {
			$container.append($(`<li ${bgStyle}>
									<a class="import-file-btn" data-path=${file} data-clickable="true">${file}.scss</a>
								</li>`));
		});

		$file.after($container);
	}

	$('#file-data').html(`<h2>${$file.data("path")}.scss</h2><code>${data.fileContent}</code>`);
}

function getCoreHierarchy(filePath) {
	return filePath.split('/')[0];
}

function getHighLevels(arr) {
	return refactoring(arr.map(file => getCoreHierarchy(file)));
}

module.exports = updateFileHierarchy