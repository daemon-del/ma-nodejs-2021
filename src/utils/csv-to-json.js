const { Transform } = require('stream');


function createCsvToJson() {
  const transform = (chunk, encoding, callback) => {
    const string = chunk.toString();
    callback(null, string);
  };

  const flush = callback => {
    console.log('No more data to read.');
    callback(null);
  };

  return new Transform({ transform, flush });
}

module.exports = {
  createCsvToJson
};
