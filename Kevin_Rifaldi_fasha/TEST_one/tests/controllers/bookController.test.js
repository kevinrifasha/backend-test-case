const request = require('supertest');
const app = require('../../src/app');
const bookService = require('../../src/services/bookService');

jest.mock('../../src/services/bookService');

describe('Book Controller', () => {
    
  test('GET /books should return all books', async () => {
    const mockBooks = [{ book_id: 1, title: 'Book Title', quantity: 3 }];
    bookService.getAllBooks.mockResolvedValue(mockBooks);

    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockBooks);
  });
});
