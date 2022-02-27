const express = require('express');
const router = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  isUsernameAvailable,
} = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.route('/').post(registerUser);
router.route('/signin').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/:username').get(isUsernameAvailable);

module.exports = router;
