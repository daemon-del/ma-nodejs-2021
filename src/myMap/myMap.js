function myMap(array, callback){
  const black = [];
  array.forEach((element, i) => black.push(callback(element[i])));
  return black;
}