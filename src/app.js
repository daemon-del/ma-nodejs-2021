const server = require('./server');

function gracefulShutdown() {
  return server.close(() => {
    console.log('Http server closed.');
  });
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR1', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);
process.on('uncaughtException', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);

function boot() {
  server.start();
}

boot();
