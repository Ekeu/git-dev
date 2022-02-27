const bycrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../../mongo/models/User');
const Profile = require('../../mongo/models/Profile');
const Follower = require('../../mongo/models/Follower');
const APIError = require('../errors/apiError');
const HttpStatusCodes = require('../errors/httpStatusCodes');

const { USERNAME_REGEX_PATTERN } = require('../../constants/auth');
const { EMOJI_PROFILE_PICS } = require('../../constants/profile');
const { generateToken } = require('../utils/generateToken');

// @desc Auth user and get a token
// @route GET /api/v1/users/signin
// @access Public
const authUser = async (req, res, next) => {
  const { email, password } = req.body.user;

  if (!validator.isEmail(email))
    throw new APIError(
      'BAD REQUEST',
      HttpStatusCodes.BAD_REQUEST,
      true,
      'Invalid Email Address.'
    );

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );
    if (user && (await user.matchPasswords(password))) {
      res.status(200).json({
        token: generateToken(user._id.toString()),
      });
    } else {
      throw new APIError(
        'UNAUTHORIZED',
        HttpStatusCodes.UNAUTHORIZED,
        true,
        'Invalid email or password.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get user profile
// @route GET /api/v1/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userID);

    if (user) {
      const followers = await Follower.findOne({ user: req.userID });
      res.status(200).json({
        user,
        followers,
      });
    } else {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCodes.NOT_FOUND,
        true,
        'User not found.'
      );
    }
  } catch (error) {
    next(error);
  }
};

// @desc Register a new user
// @route POST /api/v1/users
// @access Public
const registerUser = async (req, res, next) => {
  const { name, username, email, password } = req.body.user;

  try {
    if (!validator.isEmail(email))
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        'Invalid Email Address.'
      );
    if (!validator.isStrongPassword(password))
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        'Password should be 8 caracters: 1UC, 1LW, 1 Spc Char and a Number.'
      );

    const userExist = await User.findOne({ email: email.toLowerCase() });

    if (userExist)
      throw new APIError(
        'CONFLICT',
        HttpStatusCodes.CONFLICT,
        true,
        'An account already exists with the provided email.'
      );

    const user = new User({
      name,
      username,
      email,
      password,
      profileImageURL:
        EMOJI_PROFILE_PICS[
          Math.floor(Math.random() * EMOJI_PROFILE_PICS.length)
        ],
    });

    await user.save();

    res.status(200).json({
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

// @desc Check if username is available for new user
// @route GET /api/v1/users
// @access Public
const isUsernameAvailable = async (req, res, next) => {
  const { username } = req.params;

  try {
    if (username.length < 1)
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        'Username is not provided.'
      );

    if (!USERNAME_REGEX_PATTERN.test(username))
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCodes.BAD_REQUEST,
        true,
        'Username must be between 5 and 20 characters.'
      );

    const user = await User.findOne({ username });

    if (user)
      throw new APIError(
        'CONFLICT',
        HttpStatusCodes.CONFLICT,
        true,
        'That username is already taken.'
      );

    res.status(200).send('Username available!');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  isUsernameAvailable,
};
