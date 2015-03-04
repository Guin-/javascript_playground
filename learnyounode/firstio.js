var fs = require('fs');

//rawfile = fs.readFileSync(process.argv[2]);
//var stringFile = rawfile.toString();
//var stringArray = stringFile.split('\n');
//var count = stringArray.length-1;

//console.log(stringFile);
//console.log(stringArray);
//console.log(count);
//
var filecontent = fs.readFileSync(process.argv[2]);
var lines = filecontent.toString().split('\n').length-1;
console.log(lines);

// passing encoding option to .readfilesync
//var filecontent = fs.readFileSync(process.argv[2], 'utf-8').split('\n').length - 1;

