const db = require('../config/db');

class BorrowedBookRepository {
  static async getAllBorrowedBooks() {
    const result = await db.query('SELECT * FROM borrowed_books');
    return result.rows;
  }

  static async getBorrowedBooksByMember(memberId) {
    const result = await db.query('SELECT * FROM borrowed_books WHERE member_id = $1', [memberId]);
    return result.rows;
  }

  static async addBorrowedBook(memberId, bookId) {
    const result = await db.query(
      'INSERT INTO borrowed_books (member_id, book_id, borrow_date) VALUES ($1, $2, NOW()) RETURNING *',
      [memberId, bookId]
    );
    return result.rows[0];
  }

  static async removeBorrowedBook(memberId, bookId) {
    const result = await db.query(
      'DELETE FROM borrowed_books WHERE member_id = $1 AND book_id = $2 RETURNING *',
      [memberId, bookId]
    );
    return result.rows[0];
  }
}

module.exports = BorrowedBookRepository;
