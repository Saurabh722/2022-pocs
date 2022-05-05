"use strict";

const util = require("@vsdp/flagship-src/components/voice-assistant/utilities/utility");
const keywords = require("@vsdp/flagship-src/components/voice-assistant/utilities/keywords");

function getAction (str) {
	const actions = keywords.actions;
	const trimStr = util.customTrim(str);
	const refactorStr = util.shortKey(keywords.refactorInstruction(trimStr));
	const isQuantity = trimStr.includes("quantity");

	if (isQuantity) {
		if (trimStr.includes("increase")) {
			return {
				type: "increase",
				cmd: refactorStr
			};
		}

		return {
			type: "decrease",
			cmd: refactorStr
		};
	}

	if (keywords.isAction("select", trimStr)) {
		return {
			type: "select",
			cmd: keywords.selectEvent(refactorStr),
			isSelect: trimStr.includes("select")
		};
	}

	for (const key in actions) {
		if (actions.hasOwnProperty(key)) {
			const action = actions[key].filter(function filter (keyword) {
				return trimStr.includes(keyword);
			});

			if (action.length) {
				return {
					type: key,
					cmd: refactorStr
				};
			}
		}
	}

	return {
		type: "click",
		cmd: refactorStr
	};
}

module.exports = getAction;