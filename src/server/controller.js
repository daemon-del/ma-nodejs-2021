const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, '../../', 'goods.json');

const goods = require('../../goods.json');
const { filterArray, rebuildArray, result } = require('../task/index');

let goodsArr = [];

function home(request, response) {
  response.end();
}

function task1(response, queryParams) {
  console.log(queryParams);
  if (queryParams.field === 'quantity') {
    goodsArr = filterArray(goods, queryParams.field, +queryParams.value);
  } else {
    goodsArr = filterArray(goods, queryParams.field, queryParams.value);
  }
  response.end(JSON.stringify(goodsArr));
}

function task2(response) {
  response.end(JSON.stringify(result));
}

function task3(response) {
  response.end(JSON.stringify(rebuildArray(goods)));
}

function newFile(data, response) {
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 1));
  response.end(JSON.stringify(data));
}

module.exports = {
  home,
  task1,
  task2,
  task3,
  newFile
};
