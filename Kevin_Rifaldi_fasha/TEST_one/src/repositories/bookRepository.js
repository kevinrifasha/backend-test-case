const pool = require('../config/db');

exports.getAllBooks = async () => {
  const res = await pool.query('SELECT * FROM Books WHERE stock > 0');
  return res.rows;
};

exports.getBookById = async (bookId) => {
  const res = await pool.query('SELECT * FROM Books WHERE book_id = $1', [bookId]);
  return res.rows[0];
};

exports.updateBookQuantity = async (bookId, stockChange) => {
  await pool.query('UPDATE Books SET stock = stock + $1 WHERE book_id = $2', [stockChange, bookId]);
};
