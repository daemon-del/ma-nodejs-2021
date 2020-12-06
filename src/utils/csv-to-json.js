const { Transform } = require('stream');

function createCsvToJson() {
  const transform = (chunk, encoding, callback) => {
    callback(null, chunk.toString());
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
