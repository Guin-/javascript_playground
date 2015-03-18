// Refactor blog_recent.js to reduce callback nesting by using intermediary functions

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(res, req) {
    getTitles(res);
}).listen(8000, '127.0.0.1');

function getTitles(res) {
    fs.readFile('./titles.json', function(err, data) {
        if (err) {
            hadError(err, res);
        } else {
            getTemplate(JSON.parse(data.toString()), res);
        }
    })
}

function getTemplate(titles, res) {
    fs.readFile('/template.html', function(err, data) {
        if (err) {
            hadError(err, res);
        } else {
            formatHtml(titles, data.toString(), res);
        }
    })
}

function formatHtml(titles, tmpl, res) {
    var html = tmpl.replace('%', titles.join('</li></li>'));
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
}

function hadError(err, res) {
    console.log(err);
    res.end('Server Error');
}
