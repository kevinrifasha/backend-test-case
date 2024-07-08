const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mini_library',
  password: 'postgre',
  port: 5432,
});

module.exports = pool;
