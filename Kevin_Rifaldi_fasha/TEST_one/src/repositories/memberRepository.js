const pool = require('../config/db');

exports.getAllMembers = async () => {
//   const res = await pool.query('SELECT * FROM Members');
const res = await pool.query(`
    SELECT m.name, 
           json_agg(json_build_object('book_id', b.book_id, 'book_title', b.title, 'borrowed_date', t.borrow_date, 'return_date', t.return_date)) AS borrowed_books
    FROM Members m
    LEFT JOIN Transactions t ON m.member_id = t.member_id
    LEFT JOIN Books b ON t.book_id = b.book_id
    GROUP BY m.member_id
  `);  
return res.rows;
};

exports.getMemberById = async (memberId) => {
  const res = await pool.query('SELECT * FROM Members WHERE member_id = $1', [memberId]);
  return res.rows[0];
};

exports.penalizeMember = async (memberId, penaltyEndDate) => {
  await pool.query('UPDATE Members SET is_penalized = TRUE, penalty_end_date = $1 WHERE member_id = $2', [penaltyEndDate, memberId]);
};
