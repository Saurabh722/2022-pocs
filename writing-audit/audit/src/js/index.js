import './scss/view.scss';

import { setTimeout, setInterval } from "timers";

/* version v2.3 */

var assignObj = null;
var imagesIndexs = null;
var fileIndex = 0
var $imgBlock = null;
var textFile = null,
	imageTop = 66,
	makeTextFile = function (text) {
		var data = new Blob([text], {type: 'text/plain'});

		if (textFile !== null) {
			window.URL.revokeObjectURL(textFile);
		}

		textFile = window.URL.createObjectURL(data);

		return textFile;
	};

function generateIndexs() {
	var ranges =  assignObj.ranges.split(',');
	var images = [];

	ranges.forEach(function(item) {
		var img = item.split('-');
		var min = parseInt(img[0].match(/\d+$/)[0]);
		var max = parseInt(img[1].match(/\d+$/)[0]);
		max =  max == 100 ? 200 : max;

		for(let i=min; i<=max; i++) {
			if(i == 200) images.push(img[0].split(min)[0] + 100);
			else images.push(img[0].split(min)[0] + i);
		}
	});
	console.log(images);
	return images;
}

function moveImage($imgBlocks, isUp) {
	$imgBlocks.each(function() {
		var $imgBlock = $(this).find(".image-line-block");
		var top = parseInt($imgBlock.data("top"));
		if(isUp) {
			top++;
		} else {
			top--;
		}
		
		$imgBlock.data("top", top);
		$imgBlock.css({backgroundPosition:`-61px ${top}px`});
	});
}

function submitAudit() {
	var $lines = $(".audit-line");
	var fileName = $("#input-fileNo").val();
	var lines = [];

	$lines.each( function(i) {
		lines.push($(this).val());
	});
	
	var link = document.createElement("a");
    link.download = `Page ${fileName}.txt`;
    link.href = makeTextFile(lines.join("\r\n"));
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
	location.hash = fileIndex + 1;
	location.reload();
}

function getTop(i) {
	return `${ -1 * ((i * 22) + (imageTop - parseInt(i/4)))}`;
}

function generateView(dataLines) {
	var $lineView = $('<ul/>');

	$("head").append(`<style>
		.image-line-block {
			background-image: url("${assignObj.domain}/${assignObj.assignment}/UDSFolder${parseInt(fileIndex/20) + 1}/${imagesIndexs[fileIndex]}.jpg");
		}
	</style>`);

	dataLines.forEach((l, i) => {
		var top = getTop(i);
		$lineView.append(`<li>
			<div class="image-line-block" style="background-position:-61px ${top}px" data-top="${top}"><label class="index-lbl">${i+1}</label><div class="img-align"><button class="move-up">+</button><button class="move-down">-</button></div></div>
			<textarea class="audit-line">${l.trim()}</textarea>
		</li>`);
	});

	$("#audit-view").append($lineView);
}

function setIndex() {
	var currentIndex = location.hash ? location.hash.match(/\d+$/)[0] : 0;
	if(currentIndex) {
		fileIndex = currentIndex;
	}

	$("#input-fileNo").val(101 + parseInt(fileIndex));
}


function loadFile() {
	var $inputArea = $("#input-area");
	$.ajax({
		type: "GET",
		url: "https://typing-assign.firebaseio.com/.json",
		dataType: "json",
		success: function (data) {
			assignObj = data;
			$inputArea.show();
			imagesIndexs = generateIndexs();
			setIndex();
		},
		error: function () {
			console.log("error")
		}
	});

	$inputArea.bind("paste", function(e) {
		$(this).hide();
		$("#input-fileNo").hide();
		$("#audit-view").show();

		var pastedData = e.originalEvent.clipboardData.getData('text');
		pastedData = pastedData.replace(/- -/g, '--');
		var dataLines = pastedData.toString().split("\n");
		var currentIndex = parseInt($("#input-fileNo").val()) - 101;
		fileIndex = currentIndex < 0 ? 99 : currentIndex;
		generateView(dataLines);
	});


	$("#audit-view").on("click", ".audit-line", function() {
		var $self = $(this);
		$self.attr("disabled", false);
		var $next = $self.closest("li").prevAll();

		if($next) {
			$next.find("label").addClass("done");
			$next.find(".audit-line").attr("disabled", true);
		}
	});

	$("#audit-view").on("click", "li:last-child .audit-line", function() {
		$("#complete-audit").show();
	});

	$("#audit-view").on("click", ".index-lbl.done", function() {
		var $self = $(this);
		$self.removeClass("done");
		var $next = $self.closest(".image-line-block").siblings(".audit-line").attr("disabled", false);

		if($next) {
			$next.find("label").addClass("done");
			$next.find(".audit-line").attr("disabled", true);
		}
	});

	$("#audit-view").on("click", ".image-line-block .move-up", function() {
		var $imgBlocks = $(this).closest("li").nextAll().addBack();
		moveImage($imgBlocks, false);
	});

	$("#audit-view").on("click", ".image-line-block .move-down", function() {
		var $imgBlock = $(this).closest("li");
		var $imgBlocks = $imgBlock.nextAll().addBack();
		moveImage($imgBlocks, true);
	});

	$("#adjust-fontsize .font-inc").click(function() {
		var fontSize = $("#adjust-fontsize").data("fsize");
		fontSize+= 0.5;
		$("#adjust-fontsize").data("fsize", fontSize);
		$(".audit-line").css({fontSize: `${fontSize}px`});
	});

	$("#adjust-fontsize .font-dec").click(function() {
		var fontSize = $("#adjust-fontsize").data("fsize");
		fontSize-= 0.5;
		$("#adjust-fontsize").data("fsize", fontSize);
		$(".audit-line").css({fontSize: `${fontSize}px`});
	});


	$("#complete-audit").click(submitAudit);
}

setTimeout(loadFile, 0);