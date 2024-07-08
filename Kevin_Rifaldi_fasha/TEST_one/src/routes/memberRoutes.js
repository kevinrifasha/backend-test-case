const express = require('express');
const memberController = require('../controllers/memberController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: The list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   member_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   is_penalized:
 *                     type: boolean
 *                   penalty_end_date:
 *                     type: string
 *                     format: date
 */
router.route('/')
  .get(memberController.getAllMembers);

/**
 * @swagger
 * /members/{id}/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       500:
 *         description: Server error
 */
router.route('/:id/borrow')
  .post(memberController.borrowBook);

/**
 * @swagger
 * /members/{id}/return:
 *   post:
 *     summary: Return a book
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       500:
 *         description: Server error
 */
router.route('/:id/return')
  .post(memberController.returnBook);

module.exports = router;
