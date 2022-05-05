const util = require('./util')();

function getHBSTemplate(config, dirArr) {
	var name = util.templateName(config);
	var hbsStr = `{{#embed "templates/base/component-demo/index"}}
	{{#content "head"}}
		<link rel="stylesheet" href="/${config.dir}/${config.name}/style.css">
	{{/content}}
	{{#content "body"}}
		<div class="fabric-${name}-${config.type}"></div>
	{{/content}}
{{/embed}}
`

	if (!config.responsive && dirArr.length > 0) {
		var path = ``,
		dir = '';
		dirArr.forEach(p => {
			dir +=`${p}/`
		});
		path = `/${config.dir}/${config.name}/${dir}`

		hbsStr = `{{#embed "templates/base/component-demo/index"}}
	{{#content "head"}}
		<link rel="stylesheet" href="${path}style.css">
	{{/content}}
	{{#content "body"}}
		<div class="fabric-${name}-${config.type}-demo"></div>
	{{/content}}
{{/embed}}`
	}

	return hbsStr;
}

function getMainTemplate(config) {
	var name = util.templateName(config);
	return `{{#embed "templates/base/standard" template="${config.name}"}}
	{{#content "title"}}
		{{#if page.meta.title}}{{page.meta.title}} - {{/if}}{{page.brandName}}
	{{/content}}
	{{#content "body"}}
		<main class="fabric-${config.name}-template">
			<h1>Welcome to ${name} ${config.type}</h1>
		</main>
	{{/content}}
{{/embed}}`
}

module.exports = function (config, dirArr) {
	if (config.type === "template") { return getMainTemplate(config);}
	else { return getHBSTemplate(config, dirArr) }
};