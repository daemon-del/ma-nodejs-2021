function filterArray(inputGoods, property, value) {
  return inputGoods.filter((good) => good[property] === value);
}

module.exports = {
  filterArray,
};
