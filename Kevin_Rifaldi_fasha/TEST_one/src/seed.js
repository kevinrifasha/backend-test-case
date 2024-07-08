const fs = require('fs');
const { Pool } = require('pg');

const rawData = fs.readFileSync('./seed_data.json');
const seedData = JSON.parse(rawData);

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mini_library',
  password: 'postgre',
  port: 5432,
});

(async () => {
  const client = await pool.connect();
  try {
    await Promise.all(seedData.members.map(async (member) => {
      const query = 'INSERT INTO members (member_code, name) VALUES ($1, $2)';
      await client.query(query, [member.member_code, member.name]);
    }));

    await Promise.all(seedData.books.map(async (book) => {
      const query = 'INSERT INTO books (book_code, title, author, stock) VALUES ($1, $2, $3, $4)';
      await client.query(query, [book.book_code, book.title, book.author, book.stock]);
    }));

    console.log('Data seeded successfully.');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    client.release();
    await pool.end();
  }
})();
