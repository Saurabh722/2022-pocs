"use strict";

const UU = require("@vsdp/underwire")["default"];

function getSpeechSynthesis () {
	return window.speechSynthesis ||
			window.webkitSpeechSynthesisUtterance ||
			window.mozSpeechSynthesisUtterance ||
			window.msSpeechSynthesisUtterance ||
			window.oSpeechSynthesisUtterance ||
			window.SpeechSynthesisUtterance;
}

function onStart () {
	UU.publish("stop-listening");
}

function onSpeakEnd () {
	UU.publish("start-listening");
}

const voiceSynthesis = getSpeechSynthesis();

voiceSynthesis.oncancel = function oncancel () {
	console.log("---canceled----");
};

function setUpSynthesisParam (msg) {
	const message = new SpeechSynthesisUtterance(msg);
	const slectedVoice = voiceSynthesis.getVoices()[49];

	message.rate = 0.9;
	message.pitch = 0.8;
	message.volume = 1;
	message.voice = slectedVoice;
	message.onstart = onStart;
	message.onend = onSpeakEnd;

	return message;
}

function speak (msg) {
	if (voiceSynthesis) {
		const message = setUpSynthesisParam(msg);
		voiceSynthesis.speak(message);
		return message;
	}
	console.log("TEXT TO SPEECH NOT SUPPORTED");
	return false;
}

function cancelSpeech () {
	window.isSpeakCanceled = true;
	voiceSynthesis.cancel();
}

module.exports = {
	cancel: cancelSpeech,
	speak: speak
};