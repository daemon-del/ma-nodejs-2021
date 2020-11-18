const { array } = require('../store');

function getBiggestPrice(arr) {
  let biggerPrice = 0;
  let good;

  arr.forEach(element => {
    const price = +(element.price || element.priceForPair).slice(1);

    if (biggerPrice < price) {
      biggerPrice = price;
      good = element;
    }
  });

  return good;
}

const result = getBiggestPrice(array);

module.exports = {
  result
};
