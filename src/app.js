const server = require('./server');

function enableGrasefulExit() {
  const exitHantler = error => {
    if (error) console.error(error);

    console.log('Gracefully stopping...');
    server.stop(() => {
      process.exit();
    });
  };
}

function boot() {
  enableGrasefulExit();
  server.start();
}

boot();
