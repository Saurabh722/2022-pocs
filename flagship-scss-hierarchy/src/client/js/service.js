var SERVER = require('./../../config');
var { validatePath, getImportsFiles } = require('./parser');

function loadFile($file, isRender, relativePath) {
	$.ajax({
		type: "GET",
		url: `http://${SERVER.ADDRESS}:${SERVER.PORT}/${validatePath($file)}?relativePath=${relativePath}`,
		success: function (data) {
			getImportsFiles($file, JSON.parse(data), isRender);
		},
		error: function () {
			console.log("error")
		}
	})
}

module.exports = loadFile;