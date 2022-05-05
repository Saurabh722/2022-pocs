const util = require('./util')();

module.exports = function (config) {
	var name = util.templateName(config);

return `[
	{
		"api": "${name}",
		"data": "${config.dir}/${config.name}/fixtures/default.json"
	}
]
`
}