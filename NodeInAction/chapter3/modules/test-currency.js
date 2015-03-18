// ./ is used to indicate the file is located in the same directory as the application script

var currency = require('./currency');

console.log('50 Canadian dollars equals this amount of US dollars:')
console.log(currency.canadianToUs(50));


console.log('50 US dollars equals this amount of Canadian dollars:')
console.log(currency.USToCanadian(50));

/* HOW NODE MODULES AND EXPORTS WORK */

// exports is set up as a global reference to module.exports
// if you set exports equal to a variable/object/function then you are rewriting module.exports
// it will break the link between exports and module.exports
// exports.myFunc is equal to module.exports.myFunc

// Node uses a mechanism for code reuse that allows requiring a module without knowing
// its location in the file system by using a 'node_modules' directory.
// It will first check current directory/ node_modules in current directory
// and repeat the process with parent directories.
// If module is a directory, node will run the file names index.js unless
// you otherwise specify the main file in package.json (ie: "main: currency.js")

// Node can cache modules as objects. If you use the same module twice in
// different require paths, the first will store in the data in app memory
// the second won't need to access and evaluate the module's source and
// will have the opportunity to alter the cached data.
