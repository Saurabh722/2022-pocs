#!/usr/bin/env node

const templateConfig = require('./lib/config');
const isGenerateComponent = require('./lib/fabric-commands');
const generateTemplate = require('./lib/generate');
const importTemplate = require('./lib/import-template');

let type = process.argv[2];
let newTemplate = process.argv[3];
let isResponsive = process.argv[4];
let subFolders = false;

function fabricComponentHandler() {
	if (type == 'import' || type == 'i') {
		var config = {
			type: newTemplate,
			src: isResponsive,
			destType: process.argv[5],
			dest: process.argv[6]
		}
	
		importTemplate(templateConfig(config));
	} else {
		if (type) {
			newTemplate = newTemplate ? newTemplate : type;
			if(type.length > 1) {
				type = 'c';
			}
			subFolders = newTemplate.split('/');
			subFolders = subFolders.length > 1 ? subFolders : false;
		
		} else {
			type = 'c';
			newTemplate = 'hello-world';
		}
	
		var config = {
			type: type.toLowerCase(),
			name: newTemplate.toLowerCase(),
			responsive: !(isResponsive === '-r'),
			subFolders: subFolders
		}
		
		generateTemplate(templateConfig(config));
	}
}

async function fabricCommandHandler() {
	const action = await isGenerateComponent(type);
	if(action) {
		fabricComponentHandler();
	}
};

fabricCommandHandler()


