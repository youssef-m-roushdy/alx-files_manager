const express = require('express');
const router = express.Router();
import AppController from '../controllers/AppController';

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
