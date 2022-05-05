"use strict";

const $ = require("jquery");
const UU = require("@vsdp/underwire")["default"];

// Dependencies.
const synth = require("@vsdp/flagship-src/components/voice-assistant/utilities/speech-synthesis");
const crossSellUtility = require("@vsdp/flagship-src/components/product/utilities/cross-sell-index/utility");

// Private functions
function onSpeakEnd () {
	UU.publish("start-listening");
}

function showSwatches ($target) {
	$target.trigger("product-box-tooltip-update", {
		config: UU.getState("config"),
		isDisabled: $target.attr("aria-disabled"),
		value: $target.attr("data-value"),
		genericId: $target.attr("data-generic-id"),
		key: $target.parents(".fabric-purchasable-product-component-box-selectors-group").attr("data-key"),
		crossSellData: crossSellUtility.getCrossSellIndex($target)
	});
}

function loopSwatch (swatchSelectors, selectedSwatch, count, length) {
	let currentSwatch = selectedSwatch;
	let swatchCount = count;
	if (swatchCount < length) {
		let colorName = selectedSwatch[0].children[1];
			colorName = colorName ? colorName.alt.split(/([0-9]+)/)[0] : selectedSwatch[0].textContent.trim();
		const speakColor = synth.speak(colorName);
		showSwatches(currentSwatch);
		speakColor.onend = function onend () {
			onSpeakEnd();
			swatchCount++;
			currentSwatch.trigger("product-box-tooltip-remove", {
				crossSellData: crossSellUtility.getCrossSellIndex(currentSwatch)
			});
			currentSwatch = $(swatchSelectors[swatchCount]);

			setTimeout(function callLoopSwatch () {
				if (window.isSpeakCanceled) {
					window.isSpeakCanceled = false;
				} else {
					loopSwatch(swatchSelectors, currentSwatch, swatchCount, length);
				}
			}, 1000);
		};
	}
}

function swatchDisplay (swatchSelectors) {
	const length = swatchSelectors.length;
	const count = 0;
	const selectedSwatch = $(swatchSelectors[count]);
	loopSwatch(swatchSelectors, selectedSwatch, count, length);
}

function quantitySelectorIncrement (target) {
	const incrementMessage = synth.speak("Sure, increasing quantity");
	incrementMessage.onend = function onend () {
		$(target).trigger("product-quantity-increment", {
			crossSellData: crossSellUtility.getCrossSellIndex(target)
		});
		onSpeakEnd();
	};
}

function quantitySelectorDecrement (target) {
	const incrementMessage = synth.speak("Sure, decreasing quantity");
	incrementMessage.onend = function onend () {
		$(target).trigger("product-quantity-decrement", {
			crossSellData: crossSellUtility.getCrossSellIndex(target)
		});
		onSpeakEnd();
	};
}

// Public functions
function productPageHandler (action) {
	console.log("Commmand", action.cmd);
	if (action.cmd === "productdescription" || action.cmd === "description") {
		const descriptionElement = document.querySelector(".fabric-purchasable-product-component-description");
		if (descriptionElement) {
			const descriptionText = descriptionElement.innerText.replace(/\n/g, ".").replace(/[^\w\s]/gi, "");
			console.log(descriptionText);
			synth.speak(descriptionText);
		}
	} else if (action.cmd === "color" || action.cmd === "colors" || action.cmd === "colour" || action.cmd === "colours") {
		const swatchSelectors = document.querySelector(".fabric-purchasable-product-component-box-selectors").children[0].children[1].children;
		if (swatchSelectors && swatchSelectors.length > 0) {
			swatchDisplay(swatchSelectors);
		}
	}
}

function productQuantityHandler (action) {
	if (action.type === "increase") {
		const incrementButton = document.querySelector(".fabric-button-element.fabric-quantity-selector-utility-plus");
		quantitySelectorIncrement(incrementButton);
	}

	if (action.type === "decrease") {
		const decrementButton = document.querySelector(".fabric-button-element.fabric-quantity-selector-utility-minus");
		quantitySelectorDecrement(decrementButton);
	}
}

module.exports = {
	productPageHandler: productPageHandler,
	productQuantityHandler: productQuantityHandler
};