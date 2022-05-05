"use strict";

function getMatchThreshold (l) {
	if (l < 20) {
		return 0.6;
	} else if (l < 20) {
		return 0.5;
	} else if (l < 30) {
		return 0.4;
	} else if (l < 50) {
		return 0.35;
	}

	return 0.3;
}

function shortKey (str) {
	const l = str.length;
	const maxChar = 25;
	if (l < maxChar) {
		return str;
	}

	return str.substring(l - maxChar, l);
}

function customTrim (str) {
	if (typeof str === "string") {
		return str.toString()
				.toLowerCase()
				.replace(/\b(\w+)\s+\1\b/g, "$1")
				.replace(/ |\n|\t|'|"|,|\./g, "")
				.replace(/[^\w\s]/gi, "")
				.replace(/ /g, "")
				.trim();
	}

	return str;
}

function shortAndTrim (str) {
	return shortKey(customTrim(str));
}

function setMicStatus (isOn) {
	if (isOn) {
		window.localStorage.isVsMicOn = new Date().getTime();
	} else {
		window.localStorage.isVsMicOn = 0;
	}
}

function micStatus () {
	const delayThreshold = 15000; // 15 seconds
	const newTime = new Date().getTime();
	const oldTime = parseInt(window.localStorage.isVsMicOn, 0);
	return (newTime - oldTime) < delayThreshold;
}

function editDistance (s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	const costs = [];
	for (let i = 0; i <= s1.length; i++) {
		let lastValue = i;
		for (let j = 0; j <= s2.length; j++) {
			if (i === 0) {
				costs[j] = j;
			} else if (j > 0) {
				let newValue = costs[j - 1];
				if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
					newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
				}

				costs[j - 1] = lastValue;
				lastValue = newValue;
			}
		}
		if (i > 0) {
			costs[s2.length] = lastValue;
		}
	}
	return costs[s2.length];
}

function similarity (s1, s2) {
	let longer = s1;
	let shorter = s2;

	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}

	const longerLength = longer.length;

	const matchThreshold = getMatchThreshold(longerLength);

	if (longerLength === 0) {
		return 1.0 > matchThreshold;
	}
	const matchValue = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
	return matchValue > matchThreshold;
}

function getActionEvent (action, id) {
	console.log(action, id);
	const $event = window.allEvents[action][id];
	if ($event) {
		return $event;
	}

	for (let key in window.allEvents[action]) {
		if (similarity(key, id, action)) {
			return window.allEvents[action][key];
		}
	}
}

module.exports = {
	customTrim: customTrim,
	shortKey: shortKey,
	shortAndTrim: shortAndTrim,
	similarity: similarity,
	getActionEvent: getActionEvent,
	setMicStatus: setMicStatus,
	isMicOn: micStatus
};