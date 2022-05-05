const util = require('./util')();

function getModuleLink(config, dirArr) {
	var mlink = `${config.dir}/${config.name}/module`;

	if (!config.responsive && dirArr.length > 0) {
		dir = '';
		dirArr.forEach(p => {
			dir +=`${p}/`
		});
		mlink = `${config.dir}/${config.name}/${dir}module`;
	}

	return mlink;
}


module.exports = function(config, dirArr) {
	console.log(config);
	var name = util.templateName(config);
	var camelCased = util.camelCased(name);
	var camelCased2 = util.camelCased2(config.dir, name);

	if (config.type === "template") {
		return `export default {
	name: "${name}-application",
	scope: ".fabric-main-container",
	modules: []
};`;

	} else {
		return `import ${camelCased}DemoModule from "@vsdp/flagship-src/${getModuleLink(config, dirArr)}";

export default {
	name: "${name}-${config.type}-demo",
	scope: ".fabric-main-container",
	modules: [
		${camelCased}DemoModule
	]
};`;
	}
}