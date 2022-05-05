var { getRelativePath } = require('./util');
var { getImportsFiles } = require('./parser');
var loadFile = require('./service');

var pastedData;
var showGraph = false;
window.hierarchyObj = [];

function bindEvents() {
	var $mainView = $("#scss-files");

	$mainView.on('click', '.import-file-btn' , function(event) {
		event.preventDefault();
		event.stopPropagation();
		var $self = $(this);
		var relativePath = getRelativePath($self.closest("ul").prev("a").data("path"));

		if($self.data('path') == "pasted-content") {
			getImportsFiles($self, pastedData, $self.data('clickable'));
		} else {
			loadFile($self, $self.data('clickable'), relativePath);
		}
		$self.data('clickable', false);
	});

	$("#show-graph").on('click', function(){
		if ($mainView.hasClass("tree")) {
			showGraph = false;
			$mainView.removeClass("tree full-width").addClass("blocks");
			setTimeout(function(){
				$("#file-data").show();
			}, 500);
		} else {
			showGraph = true;
			$("#file-data").hide();
			$mainView.addClass("full-width");
			setTimeout(function(){
				$mainView.removeClass("blocks").addClass("tree");
			}, 500);
		}
	});

	$("#minify-graph").on('click', function(){
		$mainView.toggleClass("compress");
	});

	$("#reset").on('click', function(){
		location.reload();
	});

	$("#style-code").bind("paste", function(e) {
		$(this).hide();
		if(showGraph) {
			$("#hierarchy-display").show();
		} else {
			$("#file-data, #hierarchy-display").show();
		}

		pastedData = e.originalEvent.clipboardData.getData('text');
		getImportsFiles($(".import-file-btn"), pastedData, true);
	} );
}

module.exports = bindEvents;