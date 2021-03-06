const fs = require('fs');
const { userController, bankController } = require('./db.controllers');

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
    const url = req.url === '/' ? '/static/html/main.html' : req.url;
    const [first, second, third] = url.substring(1).split('/');
    const path = `./${first}/${second}/${third}`;
    try {
      const data = await fs.promises.readFile(path);
      res.end(data);
    } catch (err) {
      console.log(err);
      httpError(res, 404, 'File is not found');
    }
  },

  user: {
    login: async (req, res) => {
      const data = await receiveData(req);
      const { login, password } = data;
      const userLogins = (await userController.getAllUsers()).map(user => user.login);
      if (!userLogins.includes(login)) {
        res.end(JSON.stringify('incorrect'));
        return;
      }
      const truePassword = (await userController.getUserByLogin(login))[0].password;
      if (!(truePassword === password)) {
        res.end(JSON.stringify('incorrect'));
        return;
      }
      fs.writeFileSync('./static/scripts/saveLogin.js', `MY_LOGIN = '${login}';`);
      res.end(JSON.stringify(login));
    },
    register: async (req, res) => {
      const data = await receiveData(req);
      const { login, password } = data;
      const userLogins = (await userController.getAllUsers()).map(user => user.login);
      if (userLogins.includes(login)) {
        res.end(JSON.stringify('occupied'));
        return;
      } else {
        userController.setUser(login, password);
        fs.writeFileSync('./static/scripts/saveLogin.js', `MY_LOGIN = '${login}';`);  
        res.end(JSON.stringify(login));
      }
    }
  },

  bank: {
    add: async (req, res) => {
      const data = await receiveData(req);
      const { login, name, interestRate, maximumLoan, minimumDownPayment, loanTerm } = data;
      const userId = (await userController.getUserByLogin(login))[0].id;
      const banks = await bankController.getAllBanks(userId);
      const bankNames = banks.map(bank => bank.name);
      if (bankNames.includes(name)) {
        res.end(JSON.stringify('Bank name is occupied'));
      } else {
        bankController.setBank(name, interestRate, maximumLoan, minimumDownPayment, loanTerm, userId);
        res.end(JSON.stringify(''));
      }
    },
    load: async (req, res) => {
      const login = await receiveData(req);
      const userId = (await userController.getUserByLogin(login))[0].id;
      const banks = await bankController.getAllBanks(userId);
      res.end(JSON.stringify(banks));
    },
    delete: async(req, res) => {
      const data = await receiveData(req);
      const { login, name } = data;
      const userId = (await userController.getUserByLogin(login))[0].id;
      await bankController.deleteBankByName(userId, name);
      res.end(JSON.stringify(''));
    }
  }
}

module.exports = handlers;
