const express = require('express');
const memberRoutes = require('./memberRoutes');
const bookRoutes = require('./bookRoutes');

const router = express.Router();

router.use('/members', memberRoutes);
router.use('/books', bookRoutes);

module.exports = router;
