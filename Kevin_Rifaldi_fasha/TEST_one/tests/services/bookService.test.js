const bookService = require('../../src/services/bookService');
const bookRepository = require('../../src/repositories/bookRepository');

jest.mock('../../src/repositories/bookRepository');

describe('Book Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get all books', async () => {
    const mockBooks = [{ book_id: 1, title: 'Book Title', quantity: 3 }];
    bookRepository.getAllBooks.mockResolvedValue(mockBooks);

    const books = await bookService.getAllBooks();
    expect(books).toEqual(mockBooks);
  });
});
