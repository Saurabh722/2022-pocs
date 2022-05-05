// Libraries.
const fs = require('fs');
const fse = require('fs-extra');
const { execSync, exec } = require("child_process");
const { Select } = require("enquirer");

const templateConfig = require('./config');
const print = require('./console-print');

const green = "\x1b[32m";
const dim = "\x1b[2m";
const reset = "\x1b[0m";
const BgBlack = "\x1b[40m";

const unitTestConfigFile = "config/jest/unit.config.js";
const browserTestConfigFile = "config/jest/browser.config.js";

const unitTestFilterString = "**/test/**/unit.jest.js";
const browserTestFilterString = "**/test/**/browser.jest.js";

let testCmd = "test:unit";
let testConfigFile = unitTestConfigFile;
let testFilterString = unitTestFilterString;

// Private.

/**
 * Runs a list of commands, inheriting stdio.
 * @param {Array<String>} commands The list of commands.
 */
const multiExecSync = (commands) => {
	let failure = false;

	commands.forEach((command) => {
		try {
			if (!failure) {
				execSync(command, { stdio: "inherit" });
			}
		} catch (e) {
			failure = true;
			execSync(`git checkout ${testConfigFile}`, { stdio: "inherit" });
		}
	});
};

function getParams() {
	const devices = ["desktop", "mobile", "tablet"];
	const environments = ["test", "proofing", "production"];
	const files = ["js", "css", "svg"];
	let param = {
		device: "desktop",
		environment: "test",
		file: "all"
	};

	const argv3 = process.argv[3] ? process.argv[3].toLowerCase().trim() : "";
	const argv4 = process.argv[4] ? process.argv[4].toLowerCase().trim() : "";
	const argv5 = process.argv[5] ? process.argv[5].toLowerCase().trim() : "";

	devices.forEach(function setDevice (device) {
		if(argv3 === device || argv4 === device || argv5 === device) {
			param.device = device;
		}
	});

	environments.forEach(function setEnvironment (environment) {
		if(argv3 === environment || argv4 === environment || argv5 === environment) {
			param.environment = environment;
		}
	});

	files.forEach(function setFile (file) {
		if(argv3 === file || argv4 === file || argv5 === file) {
			param.file = file;
		}
	});

	return param;
}

function printHelperMessage() {
	print.log(`_______________________________________________
|   fab <build> <device> <file>                 |
|   fab <serve> <environment> <device>          |
|   fab <start> <cache y/no>                    |
'-----------------------------------------------'`);
	print.date();
}

/**
 * Helper function to map choices to `value` instead of `name`.
 * @returns {*} The focused choice value.
 */
function result () {
	// eslint-disable-next-line no-invalid-this
	return this.focused.value;
}


/**
 * Prompts the user for creating component.
 */
async function promptForGeneratingComponent () {
	try {
		return (new Select({
			message: "What would you like to do?",
			choices: [
				{ name: "Abort", value: false },
				{ name: "Generate Component", value: true },
				{ name: "Delete Component", value: "rm" }
			],
			result
		})).run();
	} catch (error) {
		// Do nothing.
	}
}

async function startFabricCatalog () {
	const CHECK_DEPENDENCIES = "node ./node_modules/check-dependencies/lib/check-dependencies --scope-list dependencies";
	const CACHE_APP = "npm run cache:app";
	const FABRIC_CATALOG = "ENV=catalog node --max-old-space-size=8192 ./node_modules/@vsdp/fabric-catalog/bin";
	const CACHE_EVERYTHING = "npm-run-all cache:app cache:js cache:css";
	const FABRIC_CATALOG_CACHED = `${FABRIC_CATALOG} --config fabric-catalog.conf.cache`;

	const response = process.argv[3] ? process.argv[3] : "no";

	switch (response) {
		case "no":
			multiExecSync([
				CHECK_DEPENDENCIES,
				CACHE_APP,
				FABRIC_CATALOG
			]);
		break;
		case "y":
			multiExecSync([
				CHECK_DEPENDENCIES,
				CACHE_EVERYTHING,
				FABRIC_CATALOG_CACHED
			]);
		break;
	}

	return false;
}

async function serve () {
	const SERVE = "ENV=$ENV DEVICE=$DEVICE node scripts/serve";
	const param = getParams();

	print.log(`
    Device: ${param.device}
	Environment: ${param.environment}`);

	print.log(`_______________________________________________
|   fab <build> <device> <file>                 |
|   fab <serve> <environment> <device>          |
|   fab <start> <cache y/no>                    |
'-----------------------------------------------'`);

	multiExecSync([
		SERVE.replace("$ENV", param.environment)
		.replace("$DEVICE", param.device)
	]);

	return false;
}

async function buildOnly () {
	const BUILD_SVG = "npm run build:svg";
	const BUILD_JS = "WEBPACK_DEVICE=$DEVICE node ./node_modules/webpack-cli/bin/cli --config config/webpack/build";
	const BUILD_CSS = "npm run build:assets:css:$DEVICE";
	const param = getParams();

	switch (param.file) {
		case "js":
			multiExecSync([
				BUILD_JS.replace("$DEVICE", param.device)
			]);
			break;
		case "css":
			multiExecSync([
				BUILD_CSS.replace("$DEVICE", param.device)
			]);
			break;
		case "svg":
			multiExecSync([
				BUILD_SVG
			]);
			break;
		default:
			multiExecSync([
				BUILD_SVG,
				BUILD_JS.replace("$DEVICE", param.device),
				BUILD_CSS.replace("$DEVICE", param.device)
			]);
	}

	print.log(`
 _______________________________
|   Device: ${param.device}		|
|   File: ${param.file}			|
'-------------------------------'`);
	printHelperMessage();

	return false;
}

function buildAndServe () {
	buildOnly();
	serve();
}

function generateTestFiles(filepath, content) {
	fse.outputFile(filepath, content, err => {
		if(err) {
			console.log(red, err);
			console.log(reset);
		} else {
			multiExecSync([
				`npm run ${testCmd}:jest`,
				`git checkout ${testConfigFile}`
			]);
		}
	});
}

function getTargetPath () {
	const dir = process.argv[3];
	const component = process.argv[4];

	if (!dir) {
		return testFilterString;
	}

	if (dir.includes(".js")) {
		const filterPath = dir.split("src/");
		return `**/${filterPath[filterPath.length - 1]}`;
	}

	let targetDir = templateConfig({type : dir}).dir;
	targetDir = targetDir ? targetDir : dir;

	if (!component) {
		return `**/${targetDir}/${testFilterString}`;
	}

	return `**/${targetDir}/${component}/${testFilterString}`;
}



function readTestFile (type) {
	if (type === "test:browser") {
		testCmd = type;
		testConfigFile = browserTestConfigFile;
		testFilterString = browserTestFilterString;
	}

	multiExecSync([`git checkout ${testConfigFile}`]);
	fs.readFile(testConfigFile, function(err, data) {
		if(err) {
			console.log(err);
		} else {
			const targetPath = getTargetPath();
			const testFileData = data.toString().replace(testFilterString, targetPath);
			print.log(`\ntargetPath: ${targetPath}\n`);
			generateTestFiles(testConfigFile, testFileData);
		}
	});

	return false;
}

async function fabricNpmCommmandHandler(type) {
	if (type === "test" || type === "test:unit" || type === "test:browser") {
		return readTestFile(type);
	} else if (type === "start") {
		return startFabricCatalog();
	} else if (type === "build") {
		return buildOnly();
	} else if (type === "serve") {
		return serve();
	}

	const action = await promptForGeneratingComponent();

	if (action === "rm") {
		const target = templateConfig ({
			type: process.argv[2],
			destType: process.argv[3] || "hello-world"
		});

		return await multiExecSync([`rm -r src/${target.dir || "components"}/${target.destType}`]);
	}

	return action;
}

module.exports = fabricNpmCommmandHandler;
