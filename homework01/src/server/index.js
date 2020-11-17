require('dotenv').config();

const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);

function start() {
  server.listen(3000, () => console.log('server is listening on 3000'));
}

module.exports = {
  start
};
