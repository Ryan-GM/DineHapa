const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// POST /api/users/register - Register a new user
router.post('/register', userController.register);
// POST /api/users/login - Login an existing user
router.post('/login', userController.login);
// GET /api/users/profile - Get user profile
router.get('/profile', auth, userController.getProfile);
// PUT /api/users/profile - Update user profile
router.put('/profile', auth, userController.updateProfile);
// POST /api/users/logout - Logout user
router.post('/logout', auth, userController.logout);

module.exports = router;
