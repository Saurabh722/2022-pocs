const loadTempEvents = require("./util/temp-actions");

const speak = require("./text-to-voice");
const mapAllEvents = require("./event-handler");
const grammerStr = require("./util/grammer");
const identifyAction = require("./controller");

function loadSpeechRecognition() {
    var final_transcript = '';
    var recognizing = false;
    var continuous = true;
    var ignore_onend;
    var start_timestamp;
    if (!('webkitSpeechRecognition' in window)) {
        upgrade();
    } else {
        //console.log(grammerStr());
        start_button.style.display = 'inline-block';
        var recognition = new webkitSpeechRecognition();
        //var speechRecognitionList = new webkitSpeechGrammarList();
        //speechRecognitionList.addFromString(grammerStr(), 1);
        //recognition.grammars = speechRecognitionList;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = function () {
            recognizing = true;
            showInfo('info_speak_now');
            start_button.classList = "mic-on";
        };

        recognition.onerror = function (event) {
            if (event.error == 'no-speech') {
                start_button.classList = "";
                showInfo('info_no_speech');
                ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
                start_button.classList = "";
                showInfo('info_no_microphone');
                ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
                if (event.timeStamp - start_timestamp < 100) {
                    showInfo('info_blocked');
                } else {
                    showInfo('info_denied');
                }
                ignore_onend = true;
            }
        };

        recognition.onend = function () {
            recognizing = false;
            if (ignore_onend) {
                return;
            }
            start_button.classList = "";
            if (!final_transcript && !continuous) {
                showInfo('info_start');
                document.getElementById("speech-container").classList = "";
                return;
            }
            showInfo('onend');

            if(continuous) {
                setTimeout(function(){ recognition.start(); }, 300);
            }
        };

        recognition.onresult = function (event) {
            var interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            final_transcript = capitalize(final_transcript);
            final_span.innerHTML = linebreak(final_transcript);
            interim_span.innerHTML = linebreak(interim_transcript);

            if (final_transcript) {
                console.log(final_transcript);
                identifyAction(final_transcript.toLowerCase().trim());
                final_transcript = '';
                final_span.innerHTML = '';
                interim_span.innerHTML = '';
            }
        };
    }

    function upgrade() {
        start_button.style.visibility = 'hidden';
        showInfo('info_upgrade');
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;

    function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;

    function capitalize(s) {
        return s.replace(first_char, function (m) {
            return m.toUpperCase();
        });
    }


    function startButton(event) {
        if (recognizing) {
            continuous = false;
            recognition.stop();
            return;
        }

        document.getElementById("speech-container").classList = "active";

        final_transcript = '';
        recognition.start();
        ignore_onend = false;
        final_span.innerHTML = '';
        interim_span.innerHTML = '';
        start_button.classList = "mic-on";
        showInfo('info_allow');
        start_timestamp = event.timeStamp;

        speak("Hi");
    }

    function showInfo(msg) {
        console.log(msg);
    }

    document.getElementById("start_button").onclick = startButton;
}

function loadEvents() {
    mapAllEvents();
    loadSpeechRecognition();
    loadTempEvents();
}

module.exports = loadEvents;