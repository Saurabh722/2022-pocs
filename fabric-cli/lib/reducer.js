const util = require('./util')();

module.exports = function (config) {
	var name = util.templateName(config);
	var camelCased = util.camelCased(name);

return `// Libraries.

import * as g from "@mgdp/garter";

function onInit (state, data) {
	return g.assign(state, data);
}

export default {
	key: "${camelCased}",
	defaultState: {},
	init: onInit
};`;
};

