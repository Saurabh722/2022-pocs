function getGrammerString () {
    return `#JSGF V1.0; grammar events; public <event> =  ${window.speechGrammars.join(" | ")};`;
}

module.exports = getGrammerString;