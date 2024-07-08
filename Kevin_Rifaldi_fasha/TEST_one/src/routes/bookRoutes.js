const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   book_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   quantity:
 *                     type: integer
 */
router.route('/')
  .get(bookController.getAllBooks);

module.exports = router;
