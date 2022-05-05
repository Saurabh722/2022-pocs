#!/usr/bin/env node

var async = require('async');
var { exec } = require('child_process');

async function init() {
    exec("npm run scss:hierarchy");
}

init();
