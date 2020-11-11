const { array } = require('../store');
const { filterArray : task1, result: task2, rebuildArray } = require('./task/index');

const boot = function(arr, field, value){
    const filteredArray = task1(arr, field, value);
    console.log(filteredArray);

    const rebuildedArray = rebuildArray(filteredArray);
    console.log(rebuildedArray);
    
    console.log(task2);
}

boot(array, "color", "red");
