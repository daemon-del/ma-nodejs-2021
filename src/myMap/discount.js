const { promisify } = require('util');

function getDiscount() {
  const min = 1;
  const max = 99;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getValidDiscount(callback) {
  setTimeout(() => {
    const randomDiscount = getDiscount();

    if (randomDiscount >= 20) {
      return callback(new Error('too big discount'));
    }

    return callback(null, randomDiscount);
  }, 50);
}

function generateValidDiscount(callback) {
  getValidDiscount((err, discount) => {
    if (err) {
      return generateValidDiscount(callback);
    }

    return callback(null, discount);
  });
}

function generateValidDiscountAsync() {
  const promise = promisify(generateValidDiscount);

  return promise();
}

module.exports = {
  generateValidDiscountAsync
};
