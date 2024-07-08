const memberService = require('../../src/services/memberService');
const memberRepository = require('../../src/repositories/memberRepository');
const bookRepository = require('../../src/repositories/bookRepository');
const transactionRepository = require('../../src/repositories/transactionRepository');

jest.mock('../../src/repositories/memberRepository');
jest.mock('../../src/repositories/bookRepository');
jest.mock('../../src/repositories/transactionRepository');

describe('Member Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get all members', async () => {
    const mockMembers = [{ member_id: 1, name: 'John Doe' }];
    memberRepository.getAllMembers.mockResolvedValue(mockMembers);

    const members = await memberService.getAllMembers();
    expect(members).toEqual(mockMembers);
  });

  test('should borrow a book successfully', async () => {
    const memberId = 1;
    const bookId = 1;
    const mockMember = { member_id: 1, is_penalized: false };
    const mockBook = { book_id: 1, quantity: 1 };
    const mockBorrowedBooks = [];

    memberRepository.getMemberById.mockResolvedValue(mockMember);
    transactionRepository.getBorrowedBooksByMember.mockResolvedValue(mockBorrowedBooks);
    bookRepository.getBookById.mockResolvedValue(mockBook);
    transactionRepository.createTransaction.mockResolvedValue();
    bookRepository.updateBookQuantity.mockResolvedValue();

    await memberService.borrowBook(memberId, bookId);

    expect(memberRepository.getMemberById).toHaveBeenCalledWith(memberId);
    expect(transactionRepository.getBorrowedBooksByMember).toHaveBeenCalledWith(memberId);
    expect(bookRepository.getBookById).toHaveBeenCalledWith(bookId);
    expect(transactionRepository.createTransaction).toHaveBeenCalledWith(memberId, bookId);
    expect(bookRepository.updateBookQuantity).toHaveBeenCalledWith(bookId, -1);
  });

  test('should not borrow more than 2 books', async () => {
    const memberId = 1;
    const bookId = 1;
    const mockMember = { member_id: 1, is_penalized: false };
    const mockBorrowedBooks = [{}, {}];

    memberRepository.getMemberById.mockResolvedValue(mockMember);
    transactionRepository.getBorrowedBooksByMember.mockResolvedValue(mockBorrowedBooks);

    await expect(memberService.borrowBook(memberId, bookId)).rejects.toThrow('Member cannot borrow more than 2 books');
  });

  test('should not borrow book if member is penalized', async () => {
    const memberId = 1;
    const bookId = 1;
    const mockMember = { member_id: 1, is_penalized: true };

    memberRepository.getMemberById.mockResolvedValue(mockMember);

    await expect(memberService.borrowBook(memberId, bookId)).rejects.toThrow('Member is penalized');
  });

  test('should not borrow book if it is already borrowed by someone else', async () => {
    const memberId = 1;
    const bookId = 1;
    const mockMember = { member_id: 1, is_penalized: false };
    const mockBook = { book_id: 1, stock: 0 };

    memberRepository.getMemberById.mockResolvedValue(mockMember);
    transactionRepository.getBorrowedBooksByMember.mockResolvedValue([]);
    bookRepository.getBookById.mockResolvedValue(mockBook);

    await expect(memberService.borrowBook(memberId, bookId)).rejects.toThrow('Book is not available');
  });

  test('should return a book successfully', async () => {
    const memberId = 1;
    const bookId = 1;
    const mockTransaction = { transaction_id: 1, borrow_date: new Date() };

    transactionRepository.getActiveTransaction.mockResolvedValue(mockTransaction);
    memberRepository.penalizeMember.mockResolvedValue();
    transactionRepository.updateTransactionReturnDate.mockResolvedValue();
    bookRepository.updateBookQuantity.mockResolvedValue();

    await memberService.returnBook(memberId, bookId);

    expect(transactionRepository.getActiveTransaction).toHaveBeenCalledWith(memberId, bookId);
    expect(transactionRepository.updateTransactionReturnDate).toHaveBeenCalledWith(mockTransaction.transaction_id);
    expect(bookRepository.updateBookQuantity).toHaveBeenCalledWith(bookId, 1);
  });

  test('should penalize member if book is returned late', async () => {
    const memberId = 1;
    const bookId = 1;
    const borrowDate = new Date();
    borrowDate.setDate(borrowDate.getDate() - 10); // 10 days ago
    const mockTransaction = { transaction_id: 1, borrow_date: borrowDate };

    transactionRepository.getActiveTransaction.mockResolvedValue(mockTransaction);
    memberRepository.penalizeMember.mockResolvedValue();
    transactionRepository.updateTransactionReturnDate.mockResolvedValue();
    bookRepository.updateBookQuantity.mockResolvedValue();

    await memberService.returnBook(memberId, bookId);

    expect(transactionRepository.getActiveTransaction).toHaveBeenCalledWith(memberId, bookId);
    expect(memberRepository.penalizeMember).toHaveBeenCalled();
    expect(transactionRepository.updateTransactionReturnDate).toHaveBeenCalledWith(mockTransaction.transaction_id);
    expect(bookRepository.updateBookQuantity).toHaveBeenCalledWith(bookId, 1);
  });

  test('should not return a book that the member did not borrow', async () => {
    const memberId = 1;
    const bookId = 1;

    transactionRepository.getActiveTransaction.mockResolvedValue(null);

    await expect(memberService.returnBook(memberId, bookId)).rejects.toThrow('This book was not borrowed by the member');

    expect(transactionRepository.getActiveTransaction).toHaveBeenCalledWith(memberId, bookId);
  });

  test('should not borrow a book if member is penalized within the last 3 days', async () => {
    const memberId = 1;
    const bookId = 1;
    const penaltyEndDate = new Date();
    penaltyEndDate.setDate(penaltyEndDate.getDate() - 2); // 2 days ago
    const mockMember = { member_id: 1, is_penalized: true, penalty_end_date: penaltyEndDate };

    memberRepository.getMemberById.mockResolvedValue(mockMember);

    await expect(memberService.borrowBook(memberId, bookId)).rejects.toThrow('Member is penalized');

    expect(memberRepository.getMemberById).toHaveBeenCalledWith(memberId);
  });
  test('should penalize member for overdue book return', async () => {
    const memberId = 1;
    const bookId = 101;

    const mockMember = { member_id: memberId, name: 'Alice', is_penalized: false };
    const mockBook = { book_id: bookId, title: 'Book A', quantity: 1 };

    const overdueTransaction = { transaction_id: 1, member_id: memberId, book_id: bookId };
    transactionRepository.getOverdueTransactions.mockResolvedValue([overdueTransaction]);

    memberRepository.getMemberById.mockResolvedValue(mockMember);
    bookRepository.getBookById.mockResolvedValue(mockBook);
    bookRepository.updateBookQuantity.mockResolvedValue();

    await expect(memberService.penalizeMemberForOverdueBooks(memberId)).rejects.toThrow('Member is penalized due to overdue books');

    expect(memberRepository.penalizeMember).toHaveBeenCalledWith(memberId);
  });

});

