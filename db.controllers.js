const database = require('./database');

class UserController {
  async getAllUsers() {
    const query = 'SELECT * FROM client';
    const users = await database.query(query);
    return users.rows;
  }

  async getUserByLogin(login) {
    const query = `SELECT * FROM client WHERE login = '${login}'`;
    const user = await database.query(query);
    return user.rows;
  }

  async setUser(login, password) {
    const query = `INSERT INTO client (login, password) VALUES ('${login}', '${password}')`;
    const newUser =  await database.query(query);
    return newUser;
  }
}

class BankController {
  async getAllBanks(userId) {
    const query = `SELECT * FROM bank WHERE clientId='${userId}'`;
    const banks = await database.query(query);
    return banks.rows;
  }

  async getBankByName(userId, bankName) {
    const query = `SELECT * FROM bank WHERE (clientId = '${userId}') AND (name = '${bankName}')`;
    const bank = await database.query(query);
    return bank.rows;
  }

  async deleteBankByName(userId, bankName) {
    const query = `DELETE * FROM bank WHERE (clientId = '${userId}') AND (name = '${bankName}')`;
    const bank = await database.query(query);
    return bank.rows;
  }

  async setBank(name, interestRate, maximumLoan, minimumDownPayment, loanTerm, clientId) {
    const query = `INSERT INTO bank (name, interestRate, maximumLoan, minimumDownPayment, loanTerm, clientId) 
                   VALUES ('${name}', '${interestRate}', '${maximumLoan}', '${minimumDownPayment}', '${loanTerm}', '${clientId}')`;
    const newBank =  await database.query(query);
    return newBank;
  }
}

const userController = new UserController;
const bankController = new BankController;

module.exports = {
  userController,
  bankController
}
