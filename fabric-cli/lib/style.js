const util = require('./util')();

module.exports = function (config) {
	var name = util.templateName(config);

return `.fabric-${name}-${config.type} {
	// style for the ${config.type}
}
`
};