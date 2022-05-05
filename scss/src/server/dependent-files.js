const fileRelativepath = './../../projects/flagship/src';
const fs = require('fs');

function readFiles(req, res) {
    var filepath = req.url == '/' ? '/templates/landing/desktop/style' : req.url;

    filepath = fileRelativepath + filepath + '.scss';
    console.log(filepath);

    fs.readFile(filepath, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(JSON.stringify(data.toString(), null, '\t'));
            res.end();
        }
    });
}

module.exports = readFiles