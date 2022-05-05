var bindEvents = require('./events');

function loadControls() {
	return `<div class="controls">
		<button id="reset" class="btn">Reset</button>
		<button id="minify-graph" class="btn">Toggle Compress</button>
		<button id="show-graph" class="btn">Toggle Graph</button>
	</div>`;
}

function loadHierarchyView() {
	return `<div id="scss-files" class="blocks">
		<div id="file-hierarchy">
			<ul id="hierarchy-display">
				<li>
					<a class="import-file-btn" data-path="pasted-content" data-clickable="false">Pasted SCSS</a>
					<ul></ul>
				</li>
			</ul>

			<textarea id="style-code" placeholder="Paste here SCSS code"></textarea>
		</div>
		<div id="file-data"></div>
	</div>`;
}

function getBaseTemplate() {
	return `
	<h1>SCSS hierarchy</h1>
	${ loadControls() }
	${ loadHierarchyView() }
	<div id="style-content"></div>`;
}

function init() {
	$("#flagship-hierarchy").addClass("flagship-hierarchy").html(getBaseTemplate());
	bindEvents();
}

module.exports = init;