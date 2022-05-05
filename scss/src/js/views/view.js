var { importFile } = require('./parser');
var loadSCSSFile = require('./service');

var pastedData;
window.hierarchyObj = [];
var showGraph = false;

function random_rgba() {
	var o = Math.round, r = Math.random, s = 255;
	return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.2 + ')';
}

function updateFileHierarchyObject(elementObj) {
	var files = elementObj.data.importFiles;

	if(files && files.length && elementObj.isRender) {
		hierarchyObj.push(files);
	}

	hierarchyObj = hierarchyObj.map(fileArr => getHighLevels(fileArr));
	console.log(hierarchyObj);
}

function updateFileHierarchy(elementObj) {
	updateFileHierarchyObject(elementObj);
	var files = elementObj.data.importFiles;
	if(files && files.length && elementObj.isRender) {
		var $container = $('<ul></ul>');
		var bgStyle = `style="background: ${random_rgba()}"`;

		files.forEach(file => {
			$container.append($(`<li ${bgStyle}><a class="file-btn" data-path=${file}  data-clickable="true">${file}.scss</a></li>`));
		});

		elementObj.target.after($container);
	}

	$('#file-data').html(`<h2>${elementObj.target.data("path")}.scss</h2><code>${elementObj.data.fileContent}</code>`);
}

function refactoring(fileArr) {
	let x = (fileArr) => fileArr.filter((v,i) => fileArr.indexOf(v) === i);

	return x(fileArr);
}

function getCoreHierarchy(filePath) {
	var strArr = filePath.split('/');
	var isBase = filePath.indexOf("base") !== -1;

	return isBase ? "base" : strArr[0];
}

function getHighLevels(arr) {
	return refactoring(arr.map(file => getCoreHierarchy(file)));
}

function bindEvents() {
	console.log("Load bindEvents");
	$('#scss-files').on('click', '.file-btn', function (event) {
		event.preventDefault();
		event.stopPropagation();
		var $self = $(this);

		if ($self.data('path') == "current-pasted-file") {
			console.log("pastedData");
			updateFileHierarchy(importFile($self, pastedData, $self.data('clickable')));
		} else {
			loadSCSSFile($self, $self.data('clickable'));
		}
		$self.data('clickable', false);
	});

	$("#show-graph").on('click', function () {
		var $mainView = $("#scss-files");
		var $self = $(this);

		if ($mainView.hasClass("tree")) {
			showGraph = false;
			$mainView.removeClass("tree full-width").addClass("blocks");
			setTimeout(function () {
				$("#file-data").show();
			}, 500);
		} else {
			showGraph = true;
			$("#file-data").hide();
			$mainView.addClass("full-width");
			setTimeout(function () {
				$mainView.removeClass("blocks").addClass("tree");
			}, 500);
		}
	});

	$("#minify-graph").on('click', function () {
		var $mainView = $("#scss-files");
		var $self = $(this);
		$mainView.toggleClass("compress");
	});

	$("#reset").on('click', function () {
		location.reload();
	});

	$("#style-code").bind("paste", function (e) {
		$(this).hide();
		if (showGraph) {
			$("#hierarchy-display").show();
		} else {
			$("#file-data, #hierarchy-display").show();
		}

		pastedData = e.originalEvent.clipboardData.getData('text');
		updateFileHierarchy(importFile($(".file-btn"), pastedData, true));
	});
}

module.exports = bindEvents;