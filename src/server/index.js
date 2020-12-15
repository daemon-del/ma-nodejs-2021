require('dotenv').config();

const http = require('http');
const requestHandler = require('./requestHandler');

const port = process.env.PORT;

const server = http.createServer(requestHandler);

function start() {
  server.listen(port, () => console.log(`server is listening on ${port} `));
}

module.exports = {
  start
};
