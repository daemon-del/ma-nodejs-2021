function myMap(array, callback) {
  const black = [];
  for (let i = 0; i < array.length; i += 1) {
    black.push(callback(array[i]));
  }
  return black;
}

module.exports = {
  myMap
};
