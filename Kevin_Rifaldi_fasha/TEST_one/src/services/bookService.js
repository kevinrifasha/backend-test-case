const bookRepository = require('../repositories/bookRepository');

exports.getAllBooks = async () => {
  return await bookRepository.getAllBooks();
};
