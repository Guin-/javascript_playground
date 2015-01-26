var icebergAlert= warningMaker("iceberg"); 
function warningMaker( obstacle ){
     return function (icebergAlert) {
         alert("Beware! There have been " + obstacle + " sightings in the Cove today!");
        };
}
warningMaker(icebergAlert);




function warningMaker( obstacle){
      var count = 0;
      return function (number, location) {
              count++;
              alert("Beware! There have been " + obstacle + " sightings in the Cove today!\n" +
                     number + " " + obstacle + "(s) spotted at the " + location + "!\n" + "This is alert #" +
                     count + " today for " + obstacle + "danger."
                     );
                };
        }

function warningMaker( obstacle ){
    var count = 0;
    var zones = [];
    return function ( number, location ) {
        count++;
        zones.push(location);
        var zoneslist="";
        for(var i=0; i< zones.length; i++){
            zoneslist += "\n" + zones[i];
            }
        alert("Beware! There have been " + obstacle + " sightings in the Cove today!\n" + 
            number + " " + obstacle + "(s) spotted at the " + location + "!\n" + "This is Alert #" + 
            count + " today for " + obstacle + " danger.\n" + "Current danger zones are:" + zoneslist); 
        };
}


function warningMaker( obstacle ){
    var count = 0;
    var zones = [];
    return function ( number, location ) {
        count++;
        zones.push([location, number]);
        var zoneslist="";
        for(var i=0; i< zones.length; i++){
            zoneslist += "\n" + zones[i][0] + " (" + zones[i][1] + ")";
            }
        alert("Beware! There have been " + obstacle + " sightings in the Cove today!\n" + 
            number + " " + obstacle + "(s) spotted at the " + location + "!\n" + "This is Alert #" + 
            count + " today for " + obstacle + " danger.\n" + "Current danger zones are:" + zoneslist); 
        };
}
