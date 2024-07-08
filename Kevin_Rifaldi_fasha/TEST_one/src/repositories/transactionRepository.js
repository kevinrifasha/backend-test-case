const pool = require('../config/db');

exports.getBorrowedBooksByMember = async (memberId) => {
  const res = await pool.query('SELECT * FROM Transactions WHERE member_id = $1 AND return_date IS NULL', [memberId]);
  return res.rows;
};

exports.getActiveTransaction = async (memberId, bookId) => {
  const res = await pool.query('SELECT * FROM Transactions WHERE member_id = $1 AND book_id = $2 AND return_date IS NULL', [memberId, bookId]);
  return res.rows[0];
};

exports.createTransaction = async (memberId, bookId) => {
  await pool.query('INSERT INTO Transactions (member_id, book_id, borrow_date) VALUES ($1, $2, CURRENT_DATE)', [memberId, bookId]);
};

exports.updateTransactionReturnDate = async (transactionId) => {
  await pool.query('UPDATE Transactions SET return_date = CURRENT_DATE WHERE transaction_id = $1', [transactionId]);
};

exports.getOverdueTransactions= async (memberId)=>{
    await pool.query('SELECT* FROM transactions WHERE member_id = $1 AND return_date IS NULL AND borrow_date + interval `7 days` < current_timestamp');
};