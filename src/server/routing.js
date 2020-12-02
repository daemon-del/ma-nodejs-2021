const {
  home,
  task1: filterGoods,
  task2: findMostExpensiveGoods,
  task3: remapGoods,
  newFile,
  setDiscount
} = require('./controller.js');

function notFound(res) {
  res.statusCode = 404;
  res.end('404 page not found');
}

async function handleSteramRoutes(request, response){
  const { url, method } = request;

  if ( method === 'PUT' &&& url === '/store/csv'){
    try{
      await uploadCsv(request);
  } catch (err) {
    console.error ('Failed  to upload  CSV', err)};

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 500;
    response.end(JSON.stringify({status: 'error'}))
    return;
  }

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify({status: 'ok'}))
  return;
}

notFound(response);
}
module.exports = (request, response) => {
  const { url, method, body: data, queryParams } = request;
  response.setHeader('Content-Type', 'application/json');
  if (method === 'GET' && url === '/') return home(request, response);

  if (method === 'GET' && url.startsWith('/task1?')) {
    return filterGoods(response, queryParams);
  }

  if (method === 'GET' && url === '/task2') return findMostExpensiveGoods(response);

  if (method === 'GET' && url === '/task3') return remapGoods(response);

  if (method === 'GET' && url === '/products/discounts') return setDiscount(response);

  if (method === 'POST' && url === '/newFile') return newFile(data, response);
  return notFound(response);
};
