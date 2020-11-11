function filterArray(arr, field, value) {
  return arr.filter((element) => element[field] === value);
}

module.exports = {
  filterArray,
};
