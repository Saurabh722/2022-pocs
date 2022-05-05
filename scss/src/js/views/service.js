var { importFile, validatePath } = require('./parser');

function loadFile($file, isRender) {
	$.ajax({
		type: "GET",
		url: "http://localhost:8090/" + validatePath($file),
		success: function (data) {
			console.log(data);
			importFile($file, JSON.parse(data), isRender);
		},
		error: function () {
			console.log("error")
		}
	})
}

module.exports = loadFile;