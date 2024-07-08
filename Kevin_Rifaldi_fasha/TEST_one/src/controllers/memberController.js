const memberService = require('../services/memberService');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembers();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  const memberId = req.params.id;
  const { bookId } = req.body;
  try {
    await memberService.borrowBook(memberId, bookId);
    res.status(200).send('Book borrowed successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const memberId = req.params.id;
  const { bookId } = req.body;
  try {
    await memberService.returnBook(memberId, bookId);
    res.status(200).send('Book returned successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
