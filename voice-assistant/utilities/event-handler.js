"use strict";

const $ = require("jquery");

const commonLinks = require("@vsdp/flagship-src/components/voice-assistant/utilities/common-links");
const util = require("@vsdp/flagship-src/components/voice-assistant/utilities/utility");

function resetAllEvents () {
	window.allEvents = {
		click: {},
		input: {},
		select: {},
		link: commonLinks
	};
}

function generateEventId ($el) {
	const regex = "-----";

	if ($el.is(".fabric-accordion-utility-item-button")) {
		const eventId = util.customTrim($el.find("p").data("metric"));
		return eventId;
	}

	const ariaLabel = $el.data("value") || $el.attr("aria-label") || $el.data("link-name");
	const dataText = $el.data("text");
	const linkText = $el.text().toString()
					.trim();

	if (ariaLabel) {
		return util.customTrim(ariaLabel);
	} else if (linkText && !linkText.includes(regex)) {
		return util.customTrim(linkText);
	} else if (dataText && !dataText.includes(regex)) {
		return util.customTrim(dataText);
	}
	return "#";
}

function updateEventsList (type, eventId, event) {
	if (!window.allEvents[type][eventId]) {
		if (type === "link") {
			window.allEvents[type][eventId] = event.href.toString();
		} else {
			window.allEvents[type][eventId] = event;
		}
	}
}

/* eslint-disable-next-line complexity, max-statements */
function setEvents () {
	const event = this;
	const $el = $(event);
	let eventId = generateEventId($el);
	let type;

	if (event.href) {
		type = "link";
		if ($el.is(".shell-link")) {
			const selectorId = $el.siblings(".fabric-product-card-detail").find(".fabric-h3-typography-element").text();
			eventId = util.shortAndTrim(selectorId);
		}
	} else if ($el.is(".fabric-accordion-filter-component-option, .fabric-filter-component-applied-filter")) {
		type = "select";
	} else if ($el.is(".fabric-purchasable-product-component-box-selectors-group-option")) {
		type = "select";
		if ($el.hasClass("image-based")) {
			const selectorId = $el.find("img").attr("alt").split(/([0-9]+)/)[0];
			eventId = util.shortAndTrim(selectorId);
		} else {
			const selectorId = $el.text();
			eventId = util.shortAndTrim(selectorId);
		}
	} else if ($el.is(".fabric-radio-input-component")) {
		type = "select";
		const inputId = $el.attr("aria-label");
		eventId = util.shortAndTrim(inputId);
		type = "select";
	} else if ($el.is(`input[type="text"], input[type="email"], input[type="phone"], input[type="password"], textarea`)) {
		const inputId = $el.attr("name") || $el.attr("autocomplete");
		eventId = util.shortAndTrim(inputId);
		type = "input";
	} else {
		type = "click";
	}
	if (eventId !== "#") {
		updateEventsList(type, eventId, event);
	}
}

function mapAllEvents () {
	resetAllEvents();
	$(`a,
		[role="radio"],
		button:not(#start_button),
		input,
		textarea
	`).each(setEvents);
}

module.exports = mapAllEvents;