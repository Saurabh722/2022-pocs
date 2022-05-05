module.exports = function (config) {
	if(config.type === 'e' || config.type==='element') {
		config.type = 'element';
		config.dir = 'elements';
	} else if(config.type === 'c' || config.type==='component') {
		config.type = 'component';
		config.dir = 'components';
	} else if(config.type === 't' || config.type==='template') {
		config.type = 'template';
		config.dir = 'templates';
	} else if(config.type === 'u' || config.type==='util' || config.type === 'utility') {
		config.type = 'utilitie';
		config.dir = 'utilities';
	}

	return config;
};