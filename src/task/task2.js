function getBiggestPrice(arr){
  let biggerPrice = 0;

  arr.forEach((element) => {
    let price = +(element.price || element.priceForPair).slice(1);

    if (biggerPrice < price) {
      biggerPrice = price;
    }
  });

  return biggerPrice;
}

module.exports = {
  getBiggestPrice
}
