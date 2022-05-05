const fileRelativepath = './../../projects/flagship/src';
const fs = require('fs');

function readFiles() {
var filepath = '/components/cms-component-list/desktop/style';

filepath = fileRelativepath + filepath + '.scss';

var json = {
files: []
};

fs.readFile(filepath, function(err, data) {
if(err) {
console.log(err);
} else {
var importFiles = [];
var json = data.toString().trim().replace(/"| /g, '').replace(/\n|\t/g, '').split("@import");
if(json.length) {
json.shift();

json.forEach( file => { 
importFiles.push(file.split(";")[0]);
});
}

console.log(importFiles);
}
});
}
readFiles();