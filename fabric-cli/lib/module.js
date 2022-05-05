const util = require('./util')();

function getModuleTemplate(config, dirArr) {
	var name = util.templateName(config);
	var camelCased = util.camelCased(name);

	var moduleStr = ``;

	if(config.responsive) {
		moduleStr = `/** @module */

// Dependencies.

import partial from "@vsdp/flagship-src/${config.dir}/${config.name}/partial";
import reducer from "@vsdp/flagship-src/${config.dir}/${config.name}/reducer";

export default {
	name: "fabric-${name}-${config.type}",
	scope: ".fabric-${name}-${config.type}",
	partial: partial,
	reducer: reducer
};`;
	} else {
		moduleStr = `/** @module */

// Dependencies.

import reducer from "@vsdp/flagship-src/${config.dir}/${config.name}/reducer";

export default {
	name: "fabric-${name}-${config.type}",
	scope: ".fabric-${name}-${config.type}",
	reducer: reducer
};`;
	}

	if (dirArr.length > 0) {
		dir = '';
		dirArr.forEach(p => {
			dir +=`${p}/`
		});

		moduleStr = `/** @module */

// Libraries.

import * as g from "@mgdp/garter";

// Dependencies.

import ${camelCased}Module from "@vsdp/flagship-src/${config.dir}/${config.name}/module";
import partial from "@vsdp/flagship-src/${config.dir}/${config.name}/${dir}partial";

export default g.assign(${camelCased}Module, { partial: partial });`;

		if( !config.responsive && dirArr.indexOf("demo") !== -1 ) {
			moduleStr = `/** @module */

// Dependencies.

import reducer from "@vsdp/flagship-src/${config.dir}/${config.name}/reducer";
import partial from "@vsdp/flagship-src/${config.dir}/${config.name}/demo/partial";
import ${camelCased}Module from "@vsdp/flagship-src/${config.dir}/${config.name}/${dir.replace("demo/", "")}module";

export default {
	name: "fabric-${name}-${config.type}-demo",
	scope: ".fabric-${name}-${config.type}-demo",
	reducer: reducer,
	partial: partial,
	modules: [
		${camelCased}Module
	]
};`;
		}
	}

	return moduleStr;
};


module.exports = function (config, dirArr) {
	return getModuleTemplate(config, dirArr);
};
