const fs = require('fs');
const path = require('path');

const pathToFile = path.resolve(__dirname, '../../', 'goods.json');

const goods = require('../../goods.json');
const { filterArray, rebuildArray, result } = require('../task/index');
const { getValidDiscountAsync } = require('../myMap/discount');

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

async function setDiscount(response) {
  const rebuildedArray = rebuildArray(goods);

  const newMap = await Promise.all(
    rebuildedArray.map(async currentValue => {
      let discount =  await getValidDiscountAsync();

      if (currentValue.type === 'hat') { 
        discount += await getValidDiscountAsync();
      }

      if (currentValue.type === 'hat' && currentValue.color === 'red') {
        discount += await getValidDiscountAsync();
      }

      currentValue.discount = discount;

      return currentValue;
    })
  );
  response.end(JSON.stringify(newMap));
}

module.exports = {
  home,
  task1,
  task2,
  task3,
  newFile,
  setDiscount
};
