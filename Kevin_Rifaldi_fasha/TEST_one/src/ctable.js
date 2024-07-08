const { Client } = require('pg');

// Database connection configuration for the initial connection (e.g., default database)
const initialClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Default database
  password: 'postgre',
  port: 5432,
});

const createDatabaseSQL = `CREATE DATABASE mini_library;`;

const createDatabase = async () => {
  try {
    await initialClient.connect();
    console.log('Connected to the initial database.');
    await initialClient.query(createDatabaseSQL);
    console.log('Database created successfully.');
  } catch (err) {
    if (err.code !== '42P04') { // 42P04 is the error code for 'duplicate_database'
      console.error('Error creating database', err.stack);
      throw err;
    } else {
      console.log('Database already exists.');
    }
  } finally {
    await initialClient.end();
  }
};

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mini_library',
  password: 'postgre',
  port: 5432,
});

const createTablesSQL = `
CREATE TABLE IF NOT EXISTS Members (
    member_id SERIAL PRIMARY KEY,
    member_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_penalized BOOLEAN DEFAULT FALSE,
    penalty_end_date DATE
);

CREATE TABLE IF NOT EXISTS Books (
    book_id SERIAL PRIMARY KEY,
    book_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,    
    stock INT 
);

CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    member_code VARCHAR(50) NOT NULL,
    book_id INT NOT NULL,
    book_code VARCHAR(50) NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE IF NOT EXISTS borrowed_books (
    member_id INT REFERENCES members(member_id),
    book_id INT REFERENCES books(book_id),
    borrow_date TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (member_id, book_id)
);
`;

const createTables = async () => {
  try {
    await client.connect();
    console.log('Connected to the mini_library database.');
    await client.query(createTablesSQL);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating tables', err.stack);
  } finally {
    await client.end();
  }
};


createDatabase()
  .then(createTables)
  .then(() => console.log('Database setup completed.'))
  .catch(err => console.error('Setup failed', err));
