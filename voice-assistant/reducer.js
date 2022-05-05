"use strict";

const g = require("@mgdp/garter");

function onInit (state, data) {
	return g.assign(state, data);
}

function captureAllEvents (state, allEvents) {
	return g.set(state, "allEvents", allEvents);
}

function updateInterimTranscript (state, text) {
	return g.set(state, "interimText", text);
}

function updateFinalTranscript (state, text) {
	return g.set(state, "finalText", text);
}

function resetAll (state, isMicOn) {
	return g.set(state,
		"active", isMicOn,
		"interimText", "",
		"finalText", "");
}

function isSupported (state) {
	return g.set(state, "isSupported", true);
}

module.exports = {
	key: "voiceAssistant",
	defaultState: {
		active: false,
		finalText: "",
		interimText: ""
	},
	init: onInit,
	actions: {
		"capture-all-events": captureAllEvents,
		"interim-transcript": updateInterimTranscript,
		"final-transcript": updateFinalTranscript,
		"is-supported": isSupported,
		"reset-all": resetAll
	}
};