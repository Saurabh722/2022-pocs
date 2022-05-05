const util = require("./util/util");

window.allEvents = {
    click: [],
    focus: []
}

window.speechGrammars = [];

function generateEventId($el) {
    const regex = "-----";
    let linkText = $el.text().toString().trim();
    let dataText = $el.data("text");

    if (linkText && !linkText.includes(regex)) {
        return util.customTrim(linkText);
    } else if (dataText && !dataText.includes(regex)) {
        return util.customTrim(dataText);
    }
    return "#";
}

function mapAllEvents() {
    $('a, .fabric-purchasable-product-component-box-selectors-group-option[role="radio"], button:not(#start_button)').each(function () {
        const $el = $(this);
        const linkEventId = generateEventId($el);
        if(linkEventId !== "#") {
            speechGrammars.push(linkEventId);
            window.allEvents.click[linkEventId] = this;
        }
    });
}


module.exports = mapAllEvents;