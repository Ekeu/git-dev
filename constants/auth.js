const SIGNIN = 'Sign In';
const SIGNIN_ROUTE = '/auth/signin';
const SIGNUP = 'Sign Up';
const SIGNUP_ROUTE = '/auth/signup';
const SIGNUP_WELCOME = 'Welcome to gitdev';
const SIGNIN_WELCOME = 'Welcome Back!';
const SIGNUP_SWITCH = 'Create an account';
const SIGNIN_SWITCH = 'Need a gitdev account?';
const USERNAME_AVAILABLE = 'Username available!';
const USERNAME_REGEX_PATTERN =
  /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
const AUTH_USERNAME_CONFIG = {
  required: 'Enter your username.',
  maxLength: {
    value: 20,
    message: 'Username must be between 5 and 20 characters.',
  },
  minLength: {
    value: 5,
    message: 'Username must be between 5 and 20 characters.',
  },
  pattern: {
    value: USERNAME_REGEX_PATTERN,
    message: 'Username must be between 5 and 20 characters.',
  },
};

const AUTH_EMAIL_CONFIG = {
  required: 'Enter your e-mail address.',
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: 'Please enter a valid e-mail address.',
  },
};

const AUTH_NAME_CONFIG = {
  required: 'Enter your name.',
  maxLength: {
    value: 20,
    message: 'Your name is too long.',
  },
  minLength: {
    value: 3,
    message: 'Your name is too short.',
  },
};

const AUTH_PASSWORD_CONFIG = {
  required: 'Enter your password.',
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_§]).{8,}$/,
    message:
      'Password should be 8 caracters: 1UC, 1LW, 1 Spc Char and a Number.',
  },
};

module.exports = {
  SIGNIN,
  SIGNIN_ROUTE,
  SIGNUP,
  SIGNUP_ROUTE,
  SIGNUP_WELCOME,
  SIGNIN_WELCOME,
  SIGNUP_SWITCH,
  SIGNIN_SWITCH,
  USERNAME_AVAILABLE,
  USERNAME_REGEX_PATTERN,
  AUTH_USERNAME_CONFIG,
  AUTH_EMAIL_CONFIG,
  AUTH_NAME_CONFIG,
  AUTH_PASSWORD_CONFIG,
};
