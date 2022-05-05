const util = require('./util')();

module.exports = function (config, isDemo) {
	var name = util.templateName(config);

if (isDemo) {
	return `<div class="fabric-${name}-${config.type}-demo">
	<div class="fabric-${name}-${config.type}"></div>
</div>
`
}
return `<div class="fabric-${name}-${config.type}">
	<h1>Welcome to ${name} ${config.type}</h1>
</div>
`
};