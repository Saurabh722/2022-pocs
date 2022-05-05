"use strict";

const UU = require("@vsdp/underwire")["default"];

const partial = require("@vsdp/flagship-src/components/voice-assistant/partial");
const reducer = require("@vsdp/flagship-src/components/voice-assistant/reducer");
const util = require("@vsdp/flagship-src/components/voice-assistant/utilities/utility");
const mapAllEvents = require("@vsdp/flagship-src/components/voice-assistant/utilities/event-handler");
const synth = require("@vsdp/flagship-src/components/voice-assistant/utilities/speech-synthesis");
const tiggerAction = require("@vsdp/flagship-src/components/voice-assistant/utilities/action-controller");
const recognition = require("@vsdp/flagship-src/components/voice-assistant/utilities/speech-recognition");

let thisModule; // eslint-disable-line prefer-const
let finaTranscript;
let recognizing = false;
let continuous = true;
let isMicOn = false;

function showInfo (msg) {
	console.log(msg);
}

const firstChar = /\S/;

function capitalize (s) {
	return s.replace(firstChar, function capitaliz (m) {
		return m.toUpperCase();
	});
}

function micOn () {
	isMicOn = true;
	recognition.start();
	thisModule.updateState("reset-all", isMicOn);
}

function micOff () {
	isMicOn = false;
	continuous = false;
	recognition.stop();
	util.setMicStatus();
	thisModule.updateState("reset-all", isMicOn);
}

function onSpeechstart () {
	recognizing = true;
	util.setMicStatus(true);
	showInfo("----onSpeechstart-----");
}

function reStartSpeech () {
	if (!isMicOn) {
		return;
	}
	continuous = true;
	recognition.start();
	finaTranscript = "";
	thisModule.updateState("final-transcript", finaTranscript);
	showInfo("----reStartSpeech----");
}

function onSpeechEnd () {
	recognizing = false;

	if (!finaTranscript && !continuous) {
		showInfo("info_start");
		return;
	}

	if (continuous) {
		setTimeout(reStartSpeech);
	}
	showInfo("----onend----");
}

function onSpeechResult (event) {
	const last = event.results.length - 1;
	finaTranscript = event.results[last][0].transcript;
	console.log("Confidence: ", event.results[0][0].confidence);

	if (finaTranscript) {
		tiggerAction(finaTranscript.toLowerCase());
		finaTranscript = capitalize(finaTranscript);
		thisModule.updateState("final-transcript", finaTranscript);
	}
}

function onRecognitionError (event) {
	if (event.error === "no-speech") {
		showInfo("Error: info_no_speech");
	}
	if (event.error === "audio-capture") {
		showInfo("Error: info_no_microphone");
	}
	if (event.error === "not-allowed") {
		showInfo("Error: not-allowed");
	}
}

function initSpeech () {
	recognition.onstart = onSpeechstart;

	recognition.onerror = onRecognitionError;

	recognition.onend = onSpeechEnd;

	recognition.onresult = onSpeechResult;
}

function onMicButtonClick () {
	if (recognizing || isMicOn) {
		micOff();
	} else {
		micOn();
	}

	finaTranscript = "";
}

function onReady () {
	if (recognition) {
		initSpeech();
		thisModule.updateState("is-supported");

		if (util.isMicOn()) {
			synth.speak("");
			micOn();
		}
	}
	thisModule.render();
}

function stopListening () {
	continuous = false;
	recognition.stop();
	showInfo("----stopListening----");
}

function onRender (state) {
	UU.render(thisModule, state);
	mapAllEvents();
}

thisModule = {
	name: "fabric-voice-assistant-component",
	scope: ".fabric-voice-assistant-component",
	partial: partial,
	reducer: reducer,
	ready: onReady,
	render: onRender,
	events: {
		"click .fabric-mic-button": onMicButtonClick
	},
	subscribe: {
		"stop-listening": stopListening,
		"start-listening": reStartSpeech,
		"toggle-mic": onMicButtonClick
	}
};

module.exports = thisModule;