
function randomRGBA() {
	var o = Math.round, r = Math.random, s = 255;
	return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.2 + ')';
}

function refactoring(fileArr) {
	let x = (fileArr) => fileArr.filter((v,i) => fileArr.indexOf(v) === i);

	return x(fileArr);
}

function getRelativePath(filePath) {
	var pathList = filePath.split("/");
	pathList.pop();
	return pathList.join("/");
}

module.exports = {
	randomRGBA: randomRGBA,
	refactoring: refactoring,
	getRelativePath: getRelativePath
}