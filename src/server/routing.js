const path = require('path');
const fs = require('fs');
const {
  home,
  task1: filterGoods,
  task2: findMostExpensiveGoods,
  task3: remapGoods,
  newFile,
  setDiscount,
  optimizeJson
} = require('./controller.js');

function notFound(res) {
  res.statusCode = 404;
  res.end('404 page not found');
}

module.exports = async (request, response) => {
  const { url, method, body: data, queryParams } = request;
  response.setHeader('Content-Type', 'application/json');

  const urlPath = path.parse(url);

  if (method === 'GET' && url === '/') return home(request, response);

  if (method === 'GET' && url.startsWith('/task1?')) {
    return filterGoods(response, queryParams);
  }

  if (method === 'GET' && url === '/list') {
    const fileList = fs.readdirSync('./upload');
    return response.end(JSON.stringify(fileList));
  }

  if (method === 'GET' && url === '/task2') return findMostExpensiveGoods(response);

  if (method === 'GET' && url === '/task3') return remapGoods(response);

  if (method === 'GET' && url === '/products/discounts') return setDiscount(response);

  if (method === 'POST' && url === '/store/csv') return newFile(data, response);

  if (method === 'POST' && urlPath.dir === '/upload/optimize') {
    const fileName = urlPath.base;
    (async () => {
      try {
        await optimizeJson(fileName);
      } catch (err) {
        response.statusCode = 500;
        return response.end(JSON.stringify({ status: 'error' }));
      }
    })();
    response.statusCode = 202;
    return response.end(JSON.stringify({ status: 'ok' }));
  }

  return notFound(response);
};
