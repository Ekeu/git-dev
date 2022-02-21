export const SIGNIN = 'Sign In';
export const SIGNIN_ROUTE = '/auth/signin';
export const SIGNUP = 'Sign Up';
export const SIGNUP_ROUTE = '/auth/signup';
export const SIGNUP_WELCOME = 'Welcome to GitDev';
export const SIGNIN_WELCOME = 'Welcome Back!';
export const SIGNUP_SWITCH = 'Create an account';
export const SIGNIN_SWITCH = 'Need a GitDev account?';

/* 
^[a-zA-Z0-9]      # start with an alphanumeric character
(                 # start of (group 1)
  [._-](?![._-])  # follow by a dot, hyphen, or underscore, negative lookahead to
                  # ensures dot, hyphen, and underscore does not appear consecutively
  |               # or
  [a-zA-Z0-9]     # an alphanumeric character
)                 # end of (group 1)
{3,18}            # ensures the length of (group 1) between 3 and 18
[a-zA-Z0-9]$      # end with an alphanumeric character

                  # {3,18} plus the first and last alphanumeric characters,
                  # total length became {5,20}
                   */

export const AUTH_USERNAME_CONFIG = {
  required: 'Enter your username.',
  maxLength: {
    value: 20,
    message: 'Your username is too long.',
  },
  minLength: {
    value: 5,
    message: 'Your username is too short.',
  },
  pattern: {
    value: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/,
    message: 'Please provide a valid username.',
  },
};

export const AUTH_EMAIL_CONFIG = {
  required: 'Enter your e-mail address.',
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: 'Please enter a valid e-mail address.',
  },
};

export const AUTH_NAME_CONFIG = {
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

export const AUTH_PASSWORD_CONFIG = {
  required: 'Enter your password.',
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_§]).{8,}$/,
    message:
      'Password should be 8 caracters: 1UC, 1LW, 1 Spc Char and a Number.',
  },
};
