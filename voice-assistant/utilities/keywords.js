"use strict";

const actions = {
	welcome: ["hello", "hey"],
	link: ["open"],
	search: ["search", "lookfor"],
	read: ["read", "lead", "aboutproduct", "available"],
	goto: ["focus"],
	scroll: ["scroll"],
	close: ["close"],
	input: ["enter", "fill", "type"],
	select: ["select", "electric", "remove", "increase", "decrease", "connect"],
	micoff: ["mikeoff", "makeof", "mikeof", "michael", "mycough"],
	addtobag: ["addthisproduct", "addtobag", "buythisproduct"]
};

const selects = {
	cupaa: ["aa", "ee", "papier", "capee", "cupaa"],
	cupa: ["a", "copy", "cupe", "cupa"],
	cupb: ["b", "kirkby", "kirby", "cupb"],
	cupc: ["c", "cupc", "topsy", "copsey", "cupsi"],
	cupd: ["d", "cupd", "kirkby", "kabaddi"],
	Sizel: ["l", "sizel", "basil", "sizen", "sizing", "season"],
	fivestars: ["5star", "fivestar", "bythestar", "bythestars"],
	fourstars: ["4star"]
};

function getRegExpStr () {
	let RegExpStr = "click|tab|show";

	for (const key in actions) {
		if (actions.hasOwnProperty(key)) {
			RegExpStr += `|${actions[key].join("|")}`;
		}
	}

	return new RegExp(RegExpStr, "g");
}

function selectEvent (cmd) {
	for (const key in selects) {
		if (selects.hasOwnProperty(key)) {
			const action = selects[key].filter(function filter (keyword) {
				return cmd === keyword;
			});

			if (action.length) {
				return key;
			}
		}
	}

	return cmd;
}

function isAction (type, cmd) {
	return actions[type].filter(function filter (keyword) {
		return cmd.includes(keyword);
	}).length;
}

const regExpStr = getRegExpStr();

function refactorInstruction (cmd) {
	const cmdArr = cmd.split(regExpStr);
	const lastIndex = cmdArr.length - 1;
	const refactorStr = cmdArr[lastIndex];

	if (isAction("select", cmd)) {
		return selectEvent(refactorStr);
	}

	return refactorStr;
}

module.exports = {
	actions: actions,
	isAction: isAction,
	selectEvent: selectEvent,
	refactorInstruction: refactorInstruction
};