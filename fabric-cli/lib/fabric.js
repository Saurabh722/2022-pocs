const util = require('./util')();

module.exports = function (config) {
	var name = util.templateName(config);

return `{
	"$schema": "http://flagship.lbidts.com/schemas/fabric.json",
	"key": "${config.type}-${name}",
	"type": "${config.type}s",
	"name": "${name}",
	"description": "#",
	"keywords": "${name},${config.type},demo",
	"documentation": "#",
	"usage": "#",
	"acceptance": "#",
	"responsive": ${config.responsive}
}
`
};