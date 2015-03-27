// Extending an event emitter
// Build a JavaScript class that inherits from the event emitter

// Three Steps:
// 1. Create a class constructor
// 2. Inherit the event emitter's behavior
// 3. Extend the behavior


// constructor for watcher class
function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}



// inherit the behavior
var events = require('events')
        , util = require('util');
// .inherits is a Node built-in of the util modeule.
// it is equivalent to the following:
// Watcher.prototype = new events.EventEmitter();
util.inherits(Watcher, events.EventEmitter);


// Extend the behavior

