const memberRepository = require('../repositories/memberRepository');
const bookRepository = require('../repositories/bookRepository');
const transactionRepository = require('../repositories/transactionRepository');

exports.getAllMembers = async () => {
  return await memberRepository.getAllMembers();
};

exports.borrowBook = async (memberId, bookId) => {
  const member = await memberRepository.getMemberById(memberId);
  if (member.is_penalized) {
    throw new Error('Member is penalized');
  }

  const borrowedBooks = await transactionRepository.getBorrowedBooksByMember(memberId);
  if (borrowedBooks.length >= 2) {
    throw new Error('Member cannot borrow more than 2 books');
  }

  const book = await bookRepository.getBookById(bookId);
  if (book.stock <= 0) {
    throw new Error('Book is not available');
  }

  await transactionRepository.createTransaction(memberId, bookId);
  await bookRepository.updateBookQuantity(bookId, -1);
};

exports.returnBook = async (memberId, bookId) => {
  const transaction = await transactionRepository.getActiveTransaction(memberId, bookId);
  if (!transaction) {
    throw new Error('This book was not borrowed by the member');
  }

  const borrowDate = new Date(transaction.borrow_date);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - borrowDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 7) {
    const penaltyEndDate = new Date();
    penaltyEndDate.setDate(currentDate.getDate() + 3);
    await memberRepository.penalizeMember(memberId, penaltyEndDate);
  }

  await transactionRepository.updateTransactionReturnDate(transaction.transaction_id);
  await bookRepository.updateBookQuantity(bookId, 1);
};

exports.penalizeMemberForOverdueBooks=async(memberId)=>{

    const member = await memberRepository.getMemberById(memberId);
    if (!member) throw new Error('Member not found');

    const overdueTransactions = await transactionRepository.getOverdueTransactions(memberId);
    if (overdueTransactions.length > 0) {

      await memberRepository.penalizeMember(memberId);
      throw new Error('Member is penalized due to overdue books');
    } else {
      console.log('No overdue books found for member');
    }
  
};

