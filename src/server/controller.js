const { v4: uuidv4 } = require('uuid');
const es = require('event-stream');
const { pipeline } = require('stream');
const { createGunzip } = require('zlib');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const goods = require('../store');
const { filterArray, rebuildArray, result } = require('../task/index');
const { generateValidDiscountAsync } = require('../myMap/discount');

const promisifiedPipelin = promisify(pipeline);

const { createCsvToJson } = require('../utils/csv-to-json');

const pathToFile = path.resolve(__dirname, '../../', 'goods.json');

async function uploadCsv(inputStream) {
  const gunzip = createGunzip();

  const uniqueFileName = uuidv4();
  const filePath = `./upload/${uniqueFileName}.json`;
  const outputStream = fs.createWriteStream(filePath);
  const csvToJson = createCsvToJson();

  try {
    await promisifiedPipelin(inputStream, gunzip, es.split(), csvToJson, outputStream);
  } catch (err) {
    console.error('csv pipelin failed', err);
  }
}

let goodsArr = [];

function home(request, response) {
  response.end();
}

function task1(response, queryParams) {
  console.log(queryParams);
  if (queryParams.field === 'quantity') {
    goodsArr = filterArray(goods, queryParams.field, +queryParams.value);
  } else {
    goodsArr = filterArray(goods, queryParams.field, queryParams.value);
  }
  response.end(JSON.stringify(goodsArr));
}

function task2(response) {
  response.end(JSON.stringify(result));
}

function task3(response) {
  response.end(JSON.stringify(rebuildArray(goods)));
}

function newFile(data, response) {
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 1));
  response.end(JSON.stringify(data));
}

async function setDiscount(response) {
  const rebuildedArray = rebuildArray(goods);

  try {
    const newMap = await Promise.all(
      rebuildedArray.map(async currentValue => {
        let discount = await generateValidDiscountAsync();

        if (currentValue.type === 'hat') {
          discount += await generateValidDiscountAsync();
        }

        if (currentValue.type === 'hat' && currentValue.color === 'red') {
          discount += await generateValidDiscountAsync();
        }

        currentValue.discount = discount;

        return currentValue;
      })
    );
    return response.end(JSON.stringify(newMap));
  } catch (err) {
    return response.end(JSON.stringify(err));
  }
}

async function handleSteramRoutes(request, response) {
  const { url, method } = request;

  if (method === 'POST' && url === '/store/csv') {
    try {
      await uploadCsv(request);
    } catch (err) {
      console.error('Failed  to upload  CSV', err);
    }

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 500;
    response.end(JSON.stringify({ status: 'error' }));
    return;
  }

  response.setHeader('Content-Type', 'application/json');
  response.statusCode = 200;
  response.end(JSON.stringify({ status: 'ok' }));
}

module.exports = {
  home,
  task1,
  task2,
  task3,
  newFile,
  setDiscount,
  uploadCsv,
  handleSteramRoutes
};
