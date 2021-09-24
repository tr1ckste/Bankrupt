'use strict';

const http = require('http');
const fs = require('fs');
const { userController } = require('./db.controllers');

const CURRENT_USER_LOGIN = null;

const httpError = (res, status, message) => {
  res.statusCode = status;
  res.end(`"${message}"`);
};

const receiveData = async req => new Promise(resolve => {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', async () => {
    const data = body.join('');
    const result = JSON.parse(data);
    resolve(result);
  });
});

http.createServer(async(req, res) => {
  const url = req.url === '/' ? '/static/index.html' : req.url;
  const [first, second] = url.substring(1).split('/');
  if (url === '/register') {
    const data = await receiveData(req);
    const { login, password } = data;
    console.log(data);
    userController.setUser(login, password);
  } else {
    const path = `./${first}/${second}`;
    try {
      const data = await fs.promises.readFile(path);
      res.end(data);
    } catch (err) {
      httpError(res, 404, 'File is not found');
    }
  }
}).listen(8000);

console.log('sever is running on 127.0.0.1:8000');
