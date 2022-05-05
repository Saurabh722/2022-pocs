const util = require("./util/util");
const speak = require("./text-to-voice");

let matchThreshold = 0.7;
let eventType = "click";
let scrollDirection = "up";
let setDefaultEvent;

function resetEvent() {
    clearTimeout(setDefaultEvent);
    setDefaultEvent = setTimeout( function(){ 
        eventType = "click";
    }, 3000);
}

function triggerEvent(action, eventId) {
    var actionEvent = util.getActionEvent(action, util.customTrim(eventId));
    if(actionEvent) {
        console.log(eventId);
        actionEvent.focus();
        actionEvent.click();
    }
}

function movePage(direction) {
    let top = 0;
    let speed = 3000;
    const isStop = direction.includes("stop") || direction == "top";
    const $body = $("html, body");
    console.log(direction);
    if (direction.includes("slow")) {
        speed = 5000;
    }

    if (direction.includes("little")) {
        if (scrollDirection == "up" || direction.includes("up")) {
            scrollDirection == "up";
            top = $body.scrollTop() - 100;
        } else {
            top = $body.scrollTop() + 100;
        }
    } else {
        if (direction.includes("up")) {
            scrollDirection == "up";
            top = 0;
        } else {
            scrollDirection == "down";
            top = $body.height();
        }
    }

    $body.stop();

    if (isStop) {
        if (scrollDirection == "up") {
            top = $body.scrollTop() - 600;
        } else {
            top = $body.scrollTop() + 600;
        }
        $body.animate({ scrollTop: top }, 300, 'swing');
    } else {
        $body.animate({ scrollTop: top }, speed, 'swing');
    }
    
}

function refactorInstruction(cmd) {
    return util.customTrim(cmd.replace(/click|tab|open|search|focus|scroll|move/g, '').trim());
}

function eventController (cmd) {
    if (eventType == "search") {
        console.log("tigger search Action");
    } else if (eventType == "focus") {
        console.log("goto respective element");
    } else if (eventType == "scroll") {
        console.log("goto respective element");
        movePage(cmd);
    }  else {
        console.log("Click event");
        speak("sure");
        triggerEvent(eventType, cmd);
    }
}

function closeDialogBox() {
    console.log("fabric-modal-utility-close-button");
    $(".fabric-modal-utility-close-button, .fabric-scrim-element-closable").click();
}

function tiggerAction(str) {
    console.log("tiggerAction", str);
    if (!str) return;
    if (str.includes("search") || str.includes("look for") || str.includes("lookfor")) {
        eventType = "search";
    } else if (str.includes("focus") || str.includes("goto")) {
        eventType = "focus";
    } else if (str.includes("move up") || str.includes("scroll") || str.includes("move down") || str.includes("little")) {
        eventType = "scroll";
    } else if (str.includes("close")) {
        closeDialogBox();
        eventType = "click";
    } else {
        eventType = "click";
    }
    eventController(refactorInstruction(str));
}

module.exports = tiggerAction;