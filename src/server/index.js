require('dotenv').config();

const http = require('http');
const requestHandler = require('./requestHandler');

const port = process.env.PORT;

const server = http.createServer(requestHandler);

function start() {
  server.listen(port, () => console.log(`server is listening on ${port} `));
}

function gracefulShutdown() {
  return server.close(() => {
    console.log('Http server closed.');
  });
}

// process.on('SIGINT', gracefulShutdown);
// process.on('SIGTERM', gracefulShutdown);
// process.on('SIGUSR1', gracefulShutdown);
// process.on('SIGUSR2', gracefulShutdown);
// process.on('uncaughtException', gracefulShutdown);
// process.on('unhandledRejection', gracefulShutdown);

module.exports = {
  start
};
