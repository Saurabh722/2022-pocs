"use strict";

// Libraries.

const { execSync } = require("child_process");
const http = require("http");

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
		}
	});
};

async function startFabricCatalog () {
	const CHECK_DEPENDENCIES = "node ./node_modules/check-dependencies/lib/check-dependencies --scope-list dependencies";
	const CACHE_APP = "npm run cache:app";
	const FABRIC_CATALOG = "ENV=catalog node --max-old-space-size=8192 ./node_modules/@vsdp/fabric-catalog/bin";

	multiExecSync([
		CHECK_DEPENDENCIES,
		CACHE_APP,
		FABRIC_CATALOG
	]);
}

async function build () {
	const BUILD_SVG = "npm run build:svg";
	const BUILD_JS = "WEBPACK_DEVICE=$DEVICE node ./node_modules/webpack-cli/bin/cli --config config/webpack/build";
	const BUILD_CSS = "npm run build:assets:css:$DEVICE";

	multiExecSync([
		BUILD_SVG,
		BUILD_JS.replace("$DEVICE", "desktop"),
		BUILD_CSS.replace("$DEVICE", "desktop")
	]);
}

async function buildAndServe () {
	const BUILD_SVG = "npm run build:svg";
	const BUILD_JS = "WEBPACK_DEVICE=$DEVICE node ./node_modules/webpack-cli/bin/cli --config config/webpack/build";
	const BUILD_CSS = "npm run build:assets:css:$DEVICE";
	const SERVE = "ENV=$ENV DEVICE=$DEVICE node scripts/serve";

	multiExecSync([
		BUILD_SVG,
		BUILD_JS.replace("$DEVICE", "desktop"),
		BUILD_CSS.replace("$DEVICE", "desktop"),
		SERVE.replace("$ENV", "test")
			.replace("$DEVICE", "desktop")
	]);
}

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
	console.log(req.url);
	const cmd = req.url.trim();

	if (cmd === "/fabric-catalog") {
		(async function start () {
			await startFabricCatalog();
		}());
	}

	if (cmd === "/build") {
		(async function buildOnly () {
			await build();
		}());
	}

	if (cmd === "/serve") {
		(async function serve () {
			await buildAndServe();
		}());
	}
	// Set a response type of plain text for the response
	res.writeHead(200, { "Content-Type": "text/html" });

	// Send back a response and end the connection
	res.end(`
	<html>
	<head>
		<title>build</title>
	</head>
	<body>
	<div>
		<a href="/fabric-catalog">Fabric Catalog</a><br/><br/>
		<a href="/build">build</a><br/><br/>
		<a href="/serve">serve</a>
	</div></body></html>`);
});

// Start the server on port 3000
app.listen(3000, "127.0.0.1");
console.log("Node server running on port 3000");