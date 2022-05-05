"use strict";

const UU = require("@vsdp/underwire")["default"];

function searchHandler (cmd) {
    console.log("tigger search Action-Search Term", cmd);
    UU.publish("voice-search", { keyCode: 13, value: cmd });
}

module.exports = searchHandler;