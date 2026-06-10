const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');

router.route('/').post(sendMessage);
router.route('/admin').get(getMessages); // Simple endpoint for admin view

module.exports = router;
