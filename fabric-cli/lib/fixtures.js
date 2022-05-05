const util = require('./util')();

module.exports = function (name) {
	var name = util.templateName(config);

return `{
	"text": "welcome ${name}"
}
`
}