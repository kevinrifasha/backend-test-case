const request = require('supertest');
const app = require('../../src/app');
const memberService = require('../../src/services/memberService');

jest.mock('../../src/services/memberService');

describe('Member Controller', () => {
    let server;

    beforeAll((done) => {
      const port = 3000;
      server = app.listen(port, () => {
        console.log(`Test server running on port ${port}`);
        done();
      });
    });
  
    afterAll((done) => {
      server.close(() => {
        console.log('Test server closed');
        done();
      });
    });
  test('GET /members should return all members', async () => {
    const mockMembers = [{ member_id: 1, name: 'Angga' }];
    memberService.getAllMembers.mockResolvedValue(mockMembers);

    const res = await request(app).get('/members');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockMembers);
  });

  test('POST /members/:id/borrow should borrow a book', async () => {
    const memberId = 3;
    const bookId = 1;

    const res = await request(app)
      .post(`/members/${memberId}/borrow`)
      .send({ bookId });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Book borrowed successfully');
  });

  test('POST /members/:id/return should return a book', async () => {
    const memberId = 1;
    const bookId = 1;

    const res = await request(app)
      .post(`/members/${memberId}/return`)
      .send({ bookId });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Book returned successfully');
  });
});



