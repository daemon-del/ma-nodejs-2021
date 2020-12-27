require('dotenv').config();

const http = require('http');
const requestHandler = require('./requestHandler');

const port = process.env.PORT;

const server = http.createServer(requestHandler);

function start() {
  return server.listen(port, () => console.log(`server is listening on ${port} `));
}

function close() {
  return server.close();
}

module.exports = {
  start,
  close
};
