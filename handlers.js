const fs = require('fs');
const { userController, bankController } = require('./db.controllers');

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

const handlers = {
  static: async (req, res) => {
    const url = req.url === '/' ? '/static/html/index.html' : req.url;
    const [first, second, third] = url.substring(1).split('/');
    const path = `./${first}/${second}/${third}`;
    try {
      const data = await fs.promises.readFile(path);
      res.end(data);
    } catch (err) {
      httpError(res, 404, 'File is not found');
    }
  },

  user: {
    getAll: async (req, res) => {

    },
    getAllById: async (req, res) => {

    },
    set: async (req, res) => {
      const data = await receiveData(req);
      const { login, password } = data;
      console.log(data);
      userController.setUser(login, password);
    }
  },

  bank: {

  }
}

module.exports = handlers;
