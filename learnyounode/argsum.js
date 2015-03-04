//console.log(process.argv.length);
var arraylen = process.argv.length;
var result = 0;

for (var i = 2; i<arraylen; i++){
    result += +process.argv[i];
}

console.log(result);
