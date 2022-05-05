"use strict";

function setUpRecognitionParam (recognition) {
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
	recognition.lang = "en-US";

	return recognition;
}

function getSpeechRecognition () {
	const SpeechRecognition = window.SpeechRecognition ||
								window.mozSpeechRecognition ||
								window.msSpeechRecognition ||
								window.webkitSpeechRecognition;

	if (SpeechRecognition) {
		return setUpRecognitionParam(new SpeechRecognition());
	}

	return false;
}

module.exports = getSpeechRecognition();