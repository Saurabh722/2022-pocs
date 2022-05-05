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

function customTrim(str) {
    return str.toLowerCase().replace(/ |\n|\t|'|"|,|\./g, '').replace(/[^\w\s]/gi, '').replace(/ /g, '').trim();
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;

    matchThreshold = getMatchThreshold(longerLength);

    if (longerLength == 0) {
        return 1.0 > matchThreshold;
    }
    const matchValue = (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);

    if( matchValue > 0.4) {
        console.log("match: ", `${longerLength} : ${matchValue*100}%`);
        console.log("match: ", `${s1} : ${s2}`);
    }
    

    return matchValue > matchThreshold;
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function getActionEvent(action, id) {
    for(let key in window.allEvents[action]) {
        if (similarity(key, id)) {
            return window.allEvents[action][key];
        }
    }
}

module.exports = {
    customTrim: customTrim,
    similarity: similarity,
    getActionEvent: getActionEvent
}