const { array } = require('../store');
const { showSocks: task1, getBiggestPrice: task2, rebuildArray } = require('./task/index');


const boot = function(arr){
    const result = task1(arr)
    const biggestsPrice = task2(result)
    const rebuildedArray = rebuildArray(arr)
    console.log(biggestsPrice, rebuildedArray)
}

boot(array);
