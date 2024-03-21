const express = require('express');
const {
  register,
  login,
  isAuthenticated,
  logout
} = require('../controllers/authController');

const router = express.Router();

// register
router.post('/register', register);

// login
router.post('/login', login);

// isAuthenticated
router.get('/is-authenticated', isAuthenticated);

// logout
router.post('/logout', logout);

module.exports.router = router;