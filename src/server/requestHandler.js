require('dotenv').config();
const { parse: parseQuery } = require('querystring');
const { URL } = require('url');
const router = require('./routing');


function handle(request, response) {
  if (request.headers['content-type'==='text/csv']{
handleSteramRoutes(request, response).catch(err => console.error('csv handler feiled', err))
  return;
}
}

module.exports = async (request, response) => {
  try {
    const { url } = request;
    const parsedUrl = new URL(url, process.env.ORIGIN);
    const queryParams = parseQuery(parsedUrl.search.substr(1));
    let body = [];

    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();

        router(
          {
            ...request,
            body: body ? JSON.parse(body) : {},
            url,
            queryParams
          },
          response
        );
      });
  } catch (error) {
    console.log(error);
  }
};
