module.exports = function (config) {
	if (config.responsive) {
		return {
			js: ['reducer', 'module', 'demo/application', 'demo/index', 'demo/build/index'],
			scss: ['style'],
			json: ['fabric', 'demo/variants', 'fixtures/default', 'mocks/default'],
			hbr: ['partial'],
			hbs: ['demo/index']
		}
	}

	if (config.type === "template") {
		return {
			js: ['build/index', 'desktop/index', 'desktop/application', 'mobile/index', 'mobile/application', 'tablet/index', 'tablet/application'],
			scss: ['style', 'desktop/style', 'mobile/style', 'tablet/style'],
			json: ['fabric', 'demo/desktop/variants', 'demo/mobile/variants', 'demo/tablet/variants'],
			hbr: [],
			hbs: ['desktop/index', 'mobile/index', 'tablet/index']
		}
	}

	return {
		js: ['reducer', 'module', 'desktop/module', 'mobile/module', 'tablet/module', 'demo/build/index', 
			'demo/desktop/application', 'demo/desktop/index', 'demo/desktop/module',
			'demo/mobile/application', 'demo/mobile/index', 'demo/mobile/module',
			'demo/tablet/application', 'demo/tablet/index', 'demo/tablet/module'],
		scss: ['style', 'desktop/style', 'mobile/style', 'tablet/style', 'demo/style', 'demo/desktop/style', 'demo/mobile/style', 'demo/tablet/style'],
		json: ['fabric', 'demo/desktop/variants', 'demo/mobile/variants', 'demo/tablet/variants'],
		hbr: ['desktop/partial', 'mobile/partial', 'tablet/partial', 'demo/partial'],
		hbs: ['demo/desktop/index', 'demo/mobile/index', 'demo/tablet/index']
	}
};