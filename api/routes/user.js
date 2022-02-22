const express = require('express');
const router = express.Router();

const {
  authUser,
  isUsernameAvailable,
  registerUser,
} = require('../controllers/user');

router.route('/').post(registerUser);
router.route('/signin').post(authUser);
router.route('/:username').get(isUsernameAvailable);

module.exports = router;
