const util = require('./util')();

module.exports = function (config) {
	var name = util.templateName(config);

return `"use strict";

export default [{
	key: "${name}",
	base: "/api",
	context: "${name}",
	version: "v1",
	path: "message"
}];
`
};