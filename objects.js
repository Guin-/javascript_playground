var vehicle1 = {
    type:"Motorboat",
    capacity: 6,
    storedAt: "Ammunition Depot"
    };


var vehicle2 = {
    type:"Jet Ski",
    capacity: 1,
    storedAt: "Reef Dock"
    };


var vehicle3 = {
    type: "Submarine",
    capacity: 8,
    storedAt: "Underwater Outpost"
    };


var vehicle1 = {type: "Motorboat", capacity: 6, storedAt: "Ammunition Depot"};
var vehicle2 = {type: "Jet Ski", capacity: 1, storedAt: "Reef Dock"};
var vehicle3 = {type: "Submarine", capacity: 8, storedAt: "Underwater Outpost"};
var vehicles = [vehicle1, vehicle2, vehicle3];
var findVehicle = function(name, list){
      for (i=0; i<list.length; i++){
              if (i.type == name){
                        return i.location;
                };
        };
};

findVehicle(Submarine, vehicles);

var vehicle3 = {
      type: "Submarine", capacity: 8, storedAt: "Underwater Outpost",
        ranger1: { name: "Gregg Pollack", skillz: "Lasering", dayOff: "Friday"},
          ranger2: { name: "Bijan Boustani", skillz: "Roundhouse Kicks", dayOff: "Tuesday"},
            ranger3: { name: "Ashley Smith", skillz: "Torpedoing", dayOff: "Friday"},
              ranger4: { name: "Mark Krupinski", skillz: "Sniping", dayOff: "Wednesday"},
                numRangers: 4
};
function relieveDuty (vehicle, day){
      var offDuty = [ ];
        var onDuty = [ ];
          for(var i = 1; i<=vehicle["numRangers"]; i++){
                  if(vehicle["ranger" + i]["dayOff"] == day){
                            offDuty.push(vehicle["ranger" + i]);
                                }
                                    else{
                                              onDuty.push(vehicle["ranger" + i]);
                                                  }
                                                      delete vehicle["ranger" + i];
                                                        }
                                                          vehicle.numRangers -= offDuty.length;
                                                            for(var j = 1; j<=vehicle["numRangers"]; j++){
                                                                    vehicle["ranger" + j] = onDuty.shift();
                                                                      }
                                                                        return offDuty;
}
var offToday = relieveDuty(vehicle3, "Friday");

