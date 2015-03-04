var fs = require('fs');
var file = process.argv[2];

fs.readFile(file, 'utf-8', function(err,data){
    var lines = data.split('\n').length-1;
    console.log(lines);
})
