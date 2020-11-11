function rebuildArray(arr) {
  return arr.map((element) => {
    return {
      type: element.type || "",
      color: element.color || "",
      quantity: element.quantity || 0,
      price: element.price || element.priceForPair || 0,
    };
  });
}

module.exports = {
  rebuildArray,
};
