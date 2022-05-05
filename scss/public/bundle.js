/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_index__ = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_scss_view_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_scss_view_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__views_scss_view_scss__);


// var init = require('./views/view');
// $(init);

var pastedData;
window.hierarchyObj = [];
var showGraph = false;

/* ----------------------- Utility ----------------------- */

function random_rgba() {
	var o = Math.round,
	    r = Math.random,
	    s = 255;
	return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.2 + ')';
}

function refactoring(fileArr) {
	let x = fileArr => fileArr.filter((v, i) => fileArr.indexOf(v) === i);

	return x(fileArr);
}

/* ----------------------- End Utility ----------------------- */

/* ----------------------- Parser ----------------------- */

function getImportsFiles($file, data, isRender) {
	var importFiles = [];
	var fileContent = data.toString();
	var json = fileContent.trim().replace(/"| /g, '').replace(/\n|\t/g, '').split("@import");

	if (json.length) {
		json.shift();

		json.forEach(file => {
			importFiles.push(file.split(";")[0]);
		});
	}

	updateFileHierarchy($file, {
		fileContent: fileContent,
		importFiles: importFiles
	}, isRender);
}

/* ----------------------- End Parser ----------------------- */

/* ----------------------- Service ----------------------- */

function loadFile($file, isRender) {
	$.ajax({
		type: "GET",
		url: "http://localhost:8090/" + validatePath($file),
		success: function (data) {
			console.log(data);
			getImportsFiles($file, JSON.parse(data), isRender);
		},
		error: function () {
			console.log("error");
		}
	});
}

/* ----------------------- End Service ----------------------- */

/* ----------------------- View ----------------------- */

function updateFileHierarchyObject(data, isRender) {
	var files = data.importFiles;

	if (files && files.length && isRender) {
		hierarchyObj.push(files);
	}

	hierarchyObj = hierarchyObj.map(fileArr => getHighLevels(fileArr));
	console.log(hierarchyObj);
}

function updateFileHierarchy($file, data, isRender) {
	var files = data.importFiles;

	updateFileHierarchyObject(data, isRender);

	if (files && files.length && isRender) {
		var $container = $('<ul></ul>');
		var bgStyle = `style="background: ${random_rgba()}"`;

		files.forEach(file => {
			$container.append($(`<li ${bgStyle}>
									<a class="file-btn" data-path=${file} data-clickable="true">${file}.scss</a>
								</li>`));
		});

		$file.after($container);
	}

	$('#file-data').html(`<h2>${$file.data("path")}.scss</h2><code>${data.fileContent}</code>`);
}

function getCoreHierarchy(filePath) {
	var strArr = filePath.split('/');
	var isBase = filePath.indexOf("base") !== -1;

	return isBase ? "base" : strArr[0];
}

function getHighLevels(arr) {
	return refactoring(arr.map(file => getCoreHierarchy(file)));
}

function validatePath($file) {
	var path = $file.data("path");

	if (path.split('/').length < 3) {
		var pathArray = $file.closest('ul').siblings('.file-btn').data('path').split('/');
		pathArray.pop();
		path = pathArray.join("/") + "/" + path;
	}

	return path;
}

/* ----------------------- End View ----------------------- */

/* ----------------------- EventBinding ----------------------- */

$(function () {
	$('#scss-files').on('click', '.file-btn', function (event) {
		event.preventDefault();
		event.stopPropagation();
		var $self = $(this);

		if ($self.data('path') == "current-pasted-file") {
			console.log("pastedData");
			getImportsFiles($self, pastedData, $self.data('clickable'));
		} else {
			loadFile($self, $self.data('clickable'));
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
		getImportsFiles($(".file-btn"), pastedData, true);
	});
});

/* ----------------------- End EventBinding ----------------------- */

/*
@import "templates/landing/desktop/base";
@import "components/todays-offers-drawer/style";
*/

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);