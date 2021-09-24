'use strict';

const http = require('http');
const handlers = require('./handlers');

const getHandler = (layers) => {
  let currentLayer = handlers;
  for (const layer of layers) {
    currentLayer = currentLayer[layer];
    if (typeof currentLayer === 'function') return currentLayer;
  }
};

http.createServer(async(req, res) => {
  const url = req.url === '/' ? '/static/html/index.html' : req.url;
  const layers = url.substring(1).split('/');
  const handler = getHandler(layers);
  handler(req, res);
}).listen(8000);

console.log('sever is running on 127.0.0.1:8000');
