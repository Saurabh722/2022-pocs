"use strict";

const UU = require("@vsdp/underwire")["default"];
const $ = require("jquery");

const vMsg = require("@vsdp/flagship-src/components/voice-assistant/utilities/voice-messages");
const util = require("@vsdp/flagship-src/components/voice-assistant/utilities/utility");
const getAction = require("@vsdp/flagship-src/components/voice-assistant/utilities/action-type");
const searchHandler = require("@vsdp/flagship-src/components/voice-assistant/utilities/search-handler");
const { productPageHandler, productQuantityHandler } = require("@vsdp/flagship-src/components/voice-assistant/utilities/product-page-handler");
const synth = require("@vsdp/flagship-src/components/voice-assistant/utilities/speech-synthesis");

let $focusedInput = false;
let cacheInputMsg = "";

function onSpeakEnd () {
	UU.publish("start-listening");
}

function selectEvent (eventId, isSelect) {
	const actionEvent = util.getActionEvent("select", util.customTrim(eventId));

	if (actionEvent) {
		console.log(eventId);
		const $actionEvent = $(actionEvent);
		const isAlreadySelected = $actionEvent.hasClass("selected");
		const selectMsg = isSelect ? (isAlreadySelected ? vMsg.alreadySelected : vMsg.selected) : (isAlreadySelected ? vMsg.removed : vMsg.alreadyRemoved);
		$actionEvent.focus();
		synth.speak(selectMsg);
		if ((isSelect && !isAlreadySelected) || (!isSelect && isAlreadySelected)) {
			$actionEvent.removeClass("selected");
			$actionEvent.click();
		}
	} else {
		synth.speak(vMsg.eventNotFount);
	}
}

function addToBag () {
	const actionEvent = util.getActionEvent("click", util.customTrim("addtobag"));
	if (actionEvent) {
		const itemName = $(".fabric-purchasable-product-component-short-description").first().text();
		actionEvent.click();
		synth.speak(`${itemName} is added to bag`);
	}
}

function triggerEvent (action, eventId) {
	const actionEvent = util.getActionEvent(action, util.customTrim(eventId));

	if (actionEvent) {
		console.log(eventId);
		actionEvent.focus();
		const voiceMsg = synth.speak(vMsg.successEvent);
		voiceMsg.onend = function onend () {
			actionEvent.click();
			onSpeakEnd();
		};
	} else {
		synth.speak(vMsg.eventNotFount);
	}
}

function movePage (direction) {
	const $body = $("html, body");
	const moveLength = $(window).height() * 0.8;
	let top;

	if (direction === "up") {
		top = $body.scrollTop() - moveLength;
	} else {
		top = $body.scrollTop() + moveLength;
	}

	$body.animate({ scrollTop: top }, 300, "swing");
}

function gotoEvent (action, eventId) {
	const actionEvent = util.getActionEvent("click", util.customTrim(eventId));

	if (actionEvent) {
		console.log(eventId);
		actionEvent.focus();
		$(actionEvent).hover();
		$(actionEvent).mouseover();
		$(actionEvent).mouseenter();
	} else {
		synth.speak(vMsg.eventNotFount);
	}
}

function closeEvent () {
	const $closeBtn = $(`.fabric-modal-utility-close-button, .fabric-scrim-element-closable, .fabric-masthead-pushdown-component-close-button`);
	if ($closeBtn.length) {
		const voiceMsg = synth.speak(vMsg.successEvent);
		voiceMsg.onend = function onend () {
			$closeBtn.click();
			onSpeakEnd();
		};
	}
}

function pageRedirectHandler (action) {
	const pageLink = util.getActionEvent(action.type, util.customTrim(action.cmd));
	if (pageLink) {
		const msg = synth.speak(`redirecting to ${action.cmd} page`);
		msg.onend = function onend () {
			console.log(pageLink);
			window.location.href = pageLink;
		};
	} else {
		synth.speak(vMsg.eventNotFount);
	}
}

function focusInputField (inputText, eventId) {
	const el = util.getActionEvent("input", util.customTrim(eventId));
	console.log(eventId);
	if (el) {
		$focusedInput = $(el);
		$focusedInput.focus();
	}
}

function typeMessage (msg) {
	const $selectedInputField = $($focusedInput);
	cacheInputMsg = $selectedInputField.val();
	$($focusedInput).val(msg);
}

function reTypeMessage () {
	$($focusedInput).val(cacheInputMsg);
}

function moveNextIndex (direction) {
	if ($focusedInput.length) {
		const $nextEl = $focusedInput.closest(".fabric-input-wrapper-element")[direction]()
					.find(".fabric-text-input-component");
		$focusedInput.blur();
		$nextEl.trigger($.Event("keydown", { keyCode: 9, which: 9 }));
		$nextEl.focus();
		$focusedInput = $nextEl;
	}
}

function inputHandler (str) {
	if (str === "next") {
		moveNextIndex("next");
		return false;
	} else if (str === "done" || str === "dunnes") {
		$focusedInput = null;
		return false;
	} else if (str === "undo" || str === "reenter" || str === "no") {
		reTypeMessage();
		return false;
	} else if (str === "previous") {
		moveNextIndex("prev");
		return false;
	}

	return true;
}

/* eslint-disable-next-line complexity, max-statements */
function eventController (str) {
	if (!str) {
		return;
	}

	if (str === "refresh" || str === "reload") {
		window.location.reload();
	}

	if (inputHandler(str)) {
		const action = getAction(str);
		console.log(`%cOriginal speech ----> ${str}`, "color: #1e81d0");
		console.log(`%ctiggerAction ----> ${action.type} --> ${action.cmd}`, "color: #00ff00");
		if (action.type === "welcome" || str === "hi") {
			$focusedInput = null;
			synth.speak(vMsg.intro);
		} else if (action.type === "link") {
			$focusedInput = null;
			pageRedirectHandler(action);
		} else if (action.type === "search") {
			$focusedInput = null;
			synth.speak(`${vMsg.searching} ${action.cmd}`);
			searchHandler(action.cmd);
		} else if (action.type === "input") {
			focusInputField(action.type, action.cmd);
		} else if (action.type === "read") {
			$focusedInput = null;
			productPageHandler(action);
		} else if (action.cmd === "quantity") {
			$focusedInput = null;
			productQuantityHandler(action);
		} else if (action.type === "focus") {
			gotoEvent(action.type, action.cmd);
		} else if (action.type === "scroll") {
			movePage(action.cmd);
		} else if (action.type === "close") {
			$focusedInput = null;
			closeEvent();
		} else if (action.type === "select") {
			$focusedInput = null;
			synth.cancel();
			selectEvent(action.cmd, action.isSelect);
		} else if (action.cmd === "goback") {
			$focusedInput = null;
			history.back();
		} else if (action.type === "micoff" || str === "bye") {
			$focusedInput = null;
			UU.publish("toggle-mic");
		} else if (action.type === "addtobag") {
			$focusedInput = null;
			addToBag();
		} else if ($focusedInput) {
			typeMessage(str);
		} else {
			$focusedInput = null;
			triggerEvent(action.type, action.cmd);
		}
	}
}

module.exports = eventController;