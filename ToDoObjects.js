function ToDo (task, who, done){
    this.task = task;
    this.who = who;
    this.done = done;
    this.getDone = function(){
        console.log(this.done);
        },
    this.setDone = function(){
        this.done = true;
        console.log(this.done)
        }
    };

var task = new ToDo("task", "guin", false);

