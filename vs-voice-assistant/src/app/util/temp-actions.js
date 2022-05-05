function loadTempEvents() {
    $("button:not(#start_button)").click(function() {
        console.log(`button ${$(this).text()} Clicked`);
    });
}

module.exports = loadTempEvents;