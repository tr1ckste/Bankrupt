const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: '1forchan1',
  host: 'localhost',
  port: 5432,
  database: 'bankrupt'
});

module.exports = pool;
