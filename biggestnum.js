var arrayOfNums = [2, 7, 7, 3, 9, 0, 1, 6, 8, 3, 8, 4, 7, 9]

function getBiggest(array){
    var biggest = 0;
    for (var num = 0; num < array.length; num++){
        if (array[num] > biggest){
            biggest = array[num];
            }
        }
        return biggest
    }

var biggest = getBiggest(arrayOfNums);
console.log("The biggest is: ", biggest);

