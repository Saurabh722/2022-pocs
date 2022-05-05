function getAppLink(config, dirArr) {
	var applink = `${config.dir}/${config.name}/demo/application`;

	if (!config.responsive && dirArr.length > 0) {
		dir = '';
		dirArr.forEach(p => {
			dir +=`${p}/`
		});
		applink = `${config.dir}/${config.name}/${dir}application`;
	}

	return applink;
}

module.exports = function(config, dirArr) {
	var appVariableName = config.type === "template" ? "application" : "demoApplication";
return `// Dependencies.

import ${appVariableName} from "@vsdp/flagship-src/${getAppLink(config, dirArr)}";
import launch from "@vsdp/flagship-src/templates/base/demo/launch";
import baseUtility from "@vsdp/flagship-src/templates/base/utility";

// Public.

launch(demoApplication).then(baseUtility.markFinishFERendering);`;
}