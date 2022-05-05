module.exports = function () {

return {
	templateName: function(config) {
		if(config.subFolders) {
			var l = config.subFolders.length;
			return config.subFolders[l - 1];
		}

		return config.name;
	},
	textWithSpaces: function(name) {
		return name.replace(/\-/g, ' ').toLowerCase()
	},
	camelCased: function(name) {
		return name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	},

	camelCased2: function(type, name) {
		return (type + '-' + name).replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
	}
};
}