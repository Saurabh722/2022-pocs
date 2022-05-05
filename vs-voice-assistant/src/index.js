import './scss/main.scss';

const loadEvents  = require("./app/voice-to-text");
const productEventList  = require("./app/product");

const markUpText = `
<div id="results">
    <span id="final_span" class="final"></span>
    <span id="interim_span" class="interim"></span>
    <p></p>
</div>
<div>
    <button id="start_button"></button>
</div>`;

function loadSpeechComponent() {
    // productEventList();
    const $speechContainer = $(`<div id="speech-container"></div>`);
    $speechContainer.html(markUpText);
    $("body").append($speechContainer);
    loadEvents();
}

loadSpeechComponent();