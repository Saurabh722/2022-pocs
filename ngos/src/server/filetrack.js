const testFolder = './../../projects/flagship/src/templates/landing/desktop';
const fs = require('fs');
const fse = require('fs-extra');

function readFiles(res) {
var json = {
files: []
};

fs.readdir(testFolder, (err, files) => {
files.forEach(file => {
console.log(file);
if(file.indexOf('scss') !== -1) {
json.files.push(file);
}
});

res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(JSON.stringify(json, null, '\t'));
res.end();
});
}

module.exports = readFiles